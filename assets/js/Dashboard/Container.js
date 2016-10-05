import { connect } from 'react-redux';

import * as MenuActions from '../Menu/Actions';

import DashboardComponent from './Component';

const mapDispatchToProps = dispatch => ({
    openMenu: () => dispatch(MenuActions.open()),
    closeMenu: () => dispatch(MenuActions.close()),
});

const DashboardContainer = connect(null, mapDispatchToProps)(DashboardComponent);

export default DashboardContainer;
