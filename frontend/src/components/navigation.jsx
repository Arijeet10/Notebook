import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles, MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}));

const theme = createTheme({
    palette: {
        primary: {
            main: "#2196f3"
        }
    }
});

function NavBar() {

    const classes = useStyles();


    return (
        <div className={classes.root}>
            <MuiThemeProvider theme={theme}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} aria-label="menu">
                            <Link to={"/"} style={{ textDecoration: "none",color:"#fafafa" }}>
                                <HomeIcon />
                            </Link>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            NoteBook
                        </Typography>
                        <Link to={'/add/'} style={{ textDecoration: "none" }}>
                            <Button style={{ color: "#fafafa" }}>Add Note</Button>
                        </Link>
                        <Button color="inherit">Arijeet</Button>
                    </Toolbar>
                </AppBar>
            </MuiThemeProvider>
        </div>
    )
}

export default NavBar;
