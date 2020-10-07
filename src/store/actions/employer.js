import * as actionTypes from "./actionTypes/employer";
// import {getHiringNeedsThunk} from '../thunks/employer';

/* val: true or false */
export const getHiringNeeds = (val) => {
	return {
		type: actionTypes.GET_HIRING_NEEDS,
		value: val,
    };
    // getHiringNeedsThunk();
};

/* val: true or false */
export const setHiringNeeds = (val) => {
	return {
		type: actionTypes.SET_HIRING_NEEDS,
		value: val,
	};
};

export const setCompanySize = (val) => {
	return {
		type: actionTypes.SET_COMPANY_SIZE,
		value: val,
	};
};

export const setPhoneNumber = (val) => {
	return {
		type: actionTypes.SET_PHONE_NUMBER,
		value: val,
	};
};

export const setEmail = (val) => {
	return {
		type: actionTypes.SET_EMAIL,
		value: val,
	};
};

export const setEmployerProfile = (val) => {
	return {
		type: actionTypes.SET_EMPLOYER_PROFILE,
		value: val,
	};
};

export const setEmployerJobs = (val) => {
	return {
		type: actionTypes.SET_EMPLOYER_POSTED_JOBS,
		value: val,
	};
};