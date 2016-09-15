import React from 'react';
import { Link } from 'react-router';

const HomepageComponent = () => (
    <div className="front" id="page-container">
        <h1 className="o-header__logo">
            <img
                src="/images/logo.svg"
                width="264"
                height="39"
                alt="Monitaure - Monitoring for the masses"
            />
        </h1>
        <Link
            to="/login"
            className="button button-empty button-round"
        >Log in</Link>
        <Link
            className="button button-round button-huge"
            to="/signup"
        >Sign up</Link>
    </div>
);

export default HomepageComponent;
