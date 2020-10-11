import Axios from "axios";
import { loginUrl, signUpUrl, verifyUserUrl, authVcodeRequestPostUrl } from "../api/auth";

import { updateLoggedIn, updateJwtToken, updatePhoneOtp } from "../actions/auth";
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

export const getVerificationCode = (userData) => async (dispatch, getState) => {
	console.log('userData ', userData);
	try {
		//dispatch(updatePhoneOtp(1111));
		const { message } = await Axios.post(authVcodeRequestPostUrl, userData, requestConfig);
		if (!message) return;
		dispatch();
	} catch (err) {
		console.error(`failed to sign-up user with error ${err}`);
	}
};

export const verifyUserCode = (otp) => async (dispatch, getState) => {
	console.log('userData ', otp);
	let data = {
		"type": "phone",
		"contact": getState().authReducer.signUp.phone,
		"verification_code": otp
	}
	dispatch(signUpUser(getState().authReducer.signUp))
	try {
		const { message } = await Axios.post(verifyUserUrl, data, requestConfig);
		if (!message) {
			dispatch(signUpUser(getState().authReducer.signUp))
			return
		};
		dispatch();
	} catch (err) {
		console.error(`failed to sign-up user with error ${err}`);
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
