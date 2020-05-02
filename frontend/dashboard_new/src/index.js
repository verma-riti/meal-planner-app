import React from 'react'
import ReactDOM from 'react-dom';
import SignUp from './components/signup';
import Login from './components/login';
import GetMeals from './components/getmeals';
import AddMeals from './components/addmeals';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Switch, Link, Route, Redirect} from 'react-router-dom';

const routing = (
  <Router>
    <div>
      	<Route path = "/" component = {App} />
      	<Route path ="/getmeals" component={GetMeals} />
      	 <Route path = "/signup" component = {SignUp} />
         <Route path = "/login" component = {Login} />
         <Route path = "/addmeal" component = {AddMeals} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))

serviceWorker.unregister();