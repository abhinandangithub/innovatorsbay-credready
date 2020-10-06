import Axios from "axios";
import { loginUrl, signUpUrl } from "../api/auth";
import { updateLoggedIn } from "../actions/auth";
import Cookies from "js-cookie";
import { setDefaultAuthorizationHeader } from "../utility";

export const tryLogin = (credentials) => async (dispatch, getState) => {
  try {
    const {
      data: { token, type },
    } = await Axios.post(loginUrl, credentials);
    if (!token || !type) return false;
    Cookies.setItem("JWT", token);
    setDefaultAuthorizationHeader(token);
    dispatch(updateLoggedIn([true, type]));
  } catch (err) {
    console.error(`failed to log-in with error ${err}`);
  }
};

export const signUpUser = (userData) => async (dispatch, getState) => {
  try {
    const { message } = await Axios.post(signUpUrl, userData);
    if (!message) return;
  } catch (err) {
    console.error(`failed to sign-up user with error ${err}`);
  }
};

export const verifyCode = (details) => async (dispatch, getState) => {
  try {
    const {} = await Axios.get;
  } catch (err) {}
};
