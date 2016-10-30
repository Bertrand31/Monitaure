import { connect } from 'react-redux';

import { GETer } from '../../../serverIO/ajaxMethods';
import * as API from '../../../serverIO/dataHandling';
import { create as popinCreate } from '../../../Popins/Actions';

import * as actions from './Actions';

import ReportsTableComponent from './Component';

const mapStateToProps = ({ reports, reportsFilters }) => ({
    reports,
    reportsFilters,
});

const mapDispatchToProps = dispatch => ({
    hydrateReports() {
        API.getReports(GETer, (err, data) => {
            if (err) return dispatch(popinCreate('alert', err.message));

            return dispatch(actions.hydrateReports(data));
        });
    },
});

const ReportsTableContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportsTableComponent);

export default ReportsTableContainer;
