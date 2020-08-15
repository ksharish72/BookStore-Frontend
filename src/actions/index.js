import axios from "axios";
import {
  REGISTER_USER_API,
  LOGIN_USER_API,
  GET_USER_API,
  UPDATE_USER_API,
  RESET_PASSWORD_API,
  GET_BUYER_BOOKS_API,
  ADD_TO_CART_API,
  GET_CART_ITEMS_API,
  REMOVE_FROM_CART_API,
  UPDATE_CART_API,
  GET_SELLER_BOOKS_API,
  REMOVE_BOOK_API,
  ADD_BOOK_API,
  UPDATE_BOOK_API,
  UPLOAD_SELLER_IMAGE_API,
  GET_BOOK_IMAGES,
  DELETE_BOOK_IMAGE,
  DELETE_BOOK_IMAGE_DB,
  GET_BOOK_IMAGES_FROM_DB,
  FORGOT_PASSWORD,
} from "../constants";
import {
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_BUYER_BOOKS_SUCCESS,
  GET_BUYER_BOOKS_FAILURE,
  GET_CARTITEMS_SUCCESS,
  GET_CARTITEMS_FAILURE,
  GET_SELLER_BOOKS_SUCCESS,
  GET_SELLER_BOOKS_FAILURE,
} from "../actions/types";

export function registerUser(data) {
  return axios
    .post(`${REGISTER_USER_API}`, data)
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.message);
    });
}

export function loginUser(data) {
  return axios
    .post(`${LOGIN_USER_API}`, data)
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      console.log(err.response);
      return Promise.reject(err.response.data.message);
    });
}
export function getUserInfo(userId, accessToken) {
  console.log(userId, accessToken);
  return function (dispatch) {
    const AuthStr = "Bearer ".concat(accessToken);
    return axios
      .get(`${GET_USER_API}${userId}`, { headers: { Authorization: AuthStr } })
      .then((res) => {
        console.log(res);
        dispatch({ type: GET_USER_SUCCESS, payload: res.data.message });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_USER_FAILURE,
          payload: err.response.data.message,
        });
      });
  };
}
export function getBuyerBooks(userId, accessToken) {
  return function (dispatch) {
    const AuthStr = "Bearer ".concat(accessToken);
    return axios
      .get(`${GET_BUYER_BOOKS_API}${userId}`, {
        headers: { Authorization: AuthStr },
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: GET_BUYER_BOOKS_SUCCESS, payload: res.data.message });
      })
      .catch((err) => {
        console.log(err);

        dispatch({
          type: GET_BUYER_BOOKS_FAILURE,
          payload: err.response.data.message,
        });
      });
  };
}

export function getSellerBooks(userId, accessToken) {
  return function (dispatch) {
    const AuthStr = "Bearer ".concat(accessToken);
    return axios
      .get(`${GET_SELLER_BOOKS_API}${userId}`, {
        headers: { Authorization: AuthStr },
      })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: GET_SELLER_BOOKS_SUCCESS, payload: res.data.message });
      })
      .catch((err) => {
        console.log("Error " + err);

        dispatch({
          type: GET_SELLER_BOOKS_FAILURE,
          payload: err.response.data.message,
        });
      });
  };
}

export function getCartItems(userId, accessToken) {
  return function (dispatch) {
    const AuthStr = "Bearer ".concat(accessToken);
    return axios
      .get(`${GET_CART_ITEMS_API}${userId}`, {
        headers: { Authorization: AuthStr },
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: GET_CARTITEMS_SUCCESS, payload: res.data.message });
      })
      .catch((err) => {
        console.log(err);

        dispatch({
          type: GET_CARTITEMS_FAILURE,
          payload: err.response.data.message,
        });
      });
  };
}
export function updateUserInfo(userId, accessToken, userData) {
  const AuthStr = "Bearer ".concat(accessToken);
  return axios
    .put(`${UPDATE_USER_API}${userId}`, userData, {
      headers: { Authorization: AuthStr },
    })
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.message);
    });
}

export function resetPassword(userId, accessToken, passwordData) {
  const AuthStr = "Bearer ".concat(accessToken);
  return axios
    .put(`${RESET_PASSWORD_API}${userId}`, passwordData, {
      headers: { Authorization: AuthStr },
    })
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.message);
    });
}

export function addToCart(userId, accessToken, bookDetails) {
  const AuthStr = "Bearer ".concat(accessToken);
  return axios
    .post(`${ADD_TO_CART_API}${userId}`, bookDetails, {
      headers: { Authorization: AuthStr },
    })
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.message);
    });
}
export function uploadSellerImages(userId, accessToken, imageFiles) {
  const AuthStr = "Bearer ".concat(accessToken);
  return axios
    .post(`${UPLOAD_SELLER_IMAGE_API}${userId}`, imageFiles, {
      headers: {
        Authorization: AuthStr,
      },
    })
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.message);
    });
}

export function updateCart(userId, accessToken, bookDetails) {
  const AuthStr = "Bearer ".concat(accessToken);
  return axios
    .put(
      `${UPDATE_CART_API}${userId}?cartid=${bookDetails.cartid}`,
      bookDetails,
      {
        headers: { Authorization: AuthStr },
      }
    )
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.message);
    });
}

export function removeFromCart(userId, accessToken, cartid) {
  const AuthStr = "Bearer ".concat(accessToken);
  return axios
    .delete(`${REMOVE_FROM_CART_API}${userId}?cartid=${cartid}`, {
      headers: { Authorization: AuthStr },
    })
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.message);
    });
}

export function removeBook(userId, accessToken, bookid) {
  const AuthStr = "Bearer ".concat(accessToken);
  return axios
    .delete(`${REMOVE_BOOK_API}${userId}?bookid=${bookid}`, {
      headers: { Authorization: AuthStr },
    })
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.message);
    });
}

export function addSelerBook(userId, accessToken, data) {
  const AuthStr = "Bearer ".concat(accessToken);
  return axios
    .post(`${ADD_BOOK_API}${userId}`, data, {
      headers: { Authorization: AuthStr },
    })
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.message);
    });
}
export function updateSelerBook(userId, accessToken, data) {
  const AuthStr = "Bearer ".concat(accessToken);
  return axios
    .put(`${UPDATE_BOOK_API}${userId}`, data, {
      headers: { Authorization: AuthStr },
    })
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.message);
    });
}
export function removeAllCartItems(userId, accessToken) {
  const AuthStr = "Bearer ".concat(accessToken);
  return axios
    .delete(`${REMOVE_FROM_CART_API}${userId}`, {
      headers: { Authorization: AuthStr },
    })
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.message);
    });
}

export function removeAllBooks(userId, accessToken) {
  const AuthStr = "Bearer ".concat(accessToken);
  return axios
    .delete(`${REMOVE_BOOK_API}${userId}`, {
      headers: { Authorization: AuthStr },
    })
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.message);
    });
}
export function getBookImages(userId, accessToken, images) {
  const AuthStr = "Bearer ".concat(accessToken);

  return axios
    .post(`${GET_BOOK_IMAGES}${userId}`, images, {
      headers: { Authorization: AuthStr },
    })
    .then((res) => {
      console.log(res);
      return res.data.message;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.message);
    });
}
export function forgotPassword(data) {
  return axios
    .post(`${FORGOT_PASSWORD}`, data)
    .then((res) => {
      console.log(res);
      return res.data.message;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.message);
    });
}

export function getBookImagesFromDb(userId, accessToken, isbn) {
  const AuthStr = "Bearer ".concat(accessToken);

  return axios
    .get(`${GET_BOOK_IMAGES_FROM_DB}${userId}?isbn=${isbn}`, {
      headers: { Authorization: AuthStr },
    })
    .then((res) => {
      console.log(res);
      return res.data.message;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.message);
    });
}
export function deleteBookImage(userId, accessToken, imagename) {
  const AuthStr = "Bearer ".concat(accessToken);

  return axios
    .delete(`${DELETE_BOOK_IMAGE}${userId}?key=${imagename}`, {
      headers: { Authorization: AuthStr },
    })
    .then((res) => {
      console.log(res);
      return res.data.message;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.message);
    });
}

export function deleteBookImageFromDb(userId, accessToken, imagename) {
  const AuthStr = "Bearer ".concat(accessToken);

  return axios
    .delete(`${DELETE_BOOK_IMAGE_DB}${userId}?key=${imagename}`, {
      headers: { Authorization: AuthStr },
    })
    .then((res) => {
      console.log(res);
      return res.data.message;
    })
    .catch((err) => {
      return Promise.reject(err.response.data.message);
    });
}
