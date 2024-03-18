import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup, signin } from '../../actions/auth';
import Input from './Input';
import Icon from './Icon';
import { gapi } from 'gapi-script';
import useStyles from './styles';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const clearIntervalRef = useRef();
    const [timer, setTimer] = useState(60);
    const [isVerified, setVerified] = useState(false);
    const [inputOtp, setInputOtp] = useState('');
    const [otp, setOtp] = useState(0);

    useEffect(() => {
        const start = async () => {
            try {
                await gapi.client.init({
                    clientId: "140083932391-4846kjcp9bhv4ctbfto324cr4d8tnv53.apps.googleusercontent.com",
                    scope: 'email',
                });
            } catch (error) {
                console.error('Error initializing Google API:', error);
            }
        };
        gapi.load('client:auth2', start);
    }, []);

    const setTime = () => {
        setOtp(0);
        setTimer(60);
        clearInterval(clearIntervalRef.current);
    };

    const sendOtp = async () => {
        try {
            const res = await props.otp(formData.email);
            setOtp(res);
            clearIntervalRef.current = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    const verify = () => {
        if (inputOtp === otp) {
            setVerified(true);
            clearInterval(clearIntervalRef.current);
        } else {
            console.log('Invalid OTP');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSignUp) {
            if (!isVerified) {
                console.error('Please verify your email');
                return;
            }
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            navigate('/');
        } catch (error) {
            console.error('Google authentication error:', error);
        }
    };

    const googleFailure = (error) => {
        console.error('Google authentication failed:', error);
    };

    return (
        <div className={classes.root}>
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {isSignUp && (
                                <>
                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                                </>
                            )}
                            <Input name='email' id="email" label='Email Address' handleChange={handleChange} type="email" value={formData.email} />
                            <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            {isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
                            {isSignUp && otp === 0 ? (
                                    <Button onClick={sendOtp} id="sendOtp" color='primary' className={classes.submit}>Send OTP</Button>
                                ) : (
                                    isSignUp && !isVerified ? (
                                        <>
                                            <Input placeholder="Enter OTP" value={inputOtp} onChange={(e) => setInputOtp(e.target.value)} />
                                            <Button onClick={verify} style={{ borderRadius: "10%", padding: ".5%" }}>Verify</Button>
                                            <p style={{ color: "red" }}>{timer >= 0 ? timer : setTime()}</p>
                                        </>
                                    ) : (
                                        isSignUp && <p style={{ color: "green" }}>Verified</p>
                                    )
                            )}


                        </Grid>
                        <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <GoogleLogin
                            clientId="140083932391-4846kjcp9bhv4ctbfto324cr4d8tnv53.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <Button
                                    className={classes.googleButton}
                                    color='primary'
                                    fullWidth
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    startIcon={<Icon />}
                                    variant='contained'>
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    );
}

export default Auth;
