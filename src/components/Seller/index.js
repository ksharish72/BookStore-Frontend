import "date-fns";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {
  getUserInfo,
  getSellerBooks,
  removeBook,
  removeAllBooks,
  addSelerBook,
  updateSelerBook,
  uploadSellerImages,
  getBookImages,
  deleteBookImage,
  deleteBookImageFromDb,
} from "../../actions";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import ChipInput from "material-ui-chip-input";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function isPositiveInteger(n) {
  return n >>> 0 === parseFloat(n);
}
function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
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
    },
    display: "inline-block",
  },
  paper: {
    position: "absolute",
    width: 700,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: 650,
  },
}));
export default function Seller(props) {
  const classes = useStyles();
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [success, setSuccess] = useState(false);
  const [url, setUrl] = useState("");
  const [uploadFiles, setUploadFiles] = useState([]);
  const update = (e) => {
    console.log(e.target.name);
    switch (e.target.name) {
      case "isbn": {
        setIsbn(e.target.value);
        break;
      }
      case "title": {
        setTitle(e.target.value);
        break;
      }
      case "quantity": {
        if (isPositiveInteger(e.target.value)) {
          setQuantity(e.target.value);
          break;
        } else {
          alert("Please enter a positive integer");
          break;
        }
      }
      case "price": {
        let num = roundToTwo(e.target.value);
        setPrice(num);
        break;
      }
    }
  };
  const updateBook = (e) => {
    console.log(e.target.name);
    switch (e.target.name) {
      case "isbn": {
        setCurrentBook({ ...currentBook, isbn: e.target.value });
        break;
      }
      case "title": {
        setCurrentBook({ ...currentBook, title: e.target.value });
        break;
      }
      case "quantity": {
        if (isPositiveInteger(e.target.value)) {
          setCurrentBook({ ...currentBook, quantity: e.target.value });
          break;
        } else {
          alert("Please enter a positive integer");
          break;
        }
      }
      case "price": {
        let num = roundToTwo(e.target.value);
        setCurrentBook({ ...currentBook, price: num });
        break;
      }
    }
  };
  const [currentBook, setCurrentBook] = useState({});
  const sellerBooks = useSelector((state) => state.getSellerBooks);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [updateModalOpen, setUpdateModalOpen] = React.useState(false);

  const [authors, setAuthors] = React.useState([]);
  const history = useHistory();
  const userData = useSelector((state) => state.getUserInfoReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    ///if acces token not present, gouz to login if accesss token present get user
    var session = localStorage.getItem("session");
    if (session !== null) {
      var tokenInfo = JSON.parse(session);
      //get user and update store
      dispatch(getUserInfo(tokenInfo.userid, tokenInfo.token));
      //get buyer books
      dispatch(getSellerBooks(tokenInfo.userid, tokenInfo.token));
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
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
  };
  const handleRemoveBook = (e, book) => {
    e.preventDefault();
    var session = localStorage.getItem("session");
    if (session !== null) {
      var tokenInfo = JSON.parse(session);

      removeBook(tokenInfo.userid, tokenInfo.token, book.id)
        .then((message) => {
          alert("Removed Book");
          dispatch(getSellerBooks(tokenInfo.userid, tokenInfo.token));
        })
        .catch((message) => {
          alert(message);
        });
    }
  };

  const removeAllSellerBooks = (e) => {
    e.preventDefault();
    var session = localStorage.getItem("session");
    if (session !== null) {
      var tokenInfo = JSON.parse(session);

      removeAllBooks(tokenInfo.userid, tokenInfo.token)
        .then((message) => {
          alert("Removed all books");
          dispatch(getSellerBooks(tokenInfo.userid, tokenInfo.token));
        })
        .catch((message) => {
          alert(message);
        });
    }
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const addNewBook = (e) => {
    e.preventDefault();
    console.log(
      isbn,
      title,
      authors,
      publication,
      quantity,
      price,
      userData.data.id,
      images
    );

    var session = localStorage.getItem("session");
    if (session !== null) {
      var tokenInfo = JSON.parse(session);
      var data = {
        isbn: isbn,
        title: title,
        authors: authors,
        publication: publication,
        quantity: quantity,
        price: price,
        userid: userData.data.id,
        images: images,
      };
      addSelerBook(tokenInfo.userid, tokenInfo.token, data)
        .then((message) => {
          alert("Added book!");
          dispatch(getSellerBooks(tokenInfo.userid, tokenInfo.token));
          setOpen(false);
        })
        .catch((message) => {
          alert(message);
        });
    }
  };
  const updateBookToSTore = (e) => {
    e.preventDefault();
    var session = localStorage.getItem("session");
    if (session !== null) {
      var tokenInfo = JSON.parse(session);
      currentBook["userid"] = userData.data.id;
      currentBook["images"] = images;
      console.log(currentBook);

      updateSelerBook(tokenInfo.userid, tokenInfo.token, currentBook)
        .then((message) => {
          alert("Updated book!");
          dispatch(getSellerBooks(tokenInfo.userid, tokenInfo.token));
          setUpdateModalOpen(false);
        })
        .catch((message) => {
          alert(message);
        });
    }
  };
  const [publication, setPublication] = React.useState("");

  const handleDateChange = (e) => {
    console.log(e.target.value);
    setPublication(e.target.value);
  };
  const handleDateChangeUpdateWindow = (e) => {
    setCurrentBook({ ...currentBook, publication: e.target.value });
  };
  const handleAddChip = (chip) => {
    console.log(chip);
    setAuthors([...authors, chip]);
  };
  const handleDeleteChip = (chip, index) => {
    console.log(chip, index);
    if (index > -1) {
      let filtered = authors.filter((a, paramindex) => paramindex !== index);
      setAuthors(filtered);
    }
  };
  const handleAddChipUpdateWindow = (chip) => {
    setCurrentBook({ ...currentBook, authors: [...currentBook.authors, chip] });
  };
  const handleDeleteChipUpdateWindow = (chip, index) => {
    console.log(chip, index);
    if (index > -1) {
      let filtered = currentBook.authors.filter(
        (a, paramindex) => paramindex !== index
      );
      setCurrentBook({ ...currentBook, authors: filtered });
    }
  };
  const handleUpdateClick = (e, paramRows) => {
    var session = localStorage.getItem("session");
    if (session !== null) {
      var tokenInfo = JSON.parse(session);
      getBookImages(tokenInfo.userid, tokenInfo.token, paramRows.images).then(
        (imagesBlob) => {
          let publicationDate = new Date(paramRows["publication"])
            .toISOString()
            .split("T")[0];
          console.log(imagesBlob);

          setUpdateModalOpen(true);
          setCurrentBook({
            isbn: paramRows.isbn,
            title: paramRows.title,
            authors: paramRows["authors"].split(","),
            publication: publicationDate,
            quantity: paramRows.quantity,
            price: paramRows.price,
            id: paramRows.id,
            imagesBlob: imagesBlob,
          });
        }
      );
    }
  };

  const Success_message = () => (
    <div style={{ padding: 50 }}>
      <h3 style={{ color: "green" }}>SUCCESSFUL UPLOAD</h3>
      <a href={url}>Access the file here</a>
      <br />
    </div>
  );
  const handleUpload = (ev) => {
    ev.preventDefault();
    console.log(uploadFiles);
    var session = localStorage.getItem("session");
    if (session !== null) {
      var tokenInfo = JSON.parse(session);
      uploadSellerImages(tokenInfo.userid, tokenInfo.token, uploadFiles)
        .then((message) => {
          console.log(message);
          setImages(message);
          alert("Uploaded seller images!");
        })
        .catch((message) => {
          alert(message);
        });
    }
  };

  const handleChange = (ev) => {
    console.log(ev.target.files);
    var x = ev.target.files;
    var blobArray = [];
    for (let i = 0; i < x.length; i++) {
      if (
        x[i].type == "image/png" ||
        x[i].type == "image/jpg" ||
        x[i].type == "image/jpeg"
      ) {
        let reader = new FileReader();
        reader.readAsDataURL(x[i]);
        reader.onload = () => {
          let u = reader.result;
          blobArray.push({
            name: x[i].name,
            type: x[i].type,
            imageBlob: u,
          });
        };
      }
    }
    setUploadFiles(blobArray);
  };

  const deleteImage = (e, row) => {
    e.preventDefault();
    console.log(row.imagename);
    var answer = window.confirm("Delete image?");
    if (answer) {
      var session = localStorage.getItem("session");
      if (session !== null) {
        var tokenInfo = JSON.parse(session);
        deleteBookImage(tokenInfo.userid, tokenInfo.token, row.imagename).then(
          (images) => {
            deleteBookImageFromDb(
              tokenInfo.userid,
              tokenInfo.token,
              row.imagename
            ).then((resp) => {
              console.log("delete success");
              setUpdateModalOpen(false);
            });
          }
        );
      }
    }
  };
  return (
    <div>
      {" "}
      <AppBar position="static">
        <Toolbar>
          {userData.status === "ok" && (
            <div>
              {" "}
              <button onClick={logout}>Log out</button>
              {"  "}
              <button onClick={viewProfile}>Profile</button>
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
          <h2 id="simple-modal-title">Add book</h2>
          <p id="simple-modal-description">
            {" "}
            <form
              className={classes.root}
              onSubmit={addNewBook}
              autoComplete="off"
            >
              <div>
                {" "}
                <label>
                  ISBN <span className="requiredColor">*</span>
                </label>
                <TextField
                  className={classes.signUp}
                  required
                  value={isbn}
                  id="outlined-basic"
                  name="isbn"
                  variant="outlined"
                  onChange={update}
                />{" "}
              </div>
              <div>
                {" "}
                <label>
                  Title <span className="requiredColor">*</span>
                </label>
                <TextField
                  className={classes.signUp}
                  required
                  value={title}
                  id="outlined-basic"
                  name="title"
                  variant="outlined"
                  onChange={update}
                />
              </div>
              <div>
                <label>
                  Authors <span className="requiredColor">*</span>
                </label>
                <ChipInput
                  value={authors}
                  onAdd={(chip) => handleAddChip(chip)}
                  onDelete={(chip, index) => handleDeleteChip(chip, index)}
                />
              </div>
              <div>
                <label>
                  Publication date <span className="requiredColor">*</span>
                </label>
                <input
                  type="date"
                  value={publication}
                  onChange={handleDateChange}
                />
              </div>
              <div>
                {" "}
                <label>
                  Quantity <span className="requiredColor">*</span>
                </label>
                <TextField
                  type="number"
                  className={classes.signUp}
                  required
                  value={quantity}
                  id="outlined-basic"
                  name="quantity"
                  variant="outlined"
                  onChange={update}
                />
              </div>
              <div>
                {" "}
                <label>
                  Price <span className="requiredColor">*</span>
                </label>
                <TextField
                  type="number"
                  className={classes.signUp}
                  required
                  value={price}
                  id="outlined-basic"
                  name="price"
                  variant="outlined"
                  onChange={update}
                />
              </div>
              <div className="App">
                <center>
                  <h1>UPLOAD A FILE</h1>
                  {success ? <Success_message /> : null}
                  <input
                    onChange={handleChange}
                    required
                    type="file"
                    name="files"
                    multiple
                  />
                  <br />
                  <button onClick={handleUpload}>UPLOAD</button>
                </center>
              </div>
              <div>
                {" "}
                <button type="submit">Add book</button>
              </div>
            </form>
          </p>
        </div>
      </Modal>
      <Modal
        open={updateModalOpen}
        onClose={handleUpdateModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Update book</h2>
          <p id="simple-modal-description">
            {" "}
            <form
              className={classes.root}
              onSubmit={updateBookToSTore}
              autoComplete="off"
            >
              <div>
                {" "}
                <label>
                  ISBN <span className="requiredColor">*</span>
                </label>
                <TextField
                  className={classes.signUp}
                  required
                  value={currentBook.isbn}
                  id="outlined-basic"
                  name="isbn"
                  variant="outlined"
                  onChange={updateBook}
                />{" "}
              </div>
              <div>
                {" "}
                <label>
                  Title <span className="requiredColor">*</span>
                </label>
                <TextField
                  className={classes.signUp}
                  required
                  value={currentBook.title}
                  id="outlined-basic"
                  name="title"
                  variant="outlined"
                  onChange={updateBook}
                />
              </div>
              <div>
                <label>
                  Authors <span className="requiredColor">*</span>
                </label>
                <ChipInput
                  value={currentBook.authors}
                  onAdd={(chip) => handleAddChipUpdateWindow(chip)}
                  onDelete={(chip, index) =>
                    handleDeleteChipUpdateWindow(chip, index)
                  }
                />
              </div>
              <div>
                <label>
                  Publication date <span className="requiredColor">*</span>
                </label>
                <input
                  type="date"
                  value={currentBook.publication}
                  onChange={handleDateChangeUpdateWindow}
                />
              </div>
              <div>
                {" "}
                <label>
                  Quantity <span className="requiredColor">*</span>
                </label>
                <TextField
                  type="number"
                  className={classes.signUp}
                  required
                  value={currentBook.quantity}
                  id="outlined-basic"
                  name="quantity"
                  variant="outlined"
                  onChange={updateBook}
                />
              </div>
              <div>
                {" "}
                <label>
                  Price <span className="requiredColor">*</span>
                </label>
                <TextField
                  type="number"
                  className={classes.signUp}
                  required
                  value={currentBook.price}
                  id="outlined-basic"
                  name="price"
                  variant="outlined"
                  onChange={updateBook}
                />
              </div>
              <div>
                {typeof currentBook.imagesBlob !== "undefined" && (
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          {Object.keys(currentBook.imagesBlob[0]).map((v) => {
                            return <TableCell>{v}</TableCell>;
                          })}
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {currentBook.imagesBlob.map((row) => (
                          <TableRow key={row.imageBlob}>
                            {Object.keys(row).map((v) => {
                              if (v === "imageBlob") {
                                return (
                                  <TableCell>
                                    <img
                                      width="50px"
                                      height="50px"
                                      src={row[v]}
                                    />
                                  </TableCell>
                                );
                              } else {
                                return <TableCell>{row[v]}</TableCell>;
                              }
                            })}
                            <TableCell>
                              <button onClick={(e) => deleteImage(e, row)}>
                                Delete
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </div>
              <div className="App">
                <center>
                  <h1>UPLOAD A FILE</h1>
                  {success ? <Success_message /> : null}
                  <input
                    onChange={handleChange}
                    required
                    type="file"
                    name="files"
                    multiple
                  />
                  <br />
                  <button onClick={handleUpload}>UPLOAD</button>
                </center>
              </div>
              <div>
                {" "}
                <button type="submit">Update book</button>
              </div>
            </form>
          </p>
        </div>
      </Modal>
      <button onClick={handleAddBook}>Add book</button>
      {sellerBooks.status === "ok" && sellerBooks.data.length > 0 && (
        <div>
          <button onClick={removeAllSellerBooks}>Remove all books</button>
        </div>
      )}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {sellerBooks.status === "ok" &&
                sellerBooks.data.length > 0 &&
                Object.keys(sellerBooks.data[0]).map((v) => {
                  if (v !== "images") return <TableCell>{v}</TableCell>;
                })}
            </TableRow>
          </TableHead>
          <TableBody>
            {sellerBooks.status === "ok" &&
              sellerBooks.data.map((row) => (
                <TableRow key={row.name}>
                  {Object.keys(row).map((v) => {
                    console.log(typeof row[v]);
                    if (typeof row[v] !== "object")
                      return <TableCell>{row[v]}</TableCell>;
                  })}
                  {row.isdeleted === 0 ? (
                    <div>
                      <TableCell align="right">
                        <button onClick={(e) => handleUpdateClick(e, row)}>
                          Update
                        </button>
                      </TableCell>
                      <TableCell align="right">
                        <button onClick={(e) => handleRemoveBook(e, row)}>
                          Remove
                        </button>
                      </TableCell>
                    </div>
                  ) : (
                    <div>
                      <TableCell align="right">This book is deleted.</TableCell>
                    </div>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
