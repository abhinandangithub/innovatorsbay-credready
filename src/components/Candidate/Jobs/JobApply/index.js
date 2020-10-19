import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./index.scss";
import ImgWidgetLogo from "../../../../assets/widget-logo.jpg";
import CredReadyIndex from "../../../_Elements/CredReadyIndex";
import { fetchJobDescription, fetchjobViewData } from "../../../../modals/candidateProfile/thunk";
import MarginalAssociation from "../../../_Elements/Charts/MarginalAssociation";

function JobApply(props) {
	const dispatch = useDispatch();
	console.log(props.match.params.id);
	const allData = useSelector(
		(state) => state.setJobDescriptionReducer.data
	);
	const allJobData = useSelector(
		(state) => state.setCandidateJobViewDataReducer.data
	);
	console.log(allData);
	console.log(allJobData);
	const jobDetails = allData;

	var index =
		allJobData.candidateJobApplication &&
		allJobData.candidateJobApplication.readiness_index;
	var titles =
		allJobData.candidateJobApplication &&
		allJobData.candidateJobApplication.marginal_associations.map(
			(entity) => entity.metric
		);
	var values =
		allJobData.candidateJobApplication &&
		allJobData.candidateJobApplication.marginal_associations.map(
			(entity) => entity.score
		);
	React.useEffect(() => {
		console.log(props.match.params.id);
		dispatch(fetchJobDescription(props.match.params.id));
		dispatch(fetchjobViewData(props.match.params.id));

	}, []);
	const show_Graphs = allJobData.jobDetails ? true : false;

	return (
		<div className={`job-view-cmp flex ${show_Graphs ? "" : "hide_Graphs"}`}>
			<div className="left">
				<div className="top">
					<div className="logo">
						<img src={ImgWidgetLogo} alt="" />
					</div>
					<div className="info">
						<h3>{jobDetails.job_title}</h3>
						<p>{jobDetails.organization && jobDetails.organization.org_name}</p>
					</div>
					<div className="short-info">
						<p>
							{jobDetails.min_experience}-{jobDetails.max_experience} Years
						</p>
						<p>{jobDetails.location}</p>
					</div>
				</div>
				<div className="bottom">
					<p>
						<span className="heading">Job Description: </span>
						<span className="text">
							<span
								dangerouslySetInnerHTML={{
									__html: jobDetails.jobDescription,
								}}
							></span>
							<span dangerouslySetInnerHTML={{ __html: allData.job_description }}></span>
						</span>
					</p>
					<h2>{jobDetails.job_title}</h2>
					<h3>Responsibilities</h3>
					<span
						dangerouslySetInnerHTML={{
							__html: allData.job_description
						}}
					></span>
					<div className="cta flex">
						<p>Are you interested to apply for this possition?</p>
						{index < 75 ? (
							<p>
								You have lower readiness index than expected. Having higher
								readiness index improves the chances of being hired.
								<br /> Are you sure you want to apply?
							</p>
						) : (
								<p></p>
							)}


						<Link
							className="primary-btn blue"
							to={allJobData.jobDetails ? `/jobs/application/${props.match.params.id}` : `/jobs/questions/${props.match.params.id}`}
						>
							Apply
						</Link>
					</div>
				</div>
			</div>
			<div className="right">
				<div className="meter">
					<p>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has.
					</p>
					<CredReadyIndex index={index} />
					<div
						className={`${props.isLoggedIn ? "hidden" : "graph_overlay"}`}
					></div>
				</div>
				<div className="marginal">
					<h3>Top 5 Contributors to CredReadiness</h3>
					<MarginalAssociation titles={titles} values={values} />
					<div
						className={`${props.isLoggedIn ? "hidden" : "graph_overlay"}`}
					></div>
				</div>
			</div>
		</div>
	);
}

export default JobApply;
