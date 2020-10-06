import * as types from "./types";

export const initialState = {
    candidateData: {
        "first_name": "",
        "last_name": "",
        "current_employment_status": "",
        "is_open_to_other_roles": "",
        "available_within": "",
        "street_address": "",
        "city": "",
        "state": "",
        "zip": "",
        "about_me": "",
        "current_title": "",
        "phone": "",
        "email": "",
        "display_picture": "",
        "resume_name": "",
        "resume_path": "",
        "work_experience": [],
        "additional_experiences": [],
        "education_experience": [],
        "certificates": [],
        "strengths": [],
        "allow_connect": "",
        "user_consent": ""
    }

};

export default function candidateSetDataReducer(state = initialState, action) {
    switch (action.type) {
        case types.CANDIDATE_PROFILE_SET_DATA:
            {
                const { candidateData } = action;
                state = { ...state, candidateData };
            }
        default:
            return state;
    }
}
