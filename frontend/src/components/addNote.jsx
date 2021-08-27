import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import axios from "axios";
import { Button } from '@material-ui/core';
import NavBar from './navigation';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '185ch',
    },
  },
  close: {
    padding: theme.spacing(0.5),
  },
}));

function Add() {

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
      .then(res => {
        console.log(res.data);
        alert(res.data);
      })
      .catch(err => {
        console.log(err);
        alert("Error")
      });
  };

  function handleSubmit(e) {
    e.preventDefault();
    addNote(state);
    setState({
      title: "",
      details: ""
    });
  };

  return (
    <React.Fragment>
      <NavBar />
      <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField label="Title" variant="outlined" name="title" value={state.title} onChange={handleChange} style={{width:"170ch"}} />
          <Button onClick={handleSubmit} style={{ float:"right",color: "#2196f3" }} startIcon={<NoteAddIcon />}>
            Save
          </Button>
        </div>
        <TextField multiline rows={30} label="Details" variant="outlined" name="details" value={state.details} onChange={handleChange} />
      </form>
    </React.Fragment>
  )
}

export default Add;
