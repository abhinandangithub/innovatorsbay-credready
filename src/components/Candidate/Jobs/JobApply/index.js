import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./index.scss";
import ImgWidgetLogo from "../../../../assets/widget-logo.jpg";
import CredReadyIndex from "../../../_Elements/CredReadyIndex";
import { fetchjobViewData } from "../../../../modals/candidateProfile/thunk";
import MarginalAssociation from "../../../_Elements/Charts/MarginalAssociation";

function JobApply(props) {
	var hide_Graphs = false;

	const dispatch = useDispatch();
	console.log(props.match.params.id);
	const allData = useSelector(
		(state) => state.setCandidateJobViewDataReducer.data
	);
	const jobDetails = allData.jobDetails ? allData.jobDetails : [];
	console.log(
		allData.candidateJobApplication &&
			allData.candidateJobApplication.marginal_associations
	);
	var index =
		allData.candidateJobApplication &&
		allData.candidateJobApplication.readiness_index;
	var titles =
		allData.candidateJobApplication &&
		allData.candidateJobApplication.marginal_associations.map(
			(entity) => entity.metric
		);
	var values =
		allData.candidateJobApplication &&
		allData.candidateJobApplication.marginal_associations.map(
			(entity) => entity.score
		);
	React.useEffect(() => {
		console.log(props.match.params.id);
		dispatch(fetchjobViewData(props.match.params.id));
	}, []);

	return (
		<div className={`job-view-cmp flex ${hide_Graphs ? "" : "hide_Graphs"}`}>
			<div className="left">
				<div className="top">
					<div className="logo">
						<img src={ImgWidgetLogo} alt="" />
					</div>
					<div className="info">
						<h3>{jobDetails.jobTitle}</h3>
						<p>{jobDetails.orgName}</p>
					</div>
					<div className="short-info">
						<p>
							{jobDetails.minExp}-{jobDetails.maxExp} Years
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
							{/* <span dangerouslySetInnerHTML={{ __html: job.job_description }}></span> */}
						</span>
					</p>
					<h2>{jobDetails.jobTitle}</h2>
					<h3>Responsibilities</h3>
					<span
						dangerouslySetInnerHTML={{
							__html: allData.jobDetails && allData.jobDetails.jobDescription,
						}}
					></span>
					<div className="cta flex">
						{/* <p>Are you interested to apply for this possition?</p> */}
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
							to={`/jobs/questions/${props.match.params.id}`}
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
