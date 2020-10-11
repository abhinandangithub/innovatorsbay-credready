import * as types from "./types";

export const initialState = {
    "data": {
        "candidate_id": "",
        "username": "",
        "first_name": "",
        "last_name": "",
        "current_employment_status": "",
        "available_within": "",
        "address_id": "",
        "address": {
            "id": "",
            "street_address": "",
            "city": "",
            "state": "",
            "zip_code": ""
        },
        "role_id": "",
        "role": {
            "role_id": "",
            "role_name": "",
            "is_active": "",
            "privileges": [
                {
                    "privilege_id": "",
                    "role_id": ""
                },
                {
                    "privilege_id": "",
                    "role_id": ""
                }
            ]
        },
        "contacts": [
            {
                "id": "",
                "contact_type": "",
                "contact": "",
                "is_verified": ""
            },
            {
                "id": "",
                "contact_type": "",
                "contact": "",
                "is_verified": ""
            }
        ],
        "education_experience": [],
        "additional_experiences": [
        ],
        "work_experience": [
        ],
        "certificate": [],
        "created_by": "",
        "created_on": "",
        "modified_by": "",
        "modified_on": ""

    }
}

export const candidateCurrentStatusInitial = {
    data: []
}

export const setCandidateAppliedJobsDataInitial = {
    data: []
}

export const setCandidateExperienceTypeInitial = {
    data: []
}

export const setCandidateDegreeTitlesInitial = {
    data: []
}

export const setCandidateInstitutionTypeInitial = {
    data: []
}

export function candidateSetDataReducer(state = initialState, action) {
    switch (action.type) {
        case types.CANDIDATE_PROFILE_SET_DATA:
            {
                const { data } = action;
                state = { ...state, data };
            }
        default:
            return state;
    }
}

export function candidateCurrentStatusReducer(state = candidateCurrentStatusInitial, action) {
    switch (action.type) {
        case types.CANDIDATE_CURRENT_STATUS:
            {
                const { data } = action;
                state = { ...state, data };
            }
        default:
            return state;
    }
}

export function setCandidateAppliedJobsDataReducer(state = setCandidateAppliedJobsDataInitial, action) {
    switch (action.type) {
        case types.SET_CANDIDATE__APPLIED_JOBS:
            {
                const { data } = action;
                state = { ...state, data };
            }
        default:
            return state;
    }
}

export function setCandidateExperienceTypeReducer(state = setCandidateExperienceTypeInitial, action) {
    switch (action.type) {
        case types.SET_CANDIDATE_EXPERIENCE_TYPE:
            {
                const { data } = action;
                state = { ...state, data };
            }
        default:
            return state;
    }
}

export function setCandidateDegreeTitlesReducer(state = setCandidateDegreeTitlesInitial, action) {
    switch (action.type) {
        case types.SET_CANDIDATE_DEGREE_TITLES:
            {
                const { data } = action;
                state = { ...state, data };
            }
        default:
            return state;
    }
}

export function setCandidateInstitutionTypeReducer(state = setCandidateInstitutionTypeInitial, action) {
    switch (action.type) {
        case types.SET_CANDIDATE_INSTITUTION_TYPE:
            {
                const { data } = action;
                state = { ...state, data };
            }
        default:
            return state;
    }
}