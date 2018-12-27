import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import StudentHw from "./StudentHw";

/* 
basic  Router stuff
*/

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route path="/student-hw" component={StudentHw} />
      </div>
    );
  }
}
