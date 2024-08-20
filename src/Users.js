import React, { useState, useEffect } from 'react';
import UsersForm from './UsersForm';
import UsersTable from './UsersTable';
import { Box } from '@mui/material';
import Axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getUsers();
  }, [submitted]); // Re-fetch users whenever the form is submitted

  const getUsers = async () => {
    try {
      const response = await Axios.get(process.env.REACT_APP_ENDPOINT+'/api/users');
      const userData = response.data || [];
      setUsers(userData);
      setError(null); // Clear the error if the request is successful
    } catch (error) {
      console.error("Error fetching users: ", error);
      setError("Failed to fetch users.");
    }
  };

  const addUser = async (data) => {
    const payload = {
      id: data.id,
      name: data.name,
    };

    try {
      await Axios.post(process.env.REACT_APP_ENDPOINT+'api/createuser', payload);
      setIsEditing(false); // Ensure edit mode is off after adding
      setSubmitted(!submitted); // Trigger re-fetching of users
    } catch (error) {
      console.error("Axios error: ", error);
      setError("Failed to add user.");
    }
  };

  const updateUser = async (data) => {
    const payload = {
      id: data.id,
      name: data.name,
    };
  
    try {
      await Axios.post(`${process.env.REACT_APP_ENDPOINT}api/updateuser`, payload);
      setSubmitted(!submitted); // Trigger re-fetching of users
      setIsEditing(false); // Ensure edit mode is off after updating
      setSelectedUser({}); // Clear the selected user
    } catch (error) {
      console.error("Axios error: ", error);
      setError("Failed to update user.");
    }
  };
  

  const deleteUser = async (data) => {
    const payload = { id: data.id }; // Creating the payload with the user ID

    try {
      await Axios.post(process.env.REACT_APP_ENDPOINT+'api/deleteuser', payload);
     getUsers(); // Re-fetch the users list after deletion
    } catch (error) {
      console.error("Axios Error: ", error);
      setError("Failed to delete user."); // Handle errors by updating the error state
    }
  };

  return (
    <Box
      sx={{
        width: '100%', // Adjust the width to be more standard
        marginTop: '40px',
      }}
    >
      <UsersForm
        addUser={addUser}
        updateUser={updateUser}
        submitted={submitted}
        data={selectedUser}
        isEditing={isEditing}
      />
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        <UsersTable
          rows={users}
          selectedUser={(data) => {
            setSelectedUser(data);
            setIsEditing(true); // Enable editing mode
          }}
          deleteUser={(data) => window.confirm('Are you sure you want to delete this user?') && deleteUser(data)}
        />
      )}
    </Box>
  );
};

export default Users;
