import React from 'react';
import { TextField,Grid, InputAdornment,IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
const Input = ({name,handleChange,label,half,autoFocus,type,handleShowPassword,disabled,value}) => {
  return (
    <Grid item xs = {12} sm={half? 6 : 12}>
      <TextField
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      value={value}
      InputProps={name === 'password' ? { // Apply condition outside the InputProps object
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleShowPassword}>
              {type === "password" ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      } : {}}
      disabled={disabled} // Pass the disabled prop to TextField     
      />
    </Grid>
  )
}

export default Input
