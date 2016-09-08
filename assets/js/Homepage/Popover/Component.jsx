import React, { PropTypes } from 'react';

import LoginForm from './LoginForm/Container';
import SignupForm from './SignupForm/Container';

const PopoverComponent = ({ openPopover, close }) => {
    let popover = null;
    if (openPopover.isOpen !== null) {
        if (openPopover.isOpen === 'login') {
            popover = <LoginForm close={close} />;
        } else if (openPopover.isOpen === 'signup') {
            popover = <SignupForm close={close} />;
        }
        popover = <div onClick={close} className="c-popover-overlay">{popover}</div>;
    }
    return popover;
};

PopoverComponent.propTypes = {
    openPopover: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
};

export default PopoverComponent;
