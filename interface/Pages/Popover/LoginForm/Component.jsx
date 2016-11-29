import React, { Component, PropTypes } from 'react';

import { close } from '../Actions';

class LoginFormComponent extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        update: PropTypes.func.isRequired,
        login: PropTypes.func.isRequired,
        replacePopover: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.usernameInput.focus();
    }
    render() {
        return (
            <div onClick={e => e.stopPropagation()} className="c-box">
                <button className="c-box__close" onClick={this.props.close} />
                <h2 className="c-box__title">Log in</h2>
                <form
                    className="c-form"
                    method="post"
                    action="/login"
                    onSubmit={(e) => { e.preventDefault(); this.props.login(this.props.user); }}
                >
                    <fieldset className="c-form__group">
                        <label className="c-form__label" htmlFor="username">Username</label>
                        <input
                            className="input__text"
                            name="username"
                            type="text"
                            autoComplete="username"
                            placeholder="Your username"
                            ref={ref => this.usernameInput = ref}
                            required minLength="2" maxLength="20"
                            onChange={e => this.props.update(e.target.name, e.target.value)}
                        />
                        <label className="c-form__label" htmlFor="password">Password</label>
                        <input
                            className="input__text input__text--password"
                            name="password"
                            type="password"
                            autoComplete="password"
                            placeholder="Your password"
                            required minLength="6"
                            onChange={e => this.props.update(e.target.name, e.target.value)}
                        />
                    </fieldset>
                    <input className="c-button c-button--padedd" type="submit" value="Log in" />
                </form>
                <p className="c-box__text">Don&apos;t have an account? <a href="#_" onClick={() => this.props.replacePopover('signup')} >Sign up!</a></p>
            </div>
        );
    }
}

export default LoginFormComponent;
