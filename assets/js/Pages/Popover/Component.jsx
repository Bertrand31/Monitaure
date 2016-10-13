import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import Login from './LoginForm/Container';
import Signup from './SignupForm/Container';

import '../../../styles/Popover/index.scss';

const PopoverComponent = ({ openPopover, closePopover }) => {
    let form;
    if (openPopover === 'login') {
        form = <Login close={closePopover} />;
    } else if (openPopover === 'signup') {
        form = <Signup close={closePopover} />;
    } else {
        return null;
    }

    return <div onClick={closePopover} className="c-popover-overlay">{form}</div>;
};

PopoverComponent.propTypes = {
    openPopover: PropTypes.string,
    closePopover: PropTypes.func.isRequired,
};

export default PopoverComponent;
