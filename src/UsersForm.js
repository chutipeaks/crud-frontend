import React, { useEffect } from 'react';
import { Grid, Typography, TextField, Button } from "@mui/material";

const UserForm = ({ addUser, updateUser, submitted, data, isEditing }) => {
  const [id, setId] = React.useState(0);
  const [name, setName] = React.useState('');

  useEffect(() => {
    if (data?.id && data.id !== 0) {
      setId(data.id);
      setName(data.name);
    }
  }, [data]);

  const handleSubmit = () => {
    if (id && name) {
      if (isEditing) {
        updateUser({ id: Number(id), name });
      } else {
        addUser({ id: Number(id), name });
      }
      // Reset form fields and states
      setId(0);
      setName('');
      // Remove the line below as setIsEditing is handled in the parent component
      // setIsEditing(false);
    } else {
      alert("Please fill out both fields.");
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        backgroundColor: "white",
        marginBottom: "30px",
        padding: "20px",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ color: "black", marginBottom: "20px" }}>
          {isEditing ? "Edit User" : "Add User"}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type='number'
          id="id"
          name="id"
          label="ID"
          value={id}
          onChange={(e) => setId(Number(e.target.value))}
          variant="outlined"
          placeholder="Enter ID"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type='text'
          id="name"
          name="name"
          label="Name"
          value={name}
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            marginTop: "20px",
            '&:hover': {
              opacity: 0.8,
              backgroundColor: "black",
            }
          }}
          onClick={handleSubmit} // Call handleSubmit to conditionally add or update user
        >
          {isEditing ? "Update User" : "Add User"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserForm;
