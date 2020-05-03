import React, {useState, useEffect} from 'react';
import { Link} from 'react-router-dom';
import AddMeals from './addmeals';
import Login from './login';
import axios from 'axios';

function MyProfile(props) {
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
    if(token){
      const user_id = localStorage.getItem('user_id');
      const url = "http://localhost:8000/get_meals?user_id="+user_id;
      fetch(url)
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
    }
  }, [])


  const deleteMeal = function(id) {
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json',
                      'Authorization': `Token ${token}`}

        axios.post("http://localhost:8000/delete_meal/" + id, { headers })
          .then(function (response) {
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const [token] = useState(localStorage.getItem('token'));
  let [user_id] = useState(localStorage.getItem('user_id'))
  return (
        <div className="profile-page">
          <div><h1>Welcome To Your Meal Details</h1>
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
                    <td>
                    
                    <span> 
                            <Link to="/editmeal"
                              onClick={() => { 
                                localStorage.setItems('meal_id', item.id)
                              }}
                            >Edit</Link>
                            <span onClick={() => deleteMeal(item.id)}>&nbsp; &nbsp;Delete</span>
                    </span>
                  
                  </td>
                  </tr>
                 ))
                }
              </tbody>
          </table>
        </div>
    );
}

export default MyProfile;
