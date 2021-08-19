import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import { Button } from '@material-ui/core';
import axios from 'axios';
import NavBar from './navigation';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


function Edit(props) {

    const classes = useStyles();

    const [state, setState] = useState({
        title: "",
        details: ""
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setState((prevNote) => {
            return { ...prevNote, [name]: value }
        })
    }

    function editNote(state) {
        axios.post(`http://localhost:5000/notes/${props._id}`, state)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }

    function handleSubmit(e) {
        e.preventDefault();
        editNote(state);
        setState({
            title: "",
            details: ""
        })
    }

    return (
        <React.Fragment>
            <NavBar />
            {console.log(props)}
            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                <TextField label="Title" variant="outlined" name="title" value={state.title} onChange={handleChange} />
                <br />
                <TextField multiline rows={4} label="Details" variant="outlined" name="details" value={state.details} onChange={handleChange} />
                <br />
                <Button onClick={handleSubmit} style={{ color: "#2196f3" }}>
                    <SaveIcon />
                </Button>
            </form>
        </React.Fragment>

    )
}

export default Edit;
