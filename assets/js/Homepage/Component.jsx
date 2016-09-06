import React, { PropTypes } from 'react';

import LoginForm from '../User/Login/Component';
import SignupForm from '../User/Signup/Container';

const HomepageComponent = ({ popover, open }) => (
    <div className="front" id="page-container">
        {popover}
        <div className={`blur-container ${popover !== null ? 's-is-blurred' : ''}`}>
            <header className="header">
                <h1 className="logo">
                    <img src="/images/logo.svg" width="264" height="39" alt="Monitaure - Monitoring for the masses" />
                </h1>
                <nav className="top-nav">
                    <ul>
                        <li>
                            <a href="#_">About us</a>
                        </li>
                        <li>
                            <a href="#_">Contact</a>
                        </li>
                        <li>
                            <a
                                href="/login"
                                className="button button-empty button-round"
                                onClick={(e) => { e.preventDefault(); open('login'); }}
                            >Log in</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="main">
                <section className="hp-section desk-section">
                    <div className="wrapper">
                        <h2>Monitoring for the masses</h2>
                        <h3>A simple and hassle-free server monitoring dashboard</h3>
                        <a
                            className="button button-round button-huge"
                            href="/signup"
                            onClick={(e) => { e.preventDefault(); open('signup'); }}
                        >Sign up</a>
                    </div>
                </section>
            </main>
        </div>
    </div>
);

HomepageComponent.propTypes = {
    popover: PropTypes.element,
    open: PropTypes.func.isRequired,
};

// TODO: clean this up
const HomepageController = ({ openPopover = {}, open, close }) => {
    let popover = null;
    if (openPopover.isOpen !== null) {
        if (openPopover.isOpen === 'login') {
            popover = <LoginForm close={close} />;
        } else if (openPopover.isOpen === 'signup') {
            popover = <SignupForm close={close} />;
        }
        popover = <div onClick={close} className="c-popover-overlay">{popover}</div>;
    }

    return <HomepageComponent popover={popover} open={open} />;
};

HomepageController.propTypes = {
    openPopover: PropTypes.object.isRequired,
    open: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
};

export default HomepageController;
