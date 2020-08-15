import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { Slide } from "react-slideshow-image";
import {
  getUserInfo,
  getBuyerBooks,
  addToCart,
  getBookImagesFromDb,
  getBookImages,
} from "../../actions";
import "../../styles/buyer.css";
import NoImage from "../../images/noimage.png";
import Pagination from "@material-ui/lab/Pagination";
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
const PAGE_SIZE = 8;
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
export default function Buyer(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [currentBook, setCurrentBook] = useState(null);
  const history = useHistory();
  const userData = useSelector((state) => state.getUserInfoReducer);
  const buyerBooks = useSelector((state) => state.getBuyerBooks);
  console.log(buyerBooks);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [sliderOpen, setSliderOpen] = React.useState(false);
  const [sliderImages, setSliderImages] = React.useState([]);
  useEffect(() => {
    ///if acces token not present, go to login if accesss token present get user
    var session = localStorage.getItem("session");
    if (session !== null) {
      var tokenInfo = JSON.parse(session);
      //get user and update store
      dispatch(getUserInfo(tokenInfo.userid, tokenInfo.token));
      //get buyer books
      dispatch(getBuyerBooks(tokenInfo.userid, tokenInfo.token));
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
  const viewCart = () => {
    history.push("/cart");
  };
  const handlePageChange = (event, page) => {
    event.preventDefault();
    setCurrentPage(page);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSliderClose = () => {
    setSliderOpen(false);
  };
  const handleChangeQuanity = (e) => {
    setCurrentQuantity(e.target.value);
  };
  const sellerPage = () => {
    history.push("/sell");
  };
  // Logic for displaying books
  if (buyerBooks.status === "ok") {
    const indexOfLastBook = currentPage * PAGE_SIZE;
    const indexOfFirstBook = indexOfLastBook - PAGE_SIZE;
    var currentBooks = buyerBooks.data
      ? buyerBooks.data.slice(indexOfFirstBook, indexOfLastBook)
      : null;
  }

  const addItemsToCart = (e, book) => {
    e.preventDefault();
    setOpen(true);
    setCurrentBook(book);
  };
  const viewBookImages = (e, book) => {
    console.log(book);
    var session = localStorage.getItem("session");
    if (session !== null) {
      var tokenInfo = JSON.parse(session);
      getBookImagesFromDb(tokenInfo.userid, tokenInfo.token, book.isbn).then(
        (v) => {
          var output = [];
          v.forEach((r) => {
            output.push({
              imagename: r.imagename,
              imageurl: r.imageurl,
            });
          });
          getBookImages(tokenInfo.userid, tokenInfo.token, output).then(
            (resp) => {
              console.log(resp);
              setSliderImages(resp);
              setSliderOpen(true);
            }
          );
        }
      );
    }
  };
  const add = (e) => {
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
        bookid: currentBook.id,
        quantity: currentQuantity,
        userid: userData.data.id,
      };
      addToCart(tokenInfo.userid, tokenInfo.token, data)
        .then((message) => {
          handleClose();
          alert("Added to cart");
          dispatch(getBuyerBooks(tokenInfo.userid, tokenInfo.token));
        })
        .catch((message) => {
          alert(message);
        });
    }
  };

  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    pauseOnHover: true,
    onChange: (oldIndex, newIndex) => {
      console.log(`slide transition from ${oldIndex} to ${newIndex}`);
    },
  };
  return (
    <div className={classes.appbarRoot}>
      <Modal
        open={sliderOpen}
        onClose={handleSliderClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          {" "}
          <div className="slide-container">
            <Slide {...properties}>
              {sliderImages.map((v) => {
                console.log(v.imageBlob);
                return (
                  <div className="each-slide">
                    <div
                      style={{
                        backgroundImage: `url(${v.imageBlob})`,
                        height: 500,
                        width: 500,
                        backgroundSize: 500,
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <span>{v.imagename}</span>
                    </div>
                  </div>
                );
              })}
            </Slide>
          </div>
        </div>
      </Modal>
      <AppBar position="static">
        <Toolbar>
          {userData.status === "ok" && (
            <div>
              {" "}
              <button onClick={logout}>Log out</button>
              {"  "}
              <button onClick={viewProfile}>Profile</button>
              {"  "}
              <button onClick={viewCart}>Cart</button>
              {"  "}
              <button onClick={sellerPage}>Sell</button>
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
          <h2 id="simple-modal-title">Add item to cart</h2>
          <p id="simple-modal-description">
            Quantity:
            <input
              type="number"
              value={currentQuantity}
              onChange={(e) => handleChangeQuanity(e)}
            />
            <button onClick={add}>Add</button>
          </p>
        </div>
      </Modal>
      <div className="bookContainer">
        {" "}
        {buyerBooks.status === "ok" && (
          <div>
            {currentBooks.map((book, i) => {
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
                    ISBN:{book.isbn}
                    <br />
                    Authors:{book.authors}
                    <br /> Publication:
                    {book.publication}
                    <br />
                    Seller id:{book.userid}
                  </p>
                  <p>
                    Quantity :{" "}
                    <input
                      type="number"
                      name="cartQuantity"
                      value={book.cartQuantity === null ? 0 : book.cartQuantity}
                      //onChange={(e) => handleChangeQuanity(e, book.id)}
                      // defaultValue={
                      //   book.cartQuantity === null ? 0 : book.cartQuantity
                      // }
                    />
                  </p>
                  <p>
                    {book.cartQuantity === null ? (
                      <button onClick={(e) => addItemsToCart(e, book)}>
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        disabled
                        style={{
                          backgroundColor: "green",
                        }}
                      >
                        Added to cart
                      </button>
                    )}
                    <button onClick={(e) => viewBookImages(e, book)}>
                      View Book Images
                    </button>
                  </p>
                </div>
              );
            })}
            {currentBooks.length > 0 && (
              <Pagination
                count={
                  Math.floor(buyerBooks.data.length / PAGE_SIZE) +
                  (buyerBooks.data.length % PAGE_SIZE === 0 ? 0 : 1)
                }
                page={currentPage}
                onChange={handlePageChange}
                classes={{ ul: classes.pagination }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
