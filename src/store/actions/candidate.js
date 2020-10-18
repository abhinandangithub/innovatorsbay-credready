import * as actionTypes from "./actionTypes/candidate";

export const setCandidateJobApplications = (val) => {
	return {
		type: actionTypes.SET_JOB_APPLICATIONS,
		value: val,
	};
};

export const setCandidateJobDetails = (val) => {
	return {
		type: actionTypes.SET_CANDID_JOB_DETAILS,
		value: val,
	};
};