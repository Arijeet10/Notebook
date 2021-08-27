import React, { useEffect, useState } from 'react';
import NavBar from "./navigation";
import Notes from "./notes";
import Loading from "./loading";
import axios from "axios";
import { Grid, Paper } from '@material-ui/core';

function Home() {

    const [notes, setNotes] = useState()

    function getNotes() {
        axios.get("http://localhost:5000/notes/")
            .then(res => setNotes(res.data))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getNotes();
    }, [])

    return (
        <React.Fragment>
            <NavBar />
            {
                notes ? (
                    <div style={{ marginTop: 20 }}>
                    <Grid container spacing={4}>
                        {notes.map(
                            (note, index) =>
                                <Grid item key={index} xs={12} md={4} lg={3}>
                                    <Paper>
                                        <Notes key={index} note={note} />
                                    </Paper>
                                </Grid>
                        )}
                    </Grid>
                </div>
                ) :<Loading />
            }

        </React.Fragment>
    )
}

export default Home
