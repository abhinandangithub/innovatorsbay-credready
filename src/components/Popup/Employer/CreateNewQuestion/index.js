import React, { useState } from "react";
import { createQuestion } from '../../../../store/thunks/employer';
import { useDispatch } from "react-redux";
import { togglePopup, toggleOverlay } from "../../../../store/actions/popup_overlay";

import "./index.scss";

function CreateNewQuestion() {
	const [jobTitle, setJobTitle] = useState("");
	const [questionName, setQuestionName] = useState("");
	const [questionType, setQuestionType] = useState("");
	const dispatch = useDispatch();

	const handleQuestionAdd = () => {
		console.log("create");
		dispatch(createQuestion({
			"category": "Employer Questions",
			"forPublicReview": true,
			"jobTitle": jobTitle,
			"questionName": questionName,
			"questionType": questionType
		}));
		dispatch(toggleOverlay(false));
		dispatch(togglePopup([false, "createNewQuestion"]));
	}

	return (
		<div className="create-new-question">
			<h1>Create New Question</h1>
			<div className="content">
				<ul>
					<li>
						<label htmlFor="questionForJobTitle">Question for Job Title</label>
						<input type="text" id="questionForJobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}/>
					</li>
					<li>
						<label htmlFor="question">
							Question <span>*</span>
						</label>
						<input type="text" id="question" value={questionName} onChange={(e) => setQuestionName(e.target.value)}/>
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
						<button className="add">Add Option</button>
						<ul>
							<li>
								<input type="text" />
								<button className="delete"></button>
							</li>
							<li>
								<input type="text" />
								<button className="delete"></button>
							</li>
							<li>
								<input type="text" />
								<button className="delete"></button>
							</li>
						</ul>
					</li>
				</ul>
				<div className="cta">
					<button className="primary-btn" onClick={() => handleQuestionAdd()}>Add</button>
				</div>
			</div>
		</div>
	);
}

export default CreateNewQuestion;
