import { connect } from 'react-redux';

import { GETer } from '../../../serverIO/ajaxMethods';
import * as API from '../../../serverIO/dataHandling';
import { create as popinCreate } from '../../../Popins/Actions';

import * as actions from './Actions';

import LogTableComponent from './Component';

const mapStateToProps = ({ log, logFilters }) => ({
    log,
    logFilters,
});

const mapDispatchToProps = dispatch => ({
    hydrateLog() {
        API.getLog(GETer, (err, data) => {
            if (err) return dispatch(popinCreate('alert', err.message));

            return dispatch(actions.hydrateLog(data));
        });
    },
});

const LogTableContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LogTableComponent);

export default LogTableContainer;
