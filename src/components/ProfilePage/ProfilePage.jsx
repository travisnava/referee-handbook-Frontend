import React from 'react'
import './ProfilePage.css'
import profilePicturePlaceholder from '../../assets/profile-picture-placeholder.jpg'

import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';
import DropDownCreate from '../DropDownCreate/DropDownCreate';

//importing mui components to render throughout the page
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import ScheduleSharpIcon from '@mui/icons-material/ScheduleSharp';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';


//importing auth context to render components with user data and check for profile picture placeholder requirements
import { useAuthContext } from "../../contexts/auth"


//importing to be able to pull data for components and keep it in state variable for storage
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"


//import for date formatting
import Moment from "moment"


//importing apiClient to call to the backend for retrieving user created courses
import apiClient from '../../services/apiClient';



export default function ProfilePage() {


    //creating state variables to store user created courses after they're pulled from the useEffect hook below
    const [userOwnedCourses, setUserOwnedCourses] = useState([]) 
    const [userTeams, setUserTeams] = useState([])
    const [error, setError] = useState(null)



    //fetching user owned courses to display
    useEffect(() => {
        const fetchUserOwnedObjects = async () => {
          const {data, error} = await apiClient.listUserOwnedObjectsByUser()
          if(data){
            setUserOwnedCourses(data.userCourses)
            setUserTeams(data.userTeams)
          }
          if(error){
            setError(error)
          }
        }
        fetchUserOwnedObjects()
      }, [ ])



    //function to set the current beginner course in local storage
    async function setCourseHandler(userCourse) {
        
        const includeUsername = {
            ...userCourse,
            username: user.username
        }
        localStorage.setItem("current_user_course", JSON.stringify(includeUsername)) 
    }

    const { user } = useAuthContext()


    //checking if user has a profile picture, if not use placeholder
    let profilePicture;
    {user.profileImageUrl === null ? profilePicture = profilePicturePlaceholder : profilePicture = user.profileImageUrl}

    
    
    

  return (
    <div className="profile-page">
        <div className="profile-page-user">
            <div className="profile-page-header">
                <div className ="profile-picture-container">
                    <img className="profile-picture" src= {profilePicture} onError={evt => { evt.currentTarget.src = "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" }} alt="User profile picture"/>
                    
                </div>
                <div className="user-section">
                    <div className="profile-user-info">
                        <h1 className="profile-picture-username">@<em>{user.username}</em></h1>
                        <h3 className="profile-picture-name"><AccountCircleIcon className ="profile-icon" color = "grey" />{user.firstName + " " + user.lastName}</h3>
                        <h3 className="profile-location"><LocationOnSharpIcon className ="profile-icon" color ="grey" />{user.location}</h3>
                        <h3 className="profile-account-creation-date"><ScheduleSharpIcon className="profile-icon" color ="grey"/> Joined on {Moment(new Date(user.createdAt)).format("MMMM Do, YYYY")}</h3> 
                    </div>
                </div>
            </div>
            <div className ="profile-page-details-container">
                <div className= "details-title-container">
                    <h1 className="details-title"><em>About Me</em></h1>
                </div>
                <Box
                component="form"
                sx={{
                '& .MuiTextField-root': { m: 2, width: '45ch', color: 'white' },
        
                }}
                noValidate
                autoComplete="off">
                    <div className ="details-container">
                        <div className ="user-detail">
                            <TextField
                            sx={{backgroundColor : 'white'}}
                            className="detail-field"
                            label="Username"
                            type="text"
                            name = "username"
                            value = {user.username}
                            variant="filled"
                            InputProps={{ readOnly: true }}
                            />
                        </div>
                        <div className ="user-detail-name">
                            <TextField
                            sx={{backgroundColor : 'white'}}
                            className="detail-field"
                            label="First Name"
                            type="text"
                            name = "firstName"
                            value = {user.firstName}
                            variant="filled"
                            InputProps={{ readOnly: true }}
                            /> 
                            <TextField
                            sx={{backgroundColor : 'white'}}
                            className="detail-field"
                            label="Last Name"
                            type="text"
                            name = "lastName"
                            value = {user.lastName}
                            variant="filled"
                            InputProps={{ readOnly: true }}
                            />
                        </div>
                        <div className ="user-detail">
                            <TextField
                                sx={{backgroundColor : 'white'}}
                                className="detail-field"
                                label="Email"
                                type="email"
                                name = "email"
                                value = {user.email}
                                variant="filled"
                                InputProps={{ readOnly: true }}
                            />
                        </div>
                    </div> 
                </Box>
            </div>
        </div>
        <div className="courses-teams-container">
            <div className ="user-courses-container">
                <div className="user-courses-title-container">
                    <div className="title-container">
                        <h1 className="user-courses-title"><em>My Created Courses</em></h1>
                    </div>
                    
                </div>

                {/* condtional rendering to display either users created courses, or message that no courses created */}
                <div className ="user-courses-cards">
                    {userOwnedCourses[0] ? userOwnedCourses.map((course) => {
                        return (
                            <div className="individual-course" key={course}>
                                {/* when a user clicks on a course, it sets it to local storage and redirects them to that course page properly */}
                                <Link className ="user-created-course-redirect-link" to={`/learning/${course.sport_name}/userCreated/${course.courseId}`}>
                                    
                                    <div onClick={() => setCourseHandler(course)} className ="user-course-card-container">
                                        <div className="thumbnail-container">
                                            <div className="cover-image-category">
                                            <img className ="course-card-cover-image" src={course.course_cover_image_url} onError={e => { e.currentTarget.src = "https://ca.ingrammicro.com/_layouts/images/CSDefaultSite/common/no-image-lg.png"; }} alt={`Cover image for ${course.course_title}`}></img>
                                            <div className="category-and-date">
                                                <p className="course-card-date-category">{course.sport_name} | Created on {Moment(new Date(course.created_at)).format("MMMM Do, YYYY")}</p>
                                            </div>
                                        </div>      
                                    </div>
                                    <div className="title-description-container">
                                            <h1 className="user-course-card-title">{course.course_title}</h1>
                                            <p className="user-course-card-description">{course.course_short_description}</p>
                                        </div>
                                    </div>
                                </Link>

                                <div className='delete-course-container'>
                                    <ConfirmDelete setUserOwnedCourses={setUserOwnedCourses} course={course}/>
                                </div>
                            </div>
                        )
                    }) : 
                        <div className='drop-down'> 
                            {/* <h1 className="no-user-courses-message">No courses created, get started <Link  className ="learning-redirect" to ="/learning">here!</Link></h1> */}
                            <h1 className="no-user-courses-message">No courses created yet. Create one below!</h1>
                            <DropDownCreate/>
                        </div>
                    
                }
                </div>
            </div>


            <div className="user-teams-container">
                <div className="user-teams-title-container">
                    <h1 className="user-teams-title"><em>My Followed Teams</em></h1>
                </div>


            {/* condtional rendering to display either user's followed teams, or message that user is not following any teams */}

                <div className="user-followed-team-cards">
                    {userTeams[0] ? userTeams.map((team) => { 
                       return(
                        <Link className="followed-team-redirect"to= {`/sports/${team.team_sport_name}/${team.team_id}`}>
                            <div className="user-followed-team-card">
                                <div className="team-logo-container">
                                    <img src ={team.team_logo} className="profile-team-logo"></img>
                                </div>
                                <div className="team-information">
                                    <div className="team-name-container">
                                        <h1 className="team-name">{team.team_name}</h1>
                                    </div>
                                    <div className="team-content-container">
                                        <p className="team-content">{team.team_sport_name} | {team.team_league} | Following since {Moment(new Date(team.following_at)).format("MMMM Do, YYYY")}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                       ) 

                    }) : <h1 className="no-teams-error-msg"> Not following any teams currently, browse different sports teams <Link  className ="learning-redirect" to ="/sports">here.</Link></h1>}

                </div>

            </div>
        </div>
    </div>
  )
}