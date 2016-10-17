import React, { PropTypes } from 'react';
import Swipeable from 'react-swipeable';

import Sidebar from './Sidebar/Container';

import '../../styles/Dashboard/index.scss';

const DashboardComponent = ({ children, openMenu, closeMenu }) => (
    <Swipeable onSwipingRight={openMenu} onSwipingLeft={closeMenu}>
        <Sidebar />
        {children}
    </Swipeable>
);

DashboardComponent.propTypes = {
    children: PropTypes.element.isRequired,
    openMenu: PropTypes.func.isRequired,
    closeMenu: PropTypes.func.isRequired,
};

export default DashboardComponent;
