import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Link } from "react-router-dom";

import "./index.scss";
import GeneralQuestions from "./GeneralQuestions";
import PersonalityAssessment from "./PersonalityAssessment";
import CourseWork from "./CourseWork";
import WorkHistory from "./WorkHistory";
import CommuteQuestions from "./CommuteQuestions";
import EmployerQuestions from "./EmployerQuestions";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchAllAnswers,
	submitCandidateAnswers,
} from "../../../../modals/candidateProfile/thunk";

let scrollBarStyle = {
	height: "calc(100vh - 280px)",
	transition: "all 0.2s ease",
};

/* type="general_questions", q="question_id", a="answer" */
export const isAnswer = (data, q, a) => {
	let answer = false;
	data &&
		data.forEach((ques) => {
			if (q === ques.question_id) {
				if (Array.isArray(a)) {
					// answer = ques.answer.includes(a[0]);
				} else if (typeof a === "object") {
					if (a.sub_question_id_2) {
						let i = findIndex(ques.answer, a.sub_question_id_2);
						if (i > -1) {
							answer = a.sub_answer === ques.answer[i].sub_answer;
						}
					} else if (a.sub_answer) {
						answer = a.sub_answer === ques.sub_answer;
					} else if (a.sub_question_id) {
						let i = findIndex(ques.answer, a.sub_question_id);
						if (i > -1) {
							answer = a.sub_question_id === ques.answer[i].sub_question_id;
						}
					}
				} else if (a === ques.answer) {
					answer = true;
				}
			}
		});
	// console.log(data, answer);
	return answer;
};

/* type="general_questions", q="question_id" */
export const findIndex = (arr, q) => {
	// console.log(arr);
	let index = -1;
	arr.forEach((ques, i) => {
		if (ques.question_id === q) {
			index = i;
		} else if (ques.sub_question_id === q) {
			index = i;
		}
	});
	return index;
};

function Questions(props) {
	const dispatch = useDispatch();
	const allAnswersData = useSelector(
		(state) => state.setCandidateAllAnswersReducer.data
	);
	// console.log(allAnswersData);
	let heights = [0];
	const [activeTab, setActiveTab] = React.useState(0);

	const scrollBar = React.useRef();

	const handleScroll = (i) => {
		setActiveTab(i);
		let scrollTo = heights[i] + i * 30;
		scrollBar.current.view.scroll({
			top: scrollTo,
			behavior: "smooth",
		});
	};

	const _formData = {
		job_id: localStorage.getItem("jobId"),
		general_questions: [
			{
				question_id: 1,
				answer: "10/20/90",
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
				followup_sub_answer: "10/20/90",
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

		coursework: [
			{
				question_id: 1,
				answer: 1,
			},

			{
				question_id: 2,
				answer: [
					{
						sub_question_id: 1,
						sub_answer: 2,
					},
					{
						sub_question_id: 3,
						sub_answer: 2,
					},
				],
			},

			{
				question_id: 3,
				answer: 1,
			},

			{
				question_id: 4,
				answer: [
					{
						sub_question_id: 1,
						sub_answer: 4,
					},
					{
						sub_question_id: 3,
						sub_answer: 4,
					},
				],
			},

			{
				question_id: 5,
				answer: 1,
			},
		],

		work_history: [
			{
				question_id: 1,
				answer: 3,
			},
			{
				question_id: 2,
				answer: 7,
			},
			{
				question_id: 3,
				answer: "09/10/18",
			},
			{
				question_id: 4,
				answer: 1,
			},
		],

		commute: [
			{
				question_id: 1,
				answer: "Warren, NJ",
			},
			{
				question_id: 2,
				answer: 1,
			},
			{
				question_id: 3,
				answer: {
					street_0: "street",
					city_0: "city",
					state_0: "state",
					zipCode_0: "zipcode",
				},
			},
		],

		employer_questions: [
			{
				question_id: 1,
				answer: [1],
			},
			{
				question_id: 2,
				answer: 2,
			},
			{
				question_id: 3,
				answer: [1, 4],
			},
			{
				question_id: 4,
				answer: 2,
			},
		],
	};

	const [formData, setFormData] = React.useState(_formData);

	/* type="general_questions", q="question_id" a="answer" */
	const handleFieldChange = (type, q, a) => {
		let i = findIndex(formData[type], q);
		let _formData = { ...formData };

		if (Array.isArray(a)) {
			let index = _formData[type][i]["answer"].indexOf(a[0]);
			if (index > -1) {
				_formData[type][i]["answer"].splice(index, 1);
			} else {
				_formData[type][i]["answer"].push(a[0]);
			}
		} else if (typeof a === "object") {
			if (a.sub_question_id_2) {
				let index = findIndex(formData[type][i].answer, a.sub_question_id_2);
				_formData[type][i]["answer"][index].sub_answer = a.sub_answer;
			} else if (a.sub_answer) {
				_formData[type][i]["sub_answer"] = a.sub_answer;
			} else if (a.sub_question_id) {
				let obj = {
					sub_question_id: a.sub_question_id,
					sub_answer: null,
				};

				let index = findIndex(formData[type][i].answer, a.sub_question_id);
				if (index > -1) {
					_formData[type][i]["answer"].splice(index, 1);
				} else {
					_formData[type][i]["answer"].push(obj);
				}
			} else if (a.address) {
				_formData[type][i]["answer"][a.address] = a.value;
			}
		} else {
			_formData[type][i]["answer"] = a;
		}

		setFormData(_formData);
	};

	const generalAnswers =
		allAnswersData.length > 0 &&
			allAnswersData.map((entity) => {
				if (entity.category === "general_questions")
					return JSON.parse(entity.answer);
			})
			? JSON.parse(allAnswersData[0].answer)
			: [];
	const personalityAassessment =
		allAnswersData.length > 0 &&
			allAnswersData.map((entity) => {
				if (entity.category === "personality_assessment")
					return JSON.parse(entity.answer);
			})
			? JSON.parse(allAnswersData[0].answer)
			: [];
	const coursework =
		allAnswersData.length > 0 &&
			allAnswersData.map((entity) => {
				if (entity.category === "coursework") return JSON.parse(entity.answer);
			})
			? JSON.parse(allAnswersData[0].answer)
			: [];
	const workHistory =
		allAnswersData.length > 0 &&
			allAnswersData.map((entity) => {
				if (entity.category === "work_history") return JSON.parse(entity.answer);
			})
			? JSON.parse(allAnswersData[0].answer)
			: [];
	const commute =
		allAnswersData.length > 0 &&
			allAnswersData.map((entity) => {
				if (entity.category === "commute") return JSON.parse(entity.answer);
			})
			? JSON.parse(allAnswersData[0].answer)
			: [];

	const formDataFetched = {
		general_questions: generalAnswers,
		personality_assessment: personalityAassessment,
		coursework: coursework,
		workHistory: workHistory,
		commute: commute,
	};

	const onSubmitHandler = () => {
		console.log(JSON.stringify(formData));
		const localStorageId = localStorage.getItem("jobId")
		// if()
		formData.job_id = localStorage.getItem("jobId");
		dispatch(submitCandidateAnswers(formData));
	};

	const calHeight = (height) => {
		let lastHeight = heights[heights.length - 1];
		heights.push(lastHeight + height);
	};
	React.useEffect(() => {
		console.log(formData);
		// dispatch(fetchAllAnswers());
	}, [formData]);

	const handleAddress = (_addressCount) => {
		console.log(_addressCount);

		/* update form values as well */
		let i = _addressCount.length - 1;
		let _formData = { ...formData };
		let j = findIndex(_formData["commute"], 3);

		_formData["commute"][j]["answer"][`street_${i}`] = "";
		_formData["commute"][j]["answer"][`city_${i}`] = "";
		_formData["commute"][j]["answer"][`state_${i}`] = "";
		_formData["commute"][j]["answer"][`zipCode_${i}`] = "";

		setFormData(_formData);
	};

	return (
		<div className="questions">
			{props.showEmployerQuestions ? (
				<h1 className="common-heading">Apply for a Job</h1>
			) : (
					<h1 className="common-heading">Let Us Know More About You</h1>
				)}

			<div className="outer">
				<div className="left">
					<ul>
						<li
							className={`done ${activeTab === 0 ? "active" : ""}`}
							onClick={() => handleScroll(0)}
						>
							General Questions
							<span className="common-check-icon"></span>
						</li>
						<li
							className={`${activeTab === 1 ? "active" : ""}`}
							onClick={() => handleScroll(1)}
						>
							Personality Assessment <span className="common-check-icon"></span>
						</li>
						<li
							className={`${activeTab === 2 ? "active" : ""}`}
							onClick={() => handleScroll(2)}
						>
							Coursework <span className="common-check-icon"></span>
						</li>
						<li
							className={`${activeTab === 3 ? "active" : ""}`}
							onClick={() => handleScroll(3)}
						>
							Work History <span className="common-check-icon"></span>
						</li>
						<li
							className={`${activeTab === 4 ? "active" : ""}`}
							onClick={() => handleScroll(4)}
						>
							Commute <span className="common-check-icon"></span>
						</li>
						{props.showEmployerQuestions && (
							<li
								className={`${activeTab === 5 ? "active" : ""}`}
								onClick={() => handleScroll(5)}
							>
								Employer Questions <span className="common-check-icon"></span>
							</li>
						)}
					</ul>
				</div>
				<div className="right">
					<Scrollbars
						ref={scrollBar}
						className="custom-scrollbar"
						style={scrollBarStyle}
						autoHideTimeout={1000}
						autoHideDuration={600}
						renderTrackVertical={({ style, ...props }) => (
							<div
								{...props}
								className="bar"
								style={{
									...style,
								}}
							/>
						)}
					>
						<GeneralQuestions
							calHeight={calHeight}
							data={formData.general_questions}
							onchange={(q, a) => handleFieldChange("general_questions", q, a)}
						/>
						<PersonalityAssessment
							calHeight={calHeight}
							data={formData.personality_assessment}
							onchange={(q, a) =>
								handleFieldChange("personality_assessment", q, a)
							}
						/>
						<CourseWork
							calHeight={calHeight}
							data={formData.coursework}
							onchange={(q, a) => handleFieldChange("coursework", q, a)}
						/>
						<WorkHistory
							calHeight={calHeight}
							data={formData.work_history}
							onchange={(q, a) => handleFieldChange("work_history", q, a)}
						/>
						<CommuteQuestions
							calHeight={calHeight}
							data={formData.commute}
							onchange={(q, a) => handleFieldChange("commute", q, a)}
							newAddress={(count) => handleAddress(count)}
						/>
						{props.showEmployerQuestions && (
							<EmployerQuestions
								calHeight={calHeight}
								data={formData.employer_questions}
								onchange={(q, a) =>
									handleFieldChange("employer_questions", q, a)
								}
							/>
						)}
						<div className="cta" >
							<Link to={`/jobs/view/${localStorage.getItem("jobId") ? localStorage.getItem("jobId") : ""}`} className="primary-btn" onClick={onSubmitHandler}>
								Submit
							</Link>
						</div>
						<div className="blank"></div>
					</Scrollbars>
				</div>
			</div>
		</div>
	);
}

export default Questions;
