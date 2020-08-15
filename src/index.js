import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import configureStore from "./store";
import { Provider } from "react-redux";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Buyer from "./components/Buyer";
import Seller from "./components/Seller";
import CartItems from "./components/CartItems";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#d41b2c",
    },
  },
});
ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Buyer />{" "}
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/cart">
              <CartItems />
            </Route>
            <Route path="/sell">
              <Seller />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
