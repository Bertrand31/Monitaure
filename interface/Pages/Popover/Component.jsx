import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Login from './LoginForm/Container';
import Signup from './SignupForm/Container';

import './styles/index.scss';

const PopoverComponent = ({ openPopover, closePopover }) => {
    let form;
    if (openPopover === 'login') {
        form = <Login close={closePopover} />;
    } else if (openPopover === 'signup') {
        form = <Signup close={closePopover} />;
    } else {
        form = null;
    }

    return (
            <ReactCSSTransitionGroup
                component="div"
                className={`c-popover-overlay ${form ? '' : 's-is-hidden'}`}
                transitionName="c-popover-change"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
                onClick={closePopover}
            >
                {form}
            </ReactCSSTransitionGroup>
    );
};

PopoverComponent.propTypes = {
    openPopover: PropTypes.string,
    closePopover: PropTypes.func.isRequired,
};

export default PopoverComponent;
