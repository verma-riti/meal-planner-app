import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import SignUp from './signup';

import axios from 'axios';

class AddMeals extends Component {
 
  constructor() {
        super();
        this.state = {
          meal_name: '',
          calories: '',
          token: ''
        };
      }

      onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }

      onSubmit = (e) => {
        e.preventDefault();
        const { meal_name, calories } = this.state;
        this.state.token = localStorage.getItem('token');
        const headers = { 'Content-Type': 'application/json',
                      'Authorization': `Token ${this.state.token}`}

        axios.post('http://localhost:8000/add_meal/', { meal_name, calories }, { headers })
          .then(function (response) {
          console.log(response.status);
      })
      .catch(function (error) {
        console.log(error);
      });
      }

      render() {
        const { meal_name, calories } = this.state;
        
        return (
          <div className="login-page">
              <div className="form">
                <h1>Add Your Meal</h1>
                <form onSubmit={this.onSubmit} className="login-form">
                  <input
                    type="text"
                    placeholder="Enter meal name"
                    name="meal_name"
                    value={meal_name}
                    onChange={this.onChange}
                  />
                  <input
                    type="text"
                    placeholder="Enter Calories"
                    name="calories"
                    value={calories}
                    onChange={this.onChange}
                  />
                  <button type="submit">Add</button>
                </form>
              </div>
          </div>
        );
      }
}

export default AddMeals;
