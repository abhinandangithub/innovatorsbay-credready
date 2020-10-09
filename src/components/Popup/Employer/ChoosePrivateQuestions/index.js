import React from "react";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { togglePopup } from "../../../../store/actions/popup_overlay";

import "./index.scss";

function ChoosePrivateQuestions() {
	const dispatch = useDispatch();

	const createNewQuestion = () => {
		dispatch(togglePopup([true, "createNewQuestion"]));
	};

	return (
		<div className="choose-private-question">
			<h1>
				Choose from Private Questions
				<button class="common-heading-btn" onClick={createNewQuestion}>
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
					<button className="primary-btn">Add</button>
				</div>
			</div>
		</div>
	);
}

export default ChoosePrivateQuestions;
