import Axios from "axios";
import { candidateFetchJobsAppliedUrl, candidateUpdateProfileUrl, candidateJobApplicationUrl } from "../api/candidate";
import {
  setCandidateJobApplications,
  setCandidateJobDetails
} from "../actions/candidate";
import { requestConfig } from "./utils";

export const candidateGetAppliedJobs = () => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get(
      candidateFetchJobsAppliedUrl,
      requestConfig
    );
    if (!data) return;
  } catch (err) { }
};

export const getCandidateJobDetails = (id) => async (dispatch, getState) => {
  try {
    const state = getState();
    const URL = candidateFetchJobsAppliedUrl + '/' + id;
		const data = await Axios.get(URL, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
    if (!data) return false;
    dispatch(setCandidateJobDetails(data.data));
  } catch (err) {
    if (err.response) console.error(`failed to get candidate job details ${err}`);
   }
};

export const getCandidateJobApplications = () => async (dispatch, getState) => {
  try {
    const state = getState();
		const data = await Axios.get(candidateJobApplicationUrl, {
			headers: {
				'Authorization': getState().authReducer.JWT.map.jwt,
				'Content-Type': 'application/vnd.credready.com+json'
			}
		});
    if (!data) return false;
    dispatch(setCandidateJobApplications(data.data));
  } catch (err) { 
    if (err.response) console.error(`failed to get candidate job applications ${err}`);
  }
};
