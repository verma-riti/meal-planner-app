import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';


import axios from 'axios';

class SignUp extends Component {
 
  constructor() {
        super();
        this.state = {
          username: '',
          email: '',
          password: ''
        };
      }

      onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }

      onSubmit = (e) => {
        e.preventDefault();
        const { username, email, password } = this.state;

        axios.post('http://localhost:8000/signUp/', { username, email, password })
          .then(function (response) {
		    console.log(response.status);
		    localStorage.setItem('token', response.data.token);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
      }

      render() {
        const { username, email, password } = this.state;
        return (
        	<div className="login-page register-page">
              <div className="form">
              	<h1>Create an Account</h1>
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
		              placeholder="Enter your email Id"
		              name="email"
		              value={email}
		              onChange={this.onChange}
		            />
		            <input
		              type="text"
		              placeholder="Enter your password"
		              name="password"
		              value={password}
		              onChange={this.onChange}
		            />
		            <button type="submit">Register</button>
		          </form>
		          <p className="message">Already registered?  
                   <Link to="/login" className="btn btn-primary">&nbsp; Login</Link></p>
		        </div>
		    </div>
        );
      }
}

export default SignUp;
