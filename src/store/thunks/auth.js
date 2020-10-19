import Axios from "axios";
import {
	loginUrl,
	signUpUrl,
	verifyUserUrl,
	authVcodeRequestPostUrl,
} from "../api/auth";
import { updatePhoneOtp } from "../../store/actions/auth";

import { updateLoggedIn, updateJwtToken } from "../actions/auth";
import { fetchCandidateDetails } from "../../modals/candidateProfile/thunk";
import Cookies from "js-cookie";
import { setDefaultAuthorizationHeader } from "../utility";
import { requestConfig } from "./utils";
import { getProfileThunk } from "./employer";

export const tryLogin = (credentials) => async (dispatch, getState) => {
	try {
		const {
			data: { data: token },
		} = await Axios.post(loginUrl, credentials, requestConfig);
		if (!token) return false;
		Cookies.set("JWT", token);
		/**
		 * TODO: after uncomment below line, `dispatch(updateLoggedIn([true, type]));` is not working
		 */
		// setDefaultAuthorizationHeader(token);
		dispatch(updateJwtToken(token));
		let type =
			token && token.map
				? token.map.user_type === "jobseeker"
					? "candidate"
					: token.map.user_type
				: "";
		await fetchCandidateDetails();
		dispatch(updateLoggedIn([true, type]));
		dispatch(getProfileThunk());
		setDefaultAuthorizationHeader(token);
	} catch (err) {
		// dispatch(updateLoggedIn([null, ""]));
		if (err.response) console.error(`failed to log-in with error ${err}`);
	}
};

export const getVerificationCode = (userData) => async (dispatch, getState) => {
	console.log("userData ", userData);
	try {
		//dispatch(updatePhoneOtp(1111));
		const { message } = await Axios.post(
			authVcodeRequestPostUrl,
			userData,
			requestConfig
		);
		if (!message) return;
		dispatch();
	} catch (err) {
		console.error(`failed to sign-up user with error ${err}`);
	}
};

export const verifyUserCode = (type = "phone", otp) => async (
	dispatch,
	getState
) => {
	let data = {
		type: type,
		contact: getState().authReducer.signUp.phone,
		verification_code: otp,
	};
	try {
		const { message } = await Axios.post(verifyUserUrl, data, requestConfig);
		if (!message) {
			dispatch(updatePhoneOtp(true));
			dispatch(signUpUser(getState().authReducer.signUp));
			return;
		}
		dispatch();
	} catch (err) {
		dispatch(updatePhoneOtp(false));
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
