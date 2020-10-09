import React from "react";
import DatePicker from "react-datepicker";

import { isAnswer } from "./index";

const formData = {
	general_questions: [
		{
			question_id: 1,
			answer: "10/28/20",
		},

		{
			question_id: 2,
			answer: 1,
		},

		{
			question_id: 3,
			answer: 1,
		},

		{
			question_id: 4,
			answer: 2,
		},

		{
			question_id: 5,
			answer: 2,
		},

		{
			question_id: 6,
			answer: 2,
			sub_answer: 2,
			followup_sub_answer: "02/15/90",
		},
	],
	personality_assessment: [
		{
			question_id: 1,
			answer: 1,
		},

		{
			question_id: 2,
			answer: 3,
		},

		{
			question_id: 3,
			answer: 5,
		},

		{
			question_id: 4,
			answer: 2,
		},

		{
			question_id: 5,
			answer: 3,
		},

		{
			question_id: 6,
			answer: 1,
		},

		{
			question_id: 7,
			answer: 4,
		},

		{
			question_id: 8,
			answer: 1,
		},

		{
			question_id: 9,
			answer: 3,
		},

		{
			question_id: 10,
			answer: 2,
		},

		{
			question_id: 11,
			answer: 1,
		},

		{
			question_id: 12,
			answer: 4,
		},

		{
			question_id: 13,
			answer: 5,
		},

		{
			question_id: 14,
			answer: 2,
		},

		{
			question_id: 15,
			answer: 3,
		},

		{
			question_id: 16,
			answer: 4,
		},
	],
};

function GeneralQuestions(props) {
	const [appliedDate, setAppliedDate] = React.useState();
	const [separatedDate, setSeparatedDate] = React.useState();

	/* type="general_questions", q="question_id" */
	const findIndex = (type, q) => {
		let index = false;
		formData[type].forEach((ques, i) => {
			if (ques.question_id === q) {
				index = i;
			}
		});
		return index;
	};

	const selectSeparatedDate = () => {
		let i = findIndex("general_questions", 6); // 1 is question_id
		let a = formData.general_questions[i].sub_answer;
		let d = new Date(a);
		if (a !== 2) {
			d = null;
		}
		setSeparatedDate(d);
	};
	const selectDefaultDate = () => {
		let i = findIndex("general_questions", 1); // 1 is question_id
		let a = formData.general_questions[i].answer;
		let d = new Date(a);
		if (a === 2) {
			d = null;
		}
		setAppliedDate(d);
	};

	const parent = React.useRef();

	React.useEffect(() => {
		props.calHeight(parent.current.clientHeight);
		selectDefaultDate();
		selectSeparatedDate();
	}, []);

	return (
		<div className="general-questions-page" ref={parent}>
			<div className="heading">
				<h2>General Questions</h2>
			</div>
			<div className="content">
				<ul className="general-questions">
					<li className="general-question applied">
						<h2 className="question">
							Have you applied here previously? Is so, when?
						</h2>
						<div className="info">
							<label>When you applied?</label>
							<DatePicker
								selected={appliedDate}
								onChange={(date) => setAppliedDate(date)}
								placeholderText="Select Date"
							/>
							<span style={{ margin: "0 15px" }}>Or</span>
							<input
								className="fancy-toggle no radio"
								name="applied"
								type="radio"
								id="appliedBefore"
								defaultChecked={isAnswer("general_questions", 1, 2)}
							/>
							<label htmlFor="appliedBefore">
								<span className="input"></span>No
							</label>
						</div>
					</li>
					<li className="general-question">
						<h2 className="question">Are you over 18 years old?</h2>
						<div className="options">
							<input
								className="fancy-toggle blue yes radio"
								name="over18Years"
								type="radio"
								id="over18YearsYes"
								defaultChecked={isAnswer("general_questions", 2, 1)}
							/>
							<label htmlFor="over18YearsYes">
								<span className="input"></span>Yes
							</label>
							<input
								className="fancy-toggle no radio"
								name="over18Years"
								type="radio"
								id="over18YearsNo"
								defaultChecked={isAnswer("general_questions", 2, 2)}
							/>
							<label htmlFor="over18YearsNo">
								<span className="input"></span>No
							</label>
						</div>
					</li>
					<li className="general-question">
						<h2 className="question">Are you eligible to work in the U.S.?</h2>
						<div className="options">
							<input
								className="fancy-toggle blue yes radio"
								name="eligible"
								type="radio"
								id="eligibleYes"
								defaultChecked={isAnswer("general_questions", 3, 1)}
							/>
							<label htmlFor="eligibleYes">
								<span className="input"></span>Yes
							</label>
							<input
								className="fancy-toggle no radio"
								name="eligible"
								type="radio"
								id="eligibleNo"
								defaultChecked={isAnswer("general_questions", 3, 2)}
							/>
							<label htmlFor="eligibleNo">
								<span className="input"></span>No
							</label>
						</div>
					</li>
					<li className="general-question">
						<h2 className="question">
							Will you require relocation assistance?
						</h2>
						<div className="options">
							<input
								className="fancy-toggle blue yes radio"
								name="requireRelocation"
								type="radio"
								id="requireRelocationYes"
								defaultChecked={isAnswer("general_questions", 4, 1)}
							/>
							<label htmlFor="requireRelocationYes">
								<span className="input"></span>Yes
							</label>
							<input
								className="fancy-toggle no radio"
								name="requireRelocation"
								type="radio"
								id="requireRelocationNo"
								defaultChecked={isAnswer("general_questions", 4, 2)}
							/>
							<label htmlFor="requireRelocationNo">
								<span className="input"></span>No
							</label>
						</div>
					</li>
					<li className="general-question">
						<h2 className="question">
							Do you require or will you require a work authorization?
						</h2>
						<div className="options">
							<input
								className="fancy-toggle blue yes radio"
								name="workAuthorization"
								type="radio"
								id="workAuthorizationYes"
								defaultChecked={isAnswer("general_questions", 5, 1)}
							/>
							<label htmlFor="workAuthorizationYes">
								<span className="input"></span>Yes
							</label>
							<input
								className="fancy-toggle no radio"
								name="workAuthorization"
								type="radio"
								id="workAuthorizationNo"
								defaultChecked={isAnswer("general_questions", 5, 2)}
							/>
							<label htmlFor="workAuthorizationNo">
								<span className="input"></span>No
							</label>
						</div>
					</li>
					<li className="general-question">
						<h2 className="question">
							If you believe you belong to any of the categories of protected
							veterans listed above, please indicate by checking the appropriate
							box below. If you are not a veteran, select box 1 OR select the
							box(s) that apply to your veteran status.
						</h2>
						<div className="options vetran-status coloumn">
							<input
								className="fancy-toggle blue yes radio full"
								name="isVeteran"
								type="radio"
								id="isVeteran"
								defaultChecked={isAnswer("general_questions", 6, 1)}
							/>
							<label htmlFor="isVeteran">
								<span className="input"></span>I am not a veteran. (I did not
								serve in the military.)
							</label>
							<input
								className="fancy-toggle yes radio blue full"
								name="isVeteran"
								type="radio"
								id="protectedVeteran"
								defaultChecked={isAnswer("general_questions", 6, 2)}
							/>
							<label htmlFor="protectedVeteran">
								<span className="input"></span>I belong to the following
								classifications of protected veterans (Choose all that apply):
							</label>
							<ul>
								<li>
									<input
										className="fancy-toggle yes radio blue full"
										name="vetranType"
										type="radio"
										id="disabledVeteran"
										defaultChecked={isAnswer("general_questions", 6, {
											sub_answer: 1,
										})}
									/>
									<label htmlFor="disabledVeteran">
										<span className="input"></span>DISABLED VETERAN
									</label>
									<input
										className="fancy-toggle yes radio blue full"
										name="vetranType"
										type="radio"
										id="separatedVeteran"
										defaultChecked={isAnswer("general_questions", 6, {
											sub_answer: 2,
										})}
									/>
									<label htmlFor="separatedVeteran">
										<span className="input"></span>
										RECENTLY SEPARATED VETERAN
									</label>
									<DatePicker
										selected={separatedDate}
										onChange={(date) => setSeparatedDate(date)}
										placeholderText="Select Date"
									/>
									<input
										className="fancy-toggle yes radio blue full"
										name="vetranType"
										type="radio"
										id="activeVeteran"
										defaultChecked={isAnswer("general_questions", 6, {
											sub_answer: 3,
										})}
									/>
									<label htmlFor="activeVeteran">
										<span className="input"></span>
										ACTIVE WARTIME OR CAMPAIGN BADGE VETERAN
									</label>
									<input
										className="fancy-toggle yes radio blue full"
										name="vetranType"
										type="radio"
										id="medalVeteran"
										defaultChecked={isAnswer("general_questions", 6, {
											sub_answer: 4,
										})}
									/>
									<label htmlFor="medalVeteran">
										<span className="input"></span>
										ARMED FORCES SERVICE MEDAL VETERAN
									</label>
								</li>
							</ul>
							<input
								className="fancy-toggle yes radio blue full"
								name="isVeteran"
								type="radio"
								id="notProtectedVeteran"
								defaultChecked={isAnswer("general_questions", 6, 3)}
							/>
							<label htmlFor="notProtectedVeteran">
								<span className="input"></span>I am NOT a protected veteran. (I
								served in the military but do not fall into any veteran
								categories listed above.)
							</label>
							<input
								className="fancy-toggle yes radio blue full"
								name="isVeteran"
								type="radio"
								id="noVeteranStatus"
								defaultChecked={isAnswer("general_questions", 6, 4)}
							/>
							<label htmlFor="noVeteranStatus">
								<span className="input"></span>I choose not to identify my
								veteran status.
							</label>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default GeneralQuestions;
