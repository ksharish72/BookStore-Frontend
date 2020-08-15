import React, { useEffect, useState, useReducer } from "react";
import { useHistory } from "react-router";
import { getUserInfo, updateUserInfo, resetPassword } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col } from "reactstrap";
import { FaUserEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
const useStyles = makeStyles((theme) => ({
  appbarRoot: {
    flexGrow: 1,
  },
}));
export default function Profile(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      firstname: "",
      lastname: "",
      email: "",
      editMode: false,
      oldpassword: "",
      newpassword: "",
    }
  );
  const userData = useSelector((state) => state.getUserInfoReducer);

  useEffect(() => {
    ///if acces token not present, go to login if accesss token present get user
    var session = localStorage.getItem("session");
    console.log(session);
    if (session !== null) {
      var tokenInfo = JSON.parse(session);
      //get user and update store
      dispatch(getUserInfo(tokenInfo.userid, tokenInfo.token));
    } else {
      history.push("/login");
    }
  }, []);

  useEffect(() => {
    setState({
      firstname: userData.data.firstname,
      lastname: userData.data.lastname,
      email: userData.data.email,
    });
  }, [userData]);
  const logout = () => {
    localStorage.removeItem("session");
    history.push("/login");
  };
  const handleEdit = () => {
    setState({ editMode: true });
  };
  const handleSave = () => {
    var session = localStorage.getItem("session");
    var accessInfo = JSON.parse(session);
    console.log(state);
    var postBody = {
      firstname: state.firstname,
      lastname: state.lastname,
    };
    updateUserInfo(accessInfo.userid, accessInfo.token, postBody)
      .then((message) => {
        console.log(message);
        alert("User updated successfully");
        setState({ editMode: false });
      })
      .catch((message) => {
        console.log(message);
        alert(message);
      });
  };
  const handleCancel = () => {
    if (window.confirm("Are you sure you wish to cancel the changes?")) {
      ///reset data and disable edit mode
      setState({
        firstname: userData.data.firstname,
        lastname: userData.data.lastname,
        editMode: false,
      });
    }
  };
  const update = (e) => {
    switch (e.target.name) {
      case "firstname": {
        setState({ firstname: e.target.value });
        break;
      }
      case "lastname": {
        setState({ lastname: e.target.value });
        break;
      }
      case "oldpassword": {
        setState({ oldpassword: e.target.value });
        break;
      }
      case "newpassword": {
        setState({ newpassword: e.target.value });
        break;
      }
    }
  };

  const handleResetPassword = (e) => {
    console.log(e);
    e.preventDefault();
    ///password validation
    var passwordCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(
      state.newpassword
    );
    if (!passwordCheck) {
      alert(
        "New Password should contain atleast 8 char, 1 number, 1 lowercase, 1 uppercase, only 0-9a-zA-Z"
      );
      return;
    }
    var session = localStorage.getItem("session");
    var accessInfo = JSON.parse(session);
    var postBody = {
      oldpassword: state.oldpassword,
      newpassword: state.newpassword,
    };
    resetPassword(accessInfo.userid, accessInfo.token, postBody)
      .then((message) => {
        console.log(message);
        alert("Password updated successfully");
        localStorage.removeItem("session");
        history.push("/login");
      })
      .catch((message) => {
        console.log(message);
        alert(message);
      });
  };

  return (
    <div>
      {" "}
      <div className={classes.appbarRoot}>
        <AppBar position="static">
          <Toolbar>
            {userData.status === "ok" && (
              <button onClick={logout}>Log out</button>
            )}{" "}
          </Toolbar>
        </AppBar>
      </div>
      <div class="card">
        <div class="container">
          <Row>
            <Col md={8}>
              {" "}
              <h4>
                <b>Profile</b>
              </h4>
            </Col>
            {!state.editMode && (
              <Col md={4}>
                <button onClick={handleEdit} className="styledBtn">
                  Edit Profile <FaUserEdit />
                </button>
              </Col>
            )}
          </Row>
          <label>First Name</label>
          <input
            required
            readOnly={!state.editMode}
            type="text"
            autoComplete="firstname"
            value={state.firstname}
            className="form-control"
            name="firstname"
            placeholder="First Name"
            onChange={update}
          />
          <label>Last Name</label>
          <input
            required
            readOnly={!state.editMode}
            type="text"
            autoComplete="lastname"
            className="form-control"
            name="lastname"
            value={state.lastname}
            placeholder="Last Name"
            onChange={update}
          />
          <label>Username</label>
          <input
            required
            readOnly={true}
            type="text"
            autoComplete="username"
            className="form-control"
            name="email"
            value={state.email}
            placeholder="Username"
          />
          {state.editMode && (
            <div>
              <button onClick={handleSave} className="styledBtn">
                Save Changes <FaSave />
              </button>
              <button onClick={handleCancel} className="styledBtn">
                Cancel <GiCancel />
              </button>
            </div>
          )}
          <Row>
            <Col md={8}>
              {" "}
              <h4>
                <b>Reset Password</b>
              </h4>
            </Col>
          </Row>
          <form
            className={classes.root}
            onSubmit={handleResetPassword}
            autoComplete="off"
          >
            <label>Old password </label>{" "}
            <span className="requiredColor">*</span>
            <input
              required
              type="password"
              autoComplete="oldpassword"
              value={state.oldpassword}
              className="form-control"
              name="oldpassword"
              placeholder="Old password"
              onChange={update}
            />
            <label>New Password </label>{" "}
            <span className="requiredColor">*</span>
            <input
              required
              type="password"
              autoComplete="newpassword"
              className="form-control"
              name="newpassword"
              value={state.newpassword}
              placeholder="New password"
              onChange={update}
              helperText="We'll never share your password, Password should contain atleast 8 char, 1 number, 1 lowercase, 1 uppercase, only 0-9a-zA-Z"
            />
            <button type="submit">Reset</button>
          </form>
        </div>
      </div>
    </div>
  );
}
