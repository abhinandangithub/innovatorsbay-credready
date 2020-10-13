import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

import "./index.scss";
import Accordion from "../../../_Elements/Accordion";
import GeneralQuestions from "../../../Candidate/Jobs/Questions/GeneralQuestions";
import PersonalityAssessment from "../../../Candidate/Jobs/Questions/PersonalityAssessment";
import CourseWork from "../../../Candidate/Jobs/Questions/CourseWork";
import WorkHistory from "../../../Candidate/Jobs/Questions/WorkHistory";
import CommuteQuestions from "../../../Candidate/Jobs/Questions/CommuteQuestions";
import EmployerQuestions from "../../../Candidate/Jobs/Questions/EmployerQuestions";
import {
	togglePopup,
	toggleOverlay,
} from "../../../../store/actions/popup_overlay";

function Application() {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "jobApplied"]));
	};

	const formData = {
		job_id: 1,
		general_questions: [
			{
				question_id: 1,
				answer: "10/20/90",
			},

			{
				question_id: 2,
				answer: 1,
			},

			{
				question_id: 3,
				answer: 1,
			},

			{
				question_id: 4,
				answer: 2,
			},

			{
				question_id: 5,
				answer: 2,
			},

			{
				question_id: 6,
				answer: 2,
				sub_answer: 2,
				followup_sub_answer: "10/20/90",
			},
		],

		personality_assessment: [
			{
				question_id: 1,
				answer: 1,
			},

			{
				question_id: 2,
				answer: 3,
			},

			{
				question_id: 3,
				answer: 5,
			},

			{
				question_id: 4,
				answer: 2,
			},

			{
				question_id: 5,
				answer: 3,
			},

			{
				question_id: 6,
				answer: 1,
			},

			{
				question_id: 7,
				answer: 4,
			},

			{
				question_id: 8,
				answer: 1,
			},

			{
				question_id: 9,
				answer: 3,
			},

			{
				question_id: 10,
				answer: 2,
			},

			{
				question_id: 11,
				answer: 1,
			},

			{
				question_id: 12,
				answer: 4,
			},

			{
				question_id: 13,
				answer: 5,
			},

			{
				question_id: 14,
				answer: 2,
			},

			{
				question_id: 15,
				answer: 3,
			},

			{
				question_id: 16,
				answer: 4,
			},
		],

		coursework: [
			{
				question_id: 1,
				answer: 1,
			},

			{
				question_id: 2,
				answer: [
					{
						sub_question_id: 1,
						sub_answer: 2,
					},
					{
						sub_question_id: 3,
						sub_answer: 2,
					},
				],
			},

			{
				question_id: 3,
				answer: 1,
			},

			{
				question_id: 4,
				answer: [
					{
						sub_question_id: 1,
						sub_answer: 4,
					},
					{
						sub_question_id: 3,
						sub_answer: 4,
					},
				],
			},

			{
				question_id: 5,
				answer: 1,
			},
		],

		work_history: [
			{
				question_id: 1,
				answer: 3,
			},
			{
				question_id: 2,
				answer: 7,
			},
			{
				question_id: 3,
				answer: "09/10/18",
			},
			{
				question_id: 4,
				answer: 1,
			},
		],

		commute: [
			{
				question_id: 1,
				answer: "Warren, NJ",
			},
			{
				question_id: 2,
				answer: 1,
			},
			{
				question_id: 3,
				answer: {
					street_0: "street",
					city_0: "city",
					state_0: "state",
					zipCode_0: "zipcode",
				},
			},
		],

		employer_questions: [
			{
				question_id: 1,
				answer: [1],
			},
			{
				question_id: 2,
				answer: 2,
			},
			{
				question_id: 3,
				answer: [1, 4],
			},
			{
				question_id: 4,
				answer: 2,
			},
		],
	};

	return (
		<div className="application_page">
			<div className="heading">
				<h2>Preview</h2>
			</div>
			<div className="preview_info">
				<div className="content">
					<div className="group">
						<div className="top">
							<h1>
								Resume
								<FontAwesomeIcon
									className="edit edit-2"
									icon={faPen}
									onClick={() => alert(`Editing`)}
								/>
							</h1>
							<FontAwesomeIcon
								className="action-btn edit"
								icon={faPen}
								onClick={() => alert(`Editing`)}
							/>
							<FontAwesomeIcon
								className="action-btn delete"
								icon={faTrash}
								onClick={() => alert(`Deleting`)}
							/>
						</div>
						<div className="bottom">
							<p>
								<Link to="/">marryjane_cv.pdf</Link>
							</p>
						</div>
					</div>
					<div className="group">
						<div className="top">
							<h1>
								Personal Details
								<FontAwesomeIcon
									className="edit edit-2"
									icon={faPen}
									onClick={() => alert(`Editing`)}
								/>
							</h1>
							<FontAwesomeIcon
								className="action-btn edit"
								icon={faPen}
								onClick={() => alert(`Editing`)}
							/>
							<FontAwesomeIcon
								className="action-btn delete"
								icon={faTrash}
								onClick={() => alert(`Deleting`)}
							/>
						</div>
						<div className="bottom">
							<p>First Name : Marry</p>
							<p>Last Name : Jane</p>
							<p>Current employment status : Employed</p>
							<p>How long would you begin a new role? : 6 Months</p>
							<p>
								Are you interested in a different function and industry? : Yes
							</p>
							<p>Empathy : 35</p>
							<p>Patient : 80 </p>
						</div>
					</div>
					<div className="group">
						<div className="top">
							<h1>
								Experience
								<FontAwesomeIcon
									className="edit edit-2"
									icon={faPen}
									onClick={() => alert(`Editing`)}
								/>
							</h1>
							<FontAwesomeIcon
								className="action-btn edit"
								icon={faPen}
								onClick={() => alert(`Editing`)}
							/>
							<FontAwesomeIcon
								className="action-btn delete"
								icon={faTrash}
								onClick={() => alert(`Deleting`)}
							/>
						</div>
						<div className="bottom">
							<div className="details">
								<h2>Certified Nursing Assistant</h2>
								<p>
									<span className="heading">ABC Staffing Company</span>
									{" - "}
									<span className="text">New York</span>
								</p>
								<p>
									<span className="heading">March 2012</span>
									{" to "}
									<span className="text">Present</span>
								</p>
								<p>
									<span className="heading">Current employment status: </span>
									<span className="text">Employed</span>
								</p>
								<p>
									<span className="heading">Skills: </span>
									<span className="text">
										Patient Care & Safety, Medical Terminology, Electronic
										Medical Records, Diagnostic Testing, Vital Signs & Patient
										Monitoring, Medication Administration, Patient Advocacy and
										Support.
									</span>
								</p>
							</div>
							<div className="details">
								<h2>Certified Nursing Assistant</h2>
								<p>
									<span className="heading">ABC Staffing Company</span>
									{" - "}
									<span className="text">New York</span>
								</p>
								<p>
									<span className="heading">March 2012</span>
									{" to "}
									<span className="text">Present</span>
								</p>
								<p>
									<span className="heading">Current employment status: </span>
									<span className="text">Employed</span>
								</p>
								<p>
									<span className="heading">Skills: </span>
									<span className="text">
										Patient Care & Safety, Medical Terminology, Electronic
										Medical Records, Diagnostic Testing, Vital Signs & Patient
										Monitoring, Medication Administration, Patient Advocacy and
										Support.
									</span>
								</p>
							</div>
						</div>
					</div>
					<div className="group ">
						<div className="top">
							<h1>
								Education
								<FontAwesomeIcon
									className="edit edit-2"
									icon={faPen}
									onClick={() => alert(`Editing`)}
								/>
							</h1>
							<FontAwesomeIcon
								className="action-btn edit"
								icon={faPen}
								onClick={() => alert(`Editing`)}
							/>
							<FontAwesomeIcon
								className="action-btn delete"
								icon={faTrash}
								onClick={() => alert(`Deleting`)}
							/>
						</div>
						<div className="bottom">
							<div className="details">
								<h2>ABC School, Sometown, CT</h2>
								<p>
									<span className="heading">Nurse’s Aide Program:</span>
									{" - "}
									<span className="text">ABC University</span>
								</p>
								<p>
									<span className="text">FROM 2010</span>
									{" to "}
									<span className="text">1012</span>
								</p>
							</div>
						</div>
					</div>
					<div className="group ">
						<div className="top">
							<h1>
								Certifications
								<FontAwesomeIcon
									className="edit edit-2"
									icon={faPen}
									onClick={() => alert(`Editing`)}
								/>
							</h1>
							<FontAwesomeIcon
								className="action-btn edit"
								icon={faPen}
								onClick={() => alert(`Editing`)}
							/>
							<FontAwesomeIcon
								className="action-btn delete"
								icon={faTrash}
								onClick={() => alert(`Deleting`)}
							/>
						</div>
						<div className="bottom">
							<div className="details">
								<h2>GHI Nursing Certificate</h2>
								<p>
									<span className="heading">Description: </span>
									{" - "}
									<span className="text">
										Patient Care & Safety, Medical Terminology, Electronic
										Medical Records, Diagnostic Testing, Vital Signs & Patient
										Monitoring, Medication Administration, Patient Advocacy and
										Support.
									</span>
								</p>
								<p>
									<span className="heading">Issued Date: </span>
									{" to "}
									<span className="text">2014</span>
								</p>
								<p>
									<span className="heading">Certificate link: </span>
									<span className="text">
										<Link to="/">
											https://www.certificatelink.com/certi.pdf
										</Link>
									</span>
								</p>
								<p>
									<span className="heading">Certificate Image: </span>
									<span className="text">Image here</span>
								</p>
							</div>
							<div className="details">
								<h2>GHI Nursing Certificate</h2>
								<p>
									<span className="heading">Description: </span>
									{" - "}
									<span className="text">
										Patient Care & Safety, Medical Terminology, Electronic
										Medical Records, Diagnostic Testing, Vital Signs & Patient
										Monitoring, Medication Administration, Patient Advocacy and
										Support.
									</span>
								</p>
								<p>
									<span className="heading">Issued Date: </span>
									{" to "}
									<span className="text">2014</span>
								</p>
								<p>
									<span className="heading">Certificate link: </span>
									<span className="text">
										<Link to="/">
											https://www.certificatelink.com/certi.pdf
										</Link>
									</span>
								</p>
								<p>
									<span className="heading">Certificate Image: </span>
									<span className="text">Image here</span>
								</p>
							</div>
						</div>
					</div>
					<div className="group ">
						<div className="top">
							<h1>
								Strengths
								<FontAwesomeIcon
									className="edit edit-2"
									icon={faPen}
									onClick={() => alert(`Editing`)}
								/>
							</h1>
							<FontAwesomeIcon
								className="action-btn edit"
								icon={faPen}
								onClick={() => alert(`Editing`)}
							/>
							<FontAwesomeIcon
								className="action-btn delete"
								icon={faTrash}
								onClick={() => alert(`Deleting`)}
							/>
						</div>
						<div className="bottom">
							<div className="details">
								<h2>Communication</h2>
								<p>
									<span className="heading">Typing: </span>
									{" - "}
									<span className="text">80% Mastery, 7 Years</span>
								</p>
								<p>
									<span className="heading">Customer Support: </span>
									{" to "}
									<span className="text">70% Mastery, 4 Years</span>
								</p>
								<p>
									<span className="heading">Patient: </span>
									<span className="text">40% Patience, 2 Years</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Accordion title="General Questions">
				<GeneralQuestions noHeading data={formData.general_questions} />
			</Accordion>
			<Accordion title="Personality Assessment">
				<PersonalityAssessment
					noHeading
					data={formData.personality_assessment}
				/>
			</Accordion>
			<Accordion title="Coursework">
				<CourseWork noHeading data={formData.coursework} />
			</Accordion>
			<Accordion title="Work History" type="addEducation">
				<WorkHistory noHeading data={formData.work_history} />
			</Accordion>
			<Accordion title="Commute" type="addEducation">
				<CommuteQuestions noHeading data={formData.commute} />
			</Accordion>
			<Accordion title="Employer Questions" type="addEducation">
				<EmployerQuestions noHeading data={formData.employer_questions} />
			</Accordion>

			<div className="cta">
				<button className="primary-btn blue" onClick={handleClick}>
					Apply
				</button>
			</div>
		</div>
	);
}

export default Application;
