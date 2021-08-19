import React from "react";
import {HashRouter as Router,Switch,Route} from "react-router-dom";
import Add from "./components/addNote";
import Edit from "./components/editNote";
import Home from "./components/homepage";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/add">
          <Add />
        </Route>
        <Route path="/edit/:id">
          <Edit />
        </Route>
      </Switch>
    </Router>  
  );
}

export default App;
