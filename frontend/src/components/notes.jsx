import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import SubjectIcon from '@material-ui/icons/Subject';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));


function Notes(props) {
  const classes = useStyles();

  function deleteNote(note) {
    axios.delete(`http://localhost:5000/notes/${note}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  function handleDelete() {
    deleteNote(props.note._id)
  }

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <SubjectIcon style={{ color: "#f44336" }} />
        </ListItemAvatar>
        <ListItemText
          primary={props.note.title}
          secondary={
            <React.Fragment>
              <Typography
                multiline rows={15}
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {props.note.details}
              </Typography>
              <br />
              <Link to={'/edit/' + props.note._id} style={{ textDecoration: "none" }}>
                <Button style={{ color: "#f44336" }}>
                  <EditIcon />
                </Button>
              </Link>
              <br />
              <Button onClick={handleDelete} style={{ color: "#f44336" }}>
                <DeleteForeverIcon />
              </Button>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  )
}

export default Notes;