import React, {useState, useEffect} from 'react';
import { Link} from 'react-router-dom';
import AddMeals from './addmeals';
import Login from './login';
import axios from 'axios';

function GetMeals(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [is_admin, setIsAdmin] = useState([]);
  const [date_to, setDateTo] = useState('');
  const [date_from, setDateFrom] = useState('');

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
   const token = localStorage.getItem('token');
   setIsAdmin(localStorage.getItem('is_admin'));
   
      fetch("http://localhost:8000/get_meals")
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


 const  onSubmit = function() {
        axios.post('http://localhost:8000/search_meals/', { date_to, date_from })
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
          <div><h1>List of All the meals</h1>
          </div>
          <div className="search">
              <form className="search_form">
                      <span>Start Date: 
                        <input
                          type="date"
                          placeholder="Enter Start date"
                          name="date_from"
                          value={date_from}
                          onChange={(event) => {
                            setDateFrom(event.target.value);
                          }}
                        />
                      </span>
                      <span>End Date:
                        <input
                          type="date"
                          placeholder="Enter End Date"
                          name="date_to"
                          value={date_to}
                          onChange={(event) => {
                            setDateTo(event.target.value);
                          }}
                        />
                      </span>
                      <span>
                        <button type="button" className="btn search_btn" onClick={() => onSubmit()}>Search</button>
                      </span>
              </form>
          </div>


            {token ?
                    <div>
                    <div className="my_profile">
                      <Link to="/profile"> My Profile </Link>
                    </div>
                    <div className="add_meals">
                            <Link to="/addmeal" className="btn btn-primary">&nbsp;<button type="submit">
                            Add new Meals</button></Link>
                    </div>
                    </div>
                  :
                    <p></p>
                      
            }        
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
                    {
                      token && is_admin == true ?
                        <span> 
                                <Link to="/editmeal">Edit</Link>
                                <span>&nbsp; &nbsp;Delete</span>
                        </span>
                      :
                       <p></p>
                      
                    }
                    {
                      token && parseInt(user_id)=== item.user ?
                        <span> 
                                <Link to="/editmeal"
                                  onClick={() => { 
                                    localStorage.setItems('meal_id', item.id)
                                  }}
                                >Edit</Link>
                                <span onClick={() => deleteMeal(item.id)}>&nbsp; &nbsp;Delete</span>
                        </span>
                      :
                       <p>you dont have permissions. </p>
                      
                    }
                    {
                      token ?
                        <span> 
                          
                        </span>
                      :
                       <Link to="/login"> Login </Link>
                      
                    } 
                   
                  </td>
                  </tr>
                 ))
                }
              </tbody>
          </table>
        </div>
    );
}

export default GetMeals;
