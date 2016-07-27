import { connect } from 'react-redux';

import ajaxMethods from '../serverIO/ajaxMethods';
import dataHandling from '../serverIO/dataHandling';
import { create } from '../Popins/Actions';

import { populateChecks, populateGlobalStats } from './Actions';
import { populateUserInfo } from '../User/Actions';
import Dashboard from './Component';

const mapStateToProps = (state) => {
    return {
        checks: state.checks,
        globalStats: state.globalStats,
        // openCheck: state.openCheck,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        populateAll() {
            dataHandling.getUserAndGlobalStats(ajaxMethods.GETer, function(err, data) {
                if (err) return dispatch(create('alert', err.message));

                dispatch(populateChecks(data.userData.checks));

                dispatch(populateGlobalStats(data.globalStats));

                dispatch(populateUserInfo(data.userData));
            });
        },
    };
};

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

export default DashboardContainer;
