//export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/";
export const API_URL = "https://" + window.location.origin.split('//')[1].split(':')[0] + ":3000/";
export const REGISTER_USER_API = `${API_URL}dev/user/registration/`;
export const LOGIN_USER_API = `${API_URL}dev/user/login/`;
export const GET_USER_API = `${API_URL}dev/user/`;
export const UPDATE_USER_API = `${API_URL}dev/user/update/`;
export const RESET_PASSWORD_API = `${API_URL}dev/user/resetpassword/`;
export const GET_BUYER_BOOKS_API = `${API_URL}dev/buyer/book/`;
export const ADD_TO_CART_API = `${API_URL}dev/cart/add/`;
export const GET_CART_ITEMS_API = `${API_URL}dev/cart/`;
export const REMOVE_FROM_CART_API = `${API_URL}dev/cart/delete/`;
export const UPDATE_CART_API = `${API_URL}dev/cart/update/`;
export const GET_SELLER_BOOKS_API = `${API_URL}dev/seller/book/`;
export const REMOVE_BOOK_API = `${API_URL}dev/seller/book/delete/`;
export const ADD_BOOK_API = `${API_URL}dev/seller/book/add/`;
export const UPDATE_BOOK_API = `${API_URL}dev/seller/book/update/`;
export const UPLOAD_SELLER_IMAGE_API = `${API_URL}dev/seller/book/uploadImages/`
export const GET_BOOK_IMAGES = `${API_URL}dev/seller/book/getImages/`
export const DELETE_BOOK_IMAGE =`${API_URL}dev/seller/book/deleteImage/`
export const DELETE_BOOK_IMAGE_DB = `${API_URL}dev/seller/book/deleteImageDb/`
export const GET_BOOK_IMAGES_FROM_DB = `${API_URL}dev/seller/book/getImagesDb/`
export const FORGOT_PASSWORD = `${API_URL}dev/user/forgotPassword/`