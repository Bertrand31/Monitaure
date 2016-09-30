import { connect } from 'react-redux';

import * as MenuActions from '../Sidebar/Actions';

import DashboardComponent from './Component';

const mapDispatchToProps = dispatch => ({
    closeMenu() {
        return dispatch(MenuActions.close());
    },
});

const DashboardContainer = connect(null, mapDispatchToProps)(DashboardComponent);

export default DashboardContainer;
