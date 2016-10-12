import React, { Component, PropTypes } from 'react';

import Popover from '../Homepage/Popover/Component';
import Popins from '../Popins/Container';
import Homepage from '../Homepage/Container';
import Dashboard from '../Dashboard/Container';

class AppComponent extends Component {
    componentWillMount() {
        this.props.getCSRFToken();
        this.props.checkAuth();
        this.props.watchConnectivityState();
    }
    render() {
        if (this.props.isLoggedIn && 'serviceWorker' in navigator) {
            this.props.subscribeToPush();
            this.props.activateSW();
        }

        return (
            <div className={`react-container ${this.props.isOffline ? 'is-offline' : ''}`}>
                <Popins />
                {/*<Popover form={this.props.children} />*/}
                {this.props.children}
            </div>
        );
    }
}

AppComponent.propTypes = {
    getCSRFToken: PropTypes.func.isRequired,
    checkAuth: PropTypes.func.isRequired,
    watchConnectivityState: PropTypes.func.isRequired,
    activateSW: PropTypes.func.isRequired,
    subscribeToPush: PropTypes.func.isRequired,
    children: PropTypes.element,
    isLoggedIn: PropTypes.bool.isRequired,
    isOffline: PropTypes.bool.isRequired,
};

export default AppComponent;
