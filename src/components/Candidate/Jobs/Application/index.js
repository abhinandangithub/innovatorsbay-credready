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
import {
	fetchAllCertificateTitles,
	fetchCandidateDetails,
	jobApply,
	fetchJobDescription,
	fetchAllAnswers,
	fetchCandidateDegreeTitles,
} from "../../../../modals/candidateProfile/thunk";
import { findIndex } from "../Questions/index";
import { findIndexOfObjInArr } from "../../../../assets/js/Utility";

function Application(props) {
	const dispatch = useDispatch();
	const jobData = useSelector((state) =>
		state.setJobDescriptionReducer.data
			? state.setJobDescriptionReducer.data
			: []
	);
	const userData = useSelector((state) => state.candidateSetDataReducer.data);
	const allCertificates = useSelector(
		(state) => state.setCandidateCertificateTitlesReducer.data
	);
	const allDegress = useSelector(
		(state) => state.setCandidateDegreeTitlesReducer.data
	);


	const [allAnswersData, setAllAnswersData] = React.useState(useSelector(
		(state) => state.setCandidateAllAnswersReducer.data
	))
	let heights = [0];
	const [activeTab, setActiveTab] = React.useState(0);

	const scrollBar = React.useRef();

	const handleScroll = (i) => {
		setActiveTab(i);
		let scrollTo = heights[i] + i * 30;
		scrollBar.current.view.scroll({
			top: scrollTo,
			behavior: "smooth",
		});
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

	const empQuestions = jobData.questions ? jobData.questions : [];

	const empQuestionFormat =
		empQuestions &&
		empQuestions.map((entity) => {
			console.log("enityt.question_type", entity.question_type)
			if (entity.question_type === "text-input") {
				return {
					question_id: entity.question_id,
					answer: "",
				};
			}
			if (entity.question_type === "mcq") {
				return {
					question_id: entity.question_id,
					answer: ""
				};
			}
		});

	const fetchAnswers = (type) => {
		console.log(type, allAnswersData);
		return JSON.parse(
			allAnswersData &&
			allAnswersData.length > 0 &&
			allAnswersData[findIndexOfObjInArr(allAnswersData, "category", type)]
				.answer
		);
	};

	const formDataFetched = {
		general_questions: fetchAnswers("general_questions"),
		personality_assessment: fetchAnswers("personality_assessment"),
		coursework: fetchAnswers("coursework"),
		workHistory: fetchAnswers("jWorkHistory"),
		commute: fetchAnswers("commute"),
		employer_questions: empQuestionFormat,
	};

	const _formData = {
		general_questions:
			formDataFetched.general_questions.length > 0
				? formDataFetched.general_questions
				: [
					{
						question_id: 1,
						answer: "10/20/90",
					},

					{
						question_id: 2,
						answer: "",
					},

					{
						question_id: 3,
						answer: "",
					},

					{
						question_id: 4,
						answer: "",
					},

					{
						question_id: 5,
						answer: "",
					},

					{
						question_id: 6,
						answer: "",
						sub_answer: "",
						followup_sub_answer: "10/20/90",
					},
				],

		personality_assessment:
			formDataFetched.personality_assessment.length > 0
				? formDataFetched.personality_assessment
				: [
					{
						question_id: 1,
						answer: "",
					},

					{
						question_id: 2,
						answer: "",
					},

					{
						question_id: 3,
						answer: "",
					},

					{
						question_id: 4,
						answer: "",
					},

					{
						question_id: 5,
						answer: "",
					},

					{
						question_id: 6,
						answer: "",
					},

					{
						question_id: 7,
						answer: "",
					},

					{
						question_id: 8,
						answer: "",
					},

					{
						question_id: 9,
						answer: "",
					},

					{
						question_id: 10,
						answer: "",
					},

					{
						question_id: 11,
						answer: "",
					},

					{
						question_id: 12,
						answer: "",
					},

					{
						question_id: 13,
						answer: "",
					},

					{
						question_id: 14,
						answer: "",
					},

					{
						question_id: 15,
						answer: "",
					},

					{
						question_id: 16,
						answer: "",
					},
				],

		coursework:
			formDataFetched.coursework.length > 0
				? formDataFetched.coursework
				: [
					{
						question_id: 1,
						answer: "",
					},

					{
						question_id: 2,
						answer: [
							{
								sub_question_id: 1,
								sub_answer: "",
							},
							{
								sub_question_id: 3,
								sub_answer: "",
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
								sub_answer: "",
							},
							{
								sub_question_id: 3,
								sub_answer: "",
							},
						],
					},

					{
						question_id: 5,
						answer: "",
					},
				],

		work_history:
			formDataFetched.workHistory.length > 0
				? formDataFetched.workHistory
				: [
					{
						question_id: 1,
						answer: "",
					},
					{
						question_id: 2,
						answer: "",
					},
					{
						question_id: 3,
						answer: "09/10/18",
					},
					{
						question_id: 4,
						answer: "",
					},
				],

		commute:
			formDataFetched.commute.length > 0
				? formDataFetched.commute
				: [
					{
						question_id: 1,
						answer: "",
					},
					{
						question_id: 2,
						answer: 1,
					},
					{
						question_id: 3,
						answer: {
							street_0: "",
							city_0: "",
							state_0: "",
							zipCode_0: "",
						},
					},
				],

		employer_questions:
			formDataFetched.employer_questions.length > 0
				? formDataFetched.employer_questions
				: [],
	};

	/* Add address obj if not present */

	if (
		formDataFetched.commute.length > 0 &&
		findIndex(formDataFetched.commute, 3) < 0
	) {
		_formData.commute[2] = {
			question_id: 3,
			answer: {
				street_0: "",
				city_0: "",
				state_0: "",
				zipCode_0: "",
			},
		};
	}
	const [formData, setFormData] = React.useState(_formData);

	const calHeight = (height) => {
		console.log(height);
	};

	const handleClick = () => {
		// dispatch(toggleOverlay(true));
		// dispatch(togglePopup([true, "jobApplied"]));
		if (localStorage.getItem("jobId"))
			dispatch(jobApply(formData, localStorage.getItem("jobId")));
		else
			dispatch(jobApply(formData, props.match.params.id));
		console.log(formData);
	};

	React.useEffect(() => {
		if (props.match.params.id) {
			dispatch(fetchJobDescription(props.match.params.id));
		}
		if (localStorage.getItem("jobId")) {
			dispatch(fetchJobDescription(localStorage.getItem("jobId")));
		}
		dispatch(fetchCandidateDetails());
		dispatch(fetchAllCertificateTitles());
		dispatch(fetchCandidateDegreeTitles());
		dispatch(fetchAllAnswers());
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
							userData.education_experience.length > 0
							? userData.education_experience.map((exp, index) => {
								return (
									<div className="bottom">
										<div className="details">
											<h2>
												{allDegress.map((cert) => {
													if (cert.id === parseInt(exp.title_id))
														return cert.title;
												})}
											</h2>
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
						{userData && userData.certificate && userData.certificate.length > 1
							? userData.certificate.map((entity) => {
								return (
									<div className="bottom">
										<div className="details">
											<h2>
												{allCertificates.map((cert) => {
													if (cert.id === entity.title_id)
														return cert.title_name;
												})}
											</h2>
											<p>
												<span className="heading">Description: </span>
												{" - "}
												<span className="text">{entity.description}</span>
											</p>
											<p>
												<span className="heading">Issued Date: </span>
												{" to "}
												<span className="text">{entity.issued_date}</span>
											</p>
											<p>
												<span className="heading">Certificate link: </span>
												<span className="text">
													<Link to="/">
														https://www.certificatelink.com/certi.pdf
														</Link>
												</span>
											</p>
											{/* <p>
												<span className="heading">Certificate Image: </span>
												<span className="text">Image here</span>
											</p> */}
										</div>
									</div>
								);
							})
							: ""}
					</div>
				</div>
			</div>

			<Accordion title="General Questions">
				<GeneralQuestions
					calHeight={calHeight}
					noHeading
					data={formData.general_questions}
					onchange={(q, a) => handleFieldChange("general_questions", q, a)}
				/>
			</Accordion>
			<Accordion title="Personality Assessment">
				<PersonalityAssessment
					calHeight={calHeight}
					noHeading
					data={formData.personality_assessment}
					onchange={(q, a) => handleFieldChange("personality_assessment", q, a)}
				/>
			</Accordion>
			<Accordion title="Coursework">
				<CourseWork
					calHeight={calHeight}
					noHeading
					data={formData.coursework}
					onchange={(q, a) => handleFieldChange("coursework", q, a)}
				/>
			</Accordion>
			<Accordion title="Work History" type="addEducation">
				<WorkHistory
					calHeight={calHeight}
					noHeading
					data={formData.work_history}
					onchange={(q, a) => handleFieldChange("work_history", q, a)}
				/>
			</Accordion>
			<Accordion title="Commute" type="addEducation">
				<CommuteQuestions
					calHeight={calHeight}
					noHeading
					data={formData.commute}
					onchange={(q, a) => handleFieldChange("commute", q, a)}
				/>
			</Accordion>
			<Accordion title="Employer Questions" type="addEducation">
				<EmployerQuestions
					calHeight={calHeight}
					noHeading
					empQuestions={empQuestions}
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
