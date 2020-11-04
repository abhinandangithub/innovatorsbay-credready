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
	jobApplyUrl,
	deleteWorkExperienceUrl,
	deleteEducationExperienceUrl,
	deleteOtherExperienceUrl,
	deleteCertificateUrl,
	fetchJobDescriptionUrl,
	updateCandidatePhoneUrl,
	updateCandidateAboutUrl,
	updateCandidateEmailUrl,
	uploadCandidateImageUrl,
	uploadCandidateResumeUrl,
	deleteCandidateAccountUrl,
	fetchAllMajorMinorUrl,
	updateUserConsentUrl
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
	setAllIndustries,
	setJobDescription,
	setAllMajorMinor
} from "./actions";
import { showToast } from "../../store/actions/toast";
import { updateJwtToken } from "../../store/actions/auth";
import {
	togglePopup,
	toggleOverlay,
} from "../../store/actions/popup_overlay";
import { setCandidateJobDetails } from "../../store/actions/candidate";
import { set } from "js-cookie";

export const uploadCandidateImage = (image) => async (dispatch, getState) => {
	try {
		const data = await Axios.patch(uploadCandidateImageUrl, image, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'multipart/form-data'
			}
		});
		if (!data) return false;
		dispatch(showToast({
			message: "Image uploaded successfully",
			type: "success",
			isShow: true
		}));
	} catch (err) {
		if (err.response) {
			dispatch(showToast({
				message: "Failed to upload image please try again",
				type: "error",
				isShow: true
			}));
			console.error(`failed to post the question ${err}`);
		}
	}
};

export const uploadCandidateResume = (image) => async (dispatch, getState) => {
	try {
		const data = await Axios.patch(uploadCandidateResumeUrl, image, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'multipart/form-data'
			}
		});
		if (!data) return false;
		dispatch(showToast({
			message: "Resume uploaded successfully",
			type: "success",
			isShow: true
		}));
		dispatch(fetchCandidateDetails())
	} catch (err) {
		dispatch(showToast({
			message: "Failed to upload resume please try again",
			type: "error",
			isShow: true
		}));
		if (err.response) console.error(`Failed to upload resume please try again ${err}`);
	}
};


export const fetchJobDescription = (id) => async (dispatch, getState) => {
	try {
		const { data } = await Axios.get(
			fetchJobDescriptionUrl + "/" + id, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return;
		dispatch(setJobDescription(data ? data.data : []));

	} catch (err) {
		console.log(err)
	}
};

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
		dispatch(candidateSetJobViewData([]));
	}
};

export const fetchAllAnswers = () => async (dispatch, getState) => {
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
	let id = formData.id
	delete formData.id;
	if (id) {
		formData.workExpId = id;
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
			dispatch(showToast({
				message: "Work Experience updated successfully",
				type: "success",
				isShow: true
			}));
			dispatch(fetchCandidateDetails());

		} catch (err) {
			dispatch(showToast({
				message: "Failed to update work experience please try again",
				type: "error",
				isShow: true
			}));
			console.log(err)
		}
	}
	else {
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
			dispatch(showToast({
				message: "Work Experience added successfully",
				type: "success",
				isShow: true
			}));
			dispatch(fetchCandidateDetails());

		} catch (err) {
			dispatch(showToast({
				message: "Failed to add work experience please try again",
				type: "error",
				isShow: true
			}));
			console.log(err)
		}
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
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "jobApplied"]));
		dispatch(candidateGetAppliedJobs());
		dispatch(setJobDescription());
		dispatch(setCandidateJobDetails());
	} catch (err) {
		dispatch(showToast({
			message: err.response.data.message,
			type: "error",
			isShow: true
		}));
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
		dispatch(showToast({
			message: "Answers Submitted Successfully",
			type: "success",
			isShow: true
		}));
		dispatch(fetchCandidateDetails());
	} catch (err) {
		dispatch(showToast({
			message: err.response.data.message,
			type: "error",
			isShow: true
		}));
		console.log(err.response.data);
	}
}



export const addOtherWorkExperience = (formData) => async (dispatch, getState) => {
	let id = formData.id
	delete formData.id;
	if (id) {
		formData.id = id;
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
			dispatch(showToast({
				message: "Other Work Experience edited successfully",
				type: "success",
				isShow: true
			}));
			dispatch(fetchCandidateDetails());

		} catch (err) {
			dispatch(showToast({
				message: "Failed to edit other Work Experience please try again",
				type: "success",
				isShow: true
			}));
			console.log(err)
		}
	}
	else {
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
			dispatch(showToast({
				message: "Other Work Experience added successfully",
				type: "success",
				isShow: true
			}));
			dispatch(fetchCandidateDetails());

		} catch (err) {
			dispatch(showToast({
				message: "Failed to add other Work Experience please try again",
				type: "error",
				isShow: true
			}));
			console.log(err)
		}
	}
}

export const addEducationExperience = (formData) => async (dispatch, getState) => {
	let id = formData.id
	delete formData.id;
	if (id) {
		formData.id = id;
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
			dispatch(showToast({
				message: "Education Experience edited successfully",
				type: "success",
				isShow: true
			}));
			dispatch(fetchCandidateDetails());

		} catch (err) {
			dispatch(showToast({
				message: "Failed to edit Education Experience please try again",
				type: "error",
				isShow: true
			}));
			console.log(err)
		}
	}
	else {
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
			dispatch(showToast({
				message: "Education Experience added successfully",
				type: "success",
				isShow: true
			}));
			dispatch(fetchCandidateDetails());

		} catch (err) {
			dispatch(showToast({
				message: "Failed to add Education Experience please try again",
				type: "error",
				isShow: true
			}));
			console.log(err)
		}
	}
}

export const addOtherEducationExperience = (formData) => async (dispatch, getState) => {
	let id = formData.id
	delete formData.id;
	if (id) {
		formData.id = id;
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
			dispatch(showToast({
				message: "Other Educational Experience edited successfully",
				type: "success",
				isShow: true
			}));
			dispatch(fetchCandidateDetails());

		} catch (err) {
			dispatch(showToast({
				message: "Failed to edit Other Educational Experience please try again",
				type: "error",
				isShow: true
			}));
			console.log(err)
		}
	}
	else {
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
			dispatch(showToast({
				message: "Other Educational Experience added successfully",
				type: "success",
				isShow: true
			}));
			dispatch(fetchCandidateDetails());

		} catch (err) {
			dispatch(showToast({
				message: "Failed to add Other Educational Experience please try again",
				type: "error",
				isShow: true
			}));
			console.log(err)
		}
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
		dispatch(showToast({
			message: "Personnel Details updated successfully",
			type: "success",
			isShow: true
		}));
		dispatch(fetchCandidateDetails());
	}
	catch (err) {
		console.log(err);
	}
}

export const addEducationCertificate = (formData) => async (dispatch, getState) => {
	let id = formData.id
	delete formData.id;
	if (id) {
		try {
			formData.id = id;
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
			dispatch(fetchCandidateDetails());
			dispatch(showToast({
				message: "Certificate Details Edited successfully",
				type: "success",
				isShow: true
			}));
		}
		catch (err) {
			dispatch(showToast({
				message: "Failed to Edit Certificate Details please try again",
				type: "error",
				isShow: true
			}));
			console.log(err);
		}

	}
	else {
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
			dispatch(showToast({
				message: "Certificate Details Added successfully",
				type: "success",
				isShow: true
			}));
			dispatch(fetchCandidateDetails());
		}
		catch (err) {
			dispatch(showToast({
				message: "Failed to Add Certificate Details please try again",
				type: "error",
				isShow: true
			}));
			console.log(err);
		}
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
		dispatch(candidateSetJobViewData([]));
		dispatch(setCandidateJobDetails([]));
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


export const deleteWorkExperience = (id) => async (dispatch, getState) => {
	try {
		let URL = deleteWorkExperienceUrl + '/' + id;
		const data = await Axios.delete(URL, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		})
		if (!data) return false;
		dispatch(fetchCandidateDetails());
		dispatch(showToast({
			message: "Work Experience deleted successfully",
			type: "success",
			isShow: true
		}));
	} catch (err) {
		console.log(err)
	}
}

export const deleteEducationExperience = (id) => async (dispatch, getState) => {
	try {
		let URl = deleteEducationExperienceUrl + '/' + id;
		const data = await Axios.delete(URl, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return;
		dispatch(fetchCandidateDetails());
		dispatch(showToast({
			message: "Educational Experience deleted successfully",
			type: "success",
			isShow: true
		}));
	} catch (err) {
		console.log(err)
	}
}

export const deleteOtherExperience = (id) => async (dispatch, getState) => {
	try {
		const data = await Axios.delete(deleteOtherExperienceUrl + '/' + id, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return;
		dispatch(fetchCandidateDetails());
		dispatch(showToast({
			message: "Other Experience deleted successfully",
			type: "success",
			isShow: true
		}));
	} catch (err) {
		console.log(err)
	}
}

export const deleteCertificates = (id) => async (dispatch, getState) => {
	try {
		const data = await Axios.delete(deleteCertificateUrl + '/' + id, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return;
		dispatch(fetchCandidateDetails());
		dispatch(showToast({
			message: "Certificate deleted successfully",
			type: "success",
			isShow: true
		}));
	} catch (err) {
		console.log(err)
	}
}

export const updateCandidatePhone = (phone) => async (dispatch, getState) => {
	try {
		const data = await Axios.put(updateCandidatePhoneUrl, { "phone": phone }, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(showToast({
			message: "Candidate's Phone No updated successfully",
			type: "success",
			isShow: true
		}));
		dispatch(fetchCandidateDetails());
	} catch (err) {
		dispatch(showToast({
			message: err.response.data.message,
			type: "error",
			isShow: true
		}));
		dispatch(fetchCandidateDetails());
		if (err.response) console.error(`failed to update  email ${err}`);
	}
};

export const updateCandidateAbout = (about) => async (dispatch, getState) => {
	try {
		const data = await Axios.put(updateCandidateAboutUrl, { "about_me": about }, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(showToast({
			message: "Candidate's About Me updated successfully",
			type: "success",
			isShow: true
		}));
		dispatch(fetchCandidateDetails());
	} catch (err) {
		dispatch(showToast({
			message: "Failed to update Candidate's About please try again ",
			type: "error",
			isShow: true
		}));
		if (err.response) console.error(`failed to update  email ${err}`);
	}
};

export const updateCandidateEmail = (email) => async (dispatch, getState) => {
	try {
		const data = await Axios.put(updateCandidateEmailUrl, { "email": email }, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(showToast({
			message: "Candidate's Email updated successfully",
			type: "success",
			isShow: true
		}));
		dispatch(fetchCandidateDetails());
	} catch (err) {
		dispatch(showToast({
			message: err.response.data.message,
			type: "error",
			isShow: true
		}));
		dispatch(fetchCandidateDetails());
		if (err.response) console.error(`failed to update  email ${err}`);
	}
};

export const deleteCandidateAccount = () => async (dispatch, getState) => {
	try {
		await Axios.delete(deleteCandidateAccountUrl, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		})
	} catch (err) {
		dispatch(showToast({
			message: "Failed to update Candidate's Email please try again ",
			type: "error",
			isShow: true
		}));
		if (err.response) console.error(`failed to update  email ${err}`);
	}
};

export const fetchAllMajorMinor = () => async (dispatch, getState) => {
	try {
		const { data } = await Axios.get(
			fetchAllMajorMinorUrl,
		);
		dispatch(setAllMajorMinor(data ? data.data : []))
		if (!data) return;
	} catch (err) {
		console.log(err)
	}
}

export const updateUserConsent = (formData) => async (dispatch, getState) => {
	try {
		const { data } = await Axios.patch(
			updateUserConsentUrl,
			formData, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return;
		dispatch(fetchCandidateDetails());
	}
	catch (err) {
		console.log(err);
	}
}