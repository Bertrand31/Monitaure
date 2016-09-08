import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const HomepageComponent = () => (
    <div className="front" id="page-container">
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
                        <Link
                            to="/login"
                            className="button button-empty button-round"
                        >Log in</Link>
                    </li>
                </ul>
            </nav>
        </header>
        <main className="o-main">
            <section className="desk-section">
                <div className="wrapper">
                    <h2>Monitoring for the masses</h2>
                    <h3>A simple and hassle-free server monitoring dashboard</h3>
                    <Link
                        className="button button-round button-huge"
                        to="/signup"
                    >Sign up</Link>
                </div>
            </section>
        </main>
    </div>
);

export default HomepageComponent;
