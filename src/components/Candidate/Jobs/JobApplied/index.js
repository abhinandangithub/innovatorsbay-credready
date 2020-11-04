import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";
import ImgWidgetLogo from "../../../../assets/widget-logo.jpg";
import CredReadyIndex from "../../../_Elements/CredReadyIndex";
import MarginalAssociation from "../../../_Elements/Charts/MarginalAssociation";
import { getCandidateJobDetails } from "../../../../store/thunks/candidate";
import EmployerQuestions from "../../../Candidate/Jobs/Questions/EmployerQuestions";
import { fetchCandidateDegreeTitles, fetchCandidateInstituteType, fetchCandidateCurrentStatus } from "../../../../modals/candidateProfile/thunk";
import Input from "../../../_Elements/Input";

function JobApplied(props) {
	let { id } = useParams();
	const [labelsArr, setLabelsArr] = useState([]);
	const [valuesArr, setValuesArr] = useState([]);
	const degrees = useSelector(
		(state) => state.setCandidateDegreeTitlesReducer.data
	);
	const institutions = useSelector((state) =>
		state.setCandidateInstitutionTypeReducer
			? state.setCandidateInstitutionTypeReducer.data
			: []
	);
	const status = useSelector((state) =>
		state.candidateCurrentStatusReducer
			? state.candidateCurrentStatusReducer.data
			: []
	);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchCandidateDegreeTitles());
		dispatch(fetchCandidateCurrentStatus());
		dispatch(fetchCandidateInstituteType());
		dispatch(getCandidateJobDetails(id));
	}, [id]);

	useEffect(() => {
		setLabelsArr(
			props.candidateJobDetails && props.candidateJobDetails.candidateJobApplication.marginal_associations.map(
				(val) => val.metric
			)
		);
		setValuesArr(
			props.candidateJobDetails && props.candidateJobDetails.candidateJobApplication.marginal_associations.map(
				(val) => val.score
			)
		);
	}, [props.candidateJobDetails]);

	var isLoggedIn = true;

	function WorkExperienceComponent({ experience }) {
		return (
			<>
				<div className="details">
					<h2>{experience.title}</h2>
					<p>
						<span className="heading">
							{experience.company
								? experience.company
								: experience.organization_name}
						</span>
						{" - "}
						<span className="text">{experience.location}</span>
					</p>
					<p>
						<span className="heading">
							{experience.employment_from
								? experience.employment_from
								: experience.employed_from}
						</span>
						{" to "}
						<span className="text">
							{experience.employment_to
								? experience.employment_to
								: experience.employed_till}
						</span>
					</p>
					<p>
						<span className="heading">Current employment status: </span>
						<span className="text">{experience.is_currently_employed === true ? "Yes" : "No"}</span>
					</p>
					<p>
					</p>
				</div>
			</>
		);
	}

	function OtherExperienceComponent({ experience }) {
		return (
			<>
				<div className="details" >
					<h2>{experience.title}</h2>
					<p>
						<span className="heading">Description : </span>
						{experience.description}
					</p>
					<p>
						<span className="heading">Organization : </span>
						{experience.company
							? experience.company
							: experience.organization_name}
					</p>
					<p>
						<span className="heading">Location : </span>
						{experience.location}
					</p>
					<p>
						<span className="text">FROM {experience.employment_from
							? experience.employment_from
							: experience.employed_from}</span>
						{" to "}
						<span className="text">{experience.employment_to
							? experience.employment_to
							: experience.employed_till}</span>
					</p>
				</div>
			</>
		);
	}

	function EducationExperienceComponent({ experience }) {
		return (
			<>
				<div className="details">
					<h2>
						{degrees.length > 0 &&
							degrees.map((entity) => {
								if (entity.id === parseInt(experience.title))
									return entity.title;
							})}
					</h2>
					<p>
						<span className="heading">
							{degrees.length > 0 &&
								degrees.map((entity) => {
									if (entity.id === experience.title) return entity.title;
								})}
						</span>
						<span className="heading">Description : </span>
						{experience.education_description}
						<br />
						<span className="heading">Institution : </span>
						{institutions.length > 0 &&
							institutions.map((entity) => {
								if (entity.id === experience.institution)
									return entity.institute_name;
							})}

						<br />
						<span className="heading">Major : </span>
						{experience.education_major &&
							experience.education_major.map((major) => {
								return <>{major.name + "   "}</>;
							})}
						<br />

						<span className="heading">Minor : </span>
						{experience.education_minor &&
							experience.education_minor.map((minor) => {
								return <>{minor.name + "   "}</>;
							})}
						<br />
					</p>
					<p>
						<span className="text">FROM {experience.attended_from}</span>
						{" to "}
						<span className="text">{experience.attended_till}</span>
					</p>
				</div>
			</>
		);
	}

	function CertificationComponent({ experience }) {
		return (
			<>
				<div className="details">
					<h2>GHI Nursing Certificate</h2>
					<p>
						<span className="heading">Description: </span>
						{" - "}
						<span className="text">
							{/* Patient Care & Safety, Medical Terminology, Electronic
                    Medical Records, Diagnostic Testing, Vital Signs & Patient
                    Monitoring, Medication Administration, Patient Advocacy and
                    Support. */}
							{experience.description}
						</span>
					</p>
					<p>
						<span className="heading">Issued Date: </span>
						{" to "}
						<span className="text">{experience.issued_date}</span>
					</p>
					<p>
						<span className="heading">Certificate link: </span>
						<span className="text">
							<Link to="/">
								{/* https://www.certificatelink.com/certi.pdf */}
								{experience.certificate_link}
							</Link>
						</span>
					</p>
					<p>
						<span className="heading">Certificate Image: </span>
						<span className="text">Image here</span>
					</p>
				</div>
			</>
		);
	}

	return (
		<>
			<div
				className={`job-view-cmp flex ${isLoggedIn ? "" : "login_required"}`}
			>
				<div className="left">
					<div className="top">
						{/* <div className="logo">
							<img src={ImgWidgetLogo} alt="" />
						</div> */}
						<div className="info">
							{/* <h3>Certified Nursing Assistent</h3> */}
							<h3>{props.candidateJobDetails && props.candidateJobDetails.jobDetails.jobTitle}</h3>
							{/* <p>Hospital to Five Star Nursing</p> */}
							<p>{props.candidateJobDetails && props.candidateJobDetails.jobDetails.orgName}</p>
						</div>
						<div className="short-info">
							{/* <p>1-3 Years</p> */}
							<p>
								{props.candidateJobDetails && props.candidateJobDetails.jobDetails.minExp}-
								{props.candidateJobDetails && props.candidateJobDetails.jobDetails.maxExp} Years
							</p>
							<p>{props.candidateJobDetails && props.candidateJobDetails.jobDetails.location}</p>
						</div>
					</div>
					<div className="bottom">
						<p>
							<span className="heading">Job Description: </span>
							<span
								className="text"
								dangerouslySetInnerHTML={{
									__html: props.candidateJobDetails && props.candidateJobDetails.jobDetails.jobDescription
										? props.candidateJobDetails.jobDetails.jobDescription
										: "",
								}}
							></span>
						</p>
					</div>
				</div>
				<div className="right">
					<div className="meter">
						<CredReadyIndex
							index={
								props.candidateJobDetails && props.candidateJobDetails.candidateJobApplication
									.readiness_index
							}
						/>
						<div className={`${isLoggedIn ? "hidden" : "login_screen"}`}>
							<p>Not enough information to calculate your CredReady score.</p>
							<p>
								<Link to="/login">Login</Link> and enter your profile details to
								view your score
							</p>
						</div>
					</div>
					<div className="marginal">
						<h3>Top 5 Contributors to CredREadiness</h3>
						<MarginalAssociation labelsArr={labelsArr} valuesArr={valuesArr} />
						<div className={`${isLoggedIn ? "hidden" : "login_screen"}`}></div>
					</div>
				</div>
			</div>
			<div className="preview_info">
				<div className="content">
					<div className="group">
						<div className="top">
							<h1>Resume</h1>
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
								<Link to="/profile/resume">{props.candidateJobDetails && props.candidateJobDetails.candidate.resume_name}</Link>
							</p>
						</div>
					</div>
					<div className="group">
						<div className="top">
							<h1>Personal Details</h1>
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
								First Name : {props.candidateJobDetails && props.candidateJobDetails.candidate.first_name}
							</p>
							<p>Last Name : {props.candidateJobDetails && props.candidateJobDetails.candidate.last_name}</p>
							<p>Current employment status :  {status.map(entity => {
								if (entity.id === props.candidateJobDetails && props.candidateJobDetails.candidate.current_employment_status)
									return entity.employment_status
							})}</p>
							<p>
								How long would you begin a new role ? :{" "}
								{props.candidateJobDetails && props.candidateJobDetails.candidate.available_within}
							</p>
							<p>
								Are you interested in a different function and industry ? : {props.candidateJobDetails && props.candidateJobDetails.candidate.is_open_to_other_roles === true ? "Yes" : "No"}
							</p>
						</div>
					</div>
					<div className="group">
						<div className="top">
							<h1>Experience</h1>
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
							{props.candidateJobDetails && props.candidateJobDetails.candidate.work_experience.map(
								(val) => {
									return (
										<WorkExperienceComponent
											experience={val}
										></WorkExperienceComponent>
									);
								}
							)}
							{props.candidateJobDetails && props.candidateJobDetails.candidate.additional_experiences.map(
								(val) => {
									if (val.career_path === "work") {
										return (
											<OtherExperienceComponent
												experience={val}
											></OtherExperienceComponent>
										);
									}
								}
							)}
						</div>
					</div>
					<div className="group ">
						<div className="top">
							<h1>Education</h1>
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
							{props.candidateJobDetails && props.candidateJobDetails.candidate.education_experience.map(
								(val) => {
									return (
										<EducationExperienceComponent
											experience={val}
										></EducationExperienceComponent>
									);
								}
							)}
							{props.candidateJobDetails && props.candidateJobDetails.candidate.additional_experiences.map(
								(val) => {
									if (val.career_path === "EDUCATION") {
										return (
											<OtherExperienceComponent
												experience={val}
											></OtherExperienceComponent>
										);
									}
								}
							)}
						</div>
					</div>
					<div className="group ">
						<div className="top">
							<h1>Certifications</h1>
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
							{props.candidateJobDetails && props.candidateJobDetails.candidate.certificate.map((val) => {
								return (
									<CertificationComponent
										experience={val}
									></CertificationComponent>
								);
							})}

						</div>
					</div>
				</div>
			</div>
			<div className="employer-questions">
				<div className="content">
					<ul className="general-questions">
						{props.candidateJobDetails && props.candidateJobDetails.submittedAnswer.employerQuestions && props.candidateJobDetails.submittedAnswer.employerQuestions.length
							&& <EmployerQuestions
								noHeading
								employerQuestions={props.candidateJobDetails.submittedAnswer.employerQuestions}
							/>
						}
					</ul>
				</div>
			</div>
		</>
	);
}

function mapStateToProps(state) {
	return {
		candidateJobDetails: state.candidateReducer.jobDetails.data,
	};
}

export default connect(mapStateToProps)(JobApplied);
