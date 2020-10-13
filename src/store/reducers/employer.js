import * as actionTypes from "../actions/actionTypes/employer";
import { updateObject } from "../utility";

const initialState = {
	hiringNeeds: {
		message: "",
		data: ["Option 1", "Option 2", "Option 3", "Option 4"],
		error: "",
		status: ""
	},
	companySize: {
		message: "",
		data: ["Option 1", "Option 2", "Option 3", "Option 4"],
		error: "",
		status: ""
	},
	phoneNumber: "",
	email: "",
	profile: {
		"message": "Success",
		"data": {
			"employerId": 2,
			"username": "jane@chelseaseniorliving.com",
			"name": "Jane Feldner",
			"title": "Senior Nurse",
			"role_id": 2,
			"org_id": 1,
			"org": {
				"orgId": 1,
				"org_name": "Chelsea Senior Living",
				"naics_code": "623110",
				"hires_required": 1,
				"company_size": 2,
				"reference_source": "LinkedIn",
				"website": "https://www.chelseaseniorliving.com/",
				"address": []
			},
			"contacts": [
				{
					"id": 9,
					"contact_type": "email",
					"contact": "jane@chelseaseniorliving.com",
					"is_verified": true
				},
				{
					"id": 10,
					"contact_type": "phone",
					"contact": "+16173837817",
					"is_verified": true
				}
			],
			"role": {
				"role_id": 2,
				"role_name": "employer",
				"is_active": true,
				"privileges": [
					{
						"privilege_id": 2,
						"role_id": 2
					}
				]
			},
			"created_by": "Jane Doe",
			"created_on": "Oct 1, 2020, 1:27:37 AM",
			"modified_by": "Jane Doe",
			"modified_on": "Oct 1, 2020, 1:27:37 AM"
		},
		"status": "OK"
	},
	postedJobs: {
		"message": "Question added successfully",
		"data": [
			{
				"job_id": 1,
				"open_positions": 5,
				"location_id": 3,
				"org_id": 1,
				"organization": {
					"orgId": 1,
					"org_name": "Chelsea Senior Living",
					"naics_code": "623110",
					"hires_required": 1,
					"company_size": 2,
					"reference_source": "LinkedIn",
					"website": "https://www.chelseaseniorliving.com/",
					"address": [

					]
				},
				"job_title": "Certified Nursing Assistant",
				"job_description": "\u003cp\u003eLorem ipsum dolor sit amet, consectetur adipiscing elit. Quid ergo hoc loco intellegit honestum? \u003ci\u003eDuo Reges: constructio interrete.\u003c/i\u003e Expressa vero in iis aetatibus, quae iam confirmatae sunt. \u003ci\u003eQuamquam tu hanc copiosiorem etiam soles dicere.\u003c/i\u003e Duarum enim vitarum nobis erunt instituta capienda. Claudii libidini, qui tum erat summo ne imperio, dederetur. Cur fortior sit, si illud, quod tute concedis, asperum et vix ferendum putabit? Beatus sibi videtur esse moriens. Philosophi autem in suis lectulis plerumque moriuntur. Cuius ad naturam apta ratio vera illa et summa lex a philosophis dicitur. Tria genera cupiditatum, naturales et necessariae, naturales et non necessariae, nec naturales nec necessariae. \u003c/p\u003e\n\n\u003cp\u003eErit enim instructus ad mortem contemnendam, ad exilium, ad ipsum etiam dolorem. Non igitur potestis voluptate omnia dirigentes aut tueri aut retinere virtutem. Quid est igitur, inquit, quod requiras? \u003ci\u003eNon autem hoc: igitur ne illud quidem.\u003c/i\u003e Non est igitur voluptas bonum. Similiter sensus, cum accessit ad naturam, tuetur illam quidem, sed etiam se tuetur; \u003c/p\u003e\n\n\u003cp\u003eHoc Hieronymus summum bonum esse dixit. Cum ageremus, inquit, vitae beatum et eundem supremum diem, scribebamus haec. Hoc loco tenere se Triarius non potuit. Qui autem de summo bono dissentit de tota philosophiae ratione dissentit. Tecum optime, deinde etiam cum mediocri amico. Non autem hoc: igitur ne illud quidem. \u003ci\u003eAn hoc usque quaque, aliter in vita?\u003c/i\u003e \u003c/p\u003e",
				"address": {
					"id": 3,
					"street_address": "274 King George Rd",
					"city": "Warren",
					"state": "NJ",
					"zip_code": 7059
				},
				"employment_type": 3,
				"industry_id": 1,
				"function_id": 1,
				"industry": {
					"id": 1,
					"industry_name": "telecom",
					"is_active": true,
					"is_approved": true
				},
				"function": {
					"id": 1,
					"function_name": "service",
					"is_active": true,
					"is_approved": true
				},
				"min_experience": 2,
				"max_experience": 6,
				"email_template_id": 3,
				// "email_template": {
				// 	"template_id": 3,
				// 	"org_id": 1,
				// 	"template_name": "Welcome to Chealsea",
				// 	"email_body": "Hi {candidate_name},\n\nWelcome to Chealsea. We will reach out to you shortly.\n\nRegards,\nTeam Chealsea",
				// 	"created_by": "admin",
				// 	"created_on": "Oct 6, 2020 5:15:50 PM",
				// 	"modified_by": "admin",
				// 	"modified_on": "Oct 6, 2020 5:15:50 PM"
				// },
				"private_email_template": [
					{
						"template_id": 2,
						"org_id": 1,
						"template_name": "Thank you for applying",
						"email_body": "Hi {candidate_name},\nThank you for applying.\n\nRegards,\n{employer_name}",
						"created_by": "admin",
						"created_on": "Oct 6, 2020, 5:15:50 PM",
						"modified_by": "admin",
						"modified_on": "Oct 6, 2020, 5:15:50 PM"
					},
					{
						"template_id": 3,
						"org_id": 1,
						"template_name": "Welcome to Chealsea",
						"email_body": "Hi {candidate_name},\n\nWelcome to Chealsea. We will reach out to you shortly.\n\nRegards,\nTeam Chealsea",
						"created_by": "admin",
						"created_on": "Oct 6, 2020, 5:15:50 PM",
						"modified_by": "admin",
						"modified_on": "Oct 6, 2020, 5:15:50 PM"
					},
					{
						"template_id": 4,
						"public_template_id": 1,
						"org_id": 1,
						"template_name": "Welcome to CredReady - InnovatorsBay",
						"email_body": "Hi {candidate_name},\n\nWelcome to InnovatorsBay. We are happy to host our jobs on CredReady. \n\nThanks,\nTeam IB",
						"created_by": "admin",
						"created_on": "Oct 6, 2020, 5:20:48 PM",
						"modified_by": "admin",
						"modified_on": "Oct 6, 2020, 5:20:48 PM"
					}
				],
				"public_email_template": [
					{
						"public_template_id": 1,
						"template_name": "Welcome to CredReady",
						"email_body": "Hello {candidate_name},\n\nWelcome to CredReady. Experience the rich and exciting features of CredReady.\n\nThanks,\nTeam CredReady",
						"created_by": "admin",
						"created_on": "Oct 6, 2020, 5:18:57 PM",
						"modified_by": "admin",
						"modified_on": "Oct 6, 2020, 5:18:57 PM"
					}
				],
				"strengths": [
					{
						"id": 1,
						"name": "Java",
						"is_active": true
					},
					{
						"id": 1,
						"name": "Java",
						"is_active": true
					},
					{
						"id": 1,
						"name": "Java",
						"is_active": true
					}
				],
				"count_of_applied_candidates": 2,
				"created_by": "admin",
				"created_on": "Oct 6, 2020 5:40:45 PM",
				"modified_by": "admin",
				"modified_on": "Oct 6, 2020 5:40:45 PM"
			}
		],
		"status": "OK"
	},
	candidatesList: {
		"message": "Candidate fetched successfully",
		"data": [
			{
				"job_app_id": 1,
				"candidate_id": 1,
				"job_id": 1,
				"email_template_id": 3,
				"candidate_name": "Mike Rogers",
				"title": "Certified Nursing Assistant",
				"candidate_experience": "2.0 year(s)",
				"current_organization": "ABC Staffing",
				"status": "Emailed",
				"readiness_index": 82,
				"modified_by": "Jane Feldner",
				"modified_on": "Oct 7, 2020, 4:54:54 PM"
			},
			{
				"job_app_id": 2,
				"candidate_id": 3,
				"job_id": 1,
				"email_template_id": 3,
				"candidate_name": "Peter Gray",
				"title": "Developer",
				"candidate_experience": "3.0 year(s)",
				"current_organization": "ABC Staffing",
				"status": "Applied",
				"readiness_index": 20,
				"modified_by": "admin",
				"modified_on": "Oct 6, 2020, 6:02:26 PM"
			}
		],
		"status": "OK"
	},
	employmentType: {
		message: "",
		data: ["Option 1", "Option 2", "Option 3", "Option 4"],
		error: "",
		status: ""
	},
	industry: {
		message: "",
		data: ["Option 1", "Option 2", "Option 3", "Option 4"],
		error: "",
		status: ""
	},
	functionType: {
		message: "",
		data: ["Option 1", "Option 2", "Option 3", "Option 4"],
		error: "",
		status: ""
	},
	skills: {
		"message": null,
		"data": [
			{
				"id": 1,
				"name": "Java",
				"active": true
			},
		],
		"error": null,
		"status": "OK"
	},
	questionBank: {
		questions: [
			{
				"question_id": 1,
				"question_name": "What are your hobbies?",
				"category": "Employer Questions",
				"question_type": "text-input",
				"is_public": false,
				"job_title": "CNA",
				"org_id": 1,
				"option_choices": [],
				"created_by": "admin",
				"created_on": "Oct 6, 2020, 5:55:33 PM",
				"modified_by": "admin",
				"modified_on": "Oct 6, 2020, 5:55:33 PM"
			},
			{
				"question_id": 2,
				"question_name": "Are you okay with night shift?",
				"category": "Employer Questions",
				"question_type": "mcq",
				"is_public": false,
				"job_title": "CNA",
				"org_id": 1,
				"option_choices": [
					{
						"id": 2,
						"question_id": 2,
						"option_choice_name": "No",
						"question_type": "boolean",
						"created_by": "admin",
						"created_on": "Oct 6, 2020, 5:59:44 PM",
						"modified_by": "admin",
						"modified_on": "Oct 6, 2020, 5:59:44 PM"
					},
					{
						"id": 2,
						"question_id": 2,
						"option_choice_name": "No",
						"question_type": "boolean",
						"created_by": "admin",
						"created_on": "Oct 6, 2020, 5:59:44 PM",
						"modified_by": "admin",
						"modified_on": "Oct 6, 2020, 5:59:44 PM"
					}
				],
				"created_by": "admin",
				"created_on": "Oct 6, 2020, 5:55:33 PM",
				"modified_by": "admin",
				"modified_on": "Oct 6, 2020, 5:55:33 PM"
			},
			{
				"question_id": 3,
				"question_name": "What are you preferred timings?",
				"category": "Employer Questions",
				"question_type": "mcq",
				"is_public": true,
				"job_title": "CNA",
				"option_choices": [
					{
						"id": 3,
						"question_id": 3,
						"option_choice_name": "8 AM - 1 PM",
						"question_type": "checkbox",
						"created_by": "admin",
						"created_on": "Oct 6, 2020, 5:59:44 PM",
						"modified_by": "admin",
						"modified_on": "Oct 6, 2020, 5:59:44 PM"
					},
					{
						"id": 3,
						"question_id": 3,
						"option_choice_name": "8 AM - 1 PM",
						"question_type": "checkbox",
						"created_by": "admin",
						"created_on": "Oct 6, 2020, 5:59:44 PM",
						"modified_by": "admin",
						"modified_on": "Oct 6, 2020, 5:59:44 PM"
					},
					{
						"id": 3,
						"question_id": 3,
						"option_choice_name": "8 AM - 1 PM",
						"question_type": "checkbox",
						"created_by": "admin",
						"created_on": "Oct 6, 2020, 5:59:44 PM",
						"modified_by": "admin",
						"modified_on": "Oct 6, 2020, 5:59:44 PM"
					},
					{
						"id": 3,
						"question_id": 3,
						"option_choice_name": "8 AM - 1 PM",
						"question_type": "checkbox",
						"created_by": "admin",
						"created_on": "Oct 6, 2020, 5:59:44 PM",
						"modified_by": "admin",
						"modified_on": "Oct 6, 2020, 5:59:44 PM"
					}
				],
				"created_by": "admin",
				"created_on": "Oct 6, 2020, 5:55:33 PM",
				"modified_by": "admin",
				"modified_on": "Oct 6, 2020, 5:55:33 PM"
			}
		],
		"message": "Question bank fetched successfully",
		"data": {
			"private_question_bank": [
				{
					"question_id": 1,
					"question_name": "What are your hobbies?",
					"category": "Employer Questions",
					"question_type": "text-input",
					"is_public": false,
					"job_title": "CNA",
					"org_id": 1,
					"option_choices": [],
					"created_by": "admin",
					"created_on": "Oct 6, 2020, 5:55:33 PM",
					"modified_by": "admin",
					"modified_on": "Oct 6, 2020, 5:55:33 PM"
				},
				{
					"question_id": 2,
					"question_name": "Are you okay with night shift?",
					"category": "Employer Questions",
					"question_type": "mcq",
					"is_public": false,
					"job_title": "CNA",
					"org_id": 1,
					"option_choices": [
						{
							"id": 2,
							"question_id": 2,
							"option_choice_name": "No",
							"question_type": "boolean",
							"created_by": "admin",
							"created_on": "Oct 6, 2020, 5:59:44 PM",
							"modified_by": "admin",
							"modified_on": "Oct 6, 2020, 5:59:44 PM"
						},
						{
							"id": 2,
							"question_id": 2,
							"option_choice_name": "No",
							"question_type": "boolean",
							"created_by": "admin",
							"created_on": "Oct 6, 2020, 5:59:44 PM",
							"modified_by": "admin",
							"modified_on": "Oct 6, 2020, 5:59:44 PM"
						}
					],
					"created_by": "admin",
					"created_on": "Oct 6, 2020, 5:55:33 PM",
					"modified_by": "admin",
					"modified_on": "Oct 6, 2020, 5:55:33 PM"
				}
			],
			"public_question_bank": [
				{
					"question_id": 3,
					"question_name": "What are you preferred timings?",
					"category": "Employer Questions",
					"question_type": "mcq",
					"is_public": true,
					"job_title": "CNA",
					"option_choices": [
						{
							"id": 3,
							"question_id": 3,
							"option_choice_name": "8 AM - 1 PM",
							"question_type": "checkbox",
							"created_by": "admin",
							"created_on": "Oct 6, 2020, 5:59:44 PM",
							"modified_by": "admin",
							"modified_on": "Oct 6, 2020, 5:59:44 PM"
						},
						{
							"id": 3,
							"question_id": 3,
							"option_choice_name": "8 AM - 1 PM",
							"question_type": "checkbox",
							"created_by": "admin",
							"created_on": "Oct 6, 2020, 5:59:44 PM",
							"modified_by": "admin",
							"modified_on": "Oct 6, 2020, 5:59:44 PM"
						},
						{
							"id": 3,
							"question_id": 3,
							"option_choice_name": "8 AM - 1 PM",
							"question_type": "checkbox",
							"created_by": "admin",
							"created_on": "Oct 6, 2020, 5:59:44 PM",
							"modified_by": "admin",
							"modified_on": "Oct 6, 2020, 5:59:44 PM"
						},
						{
							"id": 3,
							"question_id": 3,
							"option_choice_name": "8 AM - 1 PM",
							"question_type": "checkbox",
							"created_by": "admin",
							"created_on": "Oct 6, 2020, 5:59:44 PM",
							"modified_by": "admin",
							"modified_on": "Oct 6, 2020, 5:59:44 PM"
						}
					],
					"created_by": "admin",
					"created_on": "Oct 6, 2020, 5:55:33 PM",
					"modified_by": "admin",
					"modified_on": "Oct 6, 2020, 5:55:33 PM"
				}
			]
		},
		"status": "OK"
	},
	emailTemplateNames: [],
	hiringKeys: [],
	companySizeKeys: [],
	employmentKeys: [],
	functionKeys: [],
	industryKeys: [],
	isLoggedIn: false,
	emailTemplate: [],
	jobURL: "",
	newJob: {
		"emailTemplateId": 3,
		"employmentType": 3,
		"function": 1,
		"industry": 1,
		"jobDescription": "Some nice job description",
		"jobQuestionnaireMap": [1, 2, 3],
		"jobTitle": "Senior Nursing Assistant",
		"location": 1,
		"maxExp": 7,
		"minExp": 3,
		"openPositions": 15
	},
	appliedCandidateDetails: {},
	locations: {
		data: [
			{
				"id": 0,
				"street_address": "",
				"city": "",
				"state": "",
				"zip_code": 0
			}
		]
	},
	locationNames: [],
	jobDetails: {
		"data": {
			"job_id": 1,
			"location": "Warren, NJ",
			"job_title": "Certified Nursing Assistant",
			"job_description": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid ergo hoc loco intellegit honestum? <i>Duo Reges: constructio interrete.</i> Expressa vero in iis aetatibus, quae iam confirmatae sunt. <i>Quamquam tu hanc copiosiorem etiam soles dicere.</i> Duarum enim vitarum nobis erunt instituta capienda. Claudii libidini, qui tum erat summo ne imperio, dederetur. Cur fortior sit, si illud, quod tute concedis, asperum et vix ferendum putabit? Beatus sibi videtur esse moriens. Philosophi autem in suis lectulis plerumque moriuntur. Cuius ad naturam apta ratio vera illa et summa lex a philosophis dicitur. Tria genera cupiditatum, naturales et necessariae, naturales et non necessariae, nec naturales nec necessariae. </p>\n\n<p>Erit enim instructus ad mortem contemnendam, ad exilium, ad ipsum etiam dolorem. Non igitur potestis voluptate omnia dirigentes aut tueri aut retinere virtutem. Quid est igitur, inquit, quod requiras? <i>Non autem hoc: igitur ne illud quidem.</i> Non est igitur voluptas bonum. Similiter sensus, cum accessit ad naturam, tuetur illam quidem, sed etiam se tuetur; </p>\n\n<p>Hoc Hieronymus summum bonum esse dixit. Cum ageremus, inquit, vitae beatum et eundem supremum diem, scribebamus haec. Hoc loco tenere se Triarius non potuit. Qui autem de summo bono dissentit de tota philosophiae ratione dissentit. Tecum optime, deinde etiam cum mediocri amico. Non autem hoc: igitur ne illud quidem. <i>An hoc usque quaque, aliter in vita?</i> </p>",
			"min_experience": 2,
			"max_experience": 6,
			"org_name": "Chelsea Senior Living"
		},
		"status": "OK"
	},
	redirectURL: "",
	JWT: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_HIRING_NEEDS:
			return updateObject(state, {
				isVerified: {
					termsAndConditions: action.value,
					emailOtp: state.isVerified.emailOtp,
					phoneOtp: state.isVerified.phoneOtp,
				},
			});

		case actionTypes.SET_HIRING_NEEDS:
			const hiringNeedsTemp = state.hiringNeeds;
			hiringNeedsTemp.message = action.value.message;
			hiringNeedsTemp.error = action.value.error;
			hiringNeedsTemp.status = action.value.status;
			hiringNeedsTemp.data = action.value.data.map((value) => value.range_display_value);
			return updateObject(state, {
				hiringNeeds: hiringNeedsTemp,
				hiringKeys: action.value.data
			});

		case actionTypes.SET_COMPANY_SIZE:
			const companySizeTemp = state.companySize;
			companySizeTemp.message = action.value.message;
			companySizeTemp.error = action.value.error;
			companySizeTemp.status = action.value.status;
			companySizeTemp.data = action.value.data.map((value) => value.range_display_value);
			return updateObject(state, {
				companySize: companySizeTemp,
				companySizeKeys: action.value.data
			});

		case actionTypes.SET_PHONE_NUMBER:
			return updateObject(state, {
				phoneNumber: action.value
			});

		case actionTypes.SET_EMAIL:
			return updateObject(state, {
				email: action.value
			});

		case actionTypes.SET_EMPLOYER_PROFILE:
			return updateObject(state, {
				profile: action.value
			});

		case actionTypes.SET_CANDIDATES_LIST:
			return updateObject(state, {
				candidatesList: action.value
			});

		case actionTypes.SET_EMPLOYER_POSTED_JOBS:
			return updateObject(state, {
				postedJobs: action.value
			});

		case actionTypes.SET_EMPLOYMENT_TYPE:
			const employemntTemp = state.employmentType;
			employemntTemp.message = action.value.message;
			employemntTemp.error = action.value.error;
			employemntTemp.status = action.value.status;
			employemntTemp.data = action.value.data.map((value) => value.employment_status);
			return updateObject(state, {
				employmentType: employemntTemp,
				employmentKeys: action.value.data
			});

		case actionTypes.SET_INDUSTRY:
			const indistryTemp = state.industry;
			indistryTemp.message = action.value.message;
			indistryTemp.error = action.value.error;
			indistryTemp.status = action.value.status;
			indistryTemp.data = action.value.data.map((value) => value.industry_name);
			return updateObject(state, {
				industry: indistryTemp,
				industryKeys: action.value.data
			});

		case actionTypes.SET_FUNCTION:
			const functionTemp = state.functionType;
			functionTemp.message = action.value.message;
			functionTemp.error = action.value.error;
			functionTemp.status = action.value.status;
			functionTemp.data = action.value.data.map((value) => value.function_name);
			return updateObject(state, {
				functionType: functionTemp,
				functionKeys: action.value.data
			});

		case actionTypes.SET_SKILLS:
			return updateObject(state, {
				skills: action.value
			});

		case actionTypes.SET_QUESTION_BANK:
			const questionsTemp = state.questionBank;
			questionsTemp.message = action.value.message;
			questionsTemp.status = action.value.status;
			questionsTemp.data = action.value.data;
			questionsTemp.questions = [];
			// questionsTemp.questions.push(...action.value.data.private_question_bank);
			// questionsTemp.questions.push(...action.value.data.public_question_bank);
			return updateObject(state, {
				questionBank: questionsTemp
			});

		case actionTypes.SET_QUESTION_BANK_QUESTIONS:
			const questionsTemp1 = state.questionBank;
			questionsTemp1.questions.push(...action.value);
			return updateObject(state, {
				questionBank: questionsTemp1
			});

		case actionTypes.SET_EMAIL_TEMPLATE:
			let emailTemplateNamesTemp = state.emailTemplateNames;
			emailTemplateNamesTemp = action.value.data.private_email_template.map((value) => value.template_name);
			action.value.data.public_email_template.map((value) => emailTemplateNamesTemp.push(value.template_name));
			let emailTemplates = [...action.value.data.private_email_template, ...action.value.data.public_email_template];
			return updateObject(state, {
				emailTemplate: emailTemplates,
				emailTemplateNames: emailTemplateNamesTemp
			});

		case actionTypes.SET_JOB_URL:
			return updateObject(state, {
				jobURL: action.value
			});

		case actionTypes.SET_APPLIED_CANDIDATE:
			return updateObject(state, {
				appliedCandidateDetails: action.value
			});

		case actionTypes.SET_LOCATIONS:
			let locationTemp = state.locationNames;
			locationTemp = action.value.data.map((value) => value.street_address + ", " + value.city + ", " + value.state + ", " + value.zip_code);
			return updateObject(state, {
				locations: action.value,
				locationNames: locationTemp
			});

		case actionTypes.SET_NEW_JOB:
			const newJobTemp = state.newJob;
			if (action.value.emailTemplateId !== undefined) {
				newJobTemp.emailTemplateId = action.value.emailTemplateId;
			}
			if (action.value.employmentType !== undefined) {
				newJobTemp.employmentType = state.employmentKeys.find(x => x.employment_status === action.value.employmentType).id;
			}
			if (action.value.function !== undefined) {
				newJobTemp.function = state.functionKeys.find(x => x.function_name === action.value.function).id;
			}
			if (action.value.industry !== undefined) {
				newJobTemp.industry = state.industryKeys.find(x => x.industry_name === action.value.industry).id;
			}
			if (action.value.jobDescription !== undefined) {
				newJobTemp.jobDescription = action.value.jobDescription;
			}
			if (action.value.jobTitle !== undefined) {
				newJobTemp.jobTitle = action.value.jobTitle;
			}
			if (action.value.location !== undefined) {
				// newJobTemp.location = action.value.location;
				newJobTemp.location = state.locations.data.find(x => x.city === action.value.location).id;
			}
			if (action.value.openPositions !== undefined) {
				newJobTemp.openPositions = action.value.openPositions;
			}
			if (action.value.minExp !== undefined) {
				newJobTemp.minExp = action.value.minExp;
			}
			if (action.value.maxExp !== undefined) {
				newJobTemp.maxExp = action.value.maxExp;
			}

			return updateObject(state, {
				newJob: newJobTemp
			});

		case actionTypes.SET_JOB_DETAILS:
			// const jobDetailsTemp = state.jobDetails;
			const jobDetailsTemp = {
				"data": {
					"job_id": 1,
					"location": "Warren, NJ",
					"job_title": "Certified Nursing Assistant",
					"job_description": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid ergo hoc loco intellegit honestum? <i>Duo Reges: constructio interrete.</i> Expressa vero in iis aetatibus, quae iam confirmatae sunt. <i>Quamquam tu hanc copiosiorem etiam soles dicere.</i> Duarum enim vitarum nobis erunt instituta capienda. Claudii libidini, qui tum erat summo ne imperio, dederetur. Cur fortior sit, si illud, quod tute concedis, asperum et vix ferendum putabit? Beatus sibi videtur esse moriens. Philosophi autem in suis lectulis plerumque moriuntur. Cuius ad naturam apta ratio vera illa et summa lex a philosophis dicitur. Tria genera cupiditatum, naturales et necessariae, naturales et non necessariae, nec naturales nec necessariae. </p>\n\n<p>Erit enim instructus ad mortem contemnendam, ad exilium, ad ipsum etiam dolorem. Non igitur potestis voluptate omnia dirigentes aut tueri aut retinere virtutem. Quid est igitur, inquit, quod requiras? <i>Non autem hoc: igitur ne illud quidem.</i> Non est igitur voluptas bonum. Similiter sensus, cum accessit ad naturam, tuetur illam quidem, sed etiam se tuetur; </p>\n\n<p>Hoc Hieronymus summum bonum esse dixit. Cum ageremus, inquit, vitae beatum et eundem supremum diem, scribebamus haec. Hoc loco tenere se Triarius non potuit. Qui autem de summo bono dissentit de tota philosophiae ratione dissentit. Tecum optime, deinde etiam cum mediocri amico. Non autem hoc: igitur ne illud quidem. <i>An hoc usque quaque, aliter in vita?</i> </p>",
					"min_experience": 2,
					"max_experience": 6,
					"org_name": "Chelsea Senior Living"
				}
			};
			if (action.value.data !== undefined) {
				if (action.value.data.job_id !== undefined) {
					jobDetailsTemp.data.job_id = action.value.data.job_id;
				}
				if (action.value.data.address.city !== undefined) {
					jobDetailsTemp.data.location = action.value.data.address.city;
				}
				if (action.value.data.organization.org_name !== undefined) {
					jobDetailsTemp.data.org_name = action.value.data.organization.org_name;
				}
				if (action.value.data.job_title !== undefined) {
					jobDetailsTemp.data.job_title = action.value.data.job_title;
				}
				if (action.value.data.job_description !== undefined) {
					jobDetailsTemp.data.job_description = action.value.data.job_description;
				}
				if (action.value.data.min_experience !== undefined) {
					jobDetailsTemp.data.min_experience = action.value.data.min_experience;
				}
				if (action.value.data.max_experience !== undefined) {
					jobDetailsTemp.data.max_experience = action.value.data.max_experience;
				}
			} else {
				if (action.value.jobId !== undefined) {
					jobDetailsTemp.data.job_id = action.value.jobId;
				}
				if (action.value.location !== undefined) {
					jobDetailsTemp.data.location = action.value.location;
				}
				if (action.value.orgName !== undefined) {
					jobDetailsTemp.data.org_name = action.value.orgName;
				}
				if (action.value.jobTitle !== undefined) {
					jobDetailsTemp.data.job_title = action.value.jobTitle;
				}
				if (action.value.jobDescription !== undefined) {
					jobDetailsTemp.data.job_description = action.value.jobDescription;
				}
				if (action.value.minExp !== undefined) {
					jobDetailsTemp.data.min_experience = action.value.minExp;
				}
				if (action.value.maxExp !== undefined) {
					jobDetailsTemp.data.max_experience = action.value.maxExp;
				}
			}
			return updateObject(state, {
				jobDetails: jobDetailsTemp
			});

		case actionTypes.SET_LOGIN:
			return updateObject(state, {
				isLoggedIn: action.value
			});

		case actionTypes.SET_REDIRECT_URL:
			return updateObject(state, {
				redirectURL: action.value
			});

		default:
			return state;
	}
};

export default reducer;
