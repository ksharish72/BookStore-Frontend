import React, { useState, useEffect } from "react";
import "../../styles/register.css";
import "../../styles/transitions.less";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../actions";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
    display: "inline-block",
  },
  appbarRoot: {
    flexGrow: 1,
  },
  signUp: {
    width: "90%",
  },
}));
export default function Register() {
  let history = useHistory();
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const update = (e) => {
    console.log(e.target.name);
    switch (e.target.name) {
      case "firstName": {
        setFirstName(e.target.value);
        break;
      }
      case "lastName": {
        setLastName(e.target.value);
        break;
      }
      case "email": {
        setEmail(e.target.value);
        break;
      }
      case "password": {
        setPassword(e.target.value);
        break;
      }
    }
  };
  useEffect(() => {
    // check for localstorage, if not present goto login else goto buyer component
    var session = localStorage.getItem("session");
    if (session !== null) {
      history.push("/");
    }
  }, []);
  const signIn = () => {
    history.push("/login");
  };
  const signUp = (e) => {
    e.preventDefault();
    ///password validation
    var passwordCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(
      password
    );
    if (!passwordCheck) {
      alert(
        "Password should contain atleast 8 char, 1 number, 1 lowercase, 1 uppercase, only 0-9a-zA-Z"
      );
      return;
    }
    ///register user api
    var userData = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
    };
    registerUser(userData)
      .then((message) => {
        alert(message);
        signIn();
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <div>
      <div className={classes.appbarRoot}>
        <AppBar position="static">
          <Toolbar></Toolbar>
        </AppBar>
      </div>
      <div className={"jumbotron wizardContainer"}>
        <div className="signIn">
          <div className="text-muted">Already have an account?</div>{" "}
          <div className="container-signInBtn">
            {" "}
            <button className="signInBtn" onClick={signIn}>
              Sign In
            </button>
          </div>
        </div>
        <div className="row registerForm">
          <div style={{ margin: "0 auto" }}>
            <h4 className="introduceText">INTRODUCE YOURSELF</h4>
            <h3>Hi there!</h3>
            <form className={classes.root} onSubmit={signUp} autoComplete="off">
              <div>
                {" "}
                <label>
                  First Name <span className="requiredColor">*</span>
                </label>
                <TextField
                  className={classes.signUp}
                  required
                  value={firstName}
                  id="outlined-basic"
                  name="firstName"
                  variant="outlined"
                  onChange={update}
                />{" "}
              </div>
              <div>
                {" "}
                <label>
                  Last Name <span className="requiredColor">*</span>
                </label>
                <TextField
                  className={classes.signUp}
                  required
                  value={lastName}
                  id="outlined-basic"
                  name="lastName"
                  variant="outlined"
                  onChange={update}
                />
              </div>
              <div>
                {" "}
                <label>
                  Email address <span className="requiredColor">*</span>
                </label>
                <TextField
                  className={classes.signUp}
                  required
                  value={email}
                  type="email"
                  id="outlined-basic"
                  name="email"
                  variant="outlined"
                  onChange={update}
                  helperText="Username will be the same as your email."
                />
              </div>
              <div>
                {" "}
                <label>
                  Password <span className="requiredColor">*</span>
                </label>
                <TextField
                  className={classes.signUp}
                  required
                  value={password}
                  type="password"
                  id="outlined-basic"
                  name="password"
                  variant="outlined"
                  onChange={update}
                  helperText="We'll never share your password, Password should contain atleast 8 char, 1 number, 1 lowercase, 1 uppercase, only 0-9a-zA-Z"
                />
              </div>
              <div className="container-signInBtn">
                {" "}
                <button type="submit" className="signUpBtn">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
