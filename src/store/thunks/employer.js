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
	orgNameUrl,
	employeAddEmailTemplate,
	employeUpdateEmailTemplate,
	profileDownloadUrl,
	employerUpdateJob
} from "../api/employer";

import { updateLoggedIn } from "../actions/auth";
import { geographyUrl } from '../api/entity';
import {
	setHiringNeeds, setCompanySize, setPhoneNumber,
	setEmail, setEmployerProfile, setEmployerJobs,
	setCandidatesList, setEmploymentType, setIndustry,
	setFunction, setSkills, setQuestionBank, setEmailTemplate, setPostedJobURL,
	setAppliedCandidateDetails, setLocations, setJobDetails, setLogin,
	setOrgNames,
	setGeography,
	setQuestionBankQuestion,
	setEmployerResumePath,
	jobToUpdate,
	jobToUpdateArray,
	setPostJobResponse
} from "../actions/employer";

import {
	beginApiCall, apiCallError
} from "../actions/common";

import {
	showToast
} from "../actions/toast";

import { updateJwtToken } from "../actions/auth";

import { candidateFetchAllCertificatesUrl, profileCandidateDownloadUrl } from '../api/candidate';

// import Cookies from "js-cookie";
import { setDefaultAuthorizationHeader, setAllowAccessHeader } from "../utility";
import { requestConfig } from "./utils";
import { enitityFetchExperienceTypeUrl, entityFetchEntityIndustryUrl, entityFetchEntitityFunctionUrl, entityFetchSkillsUrl, entityFetchEmployementSatusUrl } from "../api/entity";
import { candidateFetchJobsAppliedUrl } from "../api/candidate";
import Cookies from "js-cookie";
import { keys } from "highcharts";

import { clearAuthState } from "../../store/actions/auth";
import { clearEmployerState } from "../../store/actions/employer";
import { clearCandidateState } from "../../store/actions/candidate";

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

export const getGeographyThunk = (token) => async (dispatch, getState) => {
	try {
		const data = await Axios.get(geographyUrl);
		if (!data) return false;
		dispatch(setGeography(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to fetch geography size ${err}`);
	}
};

export const updateProfileThunk = (token, profile) => async (dispatch, getState) => {
	try {
		const state = getState();
		if (!!profile.companySize)
			profile.companySize = state.employerReducer.companySizeKeys.find(val => val.range_display_value === profile.companySize).id;
		if (!!profile.hiresRequired)
			profile.hiresRequired = state.employerReducer.hiringKeys.find(val => val.range_display_value === profile.hiresRequired).id;
		dispatch(beginApiCall());
		const data = await Axios.patch(employerUpdateProfileUrl, profile, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		let obj = {
			map: {
				jwt: data.data.data,
				user_type: state.authReducer.JWT.map.user_type
			}
		}
		Cookies.remove("JWT");
		Cookies.set("JWT", obj);

		dispatch(updateJwtToken(obj));

		dispatch(showToast({
			message: "profile updated succesfully ",
			type: "success",
			isShow: true
		}));
		dispatch(getProfileThunk());
		dispatch(apiCallError());
		dispatch(profileDownload())
	} catch (err) {
		if (err.response) console.error(`failed to update employer profile ${err}`);
	}
};

export const getProfileThunk = (type = undefined) => async (dispatch, getState) => {
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
		if (type) dispatch(updateLoggedIn([true, type]));
		dispatch(apiCallError());
	} catch (err) {
		dispatch(apiCallError());
		if (err.response) console.error(`failed to update employer profile ${err}`);
	}
};

export const updatePhoneNumberThunk = (token, phone) => async (dispatch, getState) => {
	try {
		const data = await Axios.put(employerUpdateUserPhoneUrl, phone, requestConfig);
		if (!data) return false;
		dispatch(showToast({
			message: "Phone updated successfully.",
			type: "success",
			isShow: true
		}));
		dispatch(setPhoneNumber(data.data.phone));
	} catch (err) {
		dispatch(showToast({
			message: "Error in updating phone.",
			type: "error",
			isShow: true
		}));
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
		dispatch(showToast({
			message: "Email updated successfully.",
			type: "success",
			isShow: true
		}));
		if (!data) return false;
		dispatch(setEmail(data.data.email));
	} catch (err) {
		dispatch(showToast({
			message: "Error in updating email.",
			type: "error",
			isShow: true
		}));
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
		dispatch(showToast({
			message: "Phone updated successfully.",
			type: "success",
			isShow: true
		}));
		if (!data) return false;
		dispatch(setPhoneNumber(data.data.phone));
	} catch (err) {
		dispatch(showToast({
			message: "Error in updating phone.",
			type: "error",
			isShow: true
		}));
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
		Cookies.remove("JWT");
		dispatch(clearEmployerState(null));
		dispatch(clearAuthState(null));
		dispatch(clearCandidateState(null));
	} catch (err) {
		if (err.response) console.error(`failed to delete employer account ${err}`);
	}
};

export const getPostedJobs = (isUpdate = undefined, jobId = undefined, isPostJob = undefined) => async (dispatch, getState) => {
	try {
		const state = getState();
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
		if (isUpdate === 'update' && jobId) {
			console.log('getPostedJobs');
			dispatch(jobToUpdate(jobId));
		}
		console.log('abhi data.data before ', isPostJob, data.data);
		if (isPostJob && data.data) {
			console.log('abhi data.data ', data.data.data);
			let temp = data.data.data.find((j) => j.job_id == jobId);
			console.log('abhi temp ', temp);
			dispatch(jobToUpdateArray(temp));
		}
	} catch (err) {
		if (err.response) console.error(`failed to fetch the posted jobs ${err}`);
	}
};

export const sendEmail = (notif) => async (dispatch, getState) => {
	try {
		const state = getState();
		const data = await Axios.post(employeCandidateSendEmail, notif, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		dispatch(showToast({
			message: "Email sent successfully.",
			type: "success",
			isShow: true
		}));
		if (!data) return false;
	} catch (err) {
		dispatch(showToast({
			message: "Error in sending the email.",
			type: "error",
			isShow: true
		}));
		if (err.response) console.error(`failed to send email notification to candidate ${err}`);
	}
};

export const sendNotification = (notif) => async (dispatch, getState) => {
	try {
		const state = getState();
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
		const data = await Axios.put(employerUpdateApplicationStatusOfCandidateUrl, status, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		dispatch(showToast({
			message: "Status Changed successfully.",
			type: "success",
			isShow: true
		}));
		if (!data) return false;
	} catch (err) {
		dispatch(showToast({
			message: "Error in changing the status..",
			type: "error",
			isShow: true
		}));
		if (err.response) console.error(`failed to set the status candidate ${err}`);
	}
};

export const getCandidatesList = (jobID) => async (dispatch, getState) => {
	try {
		const state = getState();
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
		const data = await Axios.get(entityFetchEmployementSatusUrl);
		if (!data) return false;
		dispatch(setEmploymentType(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to set the employment type ${err}`);
	}
};

export const getIndustry = () => async (dispatch, getState) => {
	try {
		const data = await Axios.get(entityFetchEntityIndustryUrl);
		if (!data) return false;
		dispatch(setIndustry(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to get the industry ${err}`);
	}
};

export const getFunction = () => async (dispatch, getState) => {
	try {
		const data = await Axios.get(entityFetchEntitityFunctionUrl);
		if (!data) return false;
		dispatch(setFunction(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to get the function ${err}`);
	}
};


export const getOrgNames = () => async (dispatch, getState) => {
	try {
		const data = await Axios.get(orgNameUrl);
		if (!data) return false;
		dispatch(setOrgNames(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to get the function ${err}`);
	}
};

export const getSkills = () => async (dispatch, getState) => {
	try {
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
		console.log('get email template');
		const state = getState();
		const data = await Axios.get(employeGetEmailTemplate, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		console.log('get email template');
		if (!data) return false;
		dispatch(setEmailTemplate(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to get the email template ${err}`);
	}
};

export const addEmailTemplate = (body) => async (dispatch, getState) => {
	try {
		const state = getState();
		console.log('body add', body);
		let obj = {
			emailBody: body && body.body[0],
			fromEmail: body && body.email[0],
			templateName: body && body.name[0]
		};
		console.log('body add obj', obj);

		const data = await Axios.post(employeAddEmailTemplate, obj, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		dispatch(getEmailTemplate());
		if (!data) return false;
	} catch (err) {
		if (err.response) console.error(`failed to get the email template ${err}`);
	}
};

export const updateEmailTemplate = (body) => async (dispatch, getState) => {
	try {
		const state = getState();
		console.log('body edit', body);
		let obj = {
			emailBody: body && body.body[0],
			fromEmail: body && body.email[0],
			templateName: body && body.name[0],
			templateId: body.templateId
		};
		const data = await Axios.post(employeUpdateEmailTemplate, obj, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		dispatch(getEmailTemplate());
		if (!data) return false;
	} catch (err) {
		if (err.response) console.error(`failed to get the email template ${err}`);
	}
};

export const postJob = (jobId = undefined) => async (dispatch, getState) => {
	try {
		const state = getState();
		let data = undefined;
		dispatch(beginApiCall());
		let body = {};
		if (!!jobId) {
			body = { ...state.employerReducer.newJob, jobId: jobId };
			data = await Axios.patch(employerUpdateJob, body, {
				headers: {
					'Authorization': getState().authReducer.JWT.map.jwt,
					'Content-Type': 'application/vnd.credready.com+json'
				}
			});
			if (!!jobId) {
				dispatch(getPostedJobs("update", jobId));
			}
		}
		else {
			body = { ...state.employerReducer.newJob }
			data = await Axios.post(employerPostJob, body, {
				headers: {
					'Authorization': getState().authReducer.JWT.map.jwt,
					'Content-Type': 'application/vnd.credready.com+json'
				}
			});
		}
		dispatch(apiCallError());
		if (!data) return false;
		dispatch(showToast({
			message: jobId ? "Job Updated successfully." : "Job posted successfully.",
			type: "success",
			isShow: true
		}));
		//	dispatch(setPostJobResponse(true));		
		dispatch(setPostedJobURL(data.data.data));
	} catch (err) {
		dispatch(apiCallError());
		dispatch(showToast({
			message: jobId ? "Error in updating the job." : "Error in posting the job.",
			type: "error",
			isShow: true
		}));
		dispatch(setPostedJobURL(null));
		if (err.response) console.error(`failed to post the job ${err}`);
	}
};

// export const createQuestion = (question, action) => async (dispatch, getState) => {
// 	try {
// 		const state = getState();
// 		let data = "";
// 		if (action === "edit") {
// 			data = await Axios.patch(employerUpdateQuestion, question, {
// 				headers: {
// 					'Authorization': getState().authReducer.JWT.map.jwt,
// 					'Content-Type': 'application/vnd.credready.com+json'
// 				}
// 			});
// 		} else {
// 			data = await Axios.post(employeCreateQuestion, question, {
// 				headers: {
// 					'Authorization': getState().authReducer.JWT.map.jwt,
// 					'Content-Type': 'application/vnd.credready.com+json'
// 				}
// 			});
// 		}
// 		if (!data) return false;
// 		dispatch(getQuestionBank());
// 	} catch (err) {
// 		if (err.response) console.error(`failed to post the question ${err}`);
// 	}
// };

export const createQuestion = (question, action, type = undefined) => async (dispatch, getState) => {
	try {
		const state = getState();
		let data = "";
		if (action === "edit") {
			data = await Axios.patch(employerUpdateQuestion, question, {
				headers: {
					'Authorization': getState().authReducer.JWT.map.jwt,
					'Content-Type': 'application/vnd.credready.com+json'
				}
			});
			console.log('questionToSave ', question);
			let temp = state.employerReducer.questionBank.questions.map((val) => {
				if (val.question_id === question.questionId) {
					val.job_title = question.jobTitle;
					val.question_type = question.questionType;
					val.question_name = question.questionName;
					if (question.questionType === "mcq") {
						val.option_choices = question.optionChoices.map((o) => {
							return {
								option_choice_name: o.optionChoiceName,
								question_type: o.questionType,
								id: o.id ? o.id : 1,
								question_id: o.questionId ? o.questionId : question.questionId
							}
						})
					}
				}
				return val;
			});
			console.log('questionToSave ', temp);
			dispatch(setQuestionBankQuestion(temp));
		} else {
			data = await Axios.post(employeCreateQuestion, question, {
				headers: {
					'Authorization': getState().authReducer.JWT.map.jwt,
					'Content-Type': 'application/vnd.credready.com+json'
				}
			});
		}
		if (!data) return false;
		if (type === 'public') {
			dispatch(showToast({
				message: "This question has been submitted for review. When approved it will be added to the Public Library. Until then it is available immediately for your use. Please navigate to the Private Library to select this question and add it to your job post.",
				type: "success",
				isShow: true
			}));
		}
		dispatch(getQuestionBank());
	} catch (err) {
		if (err.response) console.error(`failed to post the question ${err}`);
	}
};

export const getAppliedCandidateDetails = (candidateID, jobID) => async (dispatch, getState) => {
	try {
		const state = getState();
		dispatch(beginApiCall());
		const data = await Axios.get(employerFetchCandidatesByJobId + "/" + jobID + '/' + candidateID, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		dispatch(apiCallError());
		if (!data) return false;
		dispatch(setAppliedCandidateDetails(data.data));
	} catch (err) {
		dispatch(apiCallError());
		if (err.response) console.error(`failed to post the question ${err}`);
	}
};

export const getLocations = () => async (dispatch, getState) => {
	try {
		const state = getState();
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
		const data = await Axios.get(URL, {
			headers: headers
		});
		if (!data) return false;
		if (user === 'jobseeker') {
			dispatch(setJobDetails(data.data));
		} else {
			dispatch(setJobDetails(data.data));
		}
	} catch (err) {
		console.log(err);
		if (err.response) console.error(`failed to fetch job details ${err}`);
	}
};

// export const deleteQuestion = (id) => async (dispatch, getState) => {
// 	try {
// 		const state = getState();
// 		let URL = employerDeleteQuestionFromJobUrl + '/' + id;
// 		const data = await Axios.delete(URL, {
// 			headers: {
// 				'Authorization': getState().authReducer.JWT.map.jwt,
// 				'Content-Type': 'application/vnd.credready.com+json'
// 			}
// 		});
// 		if (!data) return false;
// 		dispatch(getQuestionBank());
// 	} catch (err) {
// 		if (err.response) console.error(`failed to post the question ${err}`);
// 	}
// };

export const deleteQuestion = (id) => async (dispatch, getState) => {
	try {
		const state = getState();
		let URL = employerDeleteQuestionFromJobUrl + '/' + id;
		const data = await Axios.delete(URL, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		let temp = state.employerReducer.questionBank.questions.filter((val) => {
			return val.question_id != id;
		});
		console.log('questionToSave ', temp);
		dispatch(setQuestionBankQuestion(temp));
		if (!data) return false;
		dispatch(getQuestionBank());
	} catch (err) {
		if (err.response) console.error(`failed to post the question ${err}`);
	}
};


export const uploadProfileImage = (image) => async (dispatch, getState) => {
	try {
		const data = await Axios.patch(employerUpdateCompanyLogoUrl, image, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'multipart/form-data'
			}
		});
		dispatch(showToast({
			message: "Profile picture updated succesfully ",
			type: "success",
			isShow: true
		}));
		if (!data) return false;
	} catch (err) {
		dispatch(showToast({
			message: "Error in updating Profile picture. ",
			type: "error",
			isShow: true
		}));
		if (err.response) console.error(`failed to post the question ${err}`);
	}
};

export const profileDownload = (type) => async (dispatch, getState) => {
	try {
		const state = getState();
		let url = '';
		if (type === "candidate") {
			url = profileCandidateDownloadUrl;
		} else {
			url = profileDownloadUrl;
		}
		const data = await Axios.get(url, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
		if (!data) return false;
		dispatch(setEmployerResumePath(data.data));
	} catch (err) {
		if (err.response) console.error(`failed to post the question ${err}`);
	}
};

// //setDefaultAuthorizationHeader(JSON.parse(state.authReducer.JWT).map.jwt);