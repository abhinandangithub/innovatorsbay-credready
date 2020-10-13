import * as types from "./types.js";

export const candidateSetData = (data) => ({
    type: types.CANDIDATE_PROFILE_SET_DATA,
    data,
});

export const candidateSetCurrentStatus = (data) => ({
    type: types.CANDIDATE_CURRENT_STATUS,
    data,
})

export const setAppliedJobsData = (data) => ({
    type: types.SET_CANDIDATE__APPLIED_JOBS,
    data,
})

export const setCandidateExperienceType = (data) => ({
    type: types.SET_CANDIDATE_EXPERIENCE_TYPE,
    data,
})

export const setCandidateDegreeTitles = (data) => ({
    type: types.SET_CANDIDATE_DEGREE_TITLES,
    data,
})

export const setCandidateInstitutionType = (data) => ({
    type: types.SET_CANDIDATE_INSTITUTION_TYPE,
    data,
})

export const candidateSetAllAnswers = (data) => ({
    type: types.SET_CANDIDATE_ALL_ANSWERS,
    data,
})

export const candidateSetJobViewData = (data) => ({
    type: types.SET_CANDIDATE_JOB_VIEW_DATA,
    data,
})