import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { connect, useSelector, useDispatch } from "react-redux";

import "./index.scss";
import { Link } from "react-router-dom";
import {
	fetchCandidateDetails,
	fetchCandidateCurrentStatus,
	fetchAllCertificateTitles,
	fetchCandidateInstituteType,
	fetchCandidateDegreeTitles,
} from "../../../../../modals/candidateProfile/thunk";

function Preview(props) {
	const dispatch = useDispatch();
	const [personelDetailsData, setpersonelDetailsData] = React.useState(
		props.candidateData
	);

	const institutions = useSelector((state) =>
		state.setCandidateInstitutionTypeReducer
			? state.setCandidateInstitutionTypeReducer.data
			: []
	);
	const degrees = useSelector((state) =>
		state.setCandidateDegreeTitlesReducer
			? state.setCandidateDegreeTitlesReducer.data
			: []
	);
	const certificates = useSelector((state) =>
		state.setCandidateCertificateTitlesReducer
			? state.setCandidateCertificateTitlesReducer.data
			: []
	);
	React.useEffect(() => {
		props.fetchCandidateInstituteType();
		dispatch(fetchCandidateDegreeTitles());
		dispatch(fetchAllCertificateTitles());
		setpersonelDetailsData(props.candidateData);
	}, [personelDetailsData]);
	return (
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
							<Link to="/profile/resume">{personelDetailsData.resume_name ? personelDetailsData.resume_name : "not-found"}</Link>
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
						<p>First Name : {personelDetailsData.first_name}</p>
						<p>Last Name : {personelDetailsData.last_name}</p>
						<p>Current employment status : Employed</p>
						<p>
							How long would you begin a new role? :{" "}
							{personelDetailsData.available_within}
						</p>
						<p>
							Are you interested in a different function and industry? : Yes
						</p>
						{/* <p>Empathy : 35</p>
						<p>Patient : 80 </p> */}
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
						{personelDetailsData &&
							personelDetailsData.work_experience &&
							personelDetailsData.work_experience.length >= 1
							? personelDetailsData.work_experience.map((exp, index) => {
								return (
									<div className="details" key={index}>
										<h2>{exp.title}</h2>
										<p>
											<span className="heading">Description : </span>
											{exp.job_description}
										</p>
										<p>
											<span className="heading">Organization : </span>
											{exp.company}
										</p>
										<p>
											<span className="heading">Location : </span>
											{exp.location}
										</p>
										<p>
											<span className="heading">Employer Website : </span>
											{exp.employer_website}
										</p>
										<p>
											<span className="text">{exp.employment_from}</span>
											{" to "}
											<span className="text">{exp.employment_to}</span>
										</p>
										{/* <p>
											<span className="heading">
												Current employment status:{" "}
											</span>
											<span className="text">Employed</span>
										</p> */}
										{/* <p>
											<span className="heading">Skills: </span>
											<span className="text">{exp.job_description}</span>
										</p> */}
									</div>
								);
							})
							: ""}
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
						{personelDetailsData &&
							personelDetailsData.education_experience &&
							personelDetailsData.education_experience.length >= 1
							? personelDetailsData.education_experience.map((exp, index) => {
								return (
									<div className="details" key={index}>
										<h2>
											{degrees.length > 0 &&
												degrees.map((entity) => {
													if (entity.id === parseInt(exp.title))
														return entity.title;
												})}
										</h2>
										<p>
											<span className="heading">
												{degrees.length > 0 &&
													degrees.map((entity) => {
														if (entity.id === exp.title) return entity.title;
													})}
											</span>
											<span className="heading">Description : </span>
											{exp.education_description}
											<p>
												<span className="heading">Institution : </span>
												{institutions.length > 0 &&
													institutions.map((entity) => {
														if (entity.id === exp.institution)
															return entity.institute_name;
													})}
											</p>
											<p>
												<span className="heading">Major : </span>
												{exp.education_major &&
													exp.education_major.map((major) => {
														return major.name;
													})}
											</p>
											<p>
												<span className="heading">Minor : </span>
												{exp.education_minor &&
													exp.education_minor.map((minor) => {
														return minor.name;
													})}
											</p>
										</p>
										<p>
											<span className="text">FROM {exp.attended_from}</span>
											{" to "}
											<span className="text">{exp.attended_till}</span>
										</p>
									</div>
								);
							})
							: ""}
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
					{personelDetailsData &&
						personelDetailsData.certificate &&
						personelDetailsData.certificate.length >= 1
						? personelDetailsData.certificate.map((entity, index) => {
							return (
								<div className="bottom" key={index}>
									<div className="details">
										<h2>
											{certificates.length > 0 &&
												certificates.map((cert) => {
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
					{/* <div className="details">
						<h2>GHI Nursing Certificate</h2>
						<p>
							<span className="heading">Description: </span>
							{" - "}
							<span className="text">
								Patient Care & Safety, Medical Terminology, Electronic Medical
								Records, Diagnostic Testing, Vital Signs & Patient Monitoring,
								Medication Administration, Patient Advocacy and Support.
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
								<Link to="/">https://www.certificatelink.com/certi.pdf</Link>
							</span>
						</p>
						<p>
							<span className="heading">Certificate Image: </span>
							<span className="text">Image here</span>
						</p>
					</div> */}
				</div>
				{/* <div className="group ">
					<div className="top">
						<h1>Strengths</h1>
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

			<div className="check-boxes">
				<div className="check-box">
					<input
						className="fancy-toggle blue"
						type="checkbox"
						name="termsandconditions"
						id="allowContact"
						defaultChecked
					/>
					<label htmlFor="allowContact">
						<span className="input"></span>
						Allow recruiters to contact you for more details
					</label>
				</div>
				<div className="check-box">
					<input
						className="fancy-toggle blue"
						type="checkbox"
						name="termsandconditions"
						id="confirm"
					/>
					<label htmlFor="confirm">
						<span className="input"></span>I confirm that the information given
						in this form is true, complete and accurate.
					</label>
				</div>
			</div>

			<div className="cta">
				{/* <button className="primary-btn ">Proceed to questions</button> */}
				<Link
					to="/profile/questions"
					className="primary-btn blue flex"
					id="profileQuestionsLink"
				>
					Proceed to questions
				</Link>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		candidateData: state.candidateSetDataReducer.data,
		institutionsData: state.setCandidateInstitutionTypeReducer.data,
	};
}

const mapDispatchToProps = {
	fetchCandidateDetails: fetchCandidateDetails,
	fetchCandidateCurrentStatus: fetchCandidateCurrentStatus,
	fetchCandidateInstituteType: fetchCandidateInstituteType,
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
