import { connect } from 'react-redux';

import { GETer } from '../../../serverIO/ajaxMethods';
import * as API from '../../../serverIO/dataHandling';
import { create as popinCreate } from '../../../Popins/Actions';

import * as actions from './Actions';

import FiltersComponent from './Component';

const mapStateToProps = state => ({
    log: state.log,
});

const mapDispatchToProps = dispatch => ({
    updateFilter: (e) => dispatch(actions.updateFilter(e.target.name, e.target.value)),
});

const FiltersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FiltersComponent);

export default FiltersContainer;
