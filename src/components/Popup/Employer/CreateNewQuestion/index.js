import React, { useEffect, useState } from "react";
import { createQuestion } from "../../../../store/thunks/employer";
import { useDispatch } from "react-redux";
import { togglePopup } from "../../../../store/actions/popup_overlay";

import "./index.scss";

function CreateNewQuestion(props) {
	const [jobTitle, setJobTitle] = useState(() => {
		if (props.action === "edit") {
			return props.data.job_title;
		} else {
			return "";
		}
	});
	const [questionName, setQuestionName] = useState(() => {
		if (props.action === "edit") {
			return props.data.question_name;
		} else {
			return "";
		}
	});
	const [questionType, setQuestionType] = useState(() => {
		if (props.action === "edit") {
			return props.data.question_type;
		} else {
			return "text-input";
		}
	});

	const [publicReview, setPublicReview] = useState(() => {
		if (props.action === "edit") {
			return true;
		} else {
			return true;
		}
	});

	const [optionChoiceName, setOptionChoiceName] = useState(() => {
		if (props.action === "edit") {
			return props.data.option_choices;
		} else {
			return [
				{
					option_choice_name: "",
					question_type: "boolean",
				},
				{
					option_choice_name: "",
					question_type: "boolean",
				},
			];
		}
	});
	const [optionInput, setOptionInput] = useState([""]);
	const dispatch = useDispatch();

	const [formData, setFormData] = React.useState({
		/**
		 * * field: ['value', 'error']
		 */
		_questionName: [questionName],
		// _answers: [choices],
		_answers: [optionChoiceName.map((option, i) => option.option_choice_name)],

		formValid: false,
	});

	const handleFieldChange = (field, value) => {
		let msg = value === "" || value === null ? "Required" : "";

		let arr = [];

		if (typeof field === "object") {
			arr[0] = [...formData._answers[0]];
			arr[0][field.id] = value;
			msg = "";
			if (value === "" || value === undefined) {
				msg = "Required";
			}
			arr[1] = msg;
			field = "_answers";
		} else {
			arr[0] = value;
			arr[1] = msg;
		}

		setFormData({
			...formData,
			[field]: arr,
		});
	};

	const handleQuestionAdd = () => {
		let _formData = { ...formData };
		_formData.formValid = true;

		for (var field in _formData) {
			if (Array.isArray(_formData[field][0]) && questionType === "mcq") {
				for (let i = 0; i < _formData[field][0].length; i++) {
					if (
						_formData[field][0][i] === "" ||
						_formData[field][0][i] === undefined ||
						_formData[field][0][i] === null
					) {
						_formData.formValid = false;
						if (_formData[field][1] !== "Required") {
							_formData[field][1] = "Required";
						}
					}
				}
			} else if (
				_formData.hasOwnProperty(field) &&
				field !== "formValid" &&
				(_formData[field][0] === "" ||
					_formData[field][0] === undefined ||
					_formData[field][0] === null)
			) {
				_formData[field][0] = "";
				_formData.formValid = false;
				if (_formData[field][1] !== "Required") {
					_formData[field].push("Required");
				}
			}
		}

		setFormData(_formData);

		if (!_formData.formValid) {
			return null;
		}

		let addQuestion = {};
		let optionChoiceMap = [];
		if (questionType === "mcq") {
			optionChoiceMap = optionChoiceName.map((val) => {
				if (val.option_choice_name !== "") {
					if (props.action === "edit") {
						return {
							optionChoiceName: val.option_choice_name,
							questionType: val.question_type ? val.question_type : "boolean",
							id: val.id,
							questionId: val.question_id,
						};
					} else {
						return {
							optionChoiceName: val.option_choice_name,
							questionType: props.data
								? props.data.option_choices.length !== 0
									? props.data.option_choices[0].question_type
									: "boolean"
								: "boolean",
						};
					}
				} else {
					return null;
				}
			});
			if (optionChoiceMap.length !== 0) {
				let optionChoiceMapTemp = optionChoiceMap.filter((val) => val !== null);
				addQuestion = {
					category: "Employer Questions",
					forPublicReview: props.type === "private" ? false : true,
					jobTitle: jobTitle,
					questionName: questionName,
					questionType: questionType,
					optionChoices: optionChoiceMapTemp,
				};
			} else {
				addQuestion = {
					category: "Employer Questions",
					forPublicReview: props.type === "private" ? false : true,
					jobTitle: jobTitle,
					questionName: questionName,
					questionType: questionType,
				};
			}
		} else {
			addQuestion = {
				category: "Employer Questions",
				forPublicReview: props.type === "private" ? false : true,
				jobTitle: jobTitle,
				questionName: questionName,
				questionType: questionType,
			};
		}
		if (props.action === "edit") {
			addQuestion.questionId = props.data.question_id;
			addQuestion.orgId = props.data.org_id;
			dispatch(createQuestion(addQuestion, "edit"));
		} else {
			dispatch(createQuestion(addQuestion, "create"));
		}
		if (props.type === "private") {
			setTimeout(5000);
			dispatch(togglePopup([true, "choosePrivateQuestions"]));
		} else {
			setTimeout(5000);
			dispatch(togglePopup([true, "choosePublicQuestions"]));
		}
	};

	const handleOptionChange = (i, value) => {
		let optionChoiceNameTemp = optionChoiceName.map((val) => val);
		optionChoiceNameTemp[i].option_choice_name = value;
		setOptionChoiceName(optionChoiceNameTemp);
	};

	const handleAddOption = () => {
		// let __answers = [...formData._answers[0]];
		// __answers.push("");
		// console.log("__answers...", __answers);

		let _optionChoiceName = [...optionChoiceName];
		_optionChoiceName.push({
			option_choice_name: "",
			question_type: "boolean",
		});
		setOptionChoiceName(_optionChoiceName);

		// /* update form values as well */
		// setFormData({
		// 	...formData,
		// 	_answers: __answers,
		// });
	};

	const handleOptionDelete = (i) => {
		let _optionChoiceName = [...optionChoiceName];
		_optionChoiceName.splice(i, 1);
		setOptionChoiceName(_optionChoiceName);
	};

	useEffect(() => {
		if (props.data && props.data.question_type === "mcq") {
			document.getElementById("multipleChoice").checked = true;
		}
	}, [props.data]);

	useEffect(() => {
		let __answers = [...formData._answers];
		let inputs = document.querySelectorAll(".choices input");

		let a = [];
		for (let i = 0; i < optionChoiceName.length; i++) {
			if (__answers[0][i] !== "") {
				a[i] = inputs[i].value;
			} else {
				a[i] = "";
			}
		}
		__answers[0] = a;
		__answers[1] = "";

		setFormData({
			...formData,
			_answers: __answers,
		});
	}, [optionChoiceName.length]);

	const handleCheckEvent = (event, question) => {
		if (document.getElementById(event.target.id).checked) {
		}
	};

	return (
		<div className="create-new-question">
			<h1>
				{props.action === "edit" ? "Update Question" : "Create New Question"}
			</h1>
			<div className="content">
				{/* {props.type === "private" &&
					<div className="answer-block mb-20">
						<div className="answer-type">
							<input
								name="publicReview"
								className="fancy-toggle"
								type="checkbox"
								id="publicReview"
								defaultChecked
								onClick={(event) => handleCheckEvent(event)}
							/>
							<label htmlFor="publicReview">
								<span className="input"></span>Request for public review
							</label>
						</div>
					</div>
				} */}
				<ul>
					<li>
						<label htmlFor="questionForJobTitle">Job Title</label>
						<input
							type="text"
							id="questionForJobTitle"
							value={jobTitle}
							onChange={(e) => setJobTitle(e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="question">
							Question <span style={{ color: "red" }}>*</span>
							<span
								className={`error-text ${
									!formData._questionName[1] && "hidden"
								}`}
							>
								Required
							</span>
						</label>
						<input
							type="text"
							id="_questionName"
							value={questionName}
							onChange={(e) => {
								handleFieldChange("_questionName", e.target.value);
								setQuestionName(e.target.value);
							}}
						/>
					</li>
					<li>
						<div className="answer-block">
							<h3>
								Answers
								{questionType === "mcq" && (
									<>
										<span style={{ color: "red" }}> *</span>
										<span
											className={`error-text ${
												!formData._answers[1] && "hidden"
											}`}
										>
											Required
										</span>
									</>
								)}
							</h3>
							<div
								className={`answer-type ${
									props.action === "edit" ? "hidden" : ""
								}`}
							>
								<input
									name="answerType"
									className="fancy-toggle"
									type="radio"
									id="freeText"
									defaultChecked
									onChange={() => setQuestionType("text-input")}
								/>
								<label htmlFor="freeText">
									<span className="input"></span>Free Text
								</label>
								<input
									name="answerType"
									className="fancy-toggle"
									type="radio"
									id="multipleChoice"
									onChange={() => setQuestionType("mcq")}
								/>
								<label htmlFor="multipleChoice">
									<span className="input"></span>Multiple Choice
								</label>
							</div>
						</div>

						{questionType === "mcq" ? (
							<>
								<button className="add" onClick={handleAddOption}>
									Add Option
								</button>
								<ul className="brdr-none choices">
									{optionChoiceName.map((choice, i) => {
										return (
											<li key={i}>
												<input
													type="text"
													value={choice.option_choice_name}
													id={i}
													onChange={(e) => {
														handleFieldChange(
															// `_answers[0][${i}]`,
															{ id: i },
															e.target.value
														);
														handleOptionChange(i, e.target.value);
													}}
												/>
												<button
													tabIndex="-1"
													className={`delete ${
														optionChoiceName.length <= 2 ? "hidden" : ""
													}`}
													onClick={() => handleOptionDelete(i)}
												></button>
											</li>
										);
									})}
								</ul>
							</>
						) : (
							<ul>
								<input
									type="text"
									value={optionInput}
									placeholder="Candidate's answer"
									disabled
									onChange={(e) => setOptionInput(e.target.value)}
								/>
							</ul>
						)}
					</li>
				</ul>
				<div className="cta">
					<button
						className="primary-btn blue"
						onClick={() => handleQuestionAdd()}
					>
						{props.action === "edit" ? "Save" : "Add"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default CreateNewQuestion;
