import * as actionTypes from "./actionTypes/candidate";

export const setCandidateJobApplications = (val) => {
	return {
		type: actionTypes.SET_JOB_APPLICATIONS,
		value: val,
	};
};