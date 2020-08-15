import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { loginUser, forgotPassword } from "../../actions";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Modal from "@material-ui/core/Modal";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
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
  signIn: {
    width: "90%",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
export default function Login() {
  let history = useHistory();
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassModal, setforgotPassModal] = useState(false);
  const [emailAddress, setemailAddress] = useState("");
  const [modalStyle] = React.useState(getModalStyle);

  const update = (e) => {
    console.log(e.target.name);
    switch (e.target.name) {
      case "username": {
        setUsername(e.target.value);
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
  const signIn = (e) => {
    e.preventDefault();

    var data = {
      email: username,
      password: password,
    };
    loginUser(data)
      .then((message) => {
        // set access token in local storage
        localStorage.setItem("session", JSON.stringify(message));
        history.push("/");
      })
      .catch((message) => {
        alert(message);
      });
  };
  const signUp = () => {
    history.push("/register");
  };
  const handleforgot = () => {
    console.log("harish");
    setforgotPassModal(true);
  };
  const handleforgotClose = () => {
    setforgotPassModal(false);
  };
  const handleEmailAddress = (e) => {
    e.preventDefault();
    setemailAddress(e.target.value);
  };
  const submitReset = (e) => {
    e.preventDefault();
    var data = {
      email: emailAddress,
    };
    forgotPassword(data)
      .then((message) => {
        // set access token in local storage
        console.log(message);
        alert("Password reset email sent");
      })
      .catch((message) => {
        alert(message);
      });
  };
  return (
    <div>
      <Modal
        open={forgotPassModal}
        onClose={handleforgotClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          {" "}
          <h2>Email address : </h2>
          <input
            type="text"
            name="emailAddress"
            value={emailAddress}
            onChange={(e) => handleEmailAddress(e)}
          />
          <button className="signUpBtn" onClick={(e) => submitReset(e)}>
            Submit
          </button>
        </div>
      </Modal>
      <div className={classes.appbarRoot}>
        <AppBar position="static">
          <Toolbar></Toolbar>
        </AppBar>
      </div>
      <div className={"jumbotron wizardContainer"}>
        <div className="signIn">
          <div className="text-muted">Don't have an account?</div>{" "}
          <div className="container-signUpBtn">
            {" "}
            <button className="signUpBtn" onClick={signUp}>
              SIGN UP
            </button>
          </div>
        </div>
        <div className="row registerForm">
          <div style={{ margin: "0 auto" }}>
            <form className={classes.root} onSubmit={signIn} autoComplete="off">
              <div>
                {" "}
                <label>Username</label>
                <TextField
                  className={classes.signIn}
                  required
                  value={username}
                  id="outlined-basic"
                  name="username"
                  variant="outlined"
                  onChange={update}
                />{" "}
              </div>
              <div>
                {" "}
                <label>Password</label>
                <TextField
                  className={classes.signIn}
                  required
                  type="password"
                  value={password}
                  id="outlined-basic"
                  name="password"
                  variant="outlined"
                  onChange={update}
                />
              </div>
              <div className="container-signInBtn">
                {" "}
                <button type="submit" className="signInBtn">
                  Sign In
                </button>
              </div>
            </form>
            <div className="container-signInBtn">
              {" "}
              <button onClick={handleforgot} className="forgotPasswordBtn">
                Forgot Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
