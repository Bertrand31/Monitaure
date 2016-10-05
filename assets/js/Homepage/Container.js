import { connect } from 'react-redux';

import * as MenuActions from '../Menu/Actions';

import HomepageComponent from './Component';


const mapStateToProps = state => ({ menuIsOpen: state.menuIsOpen });

const mapDispatchToProps = dispatch => ({
    toggleMenu: () => dispatch(MenuActions.toggle()),
});

const HomepageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomepageComponent);

export default HomepageContainer;

