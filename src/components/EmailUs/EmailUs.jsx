import * as React from 'react';
import { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [sportForm, setSportForm] = useState(null)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEmail = () => {
    setOpen(false);
  }

  //handlers for form components
  function handleOnInputChange (evt) {
    setSportForm((form) => ({ ...form, [evt.target.name]: evt.target.value }))
  }



  return (
    <div>
      <Button variant="contained" sx={{ backgroundColor: "#F1D433"}} onClick={handleClickOpen}>
        Wish to add a sport?
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Email us!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Leave your mark! Add a sport name below for consideration in Referee's Handbook upcoming release!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="sportname"
            label="Sport name"
            type="email"
            onChange = {handleOnInputChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <a className ="icon-anchor" href = {`mailto: ernesto.enriquez.site@codepath.org; travis.navarro.site@codepath.org; aileen.ji.site@codepath.org?subject=NEW SPORT REQUEST&body=Greetings, I would like to add the following sport: ${sportForm ? sportForm.sportname : null} `} ><Button onClick={handleOpenEmail}>Send</Button></a>
        </DialogActions>
      </Dialog>
    </div>
  );
}
