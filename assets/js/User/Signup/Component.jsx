import React, { PropTypes } from 'react';

class SignupFormComponent extends React.Component {
    componentDidMount() {
        this.usernameInput.focus();
    }
    render() {
        if (Object.prototype.hasOwnProperty.call(this.props.user, 'createdAt')) {
            return (
                <div className="c-box">
                    <p className="c-box__text">A confirmation email has just been sent to {this.props.user.email}</p>
                </div>
            );
        }

        let closeButton = null;
        if (typeof this.props.close !== 'undefined') {
            closeButton = <button className="c-box__close" onClick={() => this.props.close()} />;
        }

        return (
            <div onClick={(e) => { e.stopPropagation(); }} className="c-box signup-block">
                {closeButton}
                <h2>Create an account</h2>
                <form
                    method="post"
                    action="/signup"
                    onSubmit={e => {
                        e.preventDefault();
                        this.props.signup(this.props.user);
                    }}
                >
                    <fieldset>
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
                        <label htmlFor="email">Email</label>
                        <input
                            className="input__text"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="Your email address"
                            required
                            onChange={e => this.props.update(e.target.name, e.target.value)}
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            className="input__text input__text--password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Your password"
                            required minLength="6"
                            onChange={e => this.props.update(e.target.name, e.target.value)}
                        />
                        <label htmlFor="confirmPassword">Password confirmation</label>
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
                    <input type="submit" value="Sign up" />
                </form>
                <p className="c-box__text">Already have an account? <a href="/login">Log in!</a></p>
            </div>
        );
    }
}

SignupFormComponent.propTypes = {
    user: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    close: PropTypes.func,
};

export default SignupFormComponent;
