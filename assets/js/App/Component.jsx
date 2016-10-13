import React, { Component, PropTypes } from 'react';

import Popins from '../Popins/Container';

class AppComponent extends Component {
    static propTypes = {
        getCSRFToken: PropTypes.func.isRequired,
        watchConnectivityState: PropTypes.func.isRequired,
        activateSW: PropTypes.func.isRequired,
        subscribeToPush: PropTypes.func.isRequired,
        children: PropTypes.element,
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
                {this.props.children}
            </div>
        );
    }
}

export default AppComponent;
