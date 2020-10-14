import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

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
import { fetchCandidateDetails } from "../../../../modals/candidateProfile/thunk";
import { findIndex } from "../Questions/index";

function Application({ onchange }) {
	const dispatch = useDispatch();

	const userData = useSelector((state) => state.candidateSetDataReducer.data);

	const handleClick = () => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "jobApplied"]));
	};

	const handleFieldChange = (type, q, a) => {
		let i = findIndex(formData[type], q);
		let _formData = { ...formData };

		if (Array.isArray(a)) {
			let index = _formData[type][i]["answer"].indexOf(a[0]);
			if (index > -1) {
				_formData[type][i]["answer"].splice(index, 1);
			} else {
				_formData[type][i]["answer"].push(a[0]);
			}
		} else if (typeof a === "object") {
			if (a.sub_question_id_2) {
				let index = findIndex(formData[type][i].answer, a.sub_question_id_2);
				_formData[type][i]["answer"][index].sub_answer = a.sub_answer;
			} else if (a.sub_answer) {
				_formData[type][i]["sub_answer"] = a.sub_answer;
			} else if (a.sub_question_id) {
				let obj = {
					sub_question_id: a.sub_question_id,
					sub_answer: null,
				};

				let index = findIndex(formData[type][i].answer, a.sub_question_id);
				if (index > -1) {
					_formData[type][i]["answer"].splice(index, 1);
				} else {
					_formData[type][i]["answer"].push(obj);
				}
			} else if (a.address) {
				_formData[type][i]["answer"][a.address] = a.value;
			}
		} else {
			_formData[type][i]["answer"] = a;
		}

		setFormData(_formData);
	};

	const _formData = {
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

	const [formData, setFormData] = React.useState(_formData);

	React.useEffect(() => {
		dispatch(fetchCandidateDetails());
	}, []);

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
								<Link to="/">{"marryjane_cv.pdf"}</Link>
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
							<p>First Name : {userData.first_name}</p>
							<p>Last Name : {userData.last_name}</p>
							<p>Current employment status : Employed</p>
							<p>
								How long would you begin a new role? :{" "}
								{userData.available_within}
							</p>
							{/* <p>
								Are you interested in a different function and industry? : Yes
							</p>
							<p>Empathy : 35</p>
							<p>Patient : 80 </p> */}
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
							{userData &&
								userData.work_experience &&
								userData.work_experience.length > 1
								? userData.work_experience.map((exp, index) => {
									return (
										<div className="details" key={index}>
											<h2>{exp.title}</h2>
											<p>
												<span className="text">{exp.location}</span>
											</p>
											<p>
												<span className="heading">{exp.employment_from}</span>
												{" to "}
												<span className="text">{exp.employment_to}</span>
											</p>
											<p>
												<span className="heading">
													Current employment status:{" "}
												</span>
												<span className="text">Employed</span>
											</p>
											<p>
												<span className="heading">Skills: </span>
												<span className="text">{exp.job_description}</span>
											</p>
										</div>
									);
								})
								: ""}
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

						{userData &&
							userData.education_experience &&
							userData.education_experience.length > 1
							? userData.education_experience.map((exp, index) => {
								return (
									<div className="bottom">
										<div className="details">
											<h2>{exp.title}</h2>
											<p>
												<span className="heading">{exp.title}</span>
												{" - "}
												<span className="text">ABC University</span>
											</p>
											<p>
												<span className="text">{exp.attended_from}</span>
												{" to "}
												<span className="text">{exp.attended_till}</span>
											</p>
										</div>
									</div>
								);
							})
							: ""}

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
					{/* <div className="group ">
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
					</div> */}
				</div>
			</div>

			<Accordion title="General Questions">
				<GeneralQuestions
					noHeading
					data={formData.general_questions}
					onchange={(q, a) => handleFieldChange("general_questions", q, a)}
				/>
			</Accordion>
			<Accordion title="Personality Assessment">
				<PersonalityAssessment
					noHeading
					data={formData.personality_assessment}
					onchange={(q, a) => handleFieldChange("personality_assessment", q, a)}
				/>
			</Accordion>
			<Accordion title="Coursework">
				<CourseWork
					noHeading
					data={formData.coursework}
					onchange={(q, a) => handleFieldChange("coursework", q, a)}
				/>
			</Accordion>
			<Accordion title="Work History" type="addEducation">
				<WorkHistory
					noHeading
					data={formData.work_history}
					onchange={(q, a) => handleFieldChange("work_history", q, a)}
				/>
			</Accordion>
			<Accordion title="Commute" type="addEducation">
				<CommuteQuestions
					noHeading
					data={formData.commute}
					onchange={(q, a) => handleFieldChange("commute", q, a)}
				/>
			</Accordion>
			<Accordion title="Employer Questions" type="addEducation">
				<EmployerQuestions
					noHeading
					data={formData.employer_questions}
					onchange={(q, a) => handleFieldChange("employer_questions", q, a)}
				/>
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
