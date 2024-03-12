import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/register', values, {})
      .then(res => {
        if (res.data.Status === 'Success') {
          alert('Inserted successfully');
        } else {
          alert('Failure');
        }
      })
      .catch(err => {
        console.log('Failure to insert');
      });
  };

  return (
    <div className='registration-form'>
      <h2 className='text-center'>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Username</label>
          <input
            type="email"
            value={values.username}
            onChange={e => setValues({ ...values, username: e.target.value })}
            className="form-control"
            placeholder='Email'
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            type="password"
            value={values.password}
            onChange={e => setValues({ ...values, password: e.target.value })}
            className="form-control"
            placeholder='Password'
          />
        </div>
        <div className='form-group'>
          <button type="submit" className='btn btn-success'>Submit</button>
        </div>
      </form>

      <div className="go-to-userlist">
        <button className='btn btn-danger'>
          <Link to="/users">User list </Link>
        </button>
      </div>
    </div>
  );
}

export default Home;
