import React, { PropTypes } from 'react';
import ChartistGraph from 'react-chartist';
import moment from 'moment';

const donutOptions = {
    width: '200px',
    height: '200px',
    donut: true,
    donutWidth: 5,
    startAngle: 230,
    total: 140,
    showLabel: false,
};

const GlobalStats = ({ globalStats }) => {
    if (Object.keys(globalStats).length < 1) {
        return null;
    }

    const percentageOfChecksUp = (globalStats.checksUp * 100) / globalStats.numberOfChecks;
    const checksUpDataset = {
        series: [
            {
                value: percentageOfChecksUp,
                className: 'c-donut__primary-bar',
            },
            {
                value: 100 - percentageOfChecksUp,
                classname: 'c-donut__secondary-bar',
            },
        ],
    };
    const availabilityDataset = {
        series: [
            {
                value: globalStats.availabilitiesAvg,
                className: 'c-donut__primary-bar',
            },
            {
                value: 100 - globalStats.availabilitiesAvg,
                className: 'c-donut__secondary-bar',
            },
        ],
    };
    const lastErrorDataset = {
        series: [
            {
                value: 100,
                className: 'c-donut__primary-bar--nok',
            },
        ],
    };
    const lastErrorExists = !!globalStats.lastError.time;
    const lastErrorHour = lastErrorExists ? moment(globalStats.lastError.time).format('HH:SS') : '-';
    const lastErrorDay = lastErrorExists ? moment(globalStats.lastError.time).format('DD/MM') : '-';

    return (
        <div className="l-grid">
            <div className="l-grid__block">
                <div className="c-donut">
                    <ChartistGraph className={'ct-pie'} data={checksUpDataset} options={donutOptions} type="Pie" />
                </div>
                <p className="c-donut-content">
                    <span className="c-donut-content__main-text">
                        {globalStats.checksUp}/{globalStats.numberOfChecks} servers
                        <span className="c-donut-content__secondary-text">are responding</span>
                    </span>
                    <span className="c-donut-content__aside-text">Status</span>
                </p>
            </div>
            <div className="l-grid__block availability">
                <div className="c-donut">
                    <ChartistGraph className={'ct-pie'} data={availabilityDataset} options={donutOptions} type="Pie" />
                </div>
                <p className="c-donut-content">
                    <span className="c-donut-content__main-text">
                        {globalStats.availabilitiesAvg}
                        <span className="c-donut-content__secondary-text">%</span>
                    </span>
                    <span className="c-donut-content__aside-text">average availability</span>
                </p>
            </div>
            <div className="l-grid__block last-error">
                <div className="c-donut">
                    <ChartistGraph className={'ct-pie'} data={lastErrorDataset} options={donutOptions} type="Pie" />
                </div>
                <p className="c-donut-content">
                    <span className="c-donut-content__main-text">
                        <span className="c-donut-content__main-text--check-name">{globalStats.lastError.checkName}</span>
                        <span className="c-donut-content__secondary-text c-donut-content__secondary-text--hour">{lastErrorHour} </span>
                        <span className="c-donut-content__secondary-text c-donut-content__secondary-text--day"> {lastErrorDay}</span>
                    </span>
                    <span className="c-donut-content__aside-text">Last outage</span>
                </p>
            </div>
        </div>
    );
};

GlobalStats.propTypes = {
    globalStats: PropTypes.shape({
        lastError: PropTypes.object,
        availabilitiesAvg: PropTypes.number,
        numberOfChecks: PropTypes.number,
        checksUp: PropTypes.number,
    }),
};

export default GlobalStats;
