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

export const setCandidatesList = (val) => {
	return {
		type: actionTypes.SET_CANDIDATES_LIST,
		value: val,
	};
};

export const setEmploymentType = (val) => {
	return {
		type: actionTypes.SET_EMPLOYMENT_TYPE,
		value: val,
	};
};

export const setIndustry = (val) => {
	return {
		type: actionTypes.SET_INDUSTRY,
		value: val,
	};
};

export const setFunction = (val) => {
	return {
		type: actionTypes.SET_FUNCTION,
		value: val,
	};
};

export const setSkills = (val) => {
	return {
		type: actionTypes.SET_SKILLS,
		value: val,
	};
};

export const setQuestionBank = (val) => {
	return {
		type: actionTypes.SET_QUESTION_BANK,
		value: val,
	};
};

export const setEmailTemplate = (val) => {
	return {
		type: actionTypes.SET_EMAIL_TEMPLATE,
		value: val,
	};
};

export const setPostedJobURL = (val) => {
	return {
		type: actionTypes.SET_JOB_URL,
		value: val,
	};
};

export const setNewJob = (val) => {
	return {
		type: actionTypes.SET_NEW_JOB,
		value: val,
	};
};

export const setAppliedCandidateDetails = (val) => {
	return {
		type: actionTypes.SET_APPLIED_CANDIDATE,
		value: val,
	};
};