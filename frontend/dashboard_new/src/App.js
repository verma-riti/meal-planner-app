import React, {useState} from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import SignUp from './components/signup';
import Login from './components/login';
import GetMeals from './components/getmeals';
import AddMeals from './components/addmeals';
import {Switch, Link, Route, Redirect} from 'react-router-dom';


function App() {
   const [token] = useState(localStorage.getItem('token'));
if (token) {
    return (
          <div className="App" id="app">
          <GetMeals />
          </div>
        )
  }else {
   return (
    <div className="App">
        <Login />
    </div>
   )
  }
}

export default App;
