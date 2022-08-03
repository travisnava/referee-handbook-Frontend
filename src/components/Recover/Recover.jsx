import React from 'react'
import { useState } from "react"
import { Link } from "react-router-dom"
import apiClient from '../../services/apiClient';
import "./Recover.css"


//MUI imports to save time on components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function Recover() {


    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [isProcessing, setIsProcessing] = useState(null)




    const handleOnSubmit = async () => {
        setIsProcessing(true)
        setError(null)

        if(!email) {
            setError("Email required")
            setIsProcessing(false)
            return
        }

        if (email.indexOf("@") <= 0){
            setError("Invalid email.")
            setIsProcessing(false)
            return
        }

        const { data, error } = await apiClient.recoverAccount(email)
        if (error) {
            setError(error)
        }
        if (data?.message) {
            setMessage(data.message)
        }

        setIsProcessing(false)
    }







  return (
    <div className="recover">
        <div className ="recover-account-form-container">


            
                <h1 className="recover-account-form-title">Account Recovery</h1>






                {message ? (
                    <div className="message-container">
                        <span className="recover-account-success-message">{message}</span>
                        <p className="home-redirect">Redirect to home <Link className="home-redirect-link" to ="/">here</Link></p>
                    </div>
                ) : ( 
                    <div className="recover-account-form-input">
                        <p className="recover-account-form-subtitle">Enter the email address associated with your account</p>
                        <br/>
                        <div className="recovery-email-input-container">
                            <TextField
                            className="input-field"
                            id="outlined-email-input"
                            label="Email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            sx={{backgroundColor : 'white', width: "75%"}}
                            variant="filled"
                            inputProps={{ maxLength: 250 }}
                            />
                        </div>

             
                        <div className="recover-account-btn-container">
                            <Button className="recover-account-btn" disabled={isProcessing} onClick={handleOnSubmit} variant="contained" size="large"   shrink="false" sx={{ color: 'black', width: "50%", fontSize: '17px', backgroundColor: 'whitesmoke', ':hover' :{ bgcolor: 'gray', color: 'white'} }} > {isProcessing ? "Loading..." : "Recover Account"}</Button>
                        </div>
                        {error && <span className="recover-account-error">{error}</span>}
                        <div className="recover-footer">
                            <p className="recover-login-redirect-text">Have an account? Login <Link className ="recover-login-redirect-link" to ="/login">here</Link></p>
                        </div>

                    </div>
                )}




        </div>
    </div>
  )
}
