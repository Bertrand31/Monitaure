import React, { PropTypes } from 'react';

class SignupFormComponent extends React.Component {
    componentDidMount() {
        this.usernameInput.focus();
    }
    render() {
        if (Object.prototype.hasOwnProperty.call(this.props.user, 'createdAt')) {
            return (
                <div className="confirmation-block">
                    <p>A confirmation email has just been sent to {this.props.user.email}</p>
                </div>
            );
        }

        return (
            <div onClick={(e) => {e.stopPropagation();}} className="signup-block">
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
                <p>Already have an account? <a href="/login">Log in!</a></p>
            </div>
        );
    }
}

SignupFormComponent.propTypes = {
    user: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
};

const SignupForm = ({ user = {}, update, signup }) => (
    <main className="main">
        <h1 className="logo">
            <img src="/images/logo.svg" width="264" height="39" alt="Monitaure - Monitoring for the masses" />
        </h1>
        <div className="centered-box">
            <SignupFormComponent user={user} update={update} signup={signup} />
        </div>
    </main>
);

SignupForm.propTypes = {
    user: PropTypes.object,
    update: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
};

export default SignupForm;
