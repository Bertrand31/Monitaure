import React from 'react';
import { Link } from 'react-router';

import Page from './Container';

const TourComponent = () => {
    const tourContent = (
        <div className="c-page-content">
            <section className="c-pane c-pane--big c-pane--tour">
                <div className="c-pane--big__wrapper">
                    <div className="c-content">
                        <h2 className="c-chapter__title" className="c-h2--big">How to use Monitaure</h2>
                        <h3 className="c-h3--small">This page will teach you the basics of the app</h3>
                    </div>
                </div>
            </section>
            <nav className="c-pane c-pane--chapters">
                <ul className="c-chapters">
                    <li className="c-chapters__el">
                        <a className="c-chapters__link c-chapters__link--start" href="#gettingstarted">
                            Getting started
                        </a>
                    </li>
                    <li className="c-chapters__el">
                        <a className="c-chapters__link c-chapters__link--first" href="#firstcheck">
                            Your first check
                        </a>
                    </li>
                    <li className="c-chapters__el">
                        <a className="c-chapters__link c-chapters__link--install" href="#install">
                            Install the app
                        </a>
                    </li>
                    <li className="c-chapters__el">
                        <a className="c-chapters__link c-chapters__link--notifs" href="#notifications">
                            Receive notifications
                        </a>
                    </li>
                </ul>
            </nav>
            <section className="c-pane c-chapter c-chapter--start">
                <div className="c-chapter__wrapper">
                    <h2 className="c-chapter__title">Getting started</h2>
                    <p className="c-chapter__body">
                        First, you have to signup here. You will receive a welcome email, containing a link to activate your account.
                        Once this is done, you can log into the app and meet Monitaure alpha version dashboard. Of course, it is empty (for now).
                    </p>
                </div>
            </section>
            <section className="c-pane c-chapter c-chapter--first">
                <div className="c-chapter__wrapper">
                    <h2 className="c-chapter__title">Creating your first check</h2>
                    <p className="c-chapter__body">
                        To create your first check, click the "Add a check" button. In the table line that just appeared, fill the fields like so:
                        <img src="/images/dashboard-sample-shadow.png" alt="Monitoring dashboard" />
                    </p>
                    <ul>
                        <li>Name: The name of your check. It isuseful only to you, so you can quickly identify which check does what ;</li>
                        <li>Domain Name or IP: The domain name or IP address of the server you want to monitor. Do NOT enter an URL, or you won't be able to save the check ;</li>
                        <li>Port: The port of the service you want to monitor ;</li>
                        <li>Alerts: Use this slider to activate the notifications. More on this later.</li>
                    </ul>
                    <p className="c-chapter__body">
                        When you're done, click the "OK" button to save the check.<br />
                        You now have to wait for this check to start getting populated with data.<br /><br />
                        Once your check is populated, the "waiting" pictogram is replaced with a "✔️" pictogram. You can notice that the global statistics are now populated, and you can click on the newly created check's line to open its detailed statistics.<br /><br />
                        You can now add more checks to monitor all your servers.
                    </p>
                </div>
            </section>
            <section className="c-pane c-chapter c-chapter--install">
                <div className="c-chapter__wrapper">
                    <h2 className="c-chapter__title">Installing the app on your phone</h2>
                    <p className="c-chapter__body">
                        Since Monitaure is a progressive web app, it is able to work offline or in poor network conditions.<br /><br />
                        You can also install it on your phone. After two visits, your browser will prompt you like so:<br />
                        <img src="/images/add-to-homescreen.svg" alt="Service worker prompt" /><br />
                        After accepting to install the application, you should notice a new icon on your homescreen.<br /><br />
                        You can now start the app, even when you're offline or on a bad network:<br />
                    </p>
                </div>
            </section>
            <section className="c-pane c-chapter c-chapter--notifs">
                <div className="c-chapter__wrapper">
                    <h2 className="c-chapter__title">Receiving notifications</h2>
                    <p className="c-chapter__body">
                        If, in Monitaure's dashboard, you chose to receive notifications for when one of your services goes down, you will receive push notifications and emails from Monitaure.<br /><br />
                        For emails, no configuration is needed.<br /><br  />
                        For push notifications, if you installed the app on you phone, you automatically opted in:<br /><br />
                        <img src="/images/mobile-push-1.svg" alt="Mobile push notification" /><br />
                        <img src="/images/mobile-push-2.svg" alt="Mobile push notification" /><br />
                        For you desktop browser, if it is Chrome or Firefox, you will need to allow Monitaure to send you notifications. Then, you will be able to receive notifications like so:<br /><br />
                        <img src="/images/chrome-push.svg" alt="Desktop push notification" /><br />
                    </p>
                </div>
            </section>
        </div>
    );

    return <Page children={tourContent} />;
};

export default TourComponent;
