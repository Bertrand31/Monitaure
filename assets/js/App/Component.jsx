import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Popins from '../Popins/Container';

class AppComponent extends Component {
    static propTypes = {
        getCSRFToken: PropTypes.func.isRequired,
        watchConnectivityState: PropTypes.func.isRequired,
        activateSW: PropTypes.func.isRequired,
        subscribeToPush: PropTypes.func.isRequired,
        children: PropTypes.element.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        isOffline: PropTypes.bool.isRequired,
    }

    componentWillMount() {
        this.props.getCSRFToken();
        this.props.watchConnectivityState();

        if (this.props.isLoggedIn && 'serviceWorker' in navigator) {
            this.props.subscribeToPush();
            this.props.activateSW();
        }
    }
    render() {
        return (
            <div className={`react-container ${this.props.isOffline ? 'is-offline' : ''}`}>
                <Popins />
                <ReactCSSTransitionGroup
                    component="div"
                    className="c-child-route"
                    transitionName="c-child-change"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    {React.cloneElement(this.props.children, {
                        key: location.pathname
                    })}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

export default AppComponent;
