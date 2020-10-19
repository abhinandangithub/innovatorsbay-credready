import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
	togglePopup,
	toggleOverlay,
} from "../../../../store/actions/popup_overlay";
import { getQuestionBank, deleteQuestion } from "../../../../store/thunks/employer";
import {
	setQuestionBankQuestion,
	setNewJob,
} from "../../../../store/actions/employer";

import Input from "../../../_Elements/Input";

import "./index.scss";

function ChoosePrivateQuestions(props) {
	const dispatch = useDispatch();
	const [questionBanks, setQuestionBanks] = useState(props.questionBank);
	let questionToSave = props.questionsSelected;
	console.log("props ", props);
	const createNewQuestion = () => {
		dispatch(togglePopup([true, "createNewQuestion", { type: "private" }]));
	};

	useEffect(() => {
		props.questionsSelected.forEach((element) => {
			if (document.getElementById(element.question_id) !== null) {
				document.getElementById(element.question_id).checked = true;
			}
		});
	}, [props.questionsSelected]);

	useEffect(() => {
		dispatch(getQuestionBank());
	}, [dispatch]);

	useEffect(() => {
		setQuestionBanks(props.questionBank);
	}, [props.questionBank]);

	const handleCheckEvent = (event, question) => {
		console.log(event.target.value, question);
		if (document.getElementById(event.target.id).checked) {
			// questionToSave.push(question);
			if (questionToSave.length !== 0) {
				if (
					questionToSave.find((x) => x.question_id !== event.target.id)
						.question_id.length !== 0
				) {
					questionToSave.push(question);
				}
			} else {
				questionToSave.push(question);
			}
		} else {
			questionToSave = questionToSave.map((val) => {
				if (val.question_id != event.target.id) {
					return val;
				} else {
					return null;
				}
			});
			questionToSave = questionToSave.filter((e) => e !== null);
		}
	};

	const handleQuestionAdd = () => {
		console.log("data ", questionToSave);
		console.log("create");
		dispatch(setQuestionBankQuestion(questionToSave));
		dispatch(setNewJob({ jobQuestionnaireMap: questionToSave }));
		// dispatch(createQuestion({
		// 	"category": "Employer Questions",
		// 	"forPublicReview": true,
		// 	"jobTitle": "CNA",
		// 	"questionName": "How would you define yourself?",
		// 	"questionType": "text-input"
		// }));
		dispatch(toggleOverlay(false));
		dispatch(togglePopup([false, "addNewQuestion"]));
	};

	const handleEdit = (e, question) => {
		dispatch(togglePopup([true, "createNewQuestion", { type: "private", action: "edit", question: question }]));
	};
	const handleDelete = (e, question) => {
		// console.log(question);
		alert("Are you sure to delete?");
		dispatch(deleteQuestion(question.question_id));
		setQuestionBanks(props.questionBank.filter(val => val.question_id !== question.question_id));
	};

	const handleJobTitleSearch = (searchJobTitle) => {
		setQuestionBanks(props.questionBank.filter(val => val.question_name.includes(searchJobTitle)));
	}

	return (
		<div className="choose-private-question">
			<h1>
				Choose from Private Questions
				<button className="common-heading-btn" onClick={createNewQuestion}>
					<span></span>Create New Question
				</button>
			</h1>
			<div className="content">
				<div className="search-panel">
					<div className="searches">
						<input type="text" placeholder="Job Title" onChange={(e) => { handleJobTitleSearch(e.target.value) }} />
						<input type="text" placeholder="Skills" />
					</div>
				</div>

				<ul className="general-questions">
					{questionBanks.map((question, i) => {
						return (
							<li className="general-question" key={i}>
								<h2 className="question">{question.question_name}</h2>
								<div className="options">
									{question.question_type === "text-input" ? (
										<>
											<Input type="text" />
											<label htmlFor="question3">
												<span className="input"></span>
											</label>

											<FontAwesomeIcon
												className="action-btn edit"
												icon={faPen}
												// id={"workExperienceEdit_" + i}
												onClick={(e) => handleEdit(e, question)}
											/>
											<FontAwesomeIcon
												className="action-btn delete"
												icon={faTrash}
												// id={"workExperienceDelete_" + i}
												onClick={(e) => handleDelete(e, question)}
											/>
										</>
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
								<input
									className="fancy-toggle"
									name="question"
									type="checkbox"
									onClick={(event) => handleCheckEvent(event, question)}
									id={question.question_id}
								/>
								<label htmlFor={question.question_id}>
									<span className="input"></span>
								</label>

								<FontAwesomeIcon
									className="action-btn edit"
									icon={faPen}
									onClick={(e) => handleEdit(e, question)}
								/>
								<FontAwesomeIcon
									className="action-btn delete"
									icon={faTrash}
									onClick={(e) => handleDelete(e, question)}
								/>
							</li>
						);
					})}
				</ul>
				<div className="cta">
					<button
						className="primary-btn blue"
						onClick={() => handleQuestionAdd()}
					>
						Done
					</button>
				</div>
			</div>
		</div>
	);
}

// export default ChoosePrivateQuestions;

function mapStateToProps(state) {
	return {
		questionBank: state.employerReducer.questionBank.data.private_question_bank.sort(function (a, b) {
			const x = a['question_id']; const y = b['question_id'];
			return ((x < y) ? 1 : ((x > y) ? -1 : 0));
		}),
		questionsSelected: state.employerReducer.questionBank.questions
	};
}

// export default JobSpecificQuestions;
export default connect(mapStateToProps)(ChoosePrivateQuestions);

/*
return (
	<div className="choose-private-question">
		<h1>
			Choose from Private Questions
			<button className="common-heading-btn" onClick={createNewQuestion}>
				<span></span>Create New Question
			</button>
		</h1>
		<div className="content">
			<div className="search-panel">
				<div className="searches">
					<input type="text" placeholder="Job Title" />
					<input type="text" placeholder="Skills" />
				</div>
			</div>

			<ul className="general-questions">
				<li className="general-question">
					<h2 className="question">
						Education <span>*</span>
					</h2>

					<div className="options">
						<input
							className="block-toggle blue"
							name="education"
							type="checkbox"
							id="highSchool"
						/>
						<label htmlFor="highSchool">
							<span className="input"></span>High School Diploma
						</label>
						<input
							className="block-toggle blue"
							name="education"
							type="checkbox"
							id="collegeDegree"
						/>
						<label htmlFor="collegeDegree">
							<span className="input"></span>College Degree
						</label>
					</div>
					<input
						className="fancy-toggle"
						name="question"
						type="checkbox"
						id="question3"
					/>
					<label htmlFor="question3">
						<span className="input"></span>
					</label>

					<FontAwesomeIcon
						className="action-btn edit"
						icon={faPen}
						// id={"workExperienceEdit_" + i}
						// onClick={handleEdit}
					/>
					<FontAwesomeIcon
						className="action-btn delete"
						icon={faTrash}
						// id={"workExperienceDelete_" + i}
						// onClick={() => handleDelete("workExperience")}
					/>
				</li>
				<li className="general-question">
					<h2 className="question">
						Do you understand that these are some of the tasks you will
						perform as a CNA?
					</h2>
					<ul className="question_info">
						<li>Cleaning beds</li>
						<li>Mealtime cleanup</li>
						<li>Helping patients get dressed</li>
					</ul>
					<div className="options">
						<input
							className="fancy-toggle yes"
							name="taskUnderstood"
							type="radio"
							id="taskUnderstoodYes"
						/>
						<label htmlFor="taskUnderstoodYes">
							<span className="input"></span>Yes
						</label>
						<input
							className="fancy-toggle no"
							name="taskUnderstood"
							type="radio"
							id="taskUnderstoodNo"
						/>
						<label htmlFor="taskUnderstoodNo">
							<span className="input"></span>No
						</label>
					</div>
					<input
						className="fancy-toggle"
						name="question"
						type="checkbox"
						id="question1"
					/>
					<label htmlFor="question1">
						<span className="input"></span>
					</label>
					<FontAwesomeIcon
						className="action-btn edit"
						icon={faPen}
						// id={"workExperienceEdit_" + i}
						// onClick={handleEdit}
					/>
					<FontAwesomeIcon
						className="action-btn delete"
						icon={faTrash}
						// id={"workExperienceDelete_" + i}
						// onClick={() => handleDelete("workExperience")}
					/>
				</li>
				<li className="general-question">
					<h2 className="question">
						Are you comfortable with the posted wage?
					</h2>
					<div className="options">
						<input
							className="fancy-toggle yes"
							name="comfortable"
							type="radio"
							id="comfortableYes"
						/>
						<label htmlFor="comfortableYes">
							<span className="input"></span>Yes
						</label>
						<input
							className="fancy-toggle no"
							name="comfortable"
							type="radio"
							id="comfortableNo"
						/>
						<label htmlFor="comfortableNo">
							<span className="input"></span>No
						</label>
					</div>
					<input
						className="fancy-toggle"
						name="question"
						type="checkbox"
						id="question2"
					/>
					<label htmlFor="question2">
						<span className="input"></span>
					</label>
					<FontAwesomeIcon
						className="action-btn edit"
						icon={faPen}
						// id={"workExperienceEdit_" + i}
						// onClick={handleEdit}
					/>
					<FontAwesomeIcon
						className="action-btn delete"
						icon={faTrash}
						// id={"workExperienceDelete_" + i}
						// onClick={() => handleDelete("workExperience")}
					/>
				</li>
			</ul>
			<div className="cta">
				<button className="primary-btn" onClick={() => handleQuestionAdd()}>Add</button>
			</div>
		</div>
	</div>
); */
