import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import SignUp from './signup';

import axios from 'axios';

class EditMeal extends Component {
 
  constructor() {
        super();
        this.state = {
          meal_name: '',
          calories: '',
          token: '',
          meal_id:''
        };
      }

      onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.state.token = localStorage.getItem('token');
        this.state.meal_id = localStorage.getItem('meal_id');
      }

      onSubmit = (e) => {
        e.preventDefault();
        const { meal_name, calories } = this.state;
        const headers = { 'Content-Type': 'application/json',
                      'Authorization': `Token ${this.state.token}`}

        axios.post('http://localhost:8000/update_meal/'`${this.state.meal_id}`, { meal_name, calories }, { headers })
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
                <h1>Edit Your Meal</h1>
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
                  <button type="submit">Save</button>
                </form>
              </div>
          </div>
        );
      }
}

export default EditMeal;
