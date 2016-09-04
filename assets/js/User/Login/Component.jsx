import React, { PropTypes } from 'react';

class LoginFormComponent extends React.Component {
    componentDidMount() {
        this.usernameInput.focus();
    }
    render() {
        let closeButton = null;
        if (typeof this.props.close !== 'undefined') {
            closeButton = <button className="c-box__close" onClick={() => this.props.close()}></button>;
        }

        return (
            <div onClick={(e) => { e.stopPropagation(); }} className="c-box">
                {closeButton}
                <h2>Log in</h2>
                <form id="login" method="post" action="/login">
                    <fieldset className="login">
                        <label htmlFor="username">Username</label>
                        <input
                            className="input__text"
                            name="username"
                            type="text"
                            autoComplete="username"
                            placeholder="Your username"
                            ref={ref => this.usernameInput = ref}
                            required minLength="2" maxLength="20"
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            className="input__text input__text--password"
                            name="password"
                            type="password"
                            autoComplete="password"
                            placeholder="Your password"
                            required minLength="6"
                        />
                    </fieldset>
                    <input type="submit" value="Log in" />
                </form>
                <p className="c-box__text">Don't have an account? <a href="/signup">Sign up!</a></p>
            </div>
        );
    }
}

LoginFormComponent.propTypes = {
    close: PropTypes.func,
};

export default LoginFormComponent;
