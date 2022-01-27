import { Component } from "react";

class Profile extends Component {

  render() {
    /* Done: render information about logged in user */
    /* STRETCH TODO: if no logged in user then redirect home */
    return <p>{this.props.user.username} can be reach at {this.props.user.email}</p>
  }
};

export default Profile;
