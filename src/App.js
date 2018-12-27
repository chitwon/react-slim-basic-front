import React from "react";
import "./App.css";
import TemporaryDrawer from "./components/TemporaryDrawer";
import ButtonAppBar from "./components/ButtonAppBar";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";

/* 
Basic react starting app 
with the addition of the general layout and Router.
The layout uses Material UI and separate into top app bar, content, 
a slide in menu currently configured to come from the bottom up.

The top app bar is in /components/ButtonAppBar"
the slide in portion is in /components/ButtonAppBar
the content from <Routes /> in components/Routes.js
*/
class App extends React.Component {
  constructor() {
    super();
    /* 
      Opening and closing menu is managed by parent level state
      passed to children as props 
    */
    this.state = {
      bottomMenu: false
    };
  }

  /* 
    bind the function to a component prop to pass up object from child to parent. 
    Pass returned object down as a prop to any component that needs it. In this case,
    just pass along a boolean that true: opens and false: close the menu.  
  */
  handleToggleMenu() {
    this.setState({
      bottomMenu: !this.state.bottomMenu
    });
  }

  render() {
    return (
      <Router basename={'/react-slim-basic-front'}>
        <div className="container">
          <ButtonAppBar bottomMenu={this.handleToggleMenu.bind(this)} />
          <TemporaryDrawer
            bottomMenu={this.state.bottomMenu}
            handleToggleMenu={this.handleToggleMenu.bind(this)}
          />
          <Routes />
        </div>
      </Router>
    );
  }
}

export default App;
