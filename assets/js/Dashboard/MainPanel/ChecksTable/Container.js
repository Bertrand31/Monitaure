import { connect } from 'react-redux';

import { POSTer, GETer } from '../../../serverIO/ajaxMethods';
import * as API from '../../../serverIO/dataHandling';
import { create as popinCreate } from '../../../Popins/Actions';

import * as actions from './Actions';
import * as UserActions from '../../../User/Actions';
import * as CheckStatsActions from '../CheckStats/Actions';

import ChecksTableComponent from './Component';

const mapStateToProps = state => ({
    checks: state.checks,
    openCheckID: state.openCheck.id || null,
});

const mapDispatchToProps = dispatch => ({
    populateAll() {
        API.getUserAndChecks(GETer, (err, data) => {
            if (err) return dispatch(popinCreate('alert', err.message));

            heap.identify(data.user.userName);

            dispatch(UserActions.login(data.user));
            dispatch(actions.populateChecks(data.checks));
        });
    },

    destroy(id) {
        dispatch(actions.destroyCheck(id));
        if (id !== 'tmpID') {
            API.destroyCheck(GETer, id, (err) => {
                if (err) return dispatch(popinCreate('alert', err.message));
            });
        }
    },

    setWorkingCheck(id) {
        return dispatch(actions.setWorkingCheck(id));
    },
    unsetWorkingCheck(id) {
        return dispatch(actions.unsetWorkingCheck(id));
    },
    updateWorkingCheck(id, attrName, attrValue) {
        return dispatch(actions.updateWorkingCheck(id, attrName, attrValue));
    },
    saveWorkingCheck(data) {
        if (data.id === 'tmpID') {
            API.createCheck(POSTer, data, (err, newData) => {
                if (err) return dispatch(popinCreate('alert', err.message));

                dispatch(actions.destroyCheck('tmpID'));

                dispatch(actions.saveWorkingCheck(newData));
            });
        } else {
            dispatch(actions.saveWorkingCheck(data));

            API.updateCheck(POSTer, data, (err) => {
                if (err) return dispatch(popinCreate('alert', err.message));
            });
        }
    },

    openCheckStats(check) {
        if (check.id !== 'tmpID') {
            dispatch(CheckStatsActions.openStats(check));
        }
    },
    closeCheckStats() {
        return dispatch(CheckStatsActions.closeStats());
    },
});

const ChecksTableContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChecksTableComponent);

export default ChecksTableContainer;
