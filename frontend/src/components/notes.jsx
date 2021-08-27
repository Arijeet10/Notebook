import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, Modal } from '@material-ui/core';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring'; 
import PropTypes from 'prop-types';
import LaunchIcon from '@material-ui/icons/Launch';
import axios from 'axios';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxHeight: 300,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//for modal effect
const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });
  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

//end modal effect


function Notes(props) {
  //for opening and closing modal
  const [open, setOpen] = React.useState(false);  //to open modal
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //end

  const classes = useStyles();

  function deleteNote(note) {
    axios.delete(`http://localhost:5000/notes/${note}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  function handleDelete() {
    deleteNote(props.note._id)
    document.location.reload();
    alert("Successfully deleted the note")
  }

  return (

    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.note.title}
        </Typography>
        <CardActions>
          <Link to={'/edit/' + props.note._id} style={{ textDecoration: "none" }}>
            <Button style={{ color: "#4caf50" }}>
              <EditIcon />
            </Button>
          </Link>
          <br />
          <Button onClick={handleDelete} style={{ color: "#f44336" }}>
            <DeleteForeverIcon />
          </Button>
          <div>
            <Button onClick={handleOpen} style={{color:"#2196f3"}}  startIcon={<LaunchIcon style={{color:"#f50057"}} />}>
              Read Note
            </Button>
            <Modal
              aria-labelledby="spring-modal-title"
              aria-describedby="spring-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper} style={{ background:"#eeeeee",color:"#424242"}}>
                  <h2 id="spring-modal-title" style={{color:"#00b0ff"}}>{props.note.title}</h2>
                  <p id="spring-modal-description">{props.note.details}</p>
                </div>
              </Fade>
            </Modal>
          </div>
        </CardActions>
        <Typography variant="body2" component="p">
          {props.note.details}
        </Typography>
      </CardContent>
    </Card>



    // <Link to={""} style={{ textDecoration: "none" }}>
    //   <Card className={classes.root}>
    //     <CardContent>
    //       <Typography variant="h5" component="h2">
    //         {props.note.title}
    //       </Typography>
    //       <CardActions>
    //         <Link to={'/edit/' + props.note._id} style={{ textDecoration: "none" }}>
    //           <Button style={{ color: "#4caf50" }}>
    //             <EditIcon />
    //           </Button>
    //         </Link>
    //         <br />
    //         <Button onClick={handleDelete} style={{ color: "#f44336" }}>
    //           <DeleteForeverIcon />
    //         </Button>
    //       </CardActions>
    //       <Typography variant="body2" component="p">
    //         {props.note.details}
    //       </Typography>
    //     </CardContent>
    //   </Card>
    // </Link>
  )
}

export default Notes;





