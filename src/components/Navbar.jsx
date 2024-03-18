import React, { useEffect,useState } from 'react';
import { Stack, Typography, Button, Toolbar, Avatar } from "@mui/material";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { logo } from '../utils/constants';
import { useDispatch } from 'react-redux';
import SearchBar from "./SearchBar";
import useStyles from './styles';
const Navbar = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const location = useLocation();
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('profile')));
  },[location]);
  const Logout = ()=>{
       dispatch({type:'LOGOUT'});
       navigate('/');
       setUser(null);
  }
  return (
    <Stack direction="row" alignItems="center" p={2} 
      sx={{position:'sticky',background:'#000',top:0,justifyContent:'space-between',zIndex:'999'}}>
      <Link to="/" style={{display:'flex',alignItems:'center'}}>
        <img src={logo} alt="logo" height={45}/> <Typography color="white" fontSize="1.5rem" fontWeight="bold">Metube</Typography>
      </Link>
      <SearchBar/>
        <Toolbar className={classes.toolbar}>
        {user?.result ? (
  <div className={classes.profile}>
    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
    <Button variant='contained' className={classes.logout} color='secondary' onClick={Logout}>Logout</Button>
  </div>
  ) : (
     <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
  )}
        </Toolbar>
    </Stack>
  );
};

export default Navbar;
