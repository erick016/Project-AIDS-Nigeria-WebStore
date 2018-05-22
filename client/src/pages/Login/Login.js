import React, { Component } from 'react';
import AuthService from '../../components/AuthService';
import { Link } from 'react-router-dom';
import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }


  state = {
    email: "",
    password: "",
    submitFlag: false,
    serverCheck : ""
  }
  // componentWillMount() {
  //   if (this.Auth.loggedIn()) {
  //     this.props.history.replace('/');
  //   }
  // }

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({
      submitFlag: true
    });

    if (this.state.email && this.state.password) {

      this.Auth.login(this.state.email, this.state.password)
        .then(res => {
          // once user is logged in
          // take them to their profile page
          this.props.history.replace(`/profile/${res.data.user._id}`);
        })
        .catch(err => {
            this.setState({serverCheck : "fail"});
          });
          // err => alert(err);
    }
   
  };

  resetForm = () => {
    this.setState({
      email : "",
      password : ""
    })
  }

   handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });

  };

 checkEmailError(){
    if (!this.state.email && this.state.submitFlag) {
      return ("form-control error-focus"); 
    }
    else if ((this.state.serverCheck === "fail") && this.state.submitFlag){
      return ("form-control error-focus"); 
    }
    else {
      return ("form-control");
    }
 }

  checkPasswordError(){
    if (!this.state.password && this.state.submitFlag) {
      return ("form-control error-focus"); 
    }
    else if ((this.state.serverCheck === "fail") && this.state.submitFlag){
      return ("form-control error-focus"); 
    }
    else {
      return ("form-control");
    }
  }

  render() {
    return (
      <div className="container">
        <br />
        <h1>Login</h1>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address:</label>
            <input className={this.checkEmailError()}
              placeholder="Email"
              name="email"
              type="email"
              id="email"
              onChange={this.handleChange} />

            {(!this.state.email && this.state.submitFlag) ? <div className="error-text">Email required</div> : " "}
            
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input className={this.checkPasswordError()}
              placeholder="Password"
              name="password"
              type="password"
              id="pwd"
              onChange={this.handleChange} />
            {(!this.state.password && this.state.submitFlag) ? <div className="error-text">Password required</div> : " "}
          </div>

          {((this.state.serverCheck === "fail") && this.state.submitFlag) ? <div><div className="error-text">Invalid Email/Password </div><br/></div>  : " "}
        
          <button type="submit" className="btn btn-default" onSubmit={this.resetForm}>Submit</button>
        </form>
        <br />
        <p>Don't have an account? Sign up <Link to="/signup">here</Link></p>
      </div>

    );
  }
}

export default Login;