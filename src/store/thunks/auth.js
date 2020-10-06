import Axios from "axios";
import { loginUrl, signUpUrl } from "../api/auth";

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

export const verifyCode = (details) => async (dispatch, getState) => {
	try {
		const {} = await Axios.get;
	} catch (err) {}
};
