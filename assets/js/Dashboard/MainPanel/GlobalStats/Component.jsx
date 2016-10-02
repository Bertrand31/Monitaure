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
    let historyLength = 0;
    const lastError = { time: null, checkName: null };

    for (const checkId in checks) {
        if (Object.prototype.hasOwnProperty.call(checks, checkId)) {
            if (checkId !== 'tmpID') {
                historyLength = checks[checkId].history.length - 1;
                if (historyLength > 0) {
                    totalPopulatedChecks++;
                    if (checks[checkId].history[historyLength].duration !== null) {
                        checksUp++;
                    }
                    availabilitiesSum += checks[checkId].availability;
                    const lastOutage = new Date(checks[checkId].lastOutage);
                    if (lastOutage > lastError.time) {
                        lastError.time = lastOutage;
                        lastError.checkName = checks[checkId].name;
                    }
                }
            }
        }
    }

    return {
        checksUp,
        totalPopulatedChecks,
        percentageOfChecksUp: (checksUp * 100) / totalPopulatedChecks,
        availabilitiesAvg: Math.floor((availabilitiesSum / totalPopulatedChecks) * 100) / 100,
        lastError,
    };
};

const GlobalStats = ({ checks, isACheckOpen }) => {
    if (Object.keys(checks).length < 1) {
        return <div className="c-globalstats s-is-hidden" />;
    }

    const globalStats = calcGlobalStats(checks);

    const checksUpDataset = {
        series: [
            {
                value: globalStats.percentageOfChecksUp || 0,
                className: 'c-donut__primary-bar',
            },
            {
                value: 100 - (globalStats.percentageOfChecksUp || 0),
                classname: 'c-donut__secondary-bar',
            },
        ],
    };
    const availabilityDataset = {
        series: [
            {
                value: globalStats.availabilitiesAvg || 0,
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
                        {globalStats.checksUp}/{globalStats.totalPopulatedChecks} <span className="c-donut-content__servers">servers</span>
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
                        {globalStats.availabilitiesAvg || 0}
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
                            {globalStats.lastError.checkName}
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
