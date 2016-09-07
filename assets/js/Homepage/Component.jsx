import React, { PropTypes } from 'react';

const HomepageComponent = ({ isPopoverOpen, open }) => (
    <div className={`front ${isPopoverOpen ? 's-is-blurred' : ''}`} id="page-container">
        <header className="o-header">
            <h1 className="o-header__logo">
                <img src="/images/logo.svg" width="264" height="39" alt="Monitaure - Monitoring for the masses" />
            </h1>
            <nav className="o-header__menu">
                <ul>
                    <li className="c-header__menu-item">
                        <a href="#_">About us</a>
                    </li>
                    <li className="c-header__menu-item">
                        <a href="#_">Contact</a>
                    </li>
                    <li className="c-header__menu-item">
                        <a
                            href="/login"
                            className="button button-empty button-round"
                            onClick={(e) => { e.preventDefault(); open('login'); }}
                        >Log in</a>
                    </li>
                </ul>
            </nav>
        </header>
        <main className="o-main">
            <section className="desk-section">
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
);

HomepageComponent.propTypes = {
    isPopoverOpen: PropTypes.bool.isRequired,
    open: PropTypes.func.isRequired,
};

const HomepageController = ({ openPopover, open }) => {
    return <HomepageComponent isPopoverOpen={!(openPopover.isOpen === null)} open={open} />;
};

HomepageController.propTypes = {
    openPopover: PropTypes.object.isRequired,
    open: PropTypes.func.isRequired,
};

export default HomepageController;
