import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';

class SignupFormComponent extends Component {
    componentWillMount() {
        this.setState({ emailSent: false });
    }
    componentDidMount() {
        this.usernameInput.focus();
    }
    render() {
        if (this.state.emailSent) {
            return (
                <div className="c-box">
                    <p className="c-box__text">A confirmation email has been sent to {this.props.user.email}</p>
                </div>
            );
        }

        return (
            <div onClick={(e) => { e.stopPropagation(); }} className="c-box signup-block">
                <button className="c-box__close" onClick={() => browserHistory.push('/')} />
                <h2 className="c-box__title">Create an account</h2>
                <form
                    className="c-form"
                    method="post"
                    action="/signup"
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.setState({ emailSent: true });
                        this.props.signup(this.props.user);
                    }}
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
                        <label className="c-form__label" htmlFor="email">Email</label>
                        <input
                            className="input__text"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="Your email address"
                            required
                            onChange={e => this.props.update(e.target.name, e.target.value)}
                        />
                        <label className="c-form__label" htmlFor="password">Password</label>
                        <input
                            className="input__text input__text--password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Your password"
                            required minLength="6"
                            onChange={e => this.props.update(e.target.name, e.target.value)}
                        />
                        <label className="c-form__label" htmlFor="confirmPassword">Password confirmation</label>
                        <input
                            className="input__text input__text--password"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Type your password again"
                            required minLength="6"
                            onChange={e => this.props.update(e.target.name, e.target.value)}
                        />
                    </fieldset>
                    <input className="c-button c-button--padded" type="submit" value="Sign up" />
                </form>
                <p className="c-box__text">Already have an account? <Link to="/login">Log in!</Link></p>
            </div>
        );
    }
}

SignupFormComponent.propTypes = {
    user: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
};

export default SignupFormComponent;
