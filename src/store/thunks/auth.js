import Axios from "axios";
import { loginUrl, signUpUrl, verifyOtpUrl } from "../api/auth";

import { updateLoggedIn, updateJwtToken } from "../actions/auth";
import Cookies from "js-cookie";
import { setDefaultAuthorizationHeader } from "../utility";
import { requestConfig } from "./utils";

export const tryLogin = (credentials) => async (dispatch, getState) => {
	try {
		const {
			data: { data: token, type },
		} = await Axios.post(loginUrl, credentials, requestConfig);
		if (!token) return false;
		Cookies.set("JWT", token);
		setDefaultAuthorizationHeader(token);
		dispatch(updateJwtToken(token));
		dispatch(updateLoggedIn([true, "candidate"]));
	} catch (err) {
		if (err.response) console.error(`failed to log-in with error ${err}`);
	}
};

export const signUpUser = (userData) => async (dispatch, getState) => {
	try {
		const { message } = await Axios.post(signUpUrl, userData, requestConfig);
		if (!message) return;
		dispatch();
	} catch (err) {
		console.error(`failed to sign-up user with error ${err}`);
	}
};

export const verifyOtp = (data) => async (dispatch, getState) => {
	try {
		data.phone = getState().authReducer.signUp.phone;
		console.log('details ', data, getState());
		const response = await Axios.post(verifyOtpUrl, data, requestConfig);
		dispatch();
	} catch (err) { }
};
