import Axios from "axios";
import { candidateFetchJobsAppliedUrl, candidateUpdateProfileUrl, candidateJobApplicationUrl } from "../api/candidate";
import {
	setCandidateJobApplications
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
