import { connect } from 'react-redux';

import SidebarComponent from './Component';

import { toggle as toggleMenu } from '../../Menu/Actions';

const mapStateToProps = state => ({
    menuIsOpen: state.menuIsOpen,
});

const mapDispatchToProps = dispatch => ({
    toggleMenu: () => dispatch(toggleMenu()),
});

const SidebarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarComponent);

export default SidebarContainer;

