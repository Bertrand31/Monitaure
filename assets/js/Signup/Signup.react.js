import React from 'react';
import UserActions from './Actions';

function getUser() {
    return {
        user: UserStore.getUser()
    };
}
class SignupForm extends React.Component {
    constructor() {
        super();
        this.state = getUser();
    }
    componentDidMount() {
        UserStore.addChangeListener(this._onChange.bind(this));
        this.refs.usernameInput.focus();
    }
    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange.bind(this));
    }
    handleChange(e) {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        UserActions.update(inputName, inputValue);
    }
    handleSubmit(e) {
        e.preventDefault();
        UserActions.signup(this.state.user);
    }
    render() {
        if (this.state.user.hasOwnProperty('createdAt')) {
            return (
                <div className="confirmation-block">
                    <p>A confirmation email has just been sent to {this.state.user.email}</p>
                </div>
            );
        }

        return (
            <div className="signup-block">
                <h2>Create an account</h2>
                <form method="post" action="/signup" onSubmit={this.handleSubmit.bind(this)}>
                    <fieldset>
                        <label>Username</label>
                        <input
                            className="input__text"
                            name="username"
                            type="text"
                            autoComplete="username"
                            placeholder="Your username"
                            ref="usernameInput"
                            required minLength="2" maxLength="20"
                            onChange={this.handleChange.bind(this)}
                        />
                        <label>Email</label>
                        <input
                            className="input__text"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="Your email address"
                            required
                            onChange={this.handleChange.bind(this)}
                        />
                        <label>Password</label>
                        <input
                            className="input__text input__text--password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Your password"
                            required minLength="6"
                            onChange={this.handleChange.bind(this)}
                        />
                        <label>Password confirmation</label>
                        <input
                            className="input__text input__text--password"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Type your password again"
                            required minLength="6"
                            onChange={this.handleChange.bind(this)}
                        />
                    </fieldset>
                    <input type="submit" value="Sign up" />
                </form>
                <p>Already have an account? <a href="/login">Log in!</a></p>
            </div>
        );
    }

    _onChange() {
        this.setState(getUser());
    }
}

export default SignupForm;
