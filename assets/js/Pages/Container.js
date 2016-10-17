import { connect } from 'react-redux';

import { open as openMenu, close as closeMenu, toggle as toggleMenu } from '../Menu/Actions';
import { open as openPopover } from './Popover/Actions';

import HomepageComponent from './Component';

const mapStateToProps = state => ({ menuIsOpen: state.menuIsOpen });

const mapDispatchToProps = dispatch => ({
    openPopover: popoverType => dispatch(openPopover(popoverType)),
    toggleMenu: () => dispatch(toggleMenu()),
    openMenu: () => dispatch(openMenu()),
    closeMenu: () => dispatch(closeMenu()),
});

const HomepageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomepageComponent);

export default HomepageContainer;

