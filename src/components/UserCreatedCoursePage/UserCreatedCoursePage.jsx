import React from 'react'
import ReactMarkdown from 'react-markdown'

import { useState, useEffect } from 'react'

import { useLearningContext } from '../../contexts/learning'
import { useAuthContext } from "../../contexts/auth"

import apiClient from '../../services/apiClient'
import { useNavigate } from 'react-router-dom'

import "./UserCreatedCoursePage.css"
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import LearningSubBanner from '../LearningSubBanner/LearningSubBanner'

function UserCreatedCoursePage() {
    
    const navigate = useNavigate();
    
    //context variables
    const { setCurrentlyEditing } = useLearningContext()

    //local state variables
    const [userOwned, setUserOwned] = useState(false);
    const [rating, setRating] = useState({})
    const [error, setError] = useState(null)
    const [isProcessing, setIsProcessing] = useState(null)

    let currentSport = JSON.parse(localStorage.getItem("current_course"))
    let currentCourse = JSON.parse(localStorage.getItem("current_user_course"))


    const { user } = useAuthContext()

  


    //fetching currently signed in user's rating for current course that they're viewing
    useEffect(() => {
        const fetchUserRatingForCourse = async () => {
            setIsProcessing(true)
            setError(null)

           if(!user?.email){
            setError("You must be logged in to rate courses.")
            setIsProcessing(false)
            return
           } 
           else {
            const {data, error} = await apiClient.fetchRatingForCourseByUser(currentSport.sport_name, currentCourse.courseId)
            if(data){
              // console.log("fetched data", data.rating)
              console.log("user rating", data.rating.rating)
              setRating(data.rating)
              // console.log("rating", rating)
            }
            if(error){
              setError(error)
            }
            setIsProcessing(false)

           }



        }
        fetchUserRatingForCourse()
      }, [])

      //handler to submit
    const handleOnRatingSubmit = async (evt) => {
        setError(null)
        setIsProcessing(true)


        //if user doesn't already have a rating for this course, then create one
        if(!rating) {
            const {data, error} = await apiClient.createRatingForCourse({["rating"]: evt.target.value }, currentSport.sport_name, currentCourse.courseId)
            if (error) {
              setError(error)
            }
            if(data){
                setRating(data.rating)
            }
        }
        //user already has a rating for this course created, so update their current rating
        else {

            
            const {data, error} = await apiClient.updateRatingForCourse({["rating"]: evt.target.value }, currentSport.sport_name, currentCourse.courseId)
            if (error) {
                setError(error)
            }
            if(data){
                setRating(data.rating)
                console.log("submitted data", data)
            }
        }

        setIsProcessing(false)
      }

















    //get the currently signed in user's information via api client
    useEffect(() => {
        const fetchCourseOwner = async () => {
          const {data, error} = await apiClient.fetchUserFromToken()
          
          //checks that a user owns the course signed in.
          if(data?.user?.username === currentCourse.username){
            setUserOwned(true)
          } else {
            setUserOwned(false)
          }
          if(error){
            console.error("error is: ", error)
          }
        }
      
        fetchCourseOwner()
      }, [])


    //navigate to course form with user filled information as a prop 
    function handleEditCourse () {

        // set the current user course in local storage
        
        
        //set the currently editing global state variable to the current course
        setCurrentlyEditing(currentCourse)

        navigate(`/learning/${currentSport.sport_name}/create`)
    }

    //Regular expressions for video code section (dependent on inclusion of ampersand)
    const containsVideoCode = /watch\?v\=(.*)/
    const containsAmpersand = /watch\?v\=(.*)\&/

    /* Regex tests 
        1. does the url contain ATLEAST the video code
        2. does the url contain ATLEAST the video code AND the ampersand
    */
    const acceptableFormat = containsVideoCode.test(currentCourse.course_tutorial_video_url)
    const acceptableAmpersand = containsAmpersand.test(currentCourse.course_tutorial_video_url)
    
    //Sets out video code to the appropriate value based on the inclusion of the ampersand
    let videoCode = acceptableFormat ? currentCourse.course_tutorial_video_url.match(containsVideoCode)[1] : null  //no ampersand
    videoCode = acceptableAmpersand ? currentCourse.course_tutorial_video_url.match(containsAmpersand)[1] : videoCode   //ampersand
    
    
    const ourUrl = "https://www.youtube.com/embed/" + videoCode;

    //regular expression to extract timespan 
    const condensedDate = currentCourse.created_at.match(/^(.*)T/)[1]


    return (
        <div className='user-create-course'>
            
            {/* Conditionally render Learning sub banner if the current course is stored locally (purpose: user persistance) */}
            
            { currentSport ? <LearningSubBanner courseName={currentSport.sport_name} showButtons="true"/> : null} 
            

            <div className='user-content'>
                {/* Render chunk of user created course content  */}
                <div className='main-user-content'>

                    {/* If the user owns the course, they can edit the course via courseform */}
                    {userOwned && 
                        <div className='edit-section'>
                            <Button className="edit-course-button" onClick={handleEditCourse} variant="contained" size="large" endIcon={<SendIcon/>}  shrink="false" sx={{ color: 'white', backgroundColor: 'gray', ':hover' :{ bgcolor: '#1F1F1F', color: 'white'} }} >Edit course</Button>
                        </div>
                    }

                    {/* Title and date */}
                    <span className='course-information'>
                        <h3 className='cb-title'>{currentCourse.course_title}</h3>
                        <span className="cb-subtitle">
                            <h4 className='cb-username'>Created by {currentCourse.username} on {condensedDate}</h4>
                            <span className ="ratings-container">
                                <Stack spacing={1}>
                                    <Typography sx={{ fontSize: "14px", margin: "0" }} component="legend"><em>{userOwned ? "Cannot rate your own course :( " : user?.username ? "Rate this course below!" : "Sign in to rate this course!"}</em></Typography>
                                    <Rating name="half-rating" onChange={(evt) => {handleOnRatingSubmit(evt)}} value={rating?.rating ? rating.rating : 0} precision={0.5} defaultValue={rating?.rating ? rating.rating : 0}  size="large" disabled={!user?.email || userOwned}/>
                                </Stack>
                            </span>

                        </span>
                    </span>

                    {/* Line separator */}
                    <span className='line-break'>
                        <hr style={{
                            height: 1.5,
                            borderColor : '#000000'
                        }}/>
                    </span>

                    {/* Course content descriptions, both short and long */}
                    <section className='short-description'>
                        <p>{currentCourse.course_short_description}</p>
                    </section>
                    <section className='long-description'>
                        <ReactMarkdown>{currentCourse.course_content}</ReactMarkdown>
                    </section>
                </div>

                {/* Renders youtube video onto the screen IF it contains a video code */}
                {currentCourse.course_tutorial_video_url ? 
                    <div className='video-container'>
                        <h2>YouTube Tutorial</h2>
                        <iframe
                            src={ourUrl}
                            width="750"
                            height="400"
                            allowFullScreen
                        />
                    </div> : 
                    <div className='empty-space'></div>
                    }
                
                {/* Renders tips and tricks section  */}
                <div className='tips-and-tricks'>

                    {/* Title  */}
                    <h2 className='tips-and-tricks-title'>{'Tips & Tricks'}</h2>

                    {/* Line separator */}
                    <span className='line-break'>
                        <hr style={{
                            height: 1.5,
                            borderColor : '#000000'
                        }}/>
                    </span>
                    
                    {/* Tips and tricks text section */}
                    <div className='tips-and-tricks-text'>
                        <ReactMarkdown>{currentCourse.course_tips_tricks}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCreatedCoursePage