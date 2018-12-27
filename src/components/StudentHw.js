import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { handleGoogleCode, deleteToken, getHws } from "../store/actions";
import store from "../store/storeCore";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import FileCopy from "@material-ui/icons/FileCopy";
import Tooltip from "@material-ui/core/Tooltip";
import { Typography } from "@material-ui/core";
// import apps GOOGLE_CLIENT_ID, you will need to update that file
import { GOOGLE_CLIENT_ID } from '../services/google';

// styles for material ui
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 300,
    padding: 20
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

class StudentHw extends Component {
  
  /* if the user is logged in, get the content from the API */
  componentDidMount() {
    if (this.props.reducedLogin) store.dispatch(getHws());
  }

  render() {

    /* something I use for my app, not relevant in this demo */
    const copyToClipboard = link => {
      console.log(link);
    };
    // material UI classes
    const { classes } = this.props;
    const spacing = 16;

    // a demo function to demonstrate protected api content
    const checkToken = () => {
      store.dispatch(getHws());
    };

    // some ES6 show API content
    const assignments = this.props.reducedLogin ? (
      <div>
        <Typography variant="overline" gutterBottom>
          Returned from API
        </Typography>
        {this.props.reducedContent ? (
          <List className={classes.root}>
            {this.props.reducedContent.map((value, key) => (
              <ListItem key={key} role={undefined} dense button>
                <ListItemText
                  primary={` ${value.hw_title}`}
                  secondary={value.submission_date}
                />
                <ListItemSecondaryAction>
                  <Tooltip
                    title={"Click to copy link - " + value.hw_link}
                    placement="right-start"
                    onClick={() => copyToClipboard(value.hw_link)}
                  >
                    <IconButton aria-label="Comments">
                      <FileCopy />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        ) : null}
        <Button color="primary" onClick={checkToken}>
          Example function: only works when logged in! Check the browser's
          console for results.
        </Button>{" "}
      </div>
    ) : (
      <div>
        "When logged out, nothing will be fetched from the API"
        <br />
        <Button color="primary" onClick={checkToken}>
          Example function: only works when logged in! Check the browser's
          console for results.
        </Button>{" "}
      </div>
    );

    // handle user logout
    const logout = () => {
      sessionStorage.removeItem("userData");
      store.dispatch(deleteToken);
    };

    // handle response from google login
    const responseGoogle = response => {
      store.dispatch(handleGoogleCode(response, getHws()));
    };

    // handle fail such as user declines google
    const googleFail = () => {
      console.log("google login fail");
    };

    // es6 to either show google button or logout button
    const googleCode = !this.props.reducedLogin ? (
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Sign In"
        onSuccess={responseGoogle}
        onFailure={googleFail}
        accessType="offline"
        responseType="code"
      />
    ) : (
      <Button variant="contained" onClick={logout}>
        {" "}
        Log Out{" "}
      </Button>
    );

    return (
      <div>
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Grid
              container
              className={classes.demo}
              justify="center"
              spacing={Number(spacing)}
            >
              <Grid item xs={2}>
                <Paper className={classes.paper}>
                  {googleCode} <br />
                  toggle logged in/out by signed in status
                </Paper>
              </Grid>

              <Grid item xs={6}>
                <Paper className={classes.paper}>{assignments}</Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// create a map of reduced redux to local props
const mapStateToProps = siteState => {
  return siteState;
};

// export and load in material UI styles and connect redux to component props
export default withStyles(styles)(connect(mapStateToProps)(StudentHw));
