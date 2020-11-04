import React from "react";

import "./index.scss";
import Input from "../../../_Elements/Input";

function JobSpecificQuestions({ questions }) {
	return (
		questions && questions.length ?
			<div className="job-specefic-questions">
				<h1 className="heading">Job Specific Questions</h1>
				<ul className="general-questions">
					{questions.map((question, i) => {
						return (
							<li className="general-question" key={i}>
								<h2 className="question">{question.question_name}</h2>
								<div className="options">
									{question.question_type === "text-input" ? (
										<Input type="text" value={question.candidate_answer && question.candidate_answer.ans_text} />
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
																checked={question.candidate_answer && question.candidate_answer.ans_option_choice.find(val => val - 1 === i) ? true : false}
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
																className={`fancy-toggle blue ${i === 0 ? "yes" : "yes"
																	}`}
																id={`${option.id}${option.question_id}`}
																name={`${option.question_id}`}
																type="radio"
																checked={question.candidate_answer && question.candidate_answer.ans_option_choice.find(val => val - 1 === i) ? true : false}
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
			</div> : ""
	);
}

export default JobSpecificQuestions;
