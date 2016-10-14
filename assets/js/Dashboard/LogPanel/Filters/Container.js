import { connect } from 'react-redux';

import { GETer } from '../../../serverIO/ajaxMethods';
import * as API from '../../../serverIO/dataHandling';
import { create as popinCreate } from '../../../Popins/Actions';

import { updateFilter, hideType, showType } from './Actions';

import FiltersComponent from './Component';

const mapStateToProps = state => ({
    log: state.log,
});

const mapDispatchToProps = dispatch => ({
    updateFilter: e => dispatch(updateFilter(e.target.name, e.target.value)),

    toggleType: e => e.target.checked ? dispatch(showType(e.target.name)) : dispatch(hideType(e.target.name)),

});

const FiltersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FiltersComponent);

export default FiltersContainer;
