import React from 'react';
import { Stack, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from '../utils/constants';
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <Stack direction="row" alignItems="center" p={2} 
      sx={{position:'sticky',background:'#000',top:0,justifyContent:'space-between'}}>
      <Link to="/" style={{display:'flex',alignItems:'center'}}>
        <img src={logo} alt="logo" height={45}/> <Typography color="white" fontSize="1.5rem" fontWeight="bold">Metube</Typography>
      </Link>
      <SearchBar/>
      <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Link to="/signup"> {/* Link to the signup page */}
        <Button variant="outlined" sx={{marginRight:"20px",'&:hover':{boxShadow:'0 0 15px blue'}}}>Sign Up</Button>
      </Link>
      <Link to="/login"> {/* Link to the signup page */}
        <Button variant="outlined" sx={{'&:hover':{boxShadow:'0 0 15px blue'}}}>Login</Button>
      </Link>
      </Box>
    </Stack>
  );
};

export default Navbar;
