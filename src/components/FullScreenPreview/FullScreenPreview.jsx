import * as React from 'react';

import { useState } from 'react';

import "./FullScreenPreview.css"

import ReactMarkdown from 'react-markdown'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { yellow } from '@mui/material/colors';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function FullScreenPreview( { content } ) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

        <Button variant="text" onClick={handleClickOpen} sx={{color: "#F1D433"}}>
            Preview Markdown
        </Button>

        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative', backgroundColor: "#F1D433"}}>

                {/* Bar on top of fullscreen popup which allows users to close window  */}
                <Toolbar>

                    <IconButton
                    edge="start"
                    
                    onClick={handleClose}
                    aria-label="close"
                    >
                    <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    Markdown Preview Window
                    </Typography>
                    
                </Toolbar>
            </AppBar>
            
            {/* Render the markdown unto the fullscreen popup */}
            <div className='markdown-content'>
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>


            
        </Dialog>
        </div>
    );
}

export default FullScreenPreview