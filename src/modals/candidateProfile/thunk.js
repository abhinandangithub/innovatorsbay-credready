import axios from "axios";
import {
	fetchAllCandidateData,
	addWorkExperienceUrl,
	addOtherWorkExperienceUrl,
	updateCandidateDetailsUrl,
	addEducationExperienceUrl,
	addOtherEducationExperienceUrl,
	addEducationCertificateUrl,
	addStrengthUrl
} from "./api";

export const fetchCandidateDetails = () => async (dispatch, getState) => {
	let token = getState().authReducer.JWT;
	try {
		const {
			data: { data: candidateData },
		} = await axios.get(fetchAllCandidateData, {
			headers: {
				Authorization: token
			}
		});
		// dispatch(fetchAllCandidateData(candidateData ? candidateData : []));
	} catch (err) {
		console.log(err);
	}
};


export const addWorkExperience = (data) => async (dispatch, getState) => {
	let token = getState().authReducer.JWT;
	try {
		const response = await axios.post(addWorkExperienceUrl, data, {
			headers: {
				Authorization: token
			}
		});
		dispatch(fetchCandidateDetails());
	} catch (err) {
		console.log(err);
	}
}

export const addOtherWorkExperience = (data) => async (dispatch, getState) => {
	let token = getState().authReducer.JWT;
	try {
		const response = await axios.post(addOtherWorkExperienceUrl, data, {
			headers: {
				Authorization: token
			}
		});
		dispatch(fetchCandidateDetails());
	} catch (err) {
		console.log(err);
	}
}

export const addEducationExperience = (data) => async (dispatch, getState) => {
	let token = getState().authReducer.JWT;
	try {
		const response = await axios.post(addEducationExperienceUrl, data, {
			headers: {
				Authorization: token
			}
		});
		dispatch(fetchCandidateDetails());
	} catch (err) {
		console.log(err);
	}
}

export const addOtherEducationExperience = (data) => async (dispatch, getState) => {
	let token = getState().authReducer.JWT;
	try {
		const response = await axios.post(addOtherEducationExperienceUrl, data, {
			headers: {
				Authorization: token
			}
		});
		dispatch(fetchCandidateDetails());
	} catch (err) {
		console.log(err);
	}
}

export const updateCandidateDetails = (data) => async (dispatch, getState) => {
	let token = getState().authReducer.JWT;
	try {
		const response = await axios.patch(updateCandidateDetailsUrl, data, {
			headers: {
				Authorization: token
			}
		});
		dispatch(fetchCandidateDetails());
	}
	catch (err) {
		console.log(err);
	}
}

export const addEducationCertificate = (data) => async (dispatch, getState) => {
	let token = getState().authReducer.JWT;
	try {
		const response = await axios.post(addEducationCertificateUrl, data, {
			headers: {
				Authorization: token
			}
		});
		dispatch(fetchCandidateDetails());
	} catch (err) {
		console.log(err);
	}
}

export const addStrength = (data) => async (dispatch, getState) => {
	let token = getState().authReducer.JWT;
	try {
		const response = await axios.post(addStrengthUrl, data, {
			headers: {
				Authorization: token
			}
		});
		dispatch(fetchCandidateDetails());
	} catch (err) {
		console.log(err);
	}
}