import React from "react";

import "./index.scss";

function CreateNewQuestion() {
	return (
		<div className="create-new-question">
			<h1>Create New Question</h1>
			<div className="content">
				<ul>
					<li>
						<label htmlFor="questionForJobTitle">Question for Job Title</label>
						<input type="text" id="questionForJobTitle" />
					</li>
					<li>
						<label htmlFor="question">
							Question <span>*</span>
						</label>
						<input type="text" id="question" />
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
								/>
								<label htmlFor="freeText">
									<span className="input"></span>Free Text
								</label>
								<input
									name="answerType"
									className="fancy-toggle"
									type="radio"
									id="multipleChoice"
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
					<button className="primary-btn">Add</button>
				</div>
			</div>
		</div>
	);
}

export default CreateNewQuestion;
