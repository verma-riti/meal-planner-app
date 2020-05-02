import React, { Component } from 'react';
import axios from 'axios';

class Search extends Component {
 
  constructor() {
        super();
        this.state = {
          date_to: '',
          date_from: '',
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
        const { date_to, date_from } = this.state;
        this.state.token = localStorage.getItem('token');
        const headers = { 'Content-Type': 'application/json',
                      'Authorization': `Token ${this.state.token}`}

        axios.post('http://localhost:8000/search/', { date_to, date_from }, { headers })
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
        const { date_to, date_from } = this.state;
        return (
            
            <div className="search">
              <form onSubmit={this.onSubmit}>
                    <span>
                        <input
                          type="date"
                          placeholder="To"
                          name="date_to"
                          value={date_to}
                          onChange={this.onChange}
                        />
                      </span>
                      <span>
                        <input
                          type="date"
                          placeholder="From"
                          name="date_from"
                          value={date_from}
                          onChange={this.onChange}
                        />
                      </span>
                      <span>
                        <button type="submit" className="btn ">Search</button>
                      </span>
              </form>
          </div>
                  
        );
      }
}

export default Search;
