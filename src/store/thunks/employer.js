import Axios from "axios";
import { employeFetchHireRequiredRangesUrl, 
		 employerFetchComapnySizeUrl,
		 employerUpdateUserPhoneUrl, 
		 employerUpdateEmailUrl,
		 employerDeleteAccountUrl,
		 employerUpdateProfileUrl} from "../api/employer";

import { setHiringNeeds, setCompanySize, setPhoneNumber, setEmail, setEmployerProfile } from "../actions/employer";
// import Cookies from "js-cookie";
import { setDefaultAuthorizationHeader } from "../utility";
import { requestConfig } from "./utils";

export const getHiringNeedsThunk = (token) => async (dispatch, getState) => {
	try {
        const data = await Axios.get(employeFetchHireRequiredRangesUrl, requestConfig);
		if (!data) return false;
		dispatch(setHiringNeeds(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to fetch hiring needs ${err}`);
	}
};

export const getCompanySizeThunk = (token) => async (dispatch, getState) => {
	try {
        const data = await Axios.get(employerFetchComapnySizeUrl, requestConfig);
		if (!data) return false;
		dispatch(setCompanySize(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to fetch company size ${err}`);
	}
};

export const updateProfileThunk = (token, profile) => async (dispatch, getState) => {
	try {
		const state = getState();
		setDefaultAuthorizationHeader(state.authReducer.JWT);
        const data = await Axios.patch(employerUpdateProfileUrl, profile, requestConfig);
		if (!data) return false;
		dispatch(setEmployerProfile(profile));
	} catch (err) {
		if (err.response) console.error(`failed to update employer profile ${err}`);
	}
};

export const updatePhoneNumberThunk = (token, phone) => async (dispatch, getState) => {
	try {
        const data = await Axios.put(employerUpdateUserPhoneUrl, phone, requestConfig);
		if (!data) return false;
		dispatch(setPhoneNumber(data.data.phone));
	} catch (err) {
		if (err.response) console.error(`failed to update phone number ${err}`);
	}
};

export const updateEmailThunk = (token, email) => async (dispatch, getState) => {
	try {
        const data = await Axios.put(employerUpdateEmailUrl, email, requestConfig);
		if (!data) return false;
		dispatch(setEmail(data.data.email));
	} catch (err) {
		if (err.response) console.error(`failed to update  email ${err}`);
	}
};

export const deleteAccount = (token) => async (dispatch, getState) => {
	try {
        const data = await Axios.delete(employerDeleteAccountUrl, requestConfig);
		if (!data) return false;
	} catch (err) {
		if (err.response) console.error(`failed to delete employer account ${err}`);
	}
};