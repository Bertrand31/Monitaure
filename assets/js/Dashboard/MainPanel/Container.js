import { connect } from 'react-redux';

import * as MenuActions from '../Sidebar/Actions';

import DashboardComponent from './Component';

const mapStateToProps = state => ({ menuIsOpen: state.menuIsOpen });

const mapDispatchToProps = dispatch => ({
    closeMenu() {
        return dispatch(MenuActions.close());
    },
});

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardComponent);

export default DashboardContainer;
