import React, { useEffect, useState } from 'react'
import profilePicturePlaceholder from '../../assets/profile-picture-placeholder.jpg'

//styling
import "./CoursesListPage.css"

//import components
import LearningSubBanner from '../LearningSubBanner/LearningSubBanner'

//contexts
import { useLearningContext } from '../../contexts/learning'

//routing
import { Link } from "react-router-dom"
import apiClient from '../../services/apiClient'

//import for date formatting
import Moment from "moment"

//MUI component imports to enable drop down menu to select difficulty level of course to filter by
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import StarIcon from '@mui/icons-material/Star';

function CoursesListPage(props) {

  const { setCurrentlyEditing } = useLearningContext();

  //creating useState variables to store list of userCreated courses, so that we can easily render from each page, along with variable for error handling
  const [userCourses, setUserCourses] = useState([])
  const [error, setError] = useState(null)
  const [difficulty, setDifficulty] = useState('')

  //function to set the current beginner course in local storage
  async function setCourseHandler(userCourse) {
    localStorage.setItem("current_user_course", JSON.stringify(userCourse)) 
  }

  // pulling current course from local storage, parsing the string into json
  let currentCourse = JSON.parse(localStorage.getItem("current_course"))

  const handleDropdownChange = (evt) => {
    setDifficulty(evt.target.value)
  }

  
  //pulling list of all user made courses to render in components below
  useEffect(() => {
    const fetchUserCourses = async () => {
      const {data, error} = await apiClient.listUserCoursesBySport(currentCourse.sport_name)
      if(data){
        setUserCourses(data.userCourses)
      }
      if(error){
        setError(error)
      }
    }
  
    fetchUserCourses()
  }, [])


  //filter through current courses in state variable, only if user has selected a difficulty level
  const filterByDifficulty =
    difficulty != '' ? userCourses.filter((course) => course.difficulty === difficulty) : userCourses


  



  return (
    
    <div className='courses-list'>
      
      { currentCourse ? <LearningSubBanner courseName={currentCourse.sport_name} showButtons="false"/> : null}
      
      <div className='beginner-course-list'>
      {/* Once the promise to add the current course to our currentCourse context variable has been
          fulfilled, render the LearningBanner component */}

      <div className="beginner-course-title-container">
            <h1 className="beginner-course-title">Start Your Journey Here</h1>
      </div>
      <Link className ="course-link" to={`/learning/${currentCourse.sport_name}/beginner`}>
        <div className='beginner-course-option'>
          <div className='img'>
            <img className='course-image' src={currentCourse.beginner_cover_image_url} alt={`${currentCourse.sport_name} image`} ></img>
          </div>
          <div className='course-text'>
            <h1 className="course-text-title"><em>Beginner Course</em></h1>
            <p className="course-text-body">Our beginner {currentCourse.sport_name} course offers an indepth as well as a big picture overview of the sport. Learn about it's history, rules and regulations, and objectives. To aid in your educational journey, we've included a how-to video as well as a diagram of the field to aid in visualization!</p>
          </div>
        </div>
      </Link> 
      </div>

{/* --------------------------------------- User created course section ------------------------------------- */}

      <div className="user-created-course-section">
        <div className="user-created-courses-title-container">
          <h1 className="user-created-courses-title"> User Created Courses</h1>
          <div className="dropdown-container">
            <div className="dropdown-btn-container">

          

              <Box sx={{colorScheme: "white"}}>
                <FormControl variant="filled" sx={{ m: 1, minWidth: "10ch", width: "15ch", borderRadius: "6px", backgroundColor: "whitesmoke", color: "whitesmoke"}}>
                    <InputLabel>FILTER BY</InputLabel>
                    <Select

                      value={difficulty}
                      onChange={handleDropdownChange}>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Beginner"}>Beginner</MenuItem>
                      <MenuItem value={"High School"}>High School</MenuItem>
                      <MenuItem value={"Collegiate"}>Collegiate</MenuItem>
                      <MenuItem value={"Amateur"}>Amateur</MenuItem>
                      <MenuItem value={"Professional"}>Professional</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
            </div>
          <div className="create-course-btn-container">
            <Link className ="create-course-link" to = {`/learning/${currentCourse.sport_name}/create`}><Button className="create-course-btn"  onClick={() => setCurrentlyEditing({})} variant="contained" size="large"   shrink="false" sx={{ color: 'black',  height:"6ch", fontSize:"16px", backgroundColor: 'whitesmoke', ':hover' :{ bgcolor: 'gray', color: 'white'} }} >Create a Course</Button></Link>
          </div>
        </div> 
        </div>
      </div>

      
      {/* condtional rendering for user course list, alongside with filtering if necessary */}

      <div className="user-courses-list">
          {filterByDifficulty[0] ?
          filterByDifficulty.map((course) => {
            
            //checking if user has a profile picture, if not use placeholder
            let profilePicture;
            {course.profile_image_url === null ? profilePicture = profilePicturePlaceholder : profilePicture = course.profile_image_url}

            return(
              <Link className="user-course-redirect" to={`/learning/${currentCourse.sport_name}/userCreated/${course.courseId}`}>
                <div className="user-created-course" onClick={() => setCourseHandler(course)}>
                            <span className ="user-course-ratings-container">
                                <Stack spacing={1}>
                                    <Rating name="half-rating" defaultValue={course.rating ? course.rating : 0} precision={0.5} readOnly="true" emptyIcon={<StarIcon style={{ opacity: 1, color: "white" }}   />} />
                                </Stack>
                            </span>
                    <div className="user-created-course-img-container">
                      <img className="user-created-course-img" src={course.course_cover_image_url} onError={e => { e.currentTarget.src = "https://ca.ingrammicro.com/_layouts/images/CSDefaultSite/common/no-image-lg.png"; }}/>
                      <p className="user-created-course-creation-date"><img className="user-created-profile-picture" src = {profilePicture} onError={e => { e.currentTarget.src = profilePicturePlaceholder; }} alt={`Profile Picture for ${course.username}`}></img><em className="user-created-course-username"> {course.username}</em>  |  Created on {Moment(new Date(course.created_at)).format("MMMM Do, YYYY")}</p>
                    </div>
                    <div className="user-created-course-content">
                      <h1 className="user-created-course-title"><em>{course.course_title}</em></h1>
                      <p className="user-created-course-short-description">{course.course_short_description}</p>
                      <p className="user-created-course-difficulty"><em>{course.difficulty}</em></p>
                    </div>  
                  </div>
              </Link>
                
            )
          }) 
          
          : <h1 className="no-courses-message"><em>No user courses created yet</em></h1>}
      </div>
      








    </div>
  )
}

export default CoursesListPage






