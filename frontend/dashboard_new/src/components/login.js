import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Link, Route, Redirect} from 'react-router-dom';
import SignUp from './signup';

import axios from 'axios';

class Login extends Component {
 
  constructor() {
        super();
        this.state = {
          username: '',
          password: '',
          isloggedIn:false,
          token: '',
          is_admin:false
        };
      }

      onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }

      onSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        this.state.token = localStorage.getItem('token');
        const headers = { 'Content-Type': 'application/json',
                      'Authorization': `Token ${this.state.token}`}

        axios.post('http://localhost:8000/login/', { username, password }, { headers })
          .then(function (response) {
          console.log(response.status);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('is_admin', response.data.is_admin);
          this.state.is_admin = response.data.is_admin;
          this.setState({ isloggedIn: true });
      })
      .catch(function (error) {
        console.log(error);
      });
      }

      render() {
        const { username, password } = this.state;
        return (
            <div className="login-page">
                <div className="form">
                  <h1>Login</h1>
                  <form onSubmit={this.onSubmit} className="login-form">
                    <input
                      type="text"
                      placeholder="Enter your username"
                      name="username"
                      value={username}
                      onChange={this.onChange}
                    />
                    <input
                      type="text"
                      placeholder="Enter your password"
                      name="password"
                      value={password}
                      onChange={this.onChange}
                    />
                    <button type="submit">Login</button>

                  </form>
                  <p className="message">Not registered?  
                   <Link to="/signup" className="btn btn-primary">&nbsp; Create an account</Link></p>
                </div>
            </div>
        );
      }
}

export default Login;
