import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import {
  getCartItems,
  getUserInfo,
  removeFromCart,
  removeAllCartItems,
  updateCart,
} from "../../actions";
import "../../styles/buyer.css";
import NoImage from "../../images/noimage.png";
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
  pagination: {
    justifyContent: "center",
  },
  appbarRoot: {
    flexGrow: 1,
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
export default function CartItems(props) {
  const history = useHistory();
  const cartItems = useSelector((state) => state.getCartItems);
  const userData = useSelector((state) => state.getUserInfoReducer);
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [currentBook, setCurrentBook] = useState(null);

  const dispatch = useDispatch();
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    ///if acces token not present, go to login if accesss token present get user
    var session = localStorage.getItem("session");
    if (session !== null) {
      var tokenInfo = JSON.parse(session);
      //get user and update store
      dispatch(getUserInfo(tokenInfo.userid, tokenInfo.token));
      //get buyer books
      dispatch(getCartItems(tokenInfo.userid, tokenInfo.token));
    } else {
      history.push("/login");
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("session");
    history.push("/login");
  };
  const viewProfile = () => {
    history.push("/profile");
  };
  const handleChangeQuanity = (e) => {
    setCurrentQuantity(e.target.value);
  };
  const removeItemFromCart = (e, cartid) => {
    e.preventDefault();
    var session = localStorage.getItem("session");
    if (session !== null) {
      var tokenInfo = JSON.parse(session);

      removeFromCart(tokenInfo.userid, tokenInfo.token, cartid)
        .then((message) => {
          alert("Removed item from cart");
          dispatch(getCartItems(tokenInfo.userid, tokenInfo.token));
        })
        .catch((message) => {
          alert(message);
        });
    }
  };
  const removeAllItems = (e) => {
    e.preventDefault();
    var session = localStorage.getItem("session");
    if (session !== null) {
      var tokenInfo = JSON.parse(session);

      removeAllCartItems(tokenInfo.userid, tokenInfo.token)
        .then((message) => {
          alert("Removed all items from cart");
          dispatch(getCartItems(tokenInfo.userid, tokenInfo.token));
        })
        .catch((message) => {
          alert(message);
        });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const updateQuantity = (e, book) => {
    e.preventDefault();
    setOpen(true);
    setCurrentBook(book);
  };
  const update = (e) => {
    e.preventDefault();
    console.log(currentBook, currentQuantity, userData.data.id);
    if (currentQuantity <= 0) {
      alert("Item quantity should be greater than 0");
      return;
    }
    if (currentQuantity > currentBook.quantity) {
      alert(
        `Quantity greater than the available stock ${currentBook.quantity}`
      );
      return;
    }
    var session = localStorage.getItem("session");
    if (session !== null) {
      var tokenInfo = JSON.parse(session);
      var data = {
        cartid: currentBook.cartID,
        quantity: currentQuantity,
        userid: userData.data.id,
      };
      updateCart(tokenInfo.userid, tokenInfo.token, data)
        .then((message) => {
          handleClose();
          alert("Updated cart");
          dispatch(getCartItems(tokenInfo.userid, tokenInfo.token));
        })
        .catch((message) => {
          alert(message);
        });
    }
  };
  return (
    <div className={classes.appbarRoot}>
      <AppBar position="static">
        <Toolbar>
          {userData.status === "ok" && (
            <div>
              {" "}
              <button onClick={logout}>Log out</button>
              {"  "}
              <button onClick={viewProfile}>Profile</button>
              {"  "}
            </div>
          )}{" "}
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Update quantity</h2>
          <p id="simple-modal-description">
            Quantity:
            <input
              type="number"
              value={currentQuantity}
              onChange={(e) => handleChangeQuanity(e)}
            />
            <button onClick={update}>Update</button>
          </p>
        </div>
      </Modal>
      <div className="bookContainer">
        <button onClick={removeAllItems}>Remove all items</button>{" "}
        {cartItems.status === "ok" && (
          <div>
            {cartItems.length === 0 && <div>Cart is empty</div>}
            {cartItems.data.map((book, i) => {
              return (
                <div class="bookcard">
                  <img
                    src={NoImage}
                    alt="Denim Jeans"
                    style={{ width: "100%" }}
                  />
                  <h1>{book.title}</h1>
                  <p class="bookprice">${book.price}</p>
                  <p>
                    {book.isdeleted === 1 ? (
                      <div style={{ color: "red" }}>Obsolete</div>
                    ) : (
                      <div>
                        ISBN:{book.isbn}
                        <br />
                        Authors:{book.authors}
                        <br /> Publication:
                        {book.publication}
                        <br />
                        Seller id:{book.userid}
                      </div>
                    )}
                  </p>
                  <p>
                    Quantity :{" "}
                    <input
                      type="number"
                      name="cartQuantity"
                      value={book.cartQuantity === null ? 0 : book.cartQuantity}
                      //onChange={(e) => handleChangeQuanity(e, book.id)}
                    />
                  </p>
                  <p>
                    {book.isdeleted === 1 ? (
                      <div style={{ color: "red" }}>
                        This book is no longer available in market
                      </div>
                    ) : (
                      <div>
                        {" "}
                        <button
                          style={{ backgroundColor: "green" }}
                          onClick={(e) => updateQuantity(e, book)}
                        >
                          Update quantity
                        </button>
                        <button
                          onClick={(e) => removeItemFromCart(e, book.cartID)}
                        >
                          Remove from Cart
                        </button>
                      </div>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
