import { connect } from 'react-redux';

import { updateFilter, hideType, showType } from './Actions';

import FiltersComponent from './Component';

const mapStateToProps = state => ({
    log: state.log,
});

const mapDispatchToProps = dispatch => ({
    updateFilter: e => dispatch(updateFilter(e.target.name, e.target.value || null)),

    toggleType: e => e.target.checked ? dispatch(showType(e.target.name)) : dispatch(hideType(e.target.name)),
});

const FiltersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FiltersComponent);

export default FiltersContainer;
