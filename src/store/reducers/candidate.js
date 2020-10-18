import * as actionTypes from "../actions/actionTypes/candidate";
import { updateObject } from "../utility";

const initialState = {
	jobApplications: {
        "message": "Resume uploaded successfully",
        "data": {
            "appliedJobs": [
                {
                    "jobId": 84,
                    "jobAppId": 28,
                    "readinessIndex": 82,
                    "jobTitle": "Senior Nursing Assistant",
                    "orgName": "Amen Clinics",
                    "minExp": 4,
                    "maxExp": 1,
                    "location": "New York, NY",
                    "jobDescription": "Adding some meaningful job description for the job",
                    "currentAppStatus": "Draft"
                },
                {
                    "jobId": 84,
                    "jobAppId": 29,
                    "readinessIndex": 82,
                    "jobTitle": "Senior Nursing Assistant",
                    "orgName": "Amen Clinics",
                    "minExp": 4,
                    "maxExp": 1,
                    "location": "New York, NY",
                    "jobDescription": "Adding some meaningful job description for the job",
                    "currentAppStatus": "Draft"
                },
                {
                    "jobId": 84,
                    "jobAppId": 30,
                    "readinessIndex": 82,
                    "jobTitle": "Senior Nursing Assistant",
                    "orgName": "Amen Clinics",
                    "minExp": 4,
                    "maxExp": 1,
                    "location": "New York, NY",
                    "jobDescription": "Adding some meaningful job description for the job",
                    "currentAppStatus": "Draft"
                },
                {
                    "jobId": 84,
                    "jobAppId": 31,
                    "readinessIndex": 82,
                    "jobTitle": "Senior Nursing Assistant",
                    "orgName": "Amen Clinics",
                    "minExp": 4,
                    "maxExp": 1,
                    "location": "New York, NY",
                    "jobDescription": "Adding some meaningful job description for the job",
                    "currentAppStatus": "Draft"
                },
                {
                    "jobId": 111,
                    "jobAppId": 35,
                    "readinessIndex": 82,
                    "jobTitle": "Test Job For Jobseeker",
                    "orgName": "Innovatorssbay tech",
                    "minExp": 3,
                    "maxExp": 7,
                    "location": "bangaluru, Karnataka",
                    "jobDescription": "- test job description\n- test job description\n",
                    "currentAppStatus": "Draft"
                },
                {
                    "jobId": 111,
                    "jobAppId": 36,
                    "readinessIndex": 82,
                    "jobTitle": "Test Job For Jobseeker",
                    "orgName": "Innovatorssbay tech",
                    "minExp": 3,
                    "maxExp": 7,
                    "location": "bangaluru, Karnataka",
                    "jobDescription": "- test job description\n- test job description\n",
                    "currentAppStatus": "Draft"
                },
                {
                    "jobId": 111,
                    "jobAppId": 37,
                    "readinessIndex": 82,
                    "jobTitle": "Test Job For Jobseeker",
                    "orgName": "Innovatorssbay tech",
                    "minExp": 3,
                    "maxExp": 7,
                    "location": "bangaluru, Karnataka",
                    "jobDescription": "- test job description\n- test job description\n",
                    "currentAppStatus": "Draft"
                },
                {
                    "jobId": 111,
                    "jobAppId": 38,
                    "readinessIndex": 82,
                    "jobTitle": "Test Job For Jobseeker",
                    "orgName": "Innovatorssbay tech",
                    "minExp": 3,
                    "maxExp": 7,
                    "location": "bangaluru, Karnataka",
                    "jobDescription": "- test job description\n- test job description\n",
                    "currentAppStatus": "Draft"
                },
                {
                    "jobId": 111,
                    "jobAppId": 39,
                    "readinessIndex": 82,
                    "jobTitle": "Test Job For Jobseeker",
                    "orgName": "Innovatorssbay tech",
                    "minExp": 3,
                    "maxExp": 7,
                    "location": "bangaluru, Karnataka",
                    "jobDescription": "- test job description\n- test job description\n",
                    "currentAppStatus": "Draft"
                },
                {
                    "jobId": 111,
                    "jobAppId": 40,
                    "readinessIndex": 82,
                    "jobTitle": "Test Job For Jobseeker",
                    "orgName": "Innovatorssbay tech",
                    "minExp": 3,
                    "maxExp": 7,
                    "location": "bangaluru, Karnataka",
                    "jobDescription": "- test job description\n- test job description\n",
                    "currentAppStatus": "Draft"
                },
                {
                    "jobId": 111,
                    "jobAppId": 41,
                    "readinessIndex": 82,
                    "jobTitle": "Test Job For Jobseeker",
                    "orgName": "Innovatorssbay tech",
                    "minExp": 3,
                    "maxExp": 7,
                    "location": "bangaluru, Karnataka",
                    "jobDescription": "- test job description\n- test job description\n",
                    "currentAppStatus": "Draft"
                },
                {
                    "jobId": 111,
                    "jobAppId": 42,
                    "readinessIndex": 82,
                    "jobTitle": "Test Job For Jobseeker",
                    "orgName": "Innovatorssbay tech",
                    "minExp": 3,
                    "maxExp": 7,
                    "location": "bangaluru, Karnataka",
                    "jobDescription": "- test job description\n- test job description\n",
                    "currentAppStatus": "Draft"
                },
                {
                    "jobId": 84,
                    "jobAppId": 44,
                    "readinessIndex": 82,
                    "jobTitle": "Senior Nursing Assistant",
                    "orgName": "Amen Clinics",
                    "minExp": 4,
                    "maxExp": 1,
                    "location": "New York, NY",
                    "jobDescription": "Adding some meaningful job description for the job",
                    "currentAppStatus": "Draft"
                },
                {
                    "jobId": 111,
                    "jobAppId": 45,
                    "readinessIndex": 82,
                    "jobTitle": "Test Job For Jobseeker",
                    "orgName": "Innovatorssbay tech",
                    "minExp": 3,
                    "maxExp": 7,
                    "location": "bangaluru, Karnataka",
                    "jobDescription": "- test job description\n- test job description\n",
                    "currentAppStatus": "Draft"
                },
                {
                    "jobId": 84,
                    "jobAppId": 46,
                    "readinessIndex": 82,
                    "jobTitle": "Senior Nursing Assistant",
                    "orgName": "Amen Clinics",
                    "minExp": 4,
                    "maxExp": 1,
                    "location": "New York, NY",
                    "jobDescription": "Adding some meaningful job description for the job",
                    "currentAppStatus": "Draft"
                },
                {
                    "jobId": 84,
                    "jobAppId": 47,
                    "readinessIndex": 82,
                    "jobTitle": "Senior Nursing Assistant",
                    "orgName": "Amen Clinics",
                    "minExp": 4,
                    "maxExp": 1,
                    "location": "New York, NY",
                    "jobDescription": "Adding some meaningful job description for the job",
                    "currentAppStatus": "Draft"
                },
                {
                    "jobId": 84,
                    "jobAppId": 48,
                    "readinessIndex": 82,
                    "jobTitle": "Senior Nursing Assistant",
                    "orgName": "Amen Clinics",
                    "minExp": 4,
                    "maxExp": 1,
                    "location": "New York, NY",
                    "jobDescription": "Adding some meaningful job description for the job",
                    "currentAppStatus": "Draft"
                },
                {
                    "jobId": 84,
                    "jobAppId": 49,
                    "readinessIndex": 82,
                    "jobTitle": "Senior Nursing Assistant",
                    "orgName": "Amen Clinics",
                    "minExp": 4,
                    "maxExp": 1,
                    "location": "New York, NY",
                    "jobDescription": "Adding some meaningful job description for the job",
                    "currentAppStatus": "Draft"
                },
                {
                    "jobId": 84,
                    "jobAppId": 50,
                    "readinessIndex": 82,
                    "jobTitle": "Senior Nursing Assistant",
                    "orgName": "Amen Clinics",
                    "minExp": 4,
                    "maxExp": 1,
                    "location": "New York, NY",
                    "jobDescription": "Adding some meaningful job description for the job",
                    "currentAppStatus": "Draft"
                },
                {
                    "jobId": 84,
                    "jobAppId": 22,
                    "readinessIndex": 82,
                    "jobTitle": "Senior Nursing Assistant",
                    "orgName": "Amen Clinics",
                    "minExp": 4,
                    "maxExp": 1,
                    "location": "New York, NY",
                    "jobDescription": "Adding some meaningful job description for the job",
                    "currentAppStatus": "Applied"
                },
                {
                    "jobId": 84,
                    "jobAppId": 23,
                    "readinessIndex": 82,
                    "jobTitle": "Senior Nursing Assistant",
                    "orgName": "Amen Clinics",
                    "minExp": 4,
                    "maxExp": 1,
                    "location": "New York, NY",
                    "jobDescription": "Adding some meaningful job description for the job",
                    "currentAppStatus": "Applied"
                },
                {
                    "jobId": 84,
                    "jobAppId": 51,
                    "readinessIndex": 82,
                    "jobTitle": "Senior Nursing Assistant",
                    "orgName": "Amen Clinics",
                    "minExp": 4,
                    "maxExp": 1,
                    "location": "New York, NY",
                    "jobDescription": "Adding some meaningful job description for the job",
                    "currentAppStatus": "Draft"
                },
                {
                    "jobId": 84,
                    "jobAppId": 52,
                    "readinessIndex": 82,
                    "jobTitle": "Senior Nursing Assistant",
                    "orgName": "Amen Clinics",
                    "minExp": 4,
                    "maxExp": 1,
                    "location": "New York, NY",
                    "jobDescription": "Adding some meaningful job description for the job",
                    "currentAppStatus": "Draft"
                },
                {
                    "jobId": 84,
                    "jobAppId": 24,
                    "readinessIndex": 82,
                    "jobTitle": "Senior Nursing Assistant",
                    "orgName": "Amen Clinics",
                    "minExp": 4,
                    "maxExp": 1,
                    "location": "New York, NY",
                    "jobDescription": "Adding some meaningful job description for the job",
                    "currentAppStatus": "Applied"
                },
                {
                    "jobId": 84,
                    "jobAppId": 25,
                    "readinessIndex": 82,
                    "jobTitle": "Senior Nursing Assistant",
                    "orgName": "Amen Clinics",
                    "minExp": 4,
                    "maxExp": 1,
                    "location": "New York, NY",
                    "jobDescription": "Adding some meaningful job description for the job",
                    "currentAppStatus": "Applied"
                },
                {
                    "jobId": 84,
                    "jobAppId": 26,
                    "readinessIndex": 82,
                    "jobTitle": "Senior Nursing Assistant",
                    "orgName": "Amen Clinics",
                    "minExp": 4,
                    "maxExp": 1,
                    "location": "New York, NY",
                    "jobDescription": "Adding some meaningful job description for the job",
                    "currentAppStatus": "Applied"
                },
                {
                    "jobId": 84,
                    "jobAppId": 53,
                    "readinessIndex": 82,
                    "jobTitle": "Senior Nursing Assistant",
                    "orgName": "Amen Clinics",
                    "minExp": 4,
                    "maxExp": 1,
                    "location": "New York, NY",
                    "jobDescription": "Adding some meaningful job description for the job",
                    "currentAppStatus": "Draft"
                },
                {
                    "jobId": 84,
                    "jobAppId": 27,
                    "readinessIndex": 82,
                    "jobTitle": "Senior Nursing Assistant",
                    "orgName": "Amen Clinics",
                    "minExp": 4,
                    "maxExp": 1,
                    "location": "New York, NY",
                    "jobDescription": "Adding some meaningful job description for the job",
                    "currentAppStatus": "Applied"
                }
            ],
            "relatedJobs": [
                {
                    "jobId": 84,
                    "readinessIndex": 0,
                    "jobTitle": "Senior Nursing Assistant",
                    "orgName": "Amen Clinics",
                    "minExp": 4,
                    "maxExp": 1,
                    "location": "New York, NY",
                    "jobDescription": "Adding some meaningful job description for the job"
                },
                {
                    "jobId": 85,
                    "readinessIndex": 0,
                    "jobTitle": "Senior Nursing Assistant",
                    "orgName": "Test Senior Living",
                    "minExp": 4,
                    "maxExp": 1,
                    "location": "New York, NY",
                    "jobDescription": "Provide basic patient care under direction of nursing staff."
                },
                {
                    "jobId": 90,
                    "readinessIndex": 0,
                    "jobTitle": "Certificate Nursing Assistant",
                    "orgName": "Amen Clinics",
                    "minExp": 4,
                    "maxExp": 1,
                    "location": "New York, NY",
                    "jobDescription": "Some nice job description"
                }
            ]
        },
        "status": "OK"
    }
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_JOB_APPLICATIONS:
            return updateObject(state,{
                    jobApplications: action.value
                }
            );
        default: 
            return state;
    }
}

export default reducer;
