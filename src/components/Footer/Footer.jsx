import React from 'react'
import './Footer.css'
import logo from '../../assets/handbook-logo.png'

// mui imports
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

//importing link to allow users to redirect to landing page through logo in footer
import { Link } from "react-router-dom" 

export default function Footer() {
    return(
        <div className="footer">
            <div className="top-half-container">
                <div className="logo-container">
                    <Link to="/"><img className="footer-logo" src={logo} alt="Referee's Handbook logo"></img></Link>
                </div>
                <div className="footer-header">
                    <h4 className ="footer-title">About Us</h4>
                    <p className="footer-body">This website was created by three interns: Aileen Ji, Ernesto Enriquez, and Travis Navarro. This is our Capstone Project for CodePath's Summer 2022 Internship for Tech Excellence program, partnered with Workday.</p>
                </div>
                <div className="footer-header">
                    <h4 className ="footer-title">Resources Used</h4>
                    <div className="footer-body-top">
                        <p className ="footer-body"><a target="_blank" href="https://mui.com/"><img id ="mui-logo" src="https://mui.com/static/logo.png"></img></a></p>
                        <p className ="footer-body"><a target="_blank" href="https://www.thenewsapi.com/"><img id ="news-api-logo" src="https://www.thenewsapi.com/website_assets/img/thenewsapi-logo.svg"></img></a></p>  
                        <p className ="footer-body"><a target="_blank" href="https://timeline.knightlab.com/"><img id ="knightlabs-logo" src="https://cdn.knightlab.com/libs/orangeline/latest/assets/knightlab-dark.png"></img></a></p>
                    </div>
                    <div className="footer-body-bottom">
                        <p className ="footer-body"><a target="_blank" href="https://api-sports.io/"><img id = "api-sports-logo" src="https://pbs.twimg.com/profile_images/1248589572730044423/bdT7f7ig_400x400.jpg"></img></a></p>     
                        <p className ="footer-body"><a target="_blank" href="https://loading.io/"><img id ="loading-io-logo" src="https://images.saasworthy.com/loadingio_7824_logo_1623317995_uydrp.jpg"></img></a></p>
                        <p className ="footer-body"><a target="_blank" href="https://www.twilio.com/sendgrid/email-api"><img id ="twilio-sendgrid-logo" src="https://d15tnd3q55f8nl.cloudfront.net/static/SG_Twilio_Lockup_Social-56f3cfd2f6b0c62422980170d57fac64.png"></img></a></p>
                    </div>
                </div>
                
            </div>
            <div className ="bottom-half-container">
                <ul className = "icon-list">
                    <li className = "icon-item">
                    <a target="_blank" className ="icon-anchor" href="https://github.com/workday-group-3"><GitHubIcon sx={{ fontSize: 30 }}/></a>
                    </li>
                    <li className = "icon-item">
                        <a target="_blank" className ="icon-anchor"href="https://www.linkedin.com/school/codepath-org/"><LinkedInIcon sx={{ fontSize: 30 }}/></a>
                    </li>
                    <li className = "icon-item">
                        <a className ="icon-anchor" href = "mailto: referees.handbook.app@gmail.com;?subject=We are surprised you clicked on that button.&body=Hi!" ><EmailIcon sx={{ fontSize: 30 }}/></a>
                    </li>

                </ul>
            </div>
        </div>
    )
        
}