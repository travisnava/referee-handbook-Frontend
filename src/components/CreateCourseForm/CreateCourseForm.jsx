import React from 'react'
import './CreateCourseForm.css'
import { useState } from "react"
import { useNavigate, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import apiClient from '../../services/apiClient';
import { useLearningContext } from '../../contexts/learning'

import MarkdownModal from '../MarkdownModal/MarkdownModal';
import FullScreenPreview from '../FullScreenPreview/FullScreenPreview';

export default function CreateCourseForm() {

    const { currentlyEditing, setCurrentlyEditing } = useLearningContext();

    let currentSport = JSON.parse(localStorage.getItem("current_course"))

    const sportName = useParams();
    
    const filledCourseForm = {
        sportName: sportName.sportsName,
        courseName: currentlyEditing.course_title,
        coverImageURL: currentlyEditing.course_cover_image_url,
        shortDescription: currentlyEditing.course_short_description,
        difficulty: currentlyEditing.difficulty,
        detailedDescription: currentlyEditing.course_content,
        tipsAndTricks: currentlyEditing.course_tips_tricks,
        tutorialVideoURL: currentlyEditing.course_tutorial_video_url
    }

    
    const editing = Object.keys(currentlyEditing).length === 0 

    //global var
    let startingCourseForm = Object.keys(currentlyEditing).length === 0 ?
        {sportName: sportName.sportsName} :
        filledCourseForm

    //state variables
    const [courseForm, setCourseForm] = useState(startingCourseForm)
    const [isEdit, setIsEdit] = useState(editing) //currently editing the course form? 
    const [difficulty, setDifficulty] = useState(isEdit ? '' : filledCourseForm.difficulty)
    const [error, setError] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    
    const navigate = useNavigate()

    //handlers for opening and closing our markdown help modal
    function openModal (event) {
        event.preventDefault()
        setIsOpen(true)
    }

    function closeModal (event) {
        setIsOpen(false)
    }


    //handlers for form components
    function handleOnInputChange (evt) {
        setCourseForm((form) => ({ ...form, [evt.target.name]: evt.target.value }))
    }

    function handleDropdownChange (evt)  {
        setDifficulty(evt.target.value)
        setCourseForm((form) => ({ ...form, ["difficulty"]: evt.target.value }))
    }

    //create onsubmit handler to call apiClient and post new user created course 
    const handleOnSubmitCourseForm = async () => {

        setError(null)
        // if it is an edit, then make the api client update the entry

        const {data, error} = !isEdit ? 
            await apiClient.editCourse(sportName.sportsName, currentlyEditing.courseId , courseForm) :
            await apiClient.createUserCourse(courseForm, sportName.sportsName)
       
        

        if (error) {
          setError(error)
        }
        if(data || !isEdit){
            navigate(`/learning/${sportName.sportName}`)
        }

    }
    

    

  return (
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1.25, width: '70vw' },
    }}
    noValidate
    autoComplete="off">
        <div className="create-course-form">
            <div className="create-course-title-container">
                { sportName? <h1 className="create-course-title"><em>Create a New Course for {currentSport.sport_name}</em></h1> : null}
            </div>
            <div className="create-course-form-container">
                <div className="input-container">
                    <TextField
                    className="input-field"
                    label="Course Name"
                    type="text"
                    name="courseName"
                    value = {courseForm.courseName}
                    onChange = {handleOnInputChange}
                    sx={{backgroundColor : 'white'}}
                    variant="filled"
                    inputProps={{ maxLength: 250 }}
                    />
                </div>
                <div className="input-container">
                    <TextField
                    className="input-field"
                    label="Short Description"
                    type="text"
                    name="shortDescription"
                    multiline={true}
                    rows={2}
                    value = {courseForm.shortDescription}
                    onChange = {handleOnInputChange}
                    sx={{backgroundColor : 'white'}}
                    variant="filled"
                    inputProps={{ maxLength: 500 }}
                    />
                </div>

                {/* Open and close modal buttons */}
                <div className='open-modals'>
                    <div className='preview-markdown'><FullScreenPreview content={courseForm.detailedDescription}/></div>
                    <p className='modal-button' onClick={openModal}>Markdown cheat-sheet</p>
                </div>
                
                <div className='main-content-input'>

                    {/* render components for modals */}
                    <MarkdownModal open={isOpen} onClose={closeModal}/>
                   
                    <div className="input-container">
                        <TextField
                        className="input-field"
                        label="Detailed Description"
                        type="text"
                        name="detailedDescription"
                        multiline={true}
                        minRows={4}
                        maxRows={20}
                        value = {courseForm.detailedDescription}
                        onChange = {handleOnInputChange}
                        sx={{backgroundColor : 'white'}}
                        variant="filled"
                        inputProps={{ maxLength: 5000 }}
                        />
                    </div>
                </div>
                <div className ="medias">
                    <div className="media-input-container">
                        <TextField
                            className="tutorial-video-input-field"
                            label="YouTube Video URL"
                            type="text"
                            name="tutorialVideoURL"
                            value = {courseForm.tutorialVideoURL}
                            onChange = {handleOnInputChange}
                            sx={{backgroundColor : 'white'}}
                            variant="filled"
                            inputProps={{ maxLength: 500 }}
                            />
                            <TextField
                            className="cover-image-input-field"
                            label="Cover Image URL"
                            type="text"
                            name="coverImageURL"
                            value = {courseForm.coverImageURL}
                            onChange = {handleOnInputChange}
                            sx={{backgroundColor : 'white'}}
                            variant="filled"
                            inputProps={{ maxLength: 500 }}
                            />
                        <FormControl variant="filled" sx={{ m: 1, height: "6.5ch", minWidth: "15ch", width: "100ch", textAlign:"left", backgroundColor: "whitesmoke", color: "whitesmoke"}}>
                            <InputLabel>DIFFICULTY</InputLabel>
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
                    </div>
                </div>

                {/* Open and close modal buttons */}
                <div className='open-modals'>
                    <div className='preview-markdown'><FullScreenPreview content={courseForm.tipsAndTricks}/></div>
                </div>

                {/* render components for modals */}
                

                <div className="input-container">
                    <TextField
                    className="input-field"
                    label="Tips and Tricks"
                    type="text"
                    name="tipsAndTricks"
                    multiline={true}
                    rows={3}
                    value = {courseForm.tipsAndTricks}
                    onChange = {handleOnInputChange}
                    sx={{backgroundColor : 'white'}}
                    variant="filled"
                    inputProps={{ maxLength: 2500 }}
                    />
                </div>
            </div>
            <div className="submit-course-btn-container">
                <Button className="create-course-btn" onClick={handleOnSubmitCourseForm} variant="contained" size="large" endIcon={<CreateIcon/>}  shrink="false" sx={{ color: 'black', padding: "14px 110px", fontSize: '17px', backgroundColor: 'whitesmoke', ':hover' :{ bgcolor: 'gray', color: 'white'} }} > CREATE</Button>
            </div>
            {error? <p className ="course-submit-error">{error}</p>: null}
        </div>
    </Box>
  )
}

