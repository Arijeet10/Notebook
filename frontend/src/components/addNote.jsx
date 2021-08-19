import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import axios from "axios";
import { Button } from '@material-ui/core';
import NavBar from './navigation';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    close: {
        padding: theme.spacing(0.5),
      },
}));

function Add() {

    //messagebox starts
    const [snackPack, setSnackPack] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [messageInfo, setMessageInfo] = React.useState(undefined);
  
    React.useEffect(() => {
      if (snackPack.length && !messageInfo) {
        // Set a new snack when we don't have an active one
        setMessageInfo({ ...snackPack[0] });
        setSnackPack((prev) => prev.slice(1));
        setOpen(true);
      } else if (snackPack.length && messageInfo && open) {
        // Close an active snack when a new one is added
        setOpen(false);
      }
    }, [snackPack, messageInfo, open]);
  
    const handleClick = (message) => () => {
      setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
  
    const handleExited = () => {
      setMessageInfo(undefined);
    };
    //messagebox ends

    const classes = useStyles();


    const [state, setState] = useState({
        title: "",
        details: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setState(prevState => {
            return { ...prevState, [name]: value }
        })
    };

    function addNote(state) {
        axios.post("http://localhost:5000/notes/", state)
            .then(res =>{
                console.log(res.data);
                setMessageInfo(res.data)
            })
            .catch(err => {
                console.log(err)
                setMessageInfo(err)
            });
    };

    function handleSubmit(e) {
        e.preventDefault();
        addNote(state);
        handleClick();
        setState({
            title: "",
            details: ""
        });
    };

    return (
        <React.Fragment>
            <NavBar />
            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                <TextField label="Title" variant="outlined" name="title" value={state.title} onChange={handleChange} />
                <br />
                <TextField multiline rows={4} label="Details" variant="outlined" name="details" value={state.details} onChange={handleChange} />
                <br />
                <Button onClick={handleSubmit} style={{ color: "#2196f3" }}>
                    <NoteAddIcon />
                </Button>
            </form>
            <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
        message={messageInfo ? messageInfo.message : undefined}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
        </React.Fragment>
    )
}

export default Add;
