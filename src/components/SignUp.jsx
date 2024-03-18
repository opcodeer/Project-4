import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Google Auth client
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: '140083932391-145qmogo0rd9t3tshnlolgg08b44r53e.apps.googleusercontent.com',
      });
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleGoogleSignIn = async () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    try {
      const googleUser = await auth2.signIn();
      if (googleUser.isSignedIn()) {
        const idToken = googleUser.getAuthResponse().id_token;
        // Send the ID token to your backend for verification
        const response = await fetch('http://localhost:8000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: idToken,
          })
        });
        const responseData = await response.json();
        if (response.ok) {
          localStorage.setItem('token', responseData.authtoken);
          navigate("/");
        } else {
          console.error('Signup failed:', responseData.error || 'Unknown error');
        }
      } else {
        console.error('User cancelled Google sign-in');
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });
  
      const responseData = await response.json();
      if (response.ok) {
        localStorage.setItem('token', responseData.authtoken);
        navigate("/");
      } else {
        console.error('Signup failed:', responseData.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: '100vh', backgroundColor: 'black' }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "35rem", width: "35rem", border: "1px solid white", boxShadow: "0 0 10px white" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant='h4' sx={{ color: "white", fontWeight: "bold", marginTop: "20px" }}>Sign Up</Typography>
          <TextField
            name='username'
            label="Username"
            variant="outlined"
            value={formData.username}
            type='text'
            onChange={handleChange}
            sx={{
              width: "28rem",
              marginBottom: "30px",
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
            }}
          />
          <TextField
            name='email'
            label="Email"
            variant="outlined"
            value={formData.email}
            type='email'
            onChange={handleChange}
            sx={{
              width: "28rem",
              marginBottom: "30px",
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
            }}
          />
          <TextField
            name='password'
            label="Password"
            variant="outlined"
            value={formData.password}
            type='password'
            onChange={handleChange}
            sx={{
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
            }}
          />
          <Button type="submit" variant="contained" sx={buttonStyle}>Sign Up</Button>
          <Button onClick={handleGoogleSignIn} variant="contained" sx={googleButtonStyle}>Sign Up with Google</Button>
        </form>
      </Box>
    </Box>
  );
};

// Styles for form elements
const buttonStyle = {
  backgroundColor: "white",
  color: "black",
  border: "1px solid white",
  '&:hover': { backgroundColor: 'white', color: 'blue', border: '1px solid blue', boxShadow: '0 0 20px blue' }
};

const googleButtonStyle = {
  backgroundColor: "#dd4b39",
  color: "white",
  border: "1px solid white",
  marginTop: "10px",
  '&:hover': { backgroundColor: '#c1351f', color: 'white', border: '1px solid white', boxShadow: '0 0 20px #c1351f' }
};

export default SignUp;
