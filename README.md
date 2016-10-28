# [![Monitaure logo](https://monitaure.io/images/logo-black.svg)](https://monitaure.io)

[![Codacy Badge](https://api.codacy.com/project/badge/grade/f3d8e262de834aa9a6e3a5bb36aa54b2)](https://www.codacy.com/app/bertrandjun/Monitaure)
[![Dependency Status](https://david-dm.org/Bertrand31/Monitaure/status.svg)](https://david-dm.org/Bertrand31/Monitaure/)
[![Travis build status](https://travis-ci.org/Bertrand31/Monitaure.svg)](https://travis-ci.org/Bertrand31/Monitaure/)
[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badge/)
[![GPL Licence](https://badges.frapsoft.com/os/gpl/gpl.svg?v=103)](https://github.com/Bertrand31/Monitaure/blob/master/LICENSE)

Monitaure is an online service aiming to provide SysAdmins with a clean, lightweight and quick to configure monitoring dashboard.
The application does not need any client-side installation or configuration.

[![Monitaure main dashboard](https://monitaure.io/images/dashboard-sample.png)](https://monitaure.io)

## Why it's awesome

From a technical standpoint, here are some of the key aspects of Monitaure:

* Front-end:
    * React to manage user interface ;
    * Redux to manage application state ;
    * LocalStorage to persist the state between two visits ;
    * React-Router to handle front-end routing ;
    * A Service Worker to allow the app to be installed on phones and to work offline ;
    * Constant monitoring of the device's connectivity state: if the app becomes offline, some functionnalities requiring a network connection are disabled and the user is warned ;
    * Push notifications, on both mobile devices and desktop computers ;
    * JSX and some Jade for HTML ;
    * SASS for CSS ;
    * Babel to transpile ES6 & ES7 to older (ES5) Javascript ;
    * Webpack to bundle everything up.
* Back-end:
    * NodeJS application built on Sails.js framework ;
    * MongoDB database for data storage ;
    * Redis database for storing user sessions.
* Security:
    * Served over HTTPS, [with rock-solid SSL security](https://www.ssllabs.com/ssltest/analyze.html?d=monitaure.io&s=2001%3a41d0%3ae%3a59a%3a0%3a0%3a0%3a1&hideResults=on) (TLS 1.2, OCSP stapling, HSTS, HSTS preloading, Forward secrecy, etc.) ;
    * CSRF tokens ;
    * HttpOnly, encrypted session cookies ;
    * Content-Security-Policy, Strict-Transport-Security, X-Frame-Options, X-XSS-Protection, X-Content-Type-Options headers.
* Performance:
    * Served over HTTP/2 ;
    * Sitting behind an NGINX reverse-proxy ;
    * Caching server-side (NGINX) as well as client-side (Service Worker for requests & assets, LocalStorage for state) ;
    * Hosted on a dedicated server running Archlinux ;
    * Gzip compression ;
    * PNGQuant & SVGO images optimization ;
    * CSS bundling and uglification ;
    * JS tree-shaking, minification, uglification, dead code elimination.
* Misc:
    * [IPV6-ready](http://ready.chair6.net/?url=https%3A%2F%2Fmonitaure.io) ;
    * Sendgrid to send transactionnal emails (account confirmation, alerts, etc.) ;
    * Travis CI for build testing ;
    * ESLint and Codacy for code style and quality review ;
    * Heap Analytics for retroactive interaction statistics.

Concerning the graphical aspect of the application, you can find all the goodies [here on Dribble](https://dribbble.com/guillaumeparra/tags/monitaure).

## Project purpose

While it is a useful service anyone can use, it is also meant -as a team project- to showcase our skills.

The team is composed of the following people:
* [Bertrand Junqua](https://awebsiteabout.me) for both the front-end and back-end code, and server administration ;
* [Guillaume Parra](https://whyyouwillhire.me) who takes care of the UI & UX ;
* [Quentin Bucciarelli](https://www.behance.net/qbucciarelli) who laid a hand for writing some of the (S)CSS and the email templates.

## Bonus: Error pages

* [403](https://monitaure.io/403)
* [404](https://monitaure.io/404)
* [500](https://monitaure.io/500)
