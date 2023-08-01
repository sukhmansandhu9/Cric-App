import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Footer from "./components/Footer";
import Matchdetails from "./components/Matchdetails";
import Matches from "./components/Matches";
import Navbar from "./components/Navbar";
import Twenty20 from "./components/Twenty20";
import Playerall from "./components/Playerall";
import Playerdetails from "./components/Playerdetails";
import Teamsall from "./components/Teamsall";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Matches />
            {/* <Twenty20 season={782} league={3} /> */}
          </Route>
          <Route exact path="/iccMatches">
            <Twenty20 season={782} league={3} />
          </Route>
          <Route exact path="/bigBashMatches">
            <Twenty20 season={830} league={5} />
          </Route>{" "}
          <Route exact path="/csaMatches">
            <Twenty20 season={986} league={10} />
          </Route>
          <Route path="/matchDetails/:id">
            <Matchdetails />
          </Route>
          <Route exact path="/browsePlayer">
            <Playerall />
          </Route>
          <Route path="/playerDetails/:id">
            <Playerdetails />
          </Route>
          <Route exact path="/browseTeam">
            <Teamsall />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;

{
  /* <Matches />
      <Twenty20 />
      <Matchdetails /> */
}
