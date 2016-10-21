import React, { PropTypes } from 'react';
import Swipeable from 'react-swipeable';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Sidebar from './Sidebar/Container';

import '../../styles/Dashboard/index.scss';

const DashboardComponent = ({ children, openMenu, closeMenu }) => (
    <Swipeable onSwipingRight={openMenu} onSwipingLeft={closeMenu}>
        <Sidebar />
        <ReactCSSTransitionGroup
            component="div"
            className="c-child-route"
            transitionName="c-child-change"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
        >
            {React.cloneElement(children, {
                key: location.pathname,
            })}
        </ReactCSSTransitionGroup>
    </Swipeable>
);

DashboardComponent.propTypes = {
    children: PropTypes.element.isRequired,
    openMenu: PropTypes.func.isRequired,
    closeMenu: PropTypes.func.isRequired,
};

export default DashboardComponent;
