import React, { Component } from 'react';
import withAuth from '../../components/withAuth';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import BlogElement from '../../components/Blog/Blog'

class Profile extends Component {

  state = {
    username: "",
    email: "",
    isGuest: null
  };

  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
      this.setState({
        username: res.data.username,
        email: res.data.email,
        isGuest: res.data.permissionLevel
      })
    });
  }

  render() {
    return (
      <div className="container Profile">
        <h1>On the profile page!</h1>
        <p>Username: {this.state.username}</p>
        <p>Email: {this.state.email}</p>
        {!(isGuest !== null &&  isGuest > 0) ? <BlogElement /> : "Blog posts disabled for guests. Contact site administrator for permission to post."}
        {/* <Link to="/">Go home</Link> */}
      </div>
    )
  }
}

export default withAuth(Profile);