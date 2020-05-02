import React, {useState, useEffect} from 'react';
import { Link} from 'react-router-dom';
import AddMeals from './addmeals';
import Search from './search';
import Login from './login';


function GetMeals(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [is_admin, setIsAdmin] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
   const token = localStorage.getItem('token');
   setIsAdmin(localStorage.getItem('is_admin'));
    const headers = { 'Content-Type': 'application/json',
                      'Authorization': `Token ${token}` }
    fetch("http://localhost:8000/get_meals", { headers })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.Meals)
          setIsLoaded(true);
          setItems(result.Meals);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const [token] = useState(localStorage.getItem('token'));
if (token) {
  return (
        <div className="profile-page">
          <div>
            <h1>Welcome To Your Meal Details</h1>
          </div>
          <div className="add_meals">
            <Link to="/addmeal" className="btn btn-primary">&nbsp;<button type="submit">
            Add new Meals</button></Link>
          </div>
          
          <table className="table">
              <thead>
                <tr>
                  <th>Meals</th>
                  <th>calories</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr>
                    <td>{item.meal_name}</td>
                    <td>{item.calories}</td>
                    <td >{item.created_at}</td>
                    <td><Link to="/editmeal" onClick={({target}) => {
                      if(item.is_admin) {
                        localStorage.setItems('meal_id', `{item.id}`)
                      }else{
                        alert("you dont have admin permission")
                      }
                  }}>Edit</Link>
                      <span>&nbsp; &nbsp;Delete</span>
                  </td>
                  </tr>
                 ))
                }
              </tbody>
          </table>
        </div>
    );
  } 
  else {
    return (
    <div className="App">
        <Login />
    </div>
   )
  }
}

export default GetMeals;
