import axios from "axios";
import {
	fetchAllCandidateDataUrl,
	addWorkExperienceUrl,
	addOtherWorkExperienceUrl,
	updateCandidateDetailsUrl,
	addEducationExperienceUrl,
	addOtherEducationExperienceUrl,
	addEducationCertificateUrl,
	addStrengthUrl,
	fetchCandidateCurrentStatusUrl,
	fetchCandidateAppliedJobsUrl,
	fetchCandidateExperienceTypeUrl,
	fetchCandidateDegreeTitlesUrl,
	fetchCandidateInstituteTypeUrl,
	fetchAllAnswersUrl,
	fetchjobViewDataUrl
} from "./api";
import {
	candidateSetCurrentStatus,
	candidateSetData,
	setAppliedJobsData,
	setCandidateExperienceType,
	setCandidateDegreeTitles,
	setCandidateInstitutionType,
	candidateSetAllAnswers,
	candidateSetJobViewData
} from "./actions";
import { updateJwtToken } from "../../store/actions/auth";
import { setDefaultAuthorizationHeader } from "../../store/utility";


export const fetchjobViewData = (id) => async (dispatch, getState) => {
	try {
		const state = getState();
		setDefaultAuthorizationHeader(state.authReducer.JWT);
		const { data } = await axios.get(
			fetchjobViewDataUrl + "/" + id,
			requestConfig
		);
		if (!data) return;
		dispatch(candidateSetJobViewData(data ? data.data : []));

	} catch (err) {
		console.log(err)
	}
};

export const fetchAllAnswers = () => async (dispatch, getState) => {
	try {
		const state = getState();
		setDefaultAuthorizationHeader(state.authReducer.JWT);
		const { data } = await axios.get(
			fetchAllAnswersUrl,
			requestConfig
		);
		if (!data) return;
		dispatch(candidateSetAllAnswers(data ? data.data : []));

	} catch (err) {
		console.log(err)
	}
};


export const fetchCandidateDetails = () => async (dispatch, getState) => {
	try {
		const state = getState();
		setDefaultAuthorizationHeader(state.authReducer.JWT);
		const { data } = await axios.get(
			fetchAllCandidateDataUrl,
			requestConfig
		);
		if (!data) return;
		dispatch(candidateSetData(data ? data.data : []));

	} catch (err) {
		console.log(err)
	}
};
export const addWorkExperience = (formData) => async (dispatch, getState) => {
	try {
		const state = getState();
		setDefaultAuthorizationHeader(state.authReducer.JWT);
		const { data } = await axios.post(
			addWorkExperienceUrl,
			formData,
			requestConfig
		);
		if (!data) return;
		dispatch(fetchCandidateDetails());

	} catch (err) {
		console.log(err)
	}
}



export const addOtherWorkExperience = (formData) => async (dispatch, getState) => {
	try {
		const state = getState();
		setDefaultAuthorizationHeader(state.authReducer.JWT);
		const { data } = await axios.post(
			addOtherWorkExperienceUrl,
			formData,
			requestConfig
		);
		if (!data) return;
		dispatch(fetchCandidateDetails());

	} catch (err) {
		console.log(err)
	}
}

export const addEducationExperience = (formData) => async (dispatch, getState) => {
	try {
		const state = getState();
		setDefaultAuthorizationHeader(state.authReducer.JWT);
		const { data } = await axios.post(
			addEducationExperienceUrl,
			formData,
			requestConfig
		);
		if (!data) return;
		dispatch(fetchCandidateDetails());

	} catch (err) {
		console.log(err)
	}
}

export const addOtherEducationExperience = (formData) => async (dispatch, getState) => {
	try {
		const state = getState();
		setDefaultAuthorizationHeader(state.authReducer.JWT);
		const { data } = await axios.post(
			addOtherEducationExperienceUrl,
			formData,
			requestConfig
		);
		if (!data) return;
		dispatch(fetchCandidateDetails());

	} catch (err) {
		console.log(err)
	}
}



export const updateCandidateDetails = (formData) => async (dispatch, getState) => {
	try {
		const state = getState();
		setDefaultAuthorizationHeader(state.authReducer.JWT);
		const { data } = await axios.patch(
			updateCandidateDetailsUrl,
			formData,
			requestConfig1
		);
		if (!data) return;

		updateJwtToken(data ? data.data : "");
		fetchCandidateDetails();
	}
	catch (err) {
		console.log(err);
	}
}

export const addEducationCertificate = (formData) => async (dispatch, getState) => {
	try {
		const state = getState();
		setDefaultAuthorizationHeader(state.authReducer.JWT);
		const { data } = await axios.patch(
			addEducationCertificateUrl,
			formData,
			requestConfig1
		);
		if (!data) return;

		fetchCandidateDetails();
	}
	catch (err) {
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

export const candidateGetAppliedJobs = () => async (dispatch, getState) => {
	try {
		const { data } = await axios.get(
			fetchCandidateAppliedJobsUrl,
			requestConfig
		);
		if (!data) return;
		dispatch(setAppliedJobsData(data ? data.data : ""));
	} catch (err) {
		console.log(err);
	}
};

export const requestConfig = {
	headers: {
		"Content-type": "application/vnd.credready.com+json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
	}
};
export const requestConfig1 = {
	headers: {
		"Content-type": "application/vnd.credready.com+json"
	}
};


export const fetchCandidateCurrentStatus = () => async (dispatch, getState) => {
	try {

		const { data } = await axios.get(
			fetchCandidateCurrentStatusUrl,
		);
		dispatch(candidateSetCurrentStatus(data ? data.data : []))
		if (!data) return;
	} catch (err) {
		console.log(err)
	}
}

export const fetchCandidateExperienceType = () => async (dispatch, getState) => {
	try {
		const { data } = await axios.get(
			fetchCandidateExperienceTypeUrl,
		);
		dispatch(setCandidateExperienceType(data ? data.data : []))
		if (!data) return;
	} catch (err) {
		console.log(err)
	}
}

export const fetchCandidateDegreeTitles = () => async (dispatch, getState) => {
	try {
		const { data } = await axios.get(
			fetchCandidateDegreeTitlesUrl,
		);
		dispatch(setCandidateDegreeTitles(data ? data.data : []))
		if (!data) return;
	} catch (err) {
		console.log(err)
	}
}

export const fetchCandidateInstituteType = () => async (dispatch, getState) => {
	try {
		const { data } = await axios.get(
			fetchCandidateInstituteTypeUrl,
		);
		dispatch(setCandidateInstitutionType(data ? data.data : []))
		if (!data) return;
	} catch (err) {
		console.log(err)
	}
}
