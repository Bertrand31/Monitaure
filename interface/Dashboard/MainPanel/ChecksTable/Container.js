import { connect } from 'react-redux';

import { POSTer, GETer, PATCHer, DELETEer } from '../../../serverIO/ajaxMethods';
import * as API from '../../../serverIO/dataHandling';
import { create as popinCreate } from '../../../Popins/Actions';

import * as actions from './Actions';
import * as CheckStatsActions from '../CheckStats/Actions';

import ChecksTableComponent from './Component';

const mapStateToProps = state => ({
    checks: state.checks,
    openCheckID: state.openCheckID,
});

const mapDispatchToProps = dispatch => ({
    hydrateChecks: () => {
        API.getChecks(GETer, (err, data) => {
            if (err) return dispatch(popinCreate('alert', err.message));

            return dispatch(actions.hydrateChecks(data));
        });
    },

    destroy: (id) => {
        dispatch(actions.destroyCheck(id));
        if (id !== 'tmpID') {
            API.destroyCheck(DELETEer, id, (err) => {
                if (err) return dispatch(popinCreate('alert', err.message));
            });
        }
    },

    setWorkingCheck: (id) => dispatch(actions.setWorkingCheck(id)),

    unsetWorkingCheck: (id) => dispatch(actions.unsetWorkingCheck(id)),

    updateWorkingCheck: (id, attrName, attrValue) => dispatch(actions.updateWorkingCheck(id, attrName, attrValue)),

    saveWorkingCheck: (data) => {
        if (data.id === 'tmpID') {
            API.createCheck(POSTer, data, (err, res) => {
                if (res.err) return dispatch(popinCreate('alert', res.err));

                dispatch(actions.destroyCheck('tmpID'));

                dispatch(actions.saveWorkingCheck(res.created));
            });
        } else {
            dispatch(actions.saveWorkingCheck(data));

            API.updateCheck(PATCHer, data, (err) => {
                if (err) return dispatch(popinCreate('alert', err.message));
            });
        }
    },

    openCheckStats: (check) => {
        if (check.id !== 'tmpID') {
            if (check.history.length < 1) {
                return dispatch(popinCreate('alert', 'No data yet!'));
            }
            return dispatch(CheckStatsActions.openStats(check.id));
        }
    },

    closeCheckStats: () => dispatch(CheckStatsActions.closeStats()),
});

const ChecksTableContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChecksTableComponent);

export default ChecksTableContainer;
