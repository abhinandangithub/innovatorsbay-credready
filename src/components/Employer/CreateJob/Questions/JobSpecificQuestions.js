import React from "react";
import { useDispatch } from "react-redux";

import Input from "../../../_Elements/Input";
import AddButton from "../../../_Elements/AddButton";
import {
	togglePopup,
	toggleOverlay,
} from "../../../../store/actions/popup_overlay";

function JobSpecificQuestions() {
	const dispatch = useDispatch();
	const questions = [
		{
			question_id: 1,
			question_name: "What are your hobbies?",
			category: "Employer Questions",
			question_type: "text-input",
			is_public: false,
			job_title: "CNA",
			org_id: 1,
		},
		{
			question_id: 2,
			question_name: "Are you okay with night shift?",
			category: "Employer Questions",
			question_type: "mcq",
			is_public: false,
			job_title: "CNA",
			org_id: 1,
			option_choices: [
				{
					id: 1,
					question_id: 2,
					option_choice_name: "Yes",
					question_type: "boolean",
				},
				{
					id: 2,
					question_id: 2,
					option_choice_name: "No",
					question_type: "boolean",
				},
			],
		},
		{
			question_id: 3,
			question_name: "What are you workable timings?",
			category: "Employer Questions",
			question_type: "mcq",
			is_public: true,
			job_title: "CNA",
			option_choices: [
				{
					id: 3,
					question_id: 3,
					option_choice_name: "8 AM - 1 PM",
					question_type: "checkbox",
				},
				{
					id: 4,
					question_id: 3,
					option_choice_name: "1 PM - 5 PM",
					question_type: "checkbox",
				},
				{
					id: 5,
					question_id: 3,
					option_choice_name: "5 PM - 11 PM",
					question_type: "checkbox",
				},
				{
					id: 6,
					question_id: 3,
					option_choice_name: "11 PM - 5 AM",
					question_type: "checkbox",
				},
			],
		},
	];

	const addQuestion = () => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "addNewQuestion"]));
	};

	return (
		<div className="job-specefic-questions">
			<AddButton
				id={"addQuestionBtn"}
				onclick={addQuestion}
				content="Add New Question"
			/>
			<ul className="general-questions">
				{questions.map((question, i) => {
					return (
						<li className="general-question" key={i}>
							<h2 className="question">{question.question_name}</h2>
							<div className="options">
								{question.question_type === "text-input" ? (
									<Input type="text" />
								) : question.question_type === "mcq" ? (
									<>
										{question.option_choices.map((option, i) => {
											if (option.question_type === "checkbox") {
												return (
													<div key={i}>
														<input
															key={i}
															className="block-toggle blue"
															id={`${option.id}${option.question_id}`}
															name={`${option.question_id}`}
															type="checkbox"
															disabled
														/>
														<label
															htmlFor={`${option.id}${option.question_id}`}
														>
															{option.option_choice_name}
														</label>
													</div>
												);
											} else if (option.question_type === "boolean") {
												return (
													<div key={i}>
														<input
															key={i}
															className={`fancy-toggle blue ${
																i === 0 ? "yes" : "no"
															}`}
															id={`${option.id}${option.question_id}`}
															name={`${option.question_id}`}
															type="radio"
															disabled
														/>
														<label
															htmlFor={`${option.id}${option.question_id}`}
														>
															<span className="input"></span>
															{option.option_choice_name}
														</label>
													</div>
												);
											}
										})}
									</>
								) : null}
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default JobSpecificQuestions;