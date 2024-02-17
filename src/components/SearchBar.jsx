import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { InputBase, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 20,
        border: '1px solid #e3e3e3',
        pl: 2,
        boxShadow: '0 0 10px #fff',
        justifyContent: 'space-between',
        mr: { sm: 5 },
      }}
    >
      <InputBase
        className='search-bar'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        inputProps={{ 'aria-label': 'search input' }}
        sx={{width:"40rem"}}
      />
      <IconButton type='submit' sx={{ p: '10px', color: 'red' }} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
