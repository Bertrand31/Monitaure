import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import '../../../styles/popover.scss';

const PopoverComponent = ({ form }) => {
    if (form === null) {
        return null;
    }
    return <div onClick={() => browserHistory.push('/')} className="c-popover-overlay">{form}</div>;
};

PopoverComponent.propTypes = {
    form: PropTypes.element,
};

export default PopoverComponent;
