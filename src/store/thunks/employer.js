import Axios from "axios";
import {
	employeFetchHireRequiredRangesUrl,
	employerFetchComapnySizeUrl,
	employerUpdateUserPhoneUrl,
	employerUpdateEmailUrl,
	employerDeleteAccountUrl,
	employerUpdateProfileUrl,
	employerFetchAllPostedJobsUrl,
	employerSendCandidateEmailUrl,
	employerJobFollowUpUrl,
	employerUpdateApplicationStatusOfCandidateUrl,
	employerFetchJobById,
	employeFetchQuestionbankUrl,
	employeGetEmailTemplate,
	employerFetchCandidatesByJobId,
	employerPostJob,
	employeCreateQuestion,
	employeCandidateSendEmail,
	employeFecthOrgLocations,
	employeFecthJobPreviewDetails,
	employerDeleteQuestionsFromJobUrl,
	employerDeleteQuestionFromJobUrl,
	employerUpdateQuestion,
	employerUpdateCompanyLogoUrl,
	orgNamesUrl
} from "../api/employer";

import { geographyUrl } from '../api/entity';

import {
	setHiringNeeds, setCompanySize, setPhoneNumber,
	setEmail, setEmployerProfile, setEmployerJobs,
	setCandidatesList, setEmploymentType, setIndustry,
	setFunction, setSkills, setQuestionBank, setEmailTemplate, setPostedJobURL,
	setAppliedCandidateDetails, setLocations, setJobDetails, setLogin, setOrgNames, setGeography
} from "../actions/employer";

import {
	beginApiCall, apiCallError
} from "../actions/common";

import { candidateFetchAllCertificatesUrl } from '../api/candidate';

// import Cookies from "js-cookie";
import { setDefaultAuthorizationHeader, setAllowAccessHeader } from "../utility";
import { requestConfig } from "./utils";
import { enitityFetchExperienceTypeUrl, entityFetchEntityIndustryUrl, entityFetchEntitityFunctionUrl, entityFetchSkillsUrl, entityFetchEmployementSatusUrl } from "../api/entity";
import { candidateFetchJobsAppliedUrl } from "../api/candidate";
import Cookies from "js-cookie";
import { keys } from "highcharts";

export const getHiringNeedsThunk = (token) => async (dispatch, getState) => {
	try {
		const data = await Axios.get(employeFetchHireRequiredRangesUrl, requestConfig);
		if (!data) return false;
		dispatch(setHiringNeeds(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to fetch hiring needs ${err}`);
	}
};

export const getOrgNamesThunk = (token) => async (dispatch, getState) => {
	try {
		const data = await Axios.get(orgNamesUrl);
		if (!data) return false;
		dispatch(setOrgNames(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to fetch orh names ${err}`);
	}
};

export const getGeograpgyThunk = (token) => async (dispatch, getState) => {
	try {
		const data = await Axios.get(geographyUrl);
		if (!data) return false;
		dispatch(setGeography(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to fetch geography names ${err}`);
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
		profile.companySize = state.employerReducer.companySizeKeys.find(val => val.range_display_value === profile.companySize).id;
		profile.hiresRequired = state.employerReducer.hiringKeys.find(val => val.range_display_value === profile.hiresRequired).id;
		// setDefaultAuthorizationHeader(getState().authReducer.JWT.map.jwt);
		// console.log(profile, getState().authReducer.JWT.map.jwt);
		// setDefaultAuthorizationHeader(JSON.parse(state.authReducer.JWT).map.jwt);
		dispatch(beginApiCall());
		const data = await Axios.patch(employerUpdateProfileUrl, profile, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(getProfileThunk());
		dispatch(apiCallError());
	} catch (err) {
		if (err.response) console.error(`failed to update employer profile ${err}`);
	}
};

export const getProfileThunk = (token) => async (dispatch, getState) => {
	try {
		const state = getState();
		dispatch(beginApiCall());
		const data = await Axios.get(employerUpdateProfileUrl, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(setEmployerProfile(data.data));
		dispatch(apiCallError());
		// dispatch(apiCallError())
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

export const updateEmailThunk = (email) => async (dispatch, getState) => {
	try {
		const state = getState();
		const data = await Axios.put(employerUpdateEmailUrl, { "email": email }, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(setEmail(data.data.email));
	} catch (err) {
		if (err.response) console.error(`failed to update  email ${err}`);
	}
};

export const updatePhoneThunk = (phone) => async (dispatch, getState) => {
	try {
		const state = getState();
		const data = await Axios.put(employerUpdateUserPhoneUrl, { "phone": phone }, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(setPhoneNumber(data.data.phone));
	} catch (err) {
		if (err.response) console.error(`failed to update  email ${err}`);
	}
};

export const deleteAccount = (token) => async (dispatch, getState) => {
	try {
		const state = getState();
		const data = await Axios.delete(employerDeleteAccountUrl, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
	} catch (err) {
		if (err.response) console.error(`failed to delete employer account ${err}`);
	}
};

export const getPostedJobs = (token) => async (dispatch, getState) => {
	try {
		const state = getState();
		// setDefaultAuthorizationHeader(getState().authReducer.JWT.map.jwt);
		// setContentTypeDefaultHeader();
		// setAllowAccessHeader();
		dispatch(beginApiCall());
		const data = await Axios.get(employerFetchAllPostedJobsUrl, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		dispatch(apiCallError());
		if (!data) return false;
		dispatch(setEmployerJobs(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to fetch the posted jobs ${err}`);
	}
};

export const sendEmail = (notif) => async (dispatch, getState) => {
	try {
		const state = getState();
		// setDefaultAuthorizationHeader(getState().authReducer.JWT.map.jwt);
		// setDefaultAuthorizationHeader(JSON.parse(state.authReducer.JWT).map.jwt);
		const data = await Axios.post(employeCandidateSendEmail, notif, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
	} catch (err) {
		if (err.response) console.error(`failed to send email notification to candidate ${err}`);
	}
};

export const sendNotification = (notif) => async (dispatch, getState) => {
	try {
		const state = getState();
		// setDefaultAuthorizationHeader(getState().authReducer.JWT.map.jwt);
		// setDefaultAuthorizationHeader(JSON.parse(state.authReducer.JWT).map.jwt);
		const data = await Axios.put(employerJobFollowUpUrl, notif, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
	} catch (err) {
		if (err.response) console.error(`failed to send email notification to candidate ${err}`);
	}
};

export const updateStatus = (status) => async (dispatch, getState) => {
	try {
		const state = getState();
		// setDefaultAuthorizationHeader(getState().authReducer.JWT.map.jwt);
		// setDefaultAuthorizationHeader(JSON.parse(state.authReducer.JWT).map.jwt);
		const data = await Axios.put(employerUpdateApplicationStatusOfCandidateUrl, status, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
	} catch (err) {
		if (err.response) console.error(`failed to set the status candidate ${err}`);
	}
};

export const getCandidatesList = (jobID) => async (dispatch, getState) => {
	try {
		const state = getState();
		// setDefaultAuthorizationHeader(getState().authReducer.JWT.map.jwt);
		dispatch(beginApiCall());
		const URL = employerFetchJobById + "/" + jobID;
		const data = await Axios.get(URL, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(setCandidatesList(data.data));
		dispatch(apiCallError());
	} catch (err) {
		if (err.response) console.error(`failed to set the status candidate ${err}`);
	}
};

export const getEmploymentType = () => async (dispatch, getState) => {
	try {
		// const state = getState();
		// setDefaultAuthorizationHeader(getState().authReducer.JWT.map.jwt);
		// setDefaultAuthorizationHeader(JSON.parse(state.authReducer.JWT).map.jwt);
		const data = await Axios.get(entityFetchEmployementSatusUrl);
		if (!data) return false;
		dispatch(setEmploymentType(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to set the employment type ${err}`);
	}
};

export const getIndustry = () => async (dispatch, getState) => {
	try {
		// const state = getState();
		// setDefaultAuthorizationHeader(getState().authReducer.JWT.map.jwt);
		// setDefaultAuthorizationHeader(JSON.parse(state.authReducer.JWT).map.jwt);
		const data = await Axios.get(entityFetchEntityIndustryUrl);
		if (!data) return false;
		dispatch(setIndustry(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to get the industry ${err}`);
	}
};

export const getFunction = () => async (dispatch, getState) => {
	try {
		// const state = getState();
		// setDefaultAuthorizationHeader(getState().authReducer.JWT.map.jwt);
		const data = await Axios.get(entityFetchEntitityFunctionUrl);
		if (!data) return false;
		dispatch(setFunction(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to get the function ${err}`);
	}
};

export const getSkills = () => async (dispatch, getState) => {
	try {
		// const state = getState();
		// setDefaultAuthorizationHeader(getState().authReducer.JWT.map.jwt);
		const data = await Axios.get(candidateFetchAllCertificatesUrl);
		if (!data) return false;
		dispatch(setSkills(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to get the skills ${err}`);
	}
};

export const getQuestionBank = () => async (dispatch, getState) => {
	try {
		const state = getState();
		// setDefaultAuthorizationHeader(getState().authReducer.JWT.map.jwt);
		const data = await Axios.get(employeFetchQuestionbankUrl, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(setQuestionBank(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to get the question bank ${err}`);
	}
};

export const getEmailTemplate = () => async (dispatch, getState) => {
	try {
		const state = getState();
		// setDefaultAuthorizationHeader(getState().authReducer.JWT.map.jwt);
		const data = await Axios.get(employeGetEmailTemplate, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(setEmailTemplate(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to get the email template ${err}`);
	}
};

export const postJob = (job) => async (dispatch, getState) => {
	try {
		const state = getState();
		// setDefaultAuthorizationHeader(getState().authReducer.JWT.map.jwt);
		const data = await Axios.post(employerPostJob, state.employerReducer.newJob, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(setPostedJobURL(data.data.data));
	} catch (err) {
		if (err.response) console.error(`failed to post the job ${err}`);
	}
};

export const createQuestion = (question, action) => async (dispatch, getState) => {
	try {
		const state = getState();
		// setDefaultAuthorizationHeader(getState().authReducer.JWT.map.jwt);
		let data = "";
		if(action === "edit") {
			data = await Axios.patch(employerUpdateQuestion, question, {
					headers: {
						'Authorization': getState().authReducer.JWT.map.jwt,
						'Content-Type': 'application/vnd.credready.com+json'
					}
				});
		} else {
			data = await Axios.post(employeCreateQuestion, question, {
				headers: {
					'Authorization': getState().authReducer.JWT.map.jwt,
					'Content-Type': 'application/vnd.credready.com+json'
				}
			});
		}
		if (!data) return false;
		dispatch(getQuestionBank());
	} catch (err) {
		if (err.response) console.error(`failed to post the question ${err}`);
	}
};

export const getAppliedCandidateDetails = (candidateID, jobID) => async (dispatch, getState) => {
	try {
		const state = getState();
		// setDefaultAuthorizationHeader(getState().authReducer.JWT.map.jwt);
		const data = await Axios.get(employerFetchCandidatesByJobId + "/" + jobID + '/' + candidateID, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(setAppliedCandidateDetails(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to post the question ${err}`);
	}
};

export const getLocations = () => async (dispatch, getState) => {
	try {
		const state = getState();
		// setDefaultAuthorizationHeader(getState().authReducer.JWT.map.jwt);
		const data = await Axios.get(employeFecthOrgLocations, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(setLocations(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to post the question ${err}`);
	}
};

export const getJobDetails = (jobID) => async (dispatch, getState) => {
	try {
		const state = getState();
		const jwt = Cookies.get("JWT");
		let user = "employer";
		if (jwt) {
			user = JSON.parse(jwt).map.user_type;
		}
		let URL = employeFecthJobPreviewDetails + '/' + jobID;
		let headers = {};
		if ((jwt && user === 'jobseeker') || (state.employerReducer.isLoggedIn)) {
			dispatch(setLogin(true));
			URL = candidateFetchJobsAppliedUrl + '/' + jobID;
			headers = {
				'Authorization': JSON.parse(jwt).map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		}
		// setDefaultAuthorizationHeader(getState().authReducer.JWT.map.jwt);
		const data = await Axios.get(URL, {
			headers: headers
		});
		if (!data) return false;
		if (user === 'jobseeker') {
			console.log(data.data.data.jobDetails);
			dispatch(setJobDetails(data.data.data.jobDetails));
		} else {
			dispatch(setJobDetails(data.data));
		}
	} catch (err) {
		console.log(err);
		if (err.response) console.error(`failed to fetch job details ${err}`);
	}
};

export const deleteQuestion = (id) => async (dispatch, getState) => {
	try {
		// setDefaultAuthorizationHeader(getState().authReducer.JWT.map.jwt);
		let URL = employerDeleteQuestionFromJobUrl + '/' + id;
		const data = await Axios.delete(URL, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(getQuestionBank());
	} catch (err) {
		if (err.response) console.error(`failed to post the question ${err}`);
	}
};

export const uploadProfileImage = (image) => async (dispatch, getState) => {
	try {
		// setDefaultAuthorizationHeader(getState().authReducer.JWT.map.jwt);
		// dispatch(beginApiCall());
		const data = await Axios.patch(employerUpdateCompanyLogoUrl, image, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'multipart/form-data'
			}
		});
		// dispatch(apiCallError());
		if (!data) return false;
	} catch (err) {
		dispatch(apiCallError());
		if (err.response) console.error(`failed to post the question ${err}`);
	}
};

// //setDefaultAuthorizationHeader(JSON.parse(state.authReducer.JWT).map.jwt);