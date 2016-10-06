import React, { PropTypes } from 'react';
import Swipeable from 'react-swipeable';
import { Link } from 'react-router';

import '../../styles/Homepage/index.scss';

const HomepageComponent = ({ menuIsOpen, toggleMenu, openMenu, closeMenu }) => (
    <Swipeable onSwipingRight={openMenu} onSwipingLeft={closeMenu} className="o-front o-page">
        <nav className="c-topnav">
			<button
				onClick={toggleMenu}
				className={`hamburger hamburger--arrow ${menuIsOpen ? 'is-active' : ''}`}
				type="button"
			>
				<span className="hamburger-box">
					<span className="hamburger-inner" />
				</span>
			</button>
			<Link to="/" className="o-header__logo">
				<h1 className="c-h1">
					<img src="/images/logo-white.svg" width="187" alt="Monitaure - Monitoring for the masses" />
				</h1>
			</Link>
            <ul className={`c-topnav__menu ${menuIsOpen ? 's-menu-is-open' : ''}`}>
                <li className="c-topnav__el"><Link to="/" className="c-topnav__link">Home</Link></li>
                <li className="c-topnav__el"><Link to="/tour" className="c-topnav__link">Tour</Link></li>
                <li className="c-topnav__el"><Link to="/about" className="c-topnav__link">About us</Link></li>
                <li className="c-topnav__el"><Link to="/contact" className="c-topnav__link">Contact</Link></li>
                <li className="c-topnav__el--dummy" aria-hidden="true" />
                <li className="c-topnav__el c-topnav__el--btn"><Link to="/login" className="c-button--empty">Log in</Link></li>
                <li className="c-topnav__el c-topnav__el--btn"><Link to="/signup" className="c-button--round">Sign up</Link></li>
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
                                Use Monitaure directly from your computer, tablet and/or mobile phone.
                            </p>
                        </div>
                    </div>
                    <div className="l-pane-grid__item">
                        <div className="c-imgtxt c-imgtxt--tech">
                            <h3 className="c-imgtxt__title">Top-tier tech</h3>
                            <p className="c-imgtxt__body">
                                Monitaure is backed by the industry's most robust technologies, ensuring you the best reliability in town.
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
                    <div className="c-pane--small__number">1</div>
                    <div className="c-pane--small__text">
                        <h3 className="c-pane--small__title">Real-time data</h3>
                        <p className="c-pane__body">
                            Real-time data allowing you to react quickly in case on of your servers goes belly-up.
                        </p>
                    </div>
                </div>
                <div className="l-pane-grid__item">
                    <img src="/images/macbook.png" className="c-pane--small__image" alt="Real-time updates" />
                </div>
            </div>
        </section>
        <section className="c-pane c-pane--small c-pane--green c-pane--bubbles c-pane--notifications">
            <div className="c-pane--bubbles__bubbles-container" aria-hidden="true">
                <div className="c-pane--bubbles__bubble" />
                <div className="c-pane--bubbles__bubble" />
                <div className="c-pane--bubbles__bubble" />
            </div>
            <div className="l-pane-grid">
                <div className="l-pane-grid__item">
                    <div className="c-pane--small__number">2</div>
                    <div className="c-pane--small__text">
						<h3 className="c-pane--small__title">Notifications</h3>
						<p className="c-pane__body">
							Whenever something happens, you will immediatly be notified by email and on your phone.
						</p>
					</div>
                </div>
                <div className="l-pane-grid__item">
                    <img src="/images/notifications.svg" className="c-pane--small__image" alt="Email and mobile notifications" />
                </div>
            </div>
        </section>
        <section className="c-pane c-pane--small c-pane--hybrid">
            <div className="l-pane-grid">
                <div className="l-pane-grid__item">
                    <span className="c-pane--small__number">3</span>
                    <div className="c-pane--small__text">
                        <h3 className="c-pane--small__title">Mobile App</h3>
						<p className="c-pane__body">
                        You can install the Monitaure app on your phone, use it offline and receive push notifications.
						</p>
					</div>
                </div>
                <div className="l-pane-grid__item">
                    <img src="/images/hybrid.svg" className="c-pane--small__image" alt="Hybird app" />
                </div>
            </div>
        </section>

        <section className="c-separator" role="presentation" />

        <section className="c-pane c-pane--big c-pane--about">
            <div className="c-pane--about__wrapper">
                <h2 className="c-h2">About us</h2>
                <p className="c-pane__body">We're two french tech-lovers, currently based in France.<br />Feel free to get in touch!</p>
                <div className="l-pane-grid">
                    <div className="l-pane-grid__item">
                        <div className="c-pane--about__person c-person c-person--bertrand">
                            <div className="c-person__occupation">Front & Back code</div>
                            <div className="c-person__separator" />
                            <div className="c-person__name">Bertrand Junqua</div>
                            <ul className="c-person__social">
                                <li className="c-person__social-el">
                                    <a className="c-icon-web" href="https://awebsiteabout.me">
                                        <img alt="Bertrand's website" src="/images/social-world.svg" />
                                    </a>
                                </li>
                                <li className="c-person__social-el">
                                    <a className="c-icon-github" href="https://github.com/Bertrand31/">
                                        <img alt="Bertrand's Github profile" src="/images/social-github.svg" />
                                    </a>
                                </li>
                                <li className="c-person__social-el">
                                    <a className="c-icon-twitter" href="https://twitter.com/Bertrand31/">
                                        <img alt="Bertrand's Twitter profile" src="/images/social-twitter.svg" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="l-pane-grid__item">
                        <div className="c-pane--about__person c-person c-person--guillaume">
                            <div className="c-person__occupation">UX & UI Design</div>
                            <div className="c-person__separator" />
                            <div className="c-person__name">Guillaume Parra</div>
                            <ul className="c-person__social">
                                <li className="c-person__social-el">
                                    <a className="c-icon-web" href="https://whyyouwillhire.me/">
                                        <img alt="Guillaume's website" src="/images/social-world.svg" />
                                    </a>
                                </li>
                                <li className="c-person__social-el">
                                    <a className="c-icon-drrible" href="https://dribbble.com/guillaumeparra">
                                        <img alt="Guillaume's Dribble profile" src="/images/social-dribble.svg" />
                                    </a>
                                </li>
                                <li className="c-person__social-el">
                                    <a className="c-icon-twitter" href="https://twitter.com/Guillaume_Parra/">
                                        <img alt="Guillaume's Twitter profile" src="/images/social-twitter.svg" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="c-pane c-pane--small c-pane--green c-pane--bubbles c-pane--try">
            <div className="c-pane--bubbles__bubbles-container" aria-hidden="true">
                <div className="c-pane--bubbles__bubble" />
                <div className="c-pane--bubbles__bubble" />
                <div className="c-pane--bubbles__bubble" />
            </div>
            <div className="l-pane-grid">
                <h2 className="c-h2">Give it a try!</h2>
                <p className="c-pane__body">You're just one step away from Monitaure's dashboard</p>
                <Link to="/signup" className="c-button--round">Sign up</Link>
            </div>
        </section>

        <footer className="c-footer">
            <div className="l-pane-grid">
                <div className="l-pane-grid__item c-footer__logo">
                    <img src="/images/logo-gray.svg" alt="Logo Monitaure" />
                    <p>Monitaure.io ©2016</p>
                </div>
                <nav className="l-pane-grid__item c-footer__nav">
                    <ul className="c-footernav">
                        <li className="c-footernav__el"><Link to="/tour" className="">Tour</Link></li>
                        <li className="c-footernav__el"><Link to="/login" className="">Log in</Link></li>
                        <li className="c-footernav__el"><Link to="/signup" className="">Sign up</Link></li>
                        <li className="c-footernav__el"><Link to="/contact" className="">Contact</Link></li>
                    </ul>
                </nav>
                <div className="l-pane-grid__item c-footer__text">
                    <p>
                        Monitaure is a free server monitoring online application aiming to help SysAdmins.
                        If you encounter any problem or want to get in touch with us, please do so through the links in the "Abous us" section.
                    </p>
                </div>
            </div>
        </footer>
    </Swipeable>
);

HomepageComponent.propTypes = {
    menuIsOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    openMenu: PropTypes.func.isRequired,
    closeMenu: PropTypes.func.isRequired,
};

export default HomepageComponent;
