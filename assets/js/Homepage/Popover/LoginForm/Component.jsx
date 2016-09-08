import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';

class LoginFormComponent extends React.Component {
    componentDidMount() {
        this.usernameInput.focus();
    }
    render() {
        return (
            <div onClick={(e) => { e.stopPropagation(); }} className="c-box">
                <button className="c-box__close" onClick={() => browserHistory.push('/')} />
                <h2>Log in</h2>
                <form
                    id="login"
                    method="post"
                    action="/login"
                    onSubmit={e => { e.preventDefault(); this.props.login(this.props.user); }}
                >
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
                            onChange={e => this.props.update(e.target.name, e.target.value)}
                        />
                        <label htmlFor="password">Password</label>
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
                    <input type="submit" value="Log in" />
                </form>
                <p className="c-box__text">Don't have an account? <Link to="/signup">Sign up!</Link></p>
            </div>
        );
    }
}

LoginFormComponent.propTypes = {
    user: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    close: PropTypes.func,
};

export default LoginFormComponent;
