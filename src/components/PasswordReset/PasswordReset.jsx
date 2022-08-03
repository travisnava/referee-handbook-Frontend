import { usePasswordResetForm } from "../../hooks/usePasswordResetForm";
import "./PasswordReset.css"


import { useLocation, Link } from "react-router-dom"
import React from 'react'

//MUI imports to save time on components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';





export default function PasswordReset() {

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const token = searchParams.get("token")
    const { form, error, message, isProcessing, handleOnSubmit, handleOnInputChange } = usePasswordResetForm(token)


  return (
    <div className="password-reset">
        <div className ="password-reset-form-container">
            <h2 className="password-reset-form-title">Reset Password</h2>


            




            {message ? (
                <div className="password-reset-message-container">
                    <span className="password-reset-message">{message}</span>
                    <p className="password-reset-login-redirect">Login <Link className="password-reset-link" to="/login">here</Link> with your new password</p>
                </div>
            ) : ( 
                <div className="password-reset-form">
                    <p className="recover-account-form-subtitle">Set your new password below, and you'll be ready to go!</p>

                    <br/>
                    <div className="reset-password-input-container">
                        <TextField
                        className="input-field"
                        id="outlined-password-input"
                        label="New Password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleOnInputChange}
                        sx={{backgroundColor : 'white', width: "75%"}}
                        variant="filled"
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
                            value={form.confirmPassword}
                            onChange={handleOnInputChange}
                            sx={{backgroundColor : 'white', width: "75%"}}
                            variant="filled"
                            inputProps={{ maxLength: 250 }}
                            />
                    </div>


                    <div className="password-reset-btn-container">
                            <Button className="password-reset-btn" disabled={isProcessing} onClick={handleOnSubmit} variant="contained" size="large"   shrink="false" sx={{ color: 'black', width: "50%", fontSize: '17px', backgroundColor: 'whitesmoke', ':hover' :{ bgcolor: 'gray', color: 'white'} }} >{isProcessing ? "Loading..." : "Save Password"}</Button>
                    </div>
                </div>
            )}
            {error && <div className="password-reset-error-container"><span className="password-reset-error">{error}</span></div>}


        </div>

    </div>
  )
}

