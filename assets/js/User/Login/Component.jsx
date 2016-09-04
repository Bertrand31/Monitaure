import React, { PropTypes } from 'react';

class LoginFormComponent extends React.Component {
    componentDidMount() {
        this.usernameInput.focus();
    }
    render() {
        let closeButton = null;
        if (this.props.closePopin !== 'undefined') {
            closeButton = <div onClick={() => this.props.closePopin()}>x</div>;
        }

        return (
            <div onClick={(e) => { e.stopPropagation(); }} className="centered-box">
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
                <p>Don't have an account? <a href="/signup">Sign up!</a></p>
            </div>
        );
    }
}

LoginFormComponent.propTypes = {
    closePopin: PropTypes.func,
};

const LoginForm = ({ close }) => (
    <LoginFormComponent closePopin={close} />
);

LoginForm.propTypes = {
    close: PropTypes.func,
};

export default LoginForm;
