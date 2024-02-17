import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        navigate("/");
        console.log('Signup successful!');
      } else {
        alert('Invalid credentials');
        console.error('Signup failed!');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  }

  return (
    <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:'100vh',backgroundColor:'black'}}>
    <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",height:"35rem",width:"35rem",border:"1px solid white",boxShadow:"0 0 10px white"}}>
    <form method='post' onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <Typography variant='h4' sx={{color:"white",fontWeight:"bold",marginTop:"20px"}}>Sign Up</Typography>
      <TextField name='username' id="outlined-basic" label="username" variant="outlined" value={formData.username} type='text' onChange={handleChange} sx={{boxShadow:"0 0 10px white",marginBottom:"50px",marginTop:"15px",width:"28rem",'& label': {
      color: 'white', // Change label text color to white
      opacity:"0.5",
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // Change border color to white
      },
    },
    '& .MuiOutlinedInput-input': {
      color: 'white', // Change input text color to white
    },}}/>
      <TextField name='email' id="outlined-basic" label="email" variant="outlined" value={formData.email} type='email' onChange={handleChange} sx={{boxShadow:"0 0 10px white",marginBottom:"50px",width:"28rem",'& label': {
      color: 'white',
      opacity:"0.5", // Change label text color to white
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // Change border color to white
      },
    },
    '& .MuiOutlinedInput-input': {
      color: 'white', // Change input text color to white
    },}}/>
      <TextField name='password' id="outlined-basic" label="password" variant="outlined" value={formData.password} type='password' onChange={handleChange} sx={{boxShadow:"0 0 10px white",marginBottom:"30px",width:"28rem",'& label': {
      color: 'white', // Change label text color to white
      opacity:"0.5",
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // Change border color to white
      },
    },
    '& .MuiOutlinedInput-input': {
      color: 'white', // Change input text color to white
    },}}/>
      <Button type="submit" variant="contained" sx={{backgroundColor:"white",color:"black",border:"1px solid white",'&:hover':{backgroundColor:'white',color:'blue',border:'1px solid blue',boxShadow:'0 0 20px blue'}}}>Sign Up</Button>
    </form>
    </Box>
    </Box>
  );
};

export default SignUp;
