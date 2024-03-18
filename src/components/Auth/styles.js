import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  formField: { // Renamed from 'root' to 'formField' for clarity and to avoid conflict with the new 'root'
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
  root: { // New root class for full-page background
    height: '120vh', // Make it cover the full viewport height
    backgroundColor: '#000', // Set the background color to black
    display: 'flex',
    flexDirection: 'column', // Adjust this as needed for your layout
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', // Center the content vertically
  },
}));
