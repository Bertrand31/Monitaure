# [![Monitaure logo](https://monitaure.io/images/logo-black.svg)](https://monitaure.io)

[![Codacy Badge](https://api.codacy.com/project/badge/grade/f3d8e262de834aa9a6e3a5bb36aa54b2)](https://www.codacy.com/app/bertrandjun/Monitaure)
[![Dependency Status](https://david-dm.org/Bertrand31/Monitaure/status.svg)](https://david-dm.org/Bertrand31/Monitaure/)
[![Travis build status](https://travis-ci.org/Bertrand31/Monitaure.svg)](https://travis-ci.org/Bertrand31/Monitaure/)

Monitaure is an online service aiming to provide SysAdmins with a clean, lightweight and quick to configure monitoring dashboard.
The application does not need any client-side installation or configuration.

While it is an useful service anyone can use, it is also meant -as a personnal projet- to
showcase [Guillaume Parra](https://whyyouwillhire.me)'s and [I](https://awebsiteabout.me) skills.

From a technical point of view, here are some of the key aspects of Monitaure:

* Server-side
    * NodeJS application using MongoDB for storage and Redis for sessions handling ;
    * Hosted on a dedicated server running Archlinux ;
    * Sitting behind an NGINX reverse-proxy with smart caching mechanisms and many performance and security tweaks ;
    * Served over HTTP/2 and HTTPS ([with meticulous attention to SSL security](https://www.ssllabs.com/ssltest/analyze.html?d=monitaure.io&s=2001%3a41d0%3ae%3a59a%3a0%3a0%3a0%3a1&hideResults=on)) ;
    * [IPV6-ready](http://ready.chair6.net/?url=https%3A%2F%2Fmonitaure.io).
* Front-end
    * React to manage user interface ;
    * Flux architecture to manage application state ;
    * JSX and some Jade for HTML ;
    * SASS for CSS ;
    * Babel to transpile ES6 to older Javascript ;
    * Webpack to bundle everything up ;
* Misc
    * Sendgrid to send transactionnal emails (account confirmation, alerts, etc.) ;
    * Travis CI for build testing ;
    * Codacy for code style and quality review ;
    * Heap Analytics for retroactive interaction statistics.

## Bonus: Error pages

* [403](https://monitaure.io/403) ;
* [404](https://monitaure.io/404) ;
* [500](https://monitaure.io/500).
