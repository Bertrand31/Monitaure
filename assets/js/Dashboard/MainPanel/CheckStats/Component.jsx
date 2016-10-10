import React, { PropTypes } from 'react';
import ChartistGraph from 'react-chartist';
import moment from 'moment';

const chartOptions = {
    fullWidth: false,
    showArea: true,
    low: 0,
    height: 180,
    onlyInteger: true,
    axisY: {
        offset: 50,
        showGrid: false,
        scaleMinSpace: 100,
        labelInterpolationFnc(value) {
            return `${value} ms`;
        },
    },
    axisX: {
        labelInterpolationFnc(value, index) {
            return index % 4 === 0 ? value : null;
        },
    },
};
const responsiveChartOptions = [
    ['screen and (min-width:768px)', {
        height: 250,
        axisX: {
            labelInterpolationFnc(value, index) {
                return index % 2 === 0 ? value : null;
            },
        },
    }],
    ['screen and (min-width:1240px)', {
        axisX: {
            labelInterpolationFnc(value) {
                return value;
            },
        },
    }],
];

const historyToChartData = (history) => {
    const chartData = {
        labels: [],
        series: [
            [],
        ],
    };
    history.forEach((item) => {
        const lightDate = moment(item.date).format('H:mm');
        chartData.labels.push(lightDate);
        chartData.series[0].push({
            value: item.duration,
        });
    });
    return chartData;
};

const checkStats = ({ openCheckID, checks }) => {
    if (openCheckID == null) {
        return <section className="c-check-stats s-is-hidden" />;
    }

    const openCheck = checks[openCheckID];

    const chartDataset = historyToChartData(openCheck.history);
    const lastOutagePretty = openCheck.lastOutage ? moment(openCheck.lastOutage).format('D/MM/YY H:mm') : '-';
    const lastPing = openCheck.history[openCheck.history.length - 1];
    const lastPingDuration = lastPing.duration ? `${lastPing.duration} ms` : '-';
    const lastPingDate = moment(lastPing.date).format('HH:mm:ss');

    return (
        <section className="c-check-stats">
            <div className="c-check-stats__data">
                <p className="c-check-stats__name">{openCheck.name}</p>
                <p className="c-check-stats__avg">Avg latency: {openCheck.avg ? `${openCheck.avg} ms` : '-'}</p>
                <p className="c-check-stats__min">Min latency: {openCheck.min ? `${openCheck.min} ms` : '-'}</p>
                <p className="c-check-stats__max">Max latency: {openCheck.max ? `${openCheck.max} ms` : '-'}</p>
                <p className="c-check-stats__availability">
                    Availability:
                    <span data-perfect={openCheck.availability === 100}>
                        {openCheck.availability ? ` ${openCheck.availability}%` : ' -'}
                    </span>
                </p>
                <p className="c-check-stats__outage">Last outage:<br />{lastOutagePretty}</p>
            </div>
            <div className="c-check-stats__main-chart">
                <div className="top-data">
                    <p className="latency-wrapper">
                        <span className="latency-title">Latency</span>
                        <br />
                        <span className="latency">
                            <span className="latency-value">{lastPingDuration}</span>
                        </span>
                    </p>
                    <p className="c-check-stats__lastdate">{lastPingDate}</p>
                </div>
                <ChartistGraph
                    className={'ct-chart'}
                    data={chartDataset}
                    options={chartOptions}
                    responsiveOptions={responsiveChartOptions}
                    type="Line"
                />
            </div>
        </section>
    );
};

checkStats.propTypes = {
    openCheck: PropTypes.shape({
        availability: PropTypes.number,
        avg: PropTypes.number,
        history: PropTypes.array,
        id: PropTypes.string,
        lastOutage: PropTypes.string,
        max: PropTypes.number,
        min: PropTypes.number,
        name: PropTypes.string,
    }),
};

export default checkStats;
