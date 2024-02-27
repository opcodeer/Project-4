import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
  
      if (response.ok) {
        // Handle successful login
        const responseBody = await response.json();
        console.log("Login Successful");
        // Save token to local storage or cookies for future requests
        localStorage.setItem('token', responseBody.authtoken);
        // Redirect user to another page
        navigate("/");
      } else {
        // Handle login failure (e.g., display error message from json)
        const errorResponse = await response.json();
        console.error('Login failed:', errorResponse.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network or parsing errors
    }
  };
  

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: '100vh', backgroundColor: 'black' }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "25rem", width: "35rem", border: "1px solid white", boxShadow: "0 0 10px white" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant='h4' sx={{ color: "white", fontWeight: "bold", marginTop: "20px" }}>Login</Typography>
          <TextField name='email' id="outlined-basic" label="Email" variant="outlined" value={formData.email} type='email' onChange={handleChange} sx={{
            boxShadow: "0 0 10px white",
            marginBottom: "50px",
            marginTop: "15px",
            width: "28rem",
            '& label': {
              color: 'white',
              opacity: "0.5",
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiOutlinedInput-input': {
              color: 'white',
            },
          }} />
          <TextField name='password' id="outlined-basic" label="Password" variant="outlined" type="password" value={formData.password} onChange={handleChange} sx={{
            boxShadow: "0 0 10px white",
            marginBottom: "30px",
            width: "28rem",
            '& label': {
              color: 'white',
              opacity: "0.5",
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiOutlinedInput-input': {
              color: 'white',
            },
          }} />
          <Button type="submit" variant="contained" sx={{ backgroundColor: "white", color: "black", border: "1px solid white" }}>Login</Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
