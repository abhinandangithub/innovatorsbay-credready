import Axios from "axios";
import { employeFetchHireRequiredRangesUrl, 
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
		 employeCreateQuestion} from "../api/employer";

import { setHiringNeeds, setCompanySize, setPhoneNumber, 
		 setEmail, setEmployerProfile, setEmployerJobs, 
		 setCandidatesList, setEmploymentType, setIndustry,
		 setFunction, setSkills, setQuestionBank, setEmailTemplate, setPostedJobURL } from "../actions/employer";
// import Cookies from "js-cookie";
import { setDefaultAuthorizationHeader, setAllowAccessHeader } from "../utility";
import { requestConfig } from "./utils";
import { enitityFetchExperienceTypeUrl, entityFetchEntityIndustryUrl, entityFetchEntitityFunctionUrl, entityFetchSkillsUrl, entityFetchEmployementSatusUrl } from "../api/entity";

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
		profile.companySize = 0;
		profile.hiresRequired = 0;
		// setDefaultAuthorizationHeader(state.authReducer.JWT);
        const data = await Axios.patch(employerUpdateProfileUrl, profile, {
			headers: {
				'Authorization': `${JSON.parse(state.authReducer.JWT).map.jwt}`,
				'Content-Type': 'application/vnd.credready.com+json'
			}});
		if (!data) return false;
		dispatch(setEmployerProfile(profile));
	} catch (err) {
		if (err.response) console.error(`failed to update employer profile ${err}`);
	}
};

export const getProfileThunk = (token) => async (dispatch, getState) => {
	try {
		const state = getState();
		// setDefaultAuthorizationHeader(state.authReducer.JWT);
        const data = await Axios.get(employerUpdateProfileUrl, {
			headers: {
				'Authorization': `${JSON.parse(state.authReducer.JWT).map.jwt}`,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(setEmployerProfile(data.data));
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

export const getPostedJobs = (token) => async (dispatch, getState) => {
	try {
		const state = getState();
		// setDefaultAuthorizationHeader(state.authReducer.JWT);
		// setContentTypeDefaultHeader();
		// setAllowAccessHeader();
        const data = await Axios.get(employerFetchAllPostedJobsUrl, {
			headers: {
				'Authorization': `${JSON.parse(state.authReducer.JWT).map.jwt}`,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(setEmployerJobs(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to fetch the posted jobs ${err}`);
	}
};

export const sendEmail = (notif) => async (dispatch, getState) => {
	try {
		const state = getState();
		// setDefaultAuthorizationHeader(state.authReducer.JWT);
        const data = await Axios.post(employerSendCandidateEmailUrl, notif, {
			headers: {
				'Authorization': `${JSON.parse(state.authReducer.JWT).map.jwt}`,
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
		// setDefaultAuthorizationHeader(state.authReducer.JWT);
        const data = await Axios.put(employerJobFollowUpUrl, notif, {
			headers: {
				'Authorization': `${JSON.parse(state.authReducer.JWT).map.jwt}`,
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
		// setDefaultAuthorizationHeader(state.authReducer.JWT);
        const data = await Axios.put(employerUpdateApplicationStatusOfCandidateUrl, status, {
			headers: {
				'Authorization': `${JSON.parse(state.authReducer.JWT).map.jwt}`,
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
		// setDefaultAuthorizationHeader(state.authReducer.JWT);
		const URL = employerFetchJobById + "/" + jobID;
        const data = await Axios.get(URL, {
			headers: {
				'Authorization': `${JSON.parse(state.authReducer.JWT).map.jwt}`,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(setCandidatesList(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to set the status candidate ${err}`);
	}
};

export const getEmploymentType = () => async (dispatch, getState) => {
	try {
		// const state = getState();
		// setDefaultAuthorizationHeader(state.authReducer.JWT);
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
		// setDefaultAuthorizationHeader(state.authReducer.JWT);
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
		// setDefaultAuthorizationHeader(state.authReducer.JWT);
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
		// setDefaultAuthorizationHeader(state.authReducer.JWT);
		const data = await Axios.get(entityFetchSkillsUrl);
		if (!data) return false;
		dispatch(setSkills(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to get the skills ${err}`);
	}
};

export const getQuestionBank = () => async (dispatch, getState) => {
	try {
		const state = getState();
		// setDefaultAuthorizationHeader(state.authReducer.JWT);
		const data = await Axios.get(employeFetchQuestionbankUrl, {
			headers: {
				'Authorization': `${JSON.parse(state.authReducer.JWT).map.jwt}`,
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
		// setDefaultAuthorizationHeader(state.authReducer.JWT);
		const data = await Axios.get(employeGetEmailTemplate, {
			headers: {
				'Authorization': `${JSON.parse(state.authReducer.JWT).map.jwt}`,
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
		// setDefaultAuthorizationHeader(state.authReducer.JWT);
		const data = await Axios.post(employerPostJob, job, {
			headers: {
				'Authorization': `${JSON.parse(state.authReducer.JWT).map.jwt}`,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(setPostedJobURL(data.data.data));
	} catch (err) {
		if (err.response) console.error(`failed to post the job ${err}`);
	}
};

export const createQuestion = (question) => async (dispatch, getState) => {
	try {
		const state = getState();
		// setDefaultAuthorizationHeader(state.authReducer.JWT);
		const data = await Axios.post(employeCreateQuestion, question, {
			headers: {
				'Authorization': `${JSON.parse(state.authReducer.JWT).map.jwt}`,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		// dispatch(setPostedJobURL(data.data.data));
	} catch (err) {
		if (err.response) console.error(`failed to post the question ${err}`);
	}
};