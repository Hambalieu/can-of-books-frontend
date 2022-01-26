import { Component } from "react";

class LoginForm extends Component {

  handleSubmit = (e) => {
    e.preventdefault();
    let user = {
      username:e.target.username.value,
      email:e.target.email.value
    }

    this.props.onLogin(user)
  }

  render() {
    /* Done: create a simple login form that collects username and and email, and lets parent component know when form has been submitted */
    return (
      <form onSubmit={this.handleSubmit}>
        <label>username
          <input name="username"/>
        </label>
        <label>email
          <input name="email"/>
        </label>
        <button type="submit">Log In</button>
      </form>
    );
  }
};

export default LoginForm;
