import React from 'react';
import { Link } from 'react-router';

import '../../styles/Homepage/index.scss';

const HomepageComponent = () => (

    <div className="o-front o-page">

        <nav className="c-topnav">
            <ul className="c-topnav__menu">
                <li className="c-topnav__el"><Link to="/tour" className="c-topnav__link">Tour</Link></li>
                <li className="c-topnav__el"><Link to="/about" className="c-topnav__link">About us</Link></li>
                <li className="c-topnav__el"><Link to="/contact" className="c-topnav__link">Contact</Link></li>
                <li className="c-topnav__el c-topnav__el--central">
                    <Link to="/" className="button-empty button-round">
                        <h1 className="o-header__logo">
                            <img src="/images/logo-white.svg" width="187" alt="Monitaure - Monitoring for the masses" />
                        </h1>
                    </Link>
                </li>
                <li className="c-topnav__el"><Link to="/login" className="c-button--empty">Log in</Link></li>
                <li className="c-topnav__el"><Link to="/signup" className="c-button--round">Sign up</Link></li>
            </ul>
        </nav>

        <section className="c-pane c-pane--big c-pane--first c-pane--green">
            <div className="c-pane--first__wrapper">
                <div className="c-stripeback" aria-hidden="true">
                    <div className="c-bar c-bar-1"><div className="c-bar__line" /> <div className="c-bar__dot" /></div>
                    <div className="c-bar c-bar-2"><div className="c-bar__line" /> <div className="c-bar__dot" /></div>
                    <div className="c-bar c-bar-3"><div className="c-bar__line" /> <div className="c-bar__dot" /></div>
                    <div className="c-bar c-bar-4"><div className="c-bar__line" /> <div className="c-bar__dot" /></div>
                    <div className="c-bar c-bar-5"><div className="c-bar__line" /> <div className="c-bar__dot" /></div>
                    <div className="c-bar c-bar-6"><div className="c-bar__line" /> <div className="c-bar__dot" /></div>
                    <div className="c-bar c-bar-7"><div className="c-bar__line" /> <div className="c-bar__dot" /></div>
                    <div className="c-bar c-bar-8"><div className="c-bar__line" /> <div className="c-bar__dot" /></div>
                    <div className="c-bar c-bar-9"><div className="c-bar__line" /> <div className="c-bar__dot" /></div>
                    <div className="c-bar c-bar-10"><div className="c-bar__line" /> <div className="c-bar__dot" /></div>
                    <div className="c-bar c-bar-11"><div className="c-bar__line" /> <div className="c-bar__dot" /></div>
                </div>
                <div className="c-content">
                    <div className="l-pane-grid">
                        <div className="l-pane-grid__item">
                            <h2 className="c-h2--big">Monitoring<br />for the masses</h2>
                            <h3 className="c-h3--small">A simple and hassle-free server<br />monitoring dashboard</h3>
                            <Link to="/tour" className="c-button--goto">How it works</Link>
                        </div>
                        <div className="l-pane-grid__item l-pane-grid__item--image">
                            <div className="c-image-circle">
                                <img src="/images/iphone.png" alt="Monitaure app on an iPhone" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="c-pane c-pane--big c-pane--second">
            <div className="c-flex-wrapper">
                <h2 className="c-h2">Why it's awesome</h2>
                <div className="l-pane-grid">
                    <div className="l-pane-grid__item">
                        <div className="c-imgtxt c-imgtxt--browser">
                            <h3 className="c-imgtxt__title">No download</h3>
                            <p className="c-imgtxt__body">
                                Use Monitaure directly from your computer, tablet and/or mobile phone
                            </p>
                        </div>
                    </div>
                    <div className="l-pane-grid__item">
                        <div className="c-imgtxt c-imgtxt--tech">
                            <h3 className="c-imgtxt__title">Top-tier tech</h3>
                            <p className="c-imgtxt__body">
                                Monitaure is backed by the industry's fastest and most robust technologies, ensuring you the best reliability.
                            </p>
                        </div>
                    </div>
                    <div className="l-pane-grid__item">
                        <div className="c-imgtxt c-imgtxt--free">
                            <h3 className="c-imgtxt__title">Completely free</h3>
                            <p className="c-imgtxt__body">
                                "It's free,<br />and always will be".<br />Oh, and ad-free too.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="c-pane c-pane--small c-pane--realtime">
            <div className="l-pane-grid">
                <div className="l-pane-grid__item">
                    <span className="c-pane--small__number">1</span>
                    <h3 className="c-pane--small__title">Real-time data</h3>
                    <p className="c-pane__body">
                        Real-time data allowing you to react quickly in case on of your servers goes belly-up.
                    </p>
                </div>
                <div className="l-pane-grid__item">
                    <img src="/images/macbook.png" className="c-pane--small__image" alt="Real-time updates" />
                </div>
            </div>
        </section>
        {/*<section className="c-pane c-pane--small c-pane--green c-pane--notifications">
            <div className="l-pane-grid">
                <div className="l-pane-grid__item">
                    <span className="c-pane--small__number">2</span>
                    <h3 className="c-pane--small__title">Notifications</h3>
                    <p className="c-pane__body">
                        Whenever something happens, you will immediatly be notified by email and on your phone.
                    </p>
                </div>
                <div className="l-pane-grid__item">
                    <img src="/images/notifications.png" className="c-pane--small__image" alt="Email and mobile notifications" />
                </div>
            </div>
        </section>
        <section className="c-pane c-pane--small c-pane--hybrid">
            <div className="l-pane-grid">
                <div className="l-pane-grid__item">
                    <span className="c-pane--small__number">3</span>
                    <h3 className="c-pane--small__title">Hybrid Mobile App</h3>
                    <p className="c-pane__body">
                        You can install the mobile version of Monitaure as if it were a native app, an then receive push notifications.
                    </p>
                </div>
                <div className="l-pane-grid__item">
                    <img src="/images/notifications.png" className="c-pane--small__image" alt="Email and mobile notifications" />
                </div>
            </div>
        </section>

        <section className="c-pane c-pane--big c-pane--about">
            <h2 className="c-h2--big">About us</h2>
            <p className="c-pane__body">We're two french tech-lovers, currently based in France.<br />Feel free to get in touch!</p>
            <div id="TODO" />
        </section>

        <section className="c-pane c-pane--small c-pane--green c-pane--try">
            <h2 className="c-h2">Give it a try!</h2>
            <p className="c-pane__body">You're just one step away from Monitaure's dashboard</p>
            <Link to="/signup" className="c-button c-button-round">Sign up</Link>
        </section>

        <footer className="c-footer">
            <div className="l-pane-grid">
                <div className="l-pane-grid__item">
                    <div className="l-pane-grid">
                        <div className="l-pane-grid__item">
                            <img src="/images/logo-white.svg" alt="Logo Monitaure" />
                            <p>Monitaure.io ©2016</p>
                        </div>
                    </div>
                    <div className="l-pane-grid">
                        <nav>
                            <ul>
                                <li><Link to="/tour" className="c-topnav__el">Tour</Link></li>
                                <li><Link to="/about" className="c-topnav__el">About us</Link></li>
                                <li><Link to="/login" className="c-button c-button--empty c-button--round">Log in</Link></li>
                                <li><Link to="/signup" className="c-button c-button--round">Sign up</Link></li>
                                <li><Link to="/contact" className="c-topnav__el">Contact</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="l-pane-grid__item">
                    <p>
                        Monitaure is a free server monitoring online application aiming to help SysAdmins.
                        If you encounter any problem or want to get in touch with us,
                        &nbsp;<a href="https://github.com/Bertrand31/Monitaure/issues" target="_blank" rel="noopener noreferrer">please do</a>.
                    </p>
                </div>
            </div>
        </footer>*/}

    </div>

);

export default HomepageComponent;
