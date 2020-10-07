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
	profile: {},
	postedJobs: {
		"message":"Question added successfully",
		"data":[
		   {
			  "job_id":1,
			  "open_positions":5,
			  "location_id":3,
			  "org_id":1,
			  "organization":{
				 "orgId":1,
				 "org_name":"Chelsea Senior Living",
				 "naics_code":"623110",
				 "hires_required":1,
				 "company_size":2,
				 "reference_source":"LinkedIn",
				 "website":"https://www.chelseaseniorliving.com/",
				 "address":[
					
				 ]
			  },
			  "job_title":"Certified Nursing Assistant",
			  "job_description":"\u003cp\u003eLorem ipsum dolor sit amet, consectetur adipiscing elit. Quid ergo hoc loco intellegit honestum? \u003ci\u003eDuo Reges: constructio interrete.\u003c/i\u003e Expressa vero in iis aetatibus, quae iam confirmatae sunt. \u003ci\u003eQuamquam tu hanc copiosiorem etiam soles dicere.\u003c/i\u003e Duarum enim vitarum nobis erunt instituta capienda. Claudii libidini, qui tum erat summo ne imperio, dederetur. Cur fortior sit, si illud, quod tute concedis, asperum et vix ferendum putabit? Beatus sibi videtur esse moriens. Philosophi autem in suis lectulis plerumque moriuntur. Cuius ad naturam apta ratio vera illa et summa lex a philosophis dicitur. Tria genera cupiditatum, naturales et necessariae, naturales et non necessariae, nec naturales nec necessariae. \u003c/p\u003e\n\n\u003cp\u003eErit enim instructus ad mortem contemnendam, ad exilium, ad ipsum etiam dolorem. Non igitur potestis voluptate omnia dirigentes aut tueri aut retinere virtutem. Quid est igitur, inquit, quod requiras? \u003ci\u003eNon autem hoc: igitur ne illud quidem.\u003c/i\u003e Non est igitur voluptas bonum. Similiter sensus, cum accessit ad naturam, tuetur illam quidem, sed etiam se tuetur; \u003c/p\u003e\n\n\u003cp\u003eHoc Hieronymus summum bonum esse dixit. Cum ageremus, inquit, vitae beatum et eundem supremum diem, scribebamus haec. Hoc loco tenere se Triarius non potuit. Qui autem de summo bono dissentit de tota philosophiae ratione dissentit. Tecum optime, deinde etiam cum mediocri amico. Non autem hoc: igitur ne illud quidem. \u003ci\u003eAn hoc usque quaque, aliter in vita?\u003c/i\u003e \u003c/p\u003e",
			  "address":{
				 "id":3,
				 "street_address":"274 King George Rd",
				 "city":"Warren",
				 "state":"NJ",
				 "zip_code":7059
			  },
			  "employment_type":3,
			  "industry_id":1,
			  "function_id":1,
			  "industry":{
				 "id":1,
				 "industry_name":"telecom",
				 "is_active":true,
				 "is_approved":true
			  },
			  "function":{
				 "id":1,
				 "function_name":"service",
				 "is_active":true,
				 "is_approved":true
			  },
			  "min_experience":2,
			  "max_experience":6,
			  "email_template_id":3,
			  "email_template":{
				 "template_id":3,
				 "org_id":1,
				 "template_name":"Welcome to Chealsea",
				 "email_body":"Hi {candidate_name},\n\nWelcome to Chealsea. We will reach out to you shortly.\n\nRegards,\nTeam Chealsea",
				 "created_by":"admin",
				 "created_on":"Oct 6, 2020 5:15:50 PM",
				 "modified_by":"admin",
				 "modified_on":"Oct 6, 2020 5:15:50 PM"
			  },
			  "strengths":[
				 {
					"id":1,
					"name":"Java",
					"is_active":true
				 },
				 {
					"id":1,
					"name":"Java",
					"is_active":true
				 },
				 {
					"id":1,
					"name":"Java",
					"is_active":true
				 }
			  ],
			  "count_of_applied_candidates":2,
			  "created_by":"admin",
			  "created_on":"Oct 6, 2020 5:40:45 PM",
			  "modified_by":"admin",
			  "modified_on":"Oct 6, 2020 5:40:45 PM"
		   }
		],
		"status":"OK"
	 },
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
            hiringNeedsTemp.data = action.value.data.map((value) => value.rangeName);
			return updateObject(state, {
				hiringNeedsTemp
			});

		case actionTypes.SET_COMPANY_SIZE:
            const companySizeTemp = state.companySize;
            companySizeTemp.message = action.value.message;
            companySizeTemp.error = action.value.error;
            companySizeTemp.status = action.value.status;
            companySizeTemp.data = action.value.data.map((value) => value.rangeName);
			return updateObject(state, {
				companySizeTemp
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

		case actionTypes.SET_EMPLOYER_POSTED_JOBS:
			return updateObject(state, {
				postedJobs: action.value
			});

		default:
			return state;
	}
};

export default reducer;
