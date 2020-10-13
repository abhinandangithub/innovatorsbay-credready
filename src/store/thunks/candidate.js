import Axios from "axios";
import { candidateFetchJobsAppliedUrl, candidateUpdateProfileUrl } from "../api/candidate";
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
