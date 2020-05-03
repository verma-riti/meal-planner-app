import React, {useState} from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import SignUp from './components/signup';
import Login from './components/login';
import GetMeals from './components/getmeals';
import AddMeals from './components/addmeals';
import EditMeals from './components/editmeal';
import MyProfile from './components/profile';
import {Switch, Link, Route, Redirect} from 'react-router-dom';

function App() {
  const pages = [
    {
      pageLink: '/',
      view: GetMeals
    },
    {
      pageLink: '/login',
      view: Login
    },
    {
      pageLink: '/signup',
      view: SignUp
    },
    {
      pageLink: '/addmeal',
      view: AddMeals
    },
    {
      pageLink: '/editmeal',
      view: EditMeals
    },
    {
      pageLink:'/profile',
      view: MyProfile
    }
  ];

return (
  <div className="App">
    <Route 
      render={({location}) => (
        <div className="Almighty-Router">
          <Route exact path="/" render={() => <Redirect to="/" />} />
          
          {pages.map((page, i) => {
            return (<Route 
                    exact
                    path={page.pageLink}
                    component={page.view}
                    key={i}
                    />
                    );
          })}
        </div>
      )}
    />
  </div>
)
}

export default App;