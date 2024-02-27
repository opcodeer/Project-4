import React from 'react';
import { Stack, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { logo } from '../utils/constants';
import SearchBar from "./SearchBar";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };

  return (
    <Stack direction="row" alignItems="center" p={2} 
      sx={{position:'sticky',background:'#000',top:0,justifyContent:'space-between',zIndex:'999'}}>
      <Link to="/" style={{display:'flex',alignItems:'center'}}>
        <img src={logo} alt="logo" height={45}/> <Typography color="white" fontSize="1.5rem" fontWeight="bold">Metube</Typography>
      </Link>
      <SearchBar/>
      {!localStorage.getItem('token') ? (
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Link to="/signup">
            <Button variant="outlined" sx={{marginRight:"20px",'&:hover':{boxShadow:'0 0 15px blue'}}}>Sign Up</Button>
          </Link>
          <Link to="/login">
            <Button variant="outlined" sx={{'&:hover':{boxShadow:'0 0 15px blue'}}}>Login</Button>
          </Link>
        </Box>
      ) : (
        <Button onClick={handleLogout} variant="outlined" sx={{'&:hover':{boxShadow:'0 0 15px blue'}}}>Logout</Button>
      )}
    </Stack>
  );
};

export default Navbar;
