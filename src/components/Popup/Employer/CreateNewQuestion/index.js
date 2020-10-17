import React, { useEffect, useState } from "react";
import { createQuestion } from "../../../../store/thunks/employer";
import { useDispatch } from "react-redux";
import { togglePopup } from "../../../../store/actions/popup_overlay";

import "./index.scss";

function CreateNewQuestion(props) {
	const [jobTitle, setJobTitle] = useState(() => {
		if(props.action === "edit") {
			return props.data.job_title;
		} else {
			return "";
		}
	});
	const [questionName, setQuestionName] = useState(() => {
		if(props.action === "edit") {
			return props.data.question_name;
		} else {
			return "";
		}
	});
	const [questionType, setQuestionType] = useState(() => {
		if(props.action === "edit") {
			return props.data.question_type;
		} else {
			return "text-input";
		}
	});
	const [optionChoiceName, setOptionChoiceName] = useState(() => {
		if(props.action === "edit") {
			return props.data.option_choices;
		} else {
			return [{
				option_choice_name : "",
				question_type: "boolean"
			}];
		}
	});
	const [optionInput, setOptionInput] = useState([""]);
	const dispatch = useDispatch();

	const handleQuestionAdd = () => {
		console.log("create");
		let addQuestion = {};
		let optionChoiceMap = [];
		if (questionType === "mcq") {
			optionChoiceMap = optionChoiceName.map((val) => {
				if (val.option_choice_name !== "") {
					if(props.action === "edit") {
						return {
							optionChoiceName: val.option_choice_name,
							questionType: val.question_type ? val.question_type : "boolean",
							id: val.id,
							questionId: val.question_id
					}
					} else {
						return {
							optionChoiceName: val.option_choice_name,
							questionType: props.data ? ( props.data.option_choices.length !== 0 ? props.data.option_choices[0].question_type : "boolean") : "boolean"
					}
					};
				} else {
					return null;
				}
			});
			if (optionChoiceMap.length !== 0) {
				let optionChoiceMapTemp = optionChoiceMap.filter((val) => val !== null);
				addQuestion = {
					category: "Employer Questions",
					forPublicReview: true,
					jobTitle: jobTitle,
					questionName: questionName,
					questionType: questionType,
					optionChoices: optionChoiceMapTemp,
				};
			} else {
				addQuestion = {
					category: "Employer Questions",
					forPublicReview: true,
					jobTitle: jobTitle,
					questionName: questionName,
					questionType: questionType,
				};
			}
		} else {
			addQuestion = {
				category: "Employer Questions",
				forPublicReview: true,
				jobTitle: jobTitle,
				questionName: questionName,
				questionType: questionType,
			};
		}
		if(props.action === "edit"){
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
		let _optionChoiceName = [...optionChoiceName];
		_optionChoiceName.push({
			option_choice_name : "",
			question_type: "boolean"
		});
		setOptionChoiceName(_optionChoiceName);
	};

	const handleOptionDelete = (i) => {
		let _optionChoiceName = [...optionChoiceName];
		_optionChoiceName.splice(i, 1);
		setOptionChoiceName(_optionChoiceName);
	};

	useEffect(() => {
		// console.log(optionChoiceName);

		// return () => {
			// cleanup
		// };
		if(props.data && props.data.question_type === "mcq") {
			document.getElementById("multipleChoice").checked = true;
		}
	}, [props.data]);

	return (
		<div className="create-new-question">
			<h1>Create New Question</h1>
			<div className="content">
				<ul>
					<li>
						<label htmlFor="questionForJobTitle">Question for Job Title</label>
						<input
							type="text"
							id="questionForJobTitle"
							value={jobTitle}
							onChange={(e) => setJobTitle(e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="question">
							Question <span>*</span>
						</label>
						<input
							type="text"
							id="question"
							value={questionName}
							onChange={(e) => setQuestionName(e.target.value)}
						/>
					</li>
					<li>
						<div className="answer-block">
							<h3>
								Answers <span>*</span>
							</h3>
							<div className="answer-type">
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
								<ul>
									{optionChoiceName.map((choice, i) => {
										return (
											<li key={i}>
												<input
													type="text"
													value={choice.option_choice_name}
													id={i}
													onChange={(e) =>
														handleOptionChange(i, e.target.value)
													}
												/>
												<button
													className="delete"
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
						Add
					</button>
				</div>
			</div>
		</div>
	);
}

export default CreateNewQuestion;
