// reducers.js
import { combineReducers } from 'redux';
import authReducer from './auth'; // Import your reducer(s) here

const reducers = combineReducers({
  authReducer, // Example: 'auth' is the slice of state, and 'authReducer' is the corresponding reducer function
  // Add other reducers here if needed
});

export default reducers;

