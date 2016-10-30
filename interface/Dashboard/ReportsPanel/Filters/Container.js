import { connect } from 'react-redux';

import { updateFilter, hideType, showType } from './Actions';

import ReportsFiltersComponent from './Component';

const mapStateToProps = state => ({
    reports: state.reports,
});

const mapDispatchToProps = dispatch => ({
    updateFilter: e => dispatch(updateFilter(e.target.name, e.target.value || null)),
});

const ReportsFiltersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportsFiltersComponent);

export default ReportsFiltersContainer;
