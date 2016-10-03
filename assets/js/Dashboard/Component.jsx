import React, { PropTypes } from 'react';
import Swipeable from 'react-swipeable';

import Sidebar from './Sidebar/Container';
import MainPanel from './MainPanel/Component';

import '../../styles/Dashboard/index.scss';

const DashboardComponent = ({ openMenu, closeMenu }) => (
    <Swipeable
        onSwipingRight={() => openMenu()}
        onSwipingLeft={() => closeMenu()}
    >
        <Sidebar />
        <MainPanel />
    </Swipeable>
);

DashboardComponent.propTypes = {
    openMenu: PropTypes.func.isRequired,
    closeMenu: PropTypes.func.isRequired,
};

export default DashboardComponent;
