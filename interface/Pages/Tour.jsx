import React, { Component } from 'react';
import { Link as ScrollLink } from 'react-scroll';

import Page from './Container';

class TourComponent extends Component {
    componentWillMount() {
        this.setState({ checkCreationStep: 1 });
    }
    render() {
        const tourContent = (
            <div className="c-page-content">
                <section className="c-pane c-pane--big c-pane--tour">
                    <div className="c-pane--big__wrapper">
                        <div className="c-content">
                            <h2 className="c-chapter__title c-h2--big">How to use Monitaure</h2>
                            <h3 className="c-h3--small">This page will teach you the basics of the app</h3>
                        </div>
                    </div>
                </section>
                <nav className="c-pane c-pane--chapters">
                    <ul className="c-chapters">
                        <li className="c-chapters__el">
                            <ScrollLink className="c-chapters__link c-chapters__link--start" to="gettingstarted" href="#gettingstarted" smooth={true}>
                                Getting started
                            </ScrollLink>
                        </li>
                        <li className="c-chapters__el">
                            <ScrollLink className="c-chapters__link c-chapters__link--first" to="firstcheck" href="#firstcheck" smooth={true}>
                                Your first check
                            </ScrollLink>
                        </li>
                        <li className="c-chapters__el">
                            <ScrollLink className="c-chapters__link c-chapters__link--install" to="install" href="#install" smooth={true}>
                                Install the app
                            </ScrollLink>
                        </li>
                        <li className="c-chapters__el">
                            <ScrollLink className="c-chapters__link c-chapters__link--notifs" to="notifications" href="#notifications" smooth={true}>
                                Receive notifications
                            </ScrollLink>
                        </li>
                    </ul>
                </nav>
                <section className="c-pane c-chapter c-chapter--start" id="gettingstarted">
                    <div className="c-chapter__wrapper">
                        <div className="l-pane-grid">
                            <div className="l-pane-grid__item">
                                <h2 className="c-chapter__title c-chapter__title--start">Getting started</h2>
                                <p className="c-chapter__body">
                                    First, you have to signup. You will receive a welcome email, containing a link to activate your account.
                                </p>
                                <p className="c-chapter__body">
                                    Once this is done, you can log into the app and meet Monitaure's dashboard. Of course, it is empty (for now).
                                </p>
                            </div>
                            <div className="l-pane-grid__item">
                                <img src="/images/start-icon.svg" alt="Getting started with Monitaure" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="c-pane c-chapter c-chapter--first" id="firstcheck">
                    <div className="c-chapter__wrapper">
                        <h2 className="c-chapter__title c-chapter__title--first">Creating your first check</h2>
                        <p className="c-chapter__body">
                            To create your first check, click the "Add a check" button. In the table line that just appeared, fill the fields like so:
                        </p>
                        <figure className="c-dashboard-tuto">
                            <img src="/images/dashboard-sample-shadow.png" alt="Monitoring dashboard" />
                            <figcaption className="c-dashboard-tuto__captions">
                                <ol className="check-creation-numbers">
                                    <li
                                        className={`creation-number creation-number-1 ${this.state.checkCreationStep === 1 ? 's-is-active' : ''}`}
                                        onClick={() => this.setState({ checkCreationStep: 1})}
                                    >
                                        <a href="#1">1</a>
                                    </li>
                                    <li
                                        className={`creation-number creation-number-2 ${this.state.checkCreationStep === 2 ? 's-is-active' : ''}`}
                                        onClick={() => this.setState({ checkCreationStep: 2})}
                                    >
                                        <a href="#2">2</a>
                                    </li>
                                    <li
                                        className={`creation-number creation-number-3 ${this.state.checkCreationStep === 3 ? 's-is-active' : ''}`}
                                        onClick={() => this.setState({ checkCreationStep: 3})}
                                    >
                                        <a href="#3">3</a>
                                    </li>
                                    <li
                                        className={`creation-number creation-number-4 ${this.state.checkCreationStep === 4 ? 's-is-active' : ''}`}
                                        onClick={() => this.setState({ checkCreationStep: 4})}
                                    >
                                        <a href="#4">4</a>
                                    </li>
                                </ol>
                            </figcaption>
                        </figure>
                        <ol className="check-creation-steps">
                            <li
                                className={`creation-step ${this.state.checkCreationStep === 1 ? 's-is-active' : ''}`}
                                data-step="1"
                            >
                                <span className="creation-step__title">Name</span>The name of your check. It is useful only to you, so you can quickly identify which check does what.
                            </li>
                            <li
                                className={`creation-step ${this.state.checkCreationStep === 2 ? 's-is-active' : ''}`}
                                data-step="2"
                            >
                                <span className="creation-step__title">Domain Name or IP</span> The domain name or IP address of the server you want to monitor. Do NOT enter an URL, or you won't be able to save the check.
                            </li>
                            <li
                                className={`creation-step ${this.state.checkCreationStep === 3 ? 's-is-active' : ''}`}
                                data-step="3"
                            >
                                <span className="creation-step__title">Port</span> The port of the service you want to monitor.
                            </li>
                            <li
                                className={`creation-step ${this.state.checkCreationStep === 4 ? 's-is-active' : ''}`}
                                data-step="4"
                            >
                                <span className="creation-step__title">Alerts</span>Use this slider to activate the notifications. More on this later.
                            </li>
                        </ol>
                        <p className="c-chapter__body">
                            When you're done, click the "OK" button to save the check.<br />
                            You now have to wait for this check to start getting populated with data.
                        </p>
                        <p className="c-chapter__body">
                            Once your check is populated, the "waiting" pictogram is replaced with a "✔️" pictogram. You can notice that the global statistics are now populated, and you can click on the newly created check's line to open its detailed statistics.<br /><br />
                            You can now add more checks to monitor all your servers.
                        </p>
                    </div>
                </section>
                <section className="c-pane c-chapter c-chapter--app" id="install">
                    <div className="c-chapter__wrapper">
                        <h2 className="c-chapter__title c-chapter__title--app">Installing the app on your phone</h2>
                        <p className="c-chapter__body">
                            Since Monitaure is a progressive web app, it is able to work offline or in poor network conditions.
                        </p>
                        <p className="c-chapter__body">
                            You can also install it on your phone. After two visits, your browser will prompt you like so:<br />
                            <img src="/images/add-to-homescreen.svg" alt="Service worker prompt" />
                            After accepting to install the application, you should notice a new icon on your homescreen.
                        </p>
                        <p className="c-chapter__body">
                            You can now start the app, even when you're offline or on a bad network:<br /><br /><br /><br />
                        </p>
                        <div className="l-pane-grid">
                            <div className="l-pane-grid__item">
                                <img src="/images/app-offline-1.png" alt="Offline application" />
                            </div>
                            <div className="l-pane-grid__item">
                                <img src="/images/app-offline-2.png" alt="Offline application" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="c-pane c-chapter c-chapter--notifs" id="notifications">
                    <div className="c-chapter__wrapper">
                        <h2 className="c-chapter__title c-chapter__title--notifs">Receiving notifications</h2>
                        <p className="c-chapter__body">
                            If, in Monitaure's dashboard, you chose to receive notifications for when one of your services goes down, you will receive push notifications and emails from Monitaure.<br /><br />
                            For emails, no configuration is needed.<br /><br  />
                            For push notifications, if you installed the app on you phone, you automatically opted in:<br /><br />
                            <img src="/images/mobile-push-1.svg" alt="Mobile push notification" />
                            <img src="/images/mobile-push-2.svg" alt="Mobile push notification" />
                            For you desktop browser, if it is Chrome or Firefox, you will need to allow Monitaure to send you notifications. Then, you will be able to receive notifications like so:<br /><br />
                            <img src="/images/chrome-push.svg" alt="Desktop push notification" />
                        </p>
                    </div>
                </section>
            </div>
        );

        return <Page children={tourContent} />;
    }
}

export default TourComponent;
