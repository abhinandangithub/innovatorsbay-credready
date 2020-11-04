import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./index.scss";
import ImgWidgetLogo from "../../../../assets/widget-logo.jpg";
import CredReadyIndex from "../../../_Elements/CredReadyIndex";
import {
	fetchJobDescription,
	fetchjobViewData,
	fetchAllAnswers,
} from "../../../../modals/candidateProfile/thunk";
import MarginalAssociation from "../../../_Elements/Charts/MarginalAssociation";

function JobApply(props) {
	const dispatch = useDispatch();
	const [waiting, setWaiting] = React.useState(false);
	const allData = useSelector((state) => state.setJobDescriptionReducer.data);
	const allJobData = useSelector(
		(state) => state.setCandidateJobViewDataReducer.data
	);
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
	let show_Graphs = allJobData.jobDetails ? true : false;
	React.useEffect(() => {
		dispatch(fetchAllAnswers());
		setTimeout(function () {
			dispatch(fetchjobViewData(props.match.params.id));
			setWaiting(true);
		}, 5000);
		dispatch(fetchJobDescription(props.match.params.id));
	}, []);

	return (
		<div className={`job-view-cmp flex ${show_Graphs ? "" : "hide_Graphs"}`}>
			<div className="left">
				<div className="top">
					{/* <div className="logo">
						<img src={ImgWidgetLogo} alt="" />
					</div> */}
					<div className="info">
						<h3>{jobDetails ? jobDetails.job_title : ""}</h3>
						<p>
							{jobDetails &&
								jobDetails.organization &&
								jobDetails.organization.org_name}
						</p>
					</div>
					<div className="short-info">
						<p>
							{jobDetails ? jobDetails.min_experience : ""}-
							{jobDetails ? jobDetails.max_experience : ""} Years
						</p>
						<p>{jobDetails ? jobDetails.location : ""}</p>
					</div>
				</div>
				<div className="bottom">
					<p>
						<span className="text">
							<span
								dangerouslySetInnerHTML={{
									__html: jobDetails ? jobDetails.jobDescription : "",
								}}
							></span>
							<span
								dangerouslySetInnerHTML={{
									__html: allData && allData.job_description,
								}}
							></span>
						</span>
					</p>
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
						{waiting ? (
							<Link
								className="primary-btn blue"
								to={
									allJobData && allJobData.jobDetails
										? `/jobs/application/${props.match.params.id}`
										: `/jobs/questions/${props.match.params.id}`
								}
							>
								Apply
							</Link>
						) : (
								""
							)}
					</div>
				</div>
			</div>

			<div className="right">
				{waiting === false ? (
					<p style={{ color: "black" }}>
						We are calculating your CredReadiness and Marginal Association
						please wait...
					</p>
				) : !show_Graphs ? (
					<p style={{ color: "black" }}>
						You need to give answers for some questions to see Marginal
						Association and CredReadiness
					</p>
				) : (
							""
						)}
				<div className="meter">
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
