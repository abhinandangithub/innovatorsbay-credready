import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./index.scss";
import ImgUserPlaceholder from "../../../assets/user-placeholder.jpg";
import CredReadyIndex from "../../_Elements/CredReadyIndex";
import ImgWidget2 from "../../../assets/widget-2.jpg";
import JobSpecificQuestions from "../../Candidate/Jobs/JobSpecificQuestions";
import Accordion from "../../_Elements/Accordion";
import { connect, useDispatch } from "react-redux";
import { getAppliedCandidateDetails } from "../../../store/thunks/employer";
import { useToasts } from "react-toast-notifications";
import Spinner from "../../_Elements/Spinner";
import MarginalAssociation from "../../_Elements/Charts/MarginalAssociation";
import { sendEmail } from "../../../store/thunks/employer";

function CandidateView(props) {
	const dispatch = useDispatch();
	const [job, setJob] = useState(undefined);
	let { jobId, candidateId } = useParams();

	const { addToast } = useToasts();

	useEffect(() => {
		dispatch(getAppliedCandidateDetails(candidateId, jobId));
	}, [dispatch]);

	useEffect(() => {
		console.log("appliedCandidateDetails ", jobId, candidateId, props.job);
		setJob(props.job);
	}, [dispatch, props.job]);

	const handleSendEmail = () => {
		dispatch(
			sendEmail({
				candidateId: candidateId,
				emailTemplateId: job.jobDetails.emailTemplateId,
				job_id: jobId,
			})
		);
	};

	const handleDownloadClick = () => {
		console.log("url ", job.candidate.resume_path);
		if (job.candidate.resume_path) {
			fetch(job.candidate.resume_path).then((response) => {
				response.blob().then((blob) => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement("a");
					a.href = url;
					a.download = job.candidate.resume_name || "resume.pdf";
					a.click();
				});
			});
		} else {
			addToast("Could not find resume", {
				appearance: "warning",
				autoDismiss: true,
			});
		}
	};

	return props.loading || job === undefined ? (
		<Spinner />
	) : (
		<div className="candidate-view">
			<div className="common-heading-button flex">
				<h1 className="heading">Candidate View</h1>
				<Link className="btn" onClick={() => handleDownloadClick()}>
					Download Resume
				</Link>
			</div>
			<div className="main-info">
				<div className="top flex">
					<div className="left">
						<img
							src={
								job.candidate.profile_image_path
									? job.candidate.profile_image_path
									: ImgUserPlaceholder
							}
							alt="UserName"
						/>
					</div>
					<div className="right">
						<h2>
							{job.candidate.first_name} {job.candidate.last_name}
						</h2>
						{/* <h3>Certified Nursing Assistant</h3> */}
						<ul className="flex">
							<li>{job.candidate.contacts[1].contact}</li>
							<li>{job.candidate.contacts[0].contact}</li>
							<li>{job.candidate.address.city}</li>

							<li>{job.candidate.exp_in_years}</li>
							<li>{job.candidate.job_distance || "**"} </li>
							<li>{job.candidate.address.street_address}</li>
						</ul>
					</div>
				</div>
				<div className="bottom">
					{/* <ul className="common-skills-list">
							<li>Skills: </li>
							<li>Helping with meals</li>
							<li>Transferring using assistive devices</li>
							<li>Grooming</li>
							<li>Bathing</li>
							<li>Changing diapers</li>
							<li>Dressing</li>
						</ul> */}
					<ul className="common-skills-list">
						<li>Certificates: </li>
						{!!job.candidate.certificate &&
							job.candidate.certificate.length &&
							job.candidate.certificate.map((val, i) => {
								return <li key={i}>{val.certificate_title.title_name}</li>;
							})}
					</ul>
				</div>
			</div>
			<div className="widgets flex">
				<div className="widget">
					<div className="heading">CreadReadiness Index</div>
					<div className="content">
						<CredReadyIndex
							index={job.candidateJobApplication.readiness_index}
							noHeading
							noSubHeading
						/>
						{/* <img src={ImgWidget1} alt="" /> */}
					</div>
				</div>
				<div className="widget">
					<div className="heading">
						Top 5 contributors to the CredReadiness Index
					</div>
					{job.candidateJobApplication.marginal_associations &&
						job.candidateJobApplication.marginal_associations.length && (
							<div className="content">
								{/* <CredReadyIndex index="80" /> */}
								{/* <img src={ImgWidget2} alt="" /> */}
								<MarginalAssociation
									titles={job.candidateJobApplication.marginal_associations.map(
										(j) => {
											return j.metric;
										}
									)}
									values={job.candidateJobApplication.marginal_associations.map(
										(j) => {
											return j.score;
										}
									)}
								/>
							</div>
						)}
				</div>
			</div>
			{/* <Accordion className="blank" type="blank"> */}
			{job.candidate.work_experience.map((j) => {
				return (
					<div>
						<Accordion className="blank" type="blank">
							<ul className="info flex for-click">
								<li>
									<span>Title:&nbsp;</span> <span>{j.title}</span>
								</li>
								<li>
									<span>Duration:&nbsp;</span>
									<span>
										{new Date(j.employment_from).toDateString()}&nbsp;-&nbsp;
										{new Date(j.employment_to).toDateString()}
									</span>
								</li>
								<li>
									<span>Organizatioin:&nbsp;</span> <span>{j.company}</span>
								</li>
							</ul>
							<ul className="info flex">
								{/* <li>
										Industry : <span>Homecare / hospitality</span>
									</li>
									<li>
										Function : <span>Certified Nursing Assistant / Nursing Staff</span>
									</li> */}
								<li className="full">
									<span>Description:&nbsp;</span>
									<span>{j.job_description}</span>
								</li>
								<li>
									<span>Supervisor Name:&nbsp;</span>
									<span>{j.workex_verification.supervisor_name}</span>
								</li>
								<li className="phone">
									<span>Supervisor Phone Number:&nbsp;</span>
									<span>{j.workex_verification.phone}</span>
								</li>
							</ul>
						</Accordion>
					</div>
				);
			})}
			{/* </Accordion> */}
			<JobSpecificQuestions questions={job.submittedAnswer.employerQuestions} />
			<div className="cta flex">
				<p>
					Applied on :{" "}
					<span>{new Date(job.candidate.created_on).toDateString()}</span>
				</p>
				<button className="primary-btn" onClick={() => handleSendEmail()}>
					Send Email
				</button>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		loading: state.commonReducer.apiCallsInProgress,
		job: state.employerReducer.appliedCandidateDetails.data,
	};
}

// export default CandidateList;
export default connect(mapStateToProps)(CandidateView);
