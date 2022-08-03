import React from 'react'
import './RegisterPage.css'

//asset imports
import logo from '../../assets/handbook-logo.png'

//MUI imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

//react imports
import { Link } from 'react-router-dom';

//custom hook
import { useRegistrationForm } from '../../hooks/useRegistrationForm'


export default function RegisterPage() {
            
  const { userRegisterForm, error, handleOnInputChange, handleOnSubmitRegisterForm, isProcessing } = useRegistrationForm()                  



  return (
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1.25, width: '50ch', },
    }}
    noValidate
    autoComplete="off">
      <div className="register-page">
        <img className = "register-background-image" src="https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80" alt=""></img>
        <div className="register-page-box">
          <div className = "register-page-logo">
            <Link to = "/"><img className="register-logo" src={logo} alt="Referee's Handbook logo" /></Link>
          </div>
        <div className="register-form-container">
          <div className="email-input-container">
            <TextField
              className="input-field"
              id="outlined-email-input"
              label="Email"
              type="email"
              name="email"
              value={userRegisterForm.email}
              onChange={handleOnInputChange}
              sx={{backgroundColor : 'white'}}
              variant="filled"
              inputProps={{ maxLength: 250 }} 
              />
          </div>
          <div className="username-input-container">
            <TextField
              className="input-field"
              id="outlined-username-input"
              label="Username"
              type="text"
              name="username"
              value={userRegisterForm.username}
              onChange={handleOnInputChange}
              sx={{backgroundColor : 'white'}}
              variant="filled"
              inputProps={{ maxLength: 250 }}
              />
          </div>
          <div className="location-input-container">
            <TextField
              className="input-field"
              id="outlined-location-input"
              label="Location"
              type="text"
              name="location"
              value={userRegisterForm.location}
              onChange={handleOnInputChange}
              sx={{backgroundColor : 'white'}}
              variant="filled"
              inputProps={{ maxLength: 250 }}
              />
          </div>
            <div className="name-input-container">
              <TextField
                className="first-name-input-field"
                id="outlined-first-name-input"
                label="First Name"
                type="text"
                name="firstName"
                value={userRegisterForm.firstName}
                onChange={handleOnInputChange}
                sx={{backgroundColor : 'white'}}
                variant="filled"
                inputProps={{ maxLength: 250 }}
                />
                <TextField
                className="last-name-input-field"
                id="outlined-last-name-input"
                label="Last Name"
                type="text"
                name="lastName"
                value={userRegisterForm.lastName}
                onChange={handleOnInputChange}
                sx={{backgroundColor : 'white'}}
                variant="filled"
                inputProps={{ maxLength: 250 }}
                />
            </div>
          <div className="profile-picture-url-input-container">
            <TextField
              className="input-field"
              id="outlined-profile-picture-url-input"
              label="Profile Picture Image URL (OPTIONAL)"
              type="text"
              name="profileImageURL"
              value={userRegisterForm.profileImageURL}
              onChange={handleOnInputChange}
              sx={{backgroundColor : 'white'}}
              variant="filled"
              inputProps={{ maxLength: 250 }}
              />
              
            </div>
          <div className="password-input-container">
            <TextField
              className="input-field"
              id="outlined-password-input"
              label="Password"
              type="password"
              name="password"
              value={userRegisterForm.password}
              onChange={handleOnInputChange}
              sx={{backgroundColor : 'white'}}
              variant="filled"
              autoComplete="current-password"
              inputProps={{ maxLength: 250 }}
              />
            </div>
            <div className="confirm-password-input-container">
              <TextField
                className="input-field"
                id="outlined-confirm-password-input"
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={userRegisterForm.confirmPassword}
                onChange={handleOnInputChange}
                sx={{backgroundColor : 'white'}}
                variant="filled"
                autoComplete="current-password"
                inputProps={{ maxLength: 250 }}
                />
            </div>
            <div className="submit-register-btn-container">
              <Button className="submit-register-btn" variant="contained" size="large" endIcon={<SendIcon/>}  onClick={handleOnSubmitRegisterForm} shrink="false" sx={{ color: 'black', backgroundColor: 'white', ':hover' :{ bgcolor: 'gray', color: 'white'} }} >{isProcessing ? "Loading..." : "REGISTER"}</Button>
              {error? <p className ="register-error">{error}</p>: null}
            </div>
          <div className="login-redirect">
            <p className = "login-redirect-text">Already have an account? Login <Link className="redirect-link" to ="/login">here</Link></p>
          </div>
        </div>
        </div>
      </div>
    </Box>
  )
}

