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
import { fetchAllAnswers } from "../../../../modals/candidateProfile/thunk";

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
				if (typeof a === "object") {
					if (a.sub_answer === ques.sub_answer) {
						answer = true;
					}
				} else if (a === ques.answer) {
					answer = true;
				}
			}
		});
	return answer;
};

/* type="general_questions", q="question_id" */
export const findIndex = (arr, q) => {
	console.log(arr);
	let index = false;
	arr.forEach((ques, i) => {
		if (ques.question_id === q) {
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
	console.log(allAnswersData);
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

	const formData = {
		general_questions: [
			{
				question_id: 1,
				answer: "10/15/20",
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
				followup_sub_answer: "18-09-2019",
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
						sub_answer: 4,
					},
					{
						sub_question_id: 3,
						sub_answer: 4,
					},
				],
			},

			{
				question_id: 3,
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
				question_id: 4,
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
				answer: "2 years 3 months",
			},
			{
				question_id: 3,
				answer: "10/11/20",
			},
			{
				question_id: 4,
				answer: [1, 2],
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
				answer: [
					{
						sub_question_id: 1,
						sub_answer: "street address",
					},
					{
						sub_question_id: 2,
						sub_answer: "zipcode",
					},
					{
						sub_question_id: 3,
						sub_answer: "city",
					},
					{
						sub_question_id: 4,
						sub_answer: "state",
					},
				],
			},
		],

		employer_questions: [
			{
				question_id: 1,
				answer: "some answer",
			},
			{
				question_id: 2,
				answer: [1],
			},
			{
				question_id: 3,
				answer: [2, 3],
			},
		],
	};

	/* type="general_questions", q="question_id" a="answer" */
	const handleFieldChange = (arr, q, a) => {
		let i = findIndex(arr, q);
		console.log(arr, i);
		arr[i].answer = a;
		console.log(formData);
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

	const calHeight = (height) => {
		let lastHeight = heights[heights.length - 1];
		heights.push(lastHeight + height);
	};
	React.useEffect(() => {
		console.log(formData.general_questions);
		// dispatch(fetchAllAnswers());
	}, [formData]);

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
							onchange={(q, a) =>
								handleFieldChange(formData.general_questions, q, a)
							}
						/>
						<PersonalityAssessment
							calHeight={calHeight}
							data={formData.personality_assessment}
							onchange={(q, a) =>
								handleFieldChange(formData.personality_assessment, q, a)
							}
						/>
						<CourseWork
							calHeight={calHeight}
							data={formData.coursework}
							onchange={(q, a) => handleFieldChange(formData.coursework, q, a)}
						/>
						<WorkHistory
							calHeight={calHeight}
							data={formData.work_history}
							onchange={(q, a) =>
								handleFieldChange(formData.work_history, q, a)
							}
						/>
						<CommuteQuestions
							calHeight={calHeight}
							data={formData.commute}
							onchange={(q, a) => handleFieldChange(formData.commute, q, a)}
						/>
						{props.showEmployerQuestions && (
							<EmployerQuestions
								calHeight={calHeight}
								data={formData.employer_questions}
								onchange={(q, a) =>
									handleFieldChange(formData.employer_questions, q, a)
								}
							/>
						)}
						<div className="cta">
							<Link to="/jobs/view/1" className="primary-btn">
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
