import React, { Component, PropTypes } from 'react';

import Popover from '../Popover/Container';

class AccountConfirmationComponent extends Component {
    static propTypes = {
        submitToken: PropTypes.func.isRequired,
        openPopover: PropTypes.func.isRequired,
    }
    submitToken() {
        this.setState({ status: 'pending' });
        this.props.submitToken(this.props.params.confirmationToken, (result) => {
            this.setState({ status: result });
        });
    }
    componentWillMount() {
        this.submitToken();
    }

    render() {
        let content;

        if (this.state.status === 'confirmed') {
            content = (
                <div className="c-box">
                    <h2 className="c-box__title">Your account has been activated!</h2>
                    <a className="c-button" href="/" onClick={(e) => { e.preventDefault(); this.props.openPopover('login'); }}>Log in</a>
                </div>
            );
        } else if (this.state.status === 'notconfirmed') {
            content = (
                <div className="c-box">
                    <h2 className="c-box__title">Activation failed. You might have followed an obsolete link. Try signing up again.</h2>
                    <a className="c-button" href="/" onClick={(e) => { e.preventDefault(); this.props.openPopover('signup'); }}>Sign up</a>
                </div>
            );
        } else if (this.state.status === 'error') {
            content = (
                <div className="c-box">
                    <h2 className="c-box__title">Activation failed due to temporary error.</h2>
                    <a className="c-button" href="/" onClick={(e) => { e.preventDefault(); this.submitToken(); }}>Try again</a>
                </div>
            );
        } else {
            content = (
                <div className="c-box"><img src="/images/loader.svg" alt="Loading..." /></div>
            );
        }
        return (
            <div>
                <Popover />
                <div className="main-container o-blockpage">
                    <main className="o-main">
                        <h1 className="logo">
                            <img src="/images/logo.svg" width="264" height="39" alt="Monitaure - Monitoring for the masses" />
                        </h1>
                        {content}
                    </main>
                </div>
            </div>
        );
    }
}


export default AccountConfirmationComponent;
