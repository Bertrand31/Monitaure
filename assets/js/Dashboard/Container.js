import { connect } from 'react-redux';

import { open as openMenu, close as closeMenu } from '../Menu/Actions';

import DashboardComponent from './Component';

const mapDispatchToProps = dispatch => ({
    openMenu: () => dispatch(openMenu()),
    closeMenu: () => dispatch(closeMenu()),
});

const DashboardContainer = connect(null, mapDispatchToProps)(DashboardComponent);

export default DashboardContainer;
