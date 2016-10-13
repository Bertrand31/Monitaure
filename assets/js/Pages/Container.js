import { connect } from 'react-redux';

import * as MenuActions from '../Menu/Actions';
import { open as openPopover } from './Popover/Actions';

import HomepageComponent from './Component';

const mapStateToProps = state => ({ menuIsOpen: state.menuIsOpen });

const mapDispatchToProps = dispatch => ({
    openPopover: (popoverType) => dispatch(openPopover(popoverType)),
    toggleMenu: () => dispatch(MenuActions.toggle()),
    openMenu: () => dispatch(MenuActions.open()),
    closeMenu: () => dispatch(MenuActions.close()),
});

const HomepageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomepageComponent);

export default HomepageContainer;

