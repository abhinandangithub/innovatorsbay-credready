import React from "react";
import { useDispatch, connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { togglePopup, toggleOverlay } from "../../../../store/actions/popup_overlay";
import { createQuestion } from '../../../../store/thunks/employer';
import Input from "../../../_Elements/Input";
import { setQuestionBankQuestion, setNewJob } from "../../../../store/actions/employer";

import "./index.scss";

function ChoosePublicQuestions(props) {
	const dispatch = useDispatch();
	let questionToSave = [];
	console.log('props ', props);
	const createNewQuestion = () => {
		dispatch(togglePopup([true, "createNewQuestion"]));
	};

	const handleCheckEvent = (event, question) => {
		console.log(event.target.value, question);
		if (document.getElementById(event.target.id).checked) {
			questionToSave.push(question);
		} else {

		}
	};

	const handleQuestionAdd = () => {
		console.log('data ', questionToSave)
		console.log('create');
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
	}

	return (
		<div className="choose-private-question">
			<h1>
				Choose from Public Questions
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
					{props.questionBank.map((question, i) => {
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
											// onClick={handleEdit}
											/>
											<FontAwesomeIcon
												className="action-btn delete"
												icon={faTrash}
											// id={"workExperienceDelete_" + i}
											// onClick={() => handleDelete("workExperience")}
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
																className={`fancy-toggle blue ${i === 0 ? "yes" : "no"
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
									id={"question" + i}
									onClick={(event) => handleCheckEvent(event, question)}
								/>
								<label htmlFor={"question" + i}>
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
						);
					})}
				</ul>
				<div className="cta">
					<button className="primary-btn" onClick={() => handleQuestionAdd()}>Add</button>
				</div>
			</div>
		</div>
	);
}

// export default ChoosePublicQuestions;


function mapStateToProps(state) {
	return {
		questionBank: state.employerReducer.questionBank.data.public_question_bank
	}
}

// export default JobSpecificQuestions;
export default connect(mapStateToProps)(ChoosePublicQuestions);
