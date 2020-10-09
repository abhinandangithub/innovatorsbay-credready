import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

import "./index.scss";
import GeneralQuestions from "./GeneralQuestions";
import PersonalityAssessment from "./PersonalityAssessment";
import CourseWork from "./CourseWork";
import WorkHistory from "./WorkHistory";
import CommuteQuestions from "./CommuteQuestions";
import EmployerQuestions from "./EmployerQuestions";

let scrollBarStyle = {
	height: "calc(100vh - 280px)",
	transition: "all 0.2s ease",
};
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
};

/* type="general_questions", q="question_id", a="answer" */
export const isAnswer = (type, q, a) => {
	let answer = false;
	formData[type].forEach((ques) => {
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

function Questions(props) {
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

	const calHeight = (height) => {
		let lastHeight = heights[heights.length - 1];
		heights.push(lastHeight + height);
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
						<GeneralQuestions calHeight={calHeight} />
						<PersonalityAssessment calHeight={calHeight} />
						<CourseWork calHeight={calHeight} />
						<WorkHistory calHeight={calHeight} />
						<CommuteQuestions calHeight={calHeight} />
						{props.showEmployerQuestions && (
							<EmployerQuestions calHeight={calHeight} />
						)}
						<div className="cta">
							<button className="primary-btn">Submit</button>
						</div>
						<div className="blank"></div>
					</Scrollbars>
				</div>
			</div>
		</div>
	);
}

export default Questions;
