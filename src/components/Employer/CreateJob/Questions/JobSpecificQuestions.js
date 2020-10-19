import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import Input from "../../../_Elements/Input";
import AddButton from "../../../_Elements/AddButton";
import {
	togglePopup,
	toggleOverlay,
} from "../../../../store/actions/popup_overlay";
import { getQuestionBank } from "../../../../store/thunks/employer";

function JobSpecificQuestions(props) {
	const dispatch = useDispatch();
	// console.log('props questionBank ', props.questionBank.questionBank.questions);
	useEffect(() => {
		// console.log('props questionBank dispatch', props.questionBank);
		dispatch(getQuestionBank());
	}, [dispatch]);

	useEffect(() => {
		// console.log('props questionBank useeffect', props.questionBank);
	}, [props.questionBank]);

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

	const handleEdit = () => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "createNewQuestion", { type: "private" }]));
	};
	const handleDelete = () => {
		alert("Are you sure to delete?");
	};

	return (
		<div className="job-specefic-questions">
			<AddButton
				id={"addQuestionBtn"}
				onclick={addQuestion}
				content="Add New Question"
			/>
			<ul className="general-questions">
				{props.questionBank.questionBank.questions.map((question, i) => {
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
																i === 0 ? "yes" : "yes"
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
								{/* <FontAwesomeIcon
									className="action-btn edit"
									icon={faPen}
									onClick={handleEdit}
								/>
								<FontAwesomeIcon
									className="action-btn delete"
									icon={faTrash}
									onClick={handleDelete}
								/> */}
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		//  questionBank: state.employerReducer.questionBank.questions
		questionBank: state.employerReducer,
	};
}

// export default JobSpecificQuestions;
export default connect(mapStateToProps)(JobSpecificQuestions);
