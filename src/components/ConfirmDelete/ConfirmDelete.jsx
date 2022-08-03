import * as React from 'react';

import { useState } from 'react';
import { useEffect } from 'react';

import apiClient from '../../services/apiClient';

import "./ConfirmDelete.css"

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function ConfirmDelete( props ) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(null)
  const [confirmText, setConfirmText] = useState(null)
  
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    //handlers for form components
    function handleOnInputChange (evt) {
        setConfirmText((form) => ({ ...form, [evt.target.name]: evt.target.value }))
    }

    async function handleDeleteCourse (course) {
        

      setError(null)

      if(confirmText.confirmMessage === (`${props.course.email}/${props.course.course_title}`)) {

          const { data, error } = await apiClient.deleteCourse(course.sport_name, course.courseId)

          handleFetchNewData();

          if (data) {
            handleClose();
          }
      } else {
          setError("Please input the appropriate text or hit cancel to return")
      }

    async function handleFetchNewData() {
      //fetching user owned courses to display
      
      const {data, error} = await apiClient.listUserOwnedObjectsByUser()
      if(data){
        props.setUserOwnedCourses(data.userCourses)
      }

    }

    }
  
    return (
      <div>
        <Button variant="outlined" color="error" onClick={handleClickOpen}>
            {`Delete ${props.course.course_title}`}
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Delete Course</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div className="warning-msg">
                ATTENTION! There is no going back once a course has been deleted. <br />
                Please type 
                <b>
                {` ${props.course.email}/${props.course.course_title} `} 
                </b>
                to confirm.
              </div>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Confirm deletion"
              name="confirmMessage"
              type="email"
              onChange = {handleOnInputChange}
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={() => handleDeleteCourse(props.course)}>Confirm Deletion</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
          {error? <p className ="confirm-error">{error}</p>: null}
        </Dialog>
      </div>
    );
  }