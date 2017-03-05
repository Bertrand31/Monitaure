import React, { PropTypes } from 'react';
import ChartistGraph from 'react-chartist';
import moment from 'moment';

const donutOptions = {
    width: '90px',
    height: '90px',
    donut: true,
    donutWidth: 5,
    startAngle: 230,
    total: 140,
    showLabel: false,
};
const responsiveDonutOptions = [
    ['screen and (min-width:768px)', {
        width: '200px',
        height: '200px',
    }],
];

const calcGlobalStats = (checks) => {
    let checksUp = 0;
    let totalPopulatedChecks = 0;
    let availabilitiesSum = 0;
    const lastError = { time: null, checkName: null };

    Object.values(checks).forEach((check) => {
        if (check.id !== 'tmpID') {
            if (check.history.length > 0) {
                totalPopulatedChecks++;
                if (check.history[check.history.length - 1].duration !== null) {
                    checksUp++;
                }
                availabilitiesSum += check.availability;
                const lastOutage = new Date(check.lastOutage);
                if (lastOutage > lastError.time) {
                    lastError.time = lastOutage;
                    lastError.checkName = check.name;
                }
            }
        }
    });

    return {
        checksUp,
        totalPopulatedChecks,
        percentageOfChecksUp: totalPopulatedChecks !== 0 ? (checksUp * 100) / totalPopulatedChecks : 0,
        availabilitiesAvg: availabilitiesSum !== 0 ? Math.floor((availabilitiesSum / totalPopulatedChecks) * 100) / 100 : 0,
        lastError,
    };
};

const GlobalStats = ({ checks, isACheckOpen }) => {
    if (Object.keys(checks).length < 1) {
        return <div className="c-globalstats s-is-hidden" />;
    }

    const { percentageOfChecksUp, availabilitiesAvg, lastError, checksUp, totalPopulatedChecks } = calcGlobalStats(checks);

    const checksUpDataset = {
        series: [
            {
                value: percentageOfChecksUp,
                className: 'c-donut__primary-bar',
            },
            {
                value: 100 - (percentageOfChecksUp),
                className: 'c-donut__secondary-bar',
            },
        ],
    };
    const availabilityDataset = {
        series: [
            {
                value: availabilitiesAvg,
                className: 'c-donut__primary-bar',
            },
            {
                value: 100 - availabilitiesAvg,
                className: 'c-donut__secondary-bar',
            },
        ],
    };
    const lastErrorDataset = {
        series: [
            {
                value: 100,
                className: 'c-donut__secondary-bar',
            },
        ],
    };

    const lastErrorExists = !!lastError.time;
    const lastErrorHour = lastErrorExists ? moment(lastError.time).format('HH:mm') : '-';
    const lastErrorDay = lastErrorExists ? moment(lastError.time).format('DD/MM') : '-';

    return (
        <div className={`c-globalstats l-grid ${isACheckOpen ? 's-is-hidden' : ''}`}>
            <div className="l-grid__block status">
                <div className="c-donut">
                    <ChartistGraph
                        className={'ct-pie'}
                        data={checksUpDataset}
                        options={donutOptions}
                        responsiveOptions={responsiveDonutOptions}
                        type="Pie"
                    />
                </div>
                <p className="c-donut-content">
                    <span className="c-donut-content__main-text">
                        {checksUp}/{totalPopulatedChecks} <span className="c-donut-content__servers">servers</span>
                        <span className="c-donut-content__secondary-text">are responding</span>
                    </span>
                    <span className="c-donut-content__aside-text">Status</span>
                </p>
            </div>
            <div className="l-grid__block availability">
                <div className="c-donut">
                    <ChartistGraph
                        className={'ct-pie'}
                        data={availabilityDataset}
                        options={donutOptions}
                        responsiveOptions={responsiveDonutOptions}
                        type="Pie"
                    />
                </div>
                <p className="c-donut-content">
                    <span className="c-donut-content__main-text">
                        {availabilitiesAvg}
                        <span className="c-donut-content__secondary-text">%</span>
                    </span>
                    <span className="c-donut-content__aside-text">average availability</span>
                </p>
            </div>
            <div className="l-grid__block last-error">
                <div className="c-donut">
                    <ChartistGraph
                        className={'ct-pie'}
                        data={lastErrorDataset}
                        options={donutOptions}
                        responsiveOptions={responsiveDonutOptions}
                        type="Pie"
                    />
                </div>
                <p className="c-donut-content">
                    <span className="c-donut-content__main-text">
                        <span className="c-donut-content__main-text--check-name">
                            {lastError.checkName}
                        </span>
                        <span className="c-donut-content__secondary-text c-donut-content__secondary-text--hour">
                            {lastErrorHour}
                        </span>
                        <span className="c-donut-content__secondary-text c-donut-content__secondary-text--day">
                            {lastErrorDay}
                        </span>
                    </span>
                    <span className="c-donut-content__aside-text">Last outage</span>
                </p>
            </div>
        </div>
    );
};

GlobalStats.propTypes = {
    checks: PropTypes.object,
    isACheckOpen: PropTypes.bool.isRequired,
};

export default GlobalStats;
