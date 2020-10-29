import React from "react";

import "./index.scss";
import Input from "../../../_Elements/Input";

function JobSpecificQuestions({ questions }) {
	console.log('questions ', questions);
	return (
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
															className={`fancy-toggle blue ${
																i === 0 ? "yes" : "yes"
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

			{/* <h1 className="heading">Job Specific Questions</h1>
			<ul className="general-questions">
				<li className="general-question">
					<h2 className="question">Location?</h2>
					<div className="options">
						<input type="text" className="input_full" />
					</div>
				</li>
				<li className="general-question">
					<h2 className="question">Acceptable Shifts?</h2>

					<div className="options">
						<input
							className="fancy-toggle blue"
							name="cna"
							type="checkbox"
							id="7-3"
						/>
						<label htmlFor="7-3">
							<span className="input"></span>7am – 3pm
						</label>
						<input
							className="fancy-toggle blue "
							name="cna"
							type="checkbox"
							id="3-11"
						/>
						<label htmlFor="3-11">
							<span className="input"></span>3pm – 11pm
						</label>
						<input
							className="fancy-toggle blue"
							name="cna"
							type="checkbox"
							id="11-3"
						/>
						<label htmlFor="11-3">
							<span className="input"></span>11pm - 3am
						</label>
					</div>
				</li>
				<li className="general-question">
					<h2 className="question">Verbal English Fluency?</h2>
					<div className="options">
						<input
							className="fancy-toggle blue"
							name="cna"
							type="checkbox"
							id="Limited"
						/>
						<label htmlFor="Limited">
							<span className="input"></span>Limited
						</label>
						<input
							className="fancy-toggle blue"
							name="cna"
							type="checkbox"
							id="Working"
						/>
						<label htmlFor="Working">
							<span className="input"></span>Working
						</label>
						<input
							className="fancy-toggle blue"
							name="cna"
							type="checkbox"
							id="Fluent"
						/>
						<label htmlFor="Fluent">
							<span className="input"></span>Fluent
						</label>
						<input
							className="fancy-toggle blue"
							name="cna"
							type="checkbox"
							id="Native"
						/>
						<label htmlFor="Native">
							<span className="input"></span>Native
						</label>
					</div>
				</li>
				<li className="general-question">
					<h2 className="question">Certifications?</h2>
					<div className="options">
						<input
							className="block-toggle blue"
							id="cert1"
							name="cert"
							type="checkbox"
						/>
						<label htmlFor="cert1">Certified Nursing Assistant</label>
						<input
							className="block-toggle blue"
							id="cert2"
							name="cert"
							defaultChecked
							type="checkbox"
						/>
						<label htmlFor="cert2">Home Health Aid</label>
						<input
							className="block-toggle blue"
							id="cert3"
							name="cert"
							type="checkbox"
						/>
						<label htmlFor="cert3">Certified Nursing Aid</label>
						<input
							className="block-toggle blue"
							id="cert4"
							name="cert"
							type="checkbox"
						/>
						<label htmlFor="cert4">Other</label>
					</div>
				</li>
				<li className="general-question">
					<h2 className="question">Years of CNA experience?</h2>
					<div className="options">
						<input
							className="fancy-toggle blue"
							name="cna"
							type="checkbox"
							id="0"
						/>
						<label htmlFor="0">
							<span className="input"></span>0
						</label>
						<input
							className="fancy-toggle blue"
							name="cna"
							type="checkbox"
							id="1"
						/>
						<label htmlFor="1">
							<span className="input"></span>1
						</label>
						<input
							className="fancy-toggle blue"
							name="cna"
							type="checkbox"
							id="2"
						/>
						<label htmlFor="2">
							<span className="input"></span>2
						</label>
						<input
							className="fancy-toggle blue"
							name="cna"
							type="checkbox"
							id="3+"
						/>
						<label htmlFor="3+">
							<span className="input"></span>3+
						</label>
					</div>
				</li>
				<li className="general-question">
					<h2 className="question">Education</h2>
					<div className="options">
						<input
							className="block-toggle blue"
							id="edu1"
							name="edu"
							type="checkbox"
							defaultChecked
						/>
						<label htmlFor="edu1">High School Diploma</label>
						<input
							className="block-toggle blue"
							id="edu2"
							name="edu"
							type="checkbox"
						/>
						<label htmlFor="edu2">College Degree</label>
					</div>
				</li>
				<li className="general-question">
					<h2 className="question">
						Do you understand that these are some of the tasks you will perform
						as a CNA?
					</h2>
					<ul className="question_info">
						<li>Changing diapers</li>
						<li>Cleaning beds</li>
						<li>Mealtime cleanup</li>
					</ul>
					<div className="options">
						<input
							className="fancy-toggle blue radio"
							id="yes1"
							name="interestedIn1"
							type="radio"
						/>
						<label htmlFor="yes1">
							<span className="input"></span>Yes
						</label>
						<input
							className="fancy-toggle blue no radio"
							id="no1"
							name="interestedIn1"
							type="radio"
							defaultChecked
						/>
						<label htmlFor="no1">
							<span className="input"></span>No
						</label>
					</div>
				</li>
				<li className="general-question">
					<h2 className="question">
						The posted wage is $13.50 per hour. This may increase with
						experience. Do you understand this wage expectation?
					</h2>
					<div className="options">
						<input
							className="fancy-toggle blue radio"
							id="yes"
							name="interestedIn"
							defaultChecked
							type="radio"
						/>
						<label htmlFor="yes">
							<span className="input"></span>Yes
						</label>
						<input
							className="fancy-toggle blue no radio"
							id="no"
							name="interestedIn"
							type="radio"
						/>
						<label htmlFor="no">
							<span className="input"></span>No
						</label>
					</div>
				</li>
			</ul>
			<div className="cta">
				<button className="primary-btn">Submit</button>
			</div> */}
		</div>
	);
}

export default JobSpecificQuestions;
