import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
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

  const handleEditClick = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      setSelectedUser(response.data);
      setShowPopup(true);
    } catch (error) {
      console.error('Error fetching user data for editing', error);
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      await axios.put(`http://localhost:5000/users/${updatedUser.id}`, updatedUser);
      setShowPopup(false);
      // Refresh user data after updating
      const response = await axios.get('http://localhost:5000/users');
      setAdminUsers(response.data);
    } catch (error) {
      console.error('Error updating user data', error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {adminUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.user}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleEditClick(user.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && selectedUser && (
        <EditUserPopup
          user={selectedUser}
          onUpdateUser={handleUpdateUser}
          onClosePopup={handleClosePopup}
        />
      )}
    </div>
  );
};

const EditUserPopup = ({ user, onUpdateUser, onClosePopup }) => {
  const [editedUser, setEditedUser] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(editedUser);
  };

  return (
    <div className="popup">

      <div className="popup-content">
      <span className="popup-close" onClick={onClosePopup}>&times;</span>
        <h3>Edit User</h3>
        <form onSubmit={handleSubmit}>
          <label>User:</label>
          <input
            type="text"
            name="user"
            value={editedUser.user}
            onChange={handleInputChange}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={editedUser.password}
            onChange={handleInputChange}
          />
          <div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClosePopup}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Users;
