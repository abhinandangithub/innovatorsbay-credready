import Axios from "axios";
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
	fetchjobViewDataUrl,
	fetchCandidateJobsUrl,
	submitCandidateAnswersUrl,
	fetchAllCertificateTitlesUrl,
	fetchAllFunctionsUrl,
	fetchAllIndustriesUrl,
	jobApplyUrl
} from "./api";
import {
	candidateSetCurrentStatus,
	candidateSetData,
	setAppliedJobsData,
	setCandidateExperienceType,
	setCandidateDegreeTitles,
	setCandidateInstitutionType,
	candidateSetAllAnswers,
	candidateSetJobViewData,
	setCandidateJobs,
	setCandidateCertificateData,
	setAllFunctions,
	setAllIndustries
} from "./actions";
import { updateJwtToken } from "../../store/actions/auth";


export const fetchjobViewData = (id) => async (dispatch, getState) => {
	try {
		const { data } = await Axios.get(
			fetchjobViewDataUrl + "/" + id, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return;
		dispatch(candidateSetJobViewData(data ? data.data : []));

	} catch (err) {
		console.log(err)
	}
};

export const fetchAllAnswers = () => async (dispatch, getState) => {
	console.log("function called");
	try {
		const { data } = await Axios.get(
			fetchAllAnswersUrl, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return;
		dispatch(candidateSetAllAnswers(data ? data.data : []));

	} catch (err) {
		console.log(err)
	}
};


export const fetchCandidateDetails = () => async (dispatch, getState) => {
	try {
		const { data } = await Axios.get(
			fetchAllCandidateDataUrl, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return;
		dispatch(candidateSetData(data ? data.data : []));

	} catch (err) {
		console.log(err)
	}
};
export const addWorkExperience = (formData) => async (dispatch, getState) => {
	try {
		const { data } = await Axios.post(
			addWorkExperienceUrl,
			formData, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return;
		dispatch(fetchCandidateDetails());

	} catch (err) {
		console.log(err)
	}
}
export const jobApply = (formData, id) => async (dispatch, getState) => {
	try {
		const { data } = await Axios.put(
			jobApplyUrl + "/" + id,
			formData, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return;
		localStorage.clear();
		dispatch(candidateGetAppliedJobs());
	} catch (err) {
		console.log(err)
	}
}

export const submitCandidateAnswers = (formData) => async (dispatch, getState) => {
	try {
		const { data } = await Axios.post(
			submitCandidateAnswersUrl,
			formData, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return;
		dispatch(fetchCandidateDetails());
	} catch (err) {
		console.log(err)
	}
}



export const addOtherWorkExperience = (formData) => async (dispatch, getState) => {
	try {
		const { data } = await Axios.post(
			addOtherWorkExperienceUrl,
			formData, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return;
		dispatch(fetchCandidateDetails());

	} catch (err) {
		console.log(err)
	}
}

export const addEducationExperience = (formData) => async (dispatch, getState) => {
	try {
		const { data } = await Axios.post(
			addEducationExperienceUrl,
			formData, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return;
		dispatch(fetchCandidateDetails());

	} catch (err) {
		console.log(err)
	}
}

export const addOtherEducationExperience = (formData) => async (dispatch, getState) => {
	try {
		const { data } = await Axios.post(
			addOtherEducationExperienceUrl,
			formData, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return;
		dispatch(fetchCandidateDetails());

	} catch (err) {
		console.log(err)
	}
}



export const updateCandidateDetails = (formData) => async (dispatch, getState) => {
	try {
		const { data } = await Axios.patch(
			updateCandidateDetailsUrl,
			formData, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
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

		const { data } = await Axios.post(
			addEducationCertificateUrl,
			formData, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		}
		);
		if (!data) return;

		fetchCandidateDetails();
	}
	catch (err) {
		console.log(err);
	}
}

export const addStrength = (data) => async (dispatch, getState) => {
	try {
		const response = await Axios.post(addStrengthUrl, data, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		dispatch(fetchCandidateDetails());
	} catch (err) {
		console.log(err);
	}
}

export const candidateGetAppliedJobs = () => async (dispatch, getState) => {
	try {
		const { data } = await Axios.get(
			fetchCandidateAppliedJobsUrl, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
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

		const { data } = await Axios.get(
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
		const { data } = await Axios.get(
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
		const { data } = await Axios.get(
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
		const { data } = await Axios.get(
			fetchCandidateInstituteTypeUrl,
		);
		dispatch(setCandidateInstitutionType(data ? data.data : []))
		if (!data) return;
	} catch (err) {
		console.log(err)
	}
}

export const fetchAllFunctions = () => async (dispatch, getState) => {
	try {
		const { data } = await Axios.get(
			fetchAllFunctionsUrl,
		);
		dispatch(setAllFunctions(data ? data.data : []))
		if (!data) return;
	} catch (err) {
		console.log(err)
	}
}

export const fetchAllIndustries = () => async (dispatch, getState) => {
	try {
		const { data } = await Axios.get(
			fetchAllIndustriesUrl,
		);
		dispatch(setAllIndustries(data ? data.data : []))
		if (!data) return;
	} catch (err) {
		console.log(err)
	}
}

export const fetchCandidateJobs = () => async (dispatch, getState) => {
	try {
		const data = await Axios.get(fetchCandidateJobsUrl, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return;
		dispatch(setCandidateJobs(data && data.data ? data.data.data : []));

	} catch (err) {
		console.log(err)
	}
}


export const fetchAllCertificateTitles = () => async (dispatch, getState) => {
	try {
		const data = await Axios.get(fetchAllCertificateTitlesUrl, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return;
		dispatch(setCandidateCertificateData(data && data.data ? data.data.data : []));

	} catch (err) {
		console.log(err)
	}
}