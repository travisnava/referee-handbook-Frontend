import * as React from 'react';
import PropTypes from 'prop-types';

import { useState } from 'react';
import { useLearningContext } from '../../contexts/learning'
import { useNavigate } from "react-router-dom";

import "./DropDownCreate.css"


import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import CreateIcon from '@mui/icons-material/Create';

//This displays the text when the drop down button is clicked
function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} >

      <DialogTitle sx={{ backgroundColor: "#383838", color: "whitesmoke", paddingBottom: "5%", display: "flex", justifyContent: "center" }} >Choose a sport</DialogTitle>

      {/* For every sport, renders the option to pick it within the pop up  */}
      <List sx={{ pt: 0, width: "100%", textAlign: "center", backgroundColor: "#363232", color: "whitesmoke" }}>
        {props.beginnerCourses.map((sport) => (
          <ListItem sx={{paddingTop: "5%"}} button onClick={() => handleListItemClick(sport.sport_name)} key={sport.sport_name}>
            <ListItemAvatar>
              <img className="drop-down-img" src={sport.beginner_cover_image_url} alt={sport.sport_name} />
            </ListItemAvatar>
            <ListItemText primary={sport.sport_name} className="sport-text" />
          </ListItem>
        ))}

        
      </List>
    </Dialog>
  );
}

//Ensures the popup REQUIRES the following props.
SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function DropDownCreate() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('None');

  const { beginnerCourses } = useLearningContext()

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);

    setSelectedValue(value);

  };


  // Set the current sport in local storage and redirect to the appropriate course form 
  const handleNavigate = () => {

    const pickedCourse = beginnerCourses.find(course => course.sport_name === selectedValue)
    localStorage.setItem("current_course", JSON.stringify(pickedCourse))

    navigate(`/learning/${pickedCourse.sport_name}/create`)
  }

  return (
    <div>
      <Typography variant="subtitle1" component="div">
        <h4 className="selected-text">Selected:</h4> <span>{selectedValue}</span>
      </Typography>
      <br />
      <Button variant="contained" onClick={handleClickOpen} sx={{ height: "40px", backgroundColor: "#383838"}}>
        Choose a sport
      </Button>
      <SimpleDialog
        beginnerCourses={beginnerCourses}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
      <Button variant="contained" sx={{height: "40px", backgroundColor: "#F1D433"}} onClick={handleNavigate} endIcon={<CreateIcon  />}>
      </Button>
    </div>
  );
}
