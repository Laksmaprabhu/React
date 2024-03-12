import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


const Users = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [editUser, setEditUser] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setAdminUsers(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleEdit = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      setEditUser(response.data);
      setShowPopup(true);
    } catch (error) {
      console.error('Error fetching user data for editing', error);
    }
  };
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      setAdminUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };
  const updateLocalUser = (updatedUser) => {
    setAdminUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <div className='pt-4'>
      <h2 className='text-center pb-3'>Users</h2>
      <div className='d-flex justify-content-center'>
        <table>
          <thead>
            <tr>
              <th>Users</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.user}</td>
                <td>
                  <button className='btn btn-primary' onClick={() => handleEdit(user.id)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className='btn btn-danger' onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
      <div className='add-user'><button className='btn btn-success mt-4'><Link to="/">Add user</Link></button></div>
      {showPopup && editUser && (
        <EditPopup
          username={editUser}
          onClosePopup={handleClosePopup}
          updateLocalUser={updateLocalUser}
        />
      )}
   
    </div>
  );
};

const EditPopup = ({ username, onClosePopup, updateLocalUser }) => {
  const [editedUser, setEditedUser] = useState(username);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/users/${editedUser.id}`, editedUser);
      // Assuming the server responds with the updated user data
      updateLocalUser(response.data);
      onClosePopup();
      window.location.reload(false);
    } catch (error) {
      console.error('Error updating user data', error);
    }
  };

  return (
    <div>
      <div className='popup'>
        <div className='popup-content'>
          <h3 className='text-center'>Update User</h3>
          <div className='edit-user-info'>
            <span className='popup-close' onClick={onClosePopup}>
              X
            </span>
            <div className='form-group'>
              <label>Username</label>
              <input
                type='text'
                name='user'
                className='form-control'
                value={editedUser.user}
                onChange={(e) => setEditedUser({ ...editedUser, user: e.target.value })}
              />
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input
                type='password'
                className='form-control'
                name='password'
                value={editedUser.password}
                onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })}
              />
            </div>
            <button className='btn btn-success' onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
