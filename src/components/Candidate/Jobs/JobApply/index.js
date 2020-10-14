import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./index.scss";
import ImgWidgetLogo from "../../../../assets/widget-logo.jpg";
import CredReadyIndex from "../../../_Elements/CredReadyIndex";
import { fetchjobViewData } from "../../../../modals/candidateProfile/thunk";
import MarginalAssociation from "../../../_Elements/Charts/MarginalAssociation";

function JobView(props) {
	const dispatch = useDispatch();
	console.log(props.match.params);
	const allData = useSelector(
		(state) => state.setCandidateJobViewDataReducer.data
	);
	console.log(allData);
	var index =
		allData.jobDetails && allData.candidateJobApplication.readiness_index;
	React.useEffect(() => {
		dispatch(fetchjobViewData(1));
	}, []);

	return (
		<div className="job-view-cmp flex">
			<div className="left">
				<div className="top">
					<div className="logo">
						<img src={ImgWidgetLogo} alt="" />
					</div>
					<div className="info">
						<h3>{allData.jobDetails && allData.jobDetails.jobTitle}</h3>
						<p>{allData.jobDetails && allData.jobDetails.orgName}</p>
					</div>
					<div className="short-info">
						<p>
							{allData.jobDetails && allData.jobDetails.minExp}-
							{allData.jobDetails && allData.jobDetails.maxExp} Years
						</p>
						<p>{allData.jobDetails && allData.jobDetails.location}</p>
					</div>
				</div>
				<div className="bottom">
					<p>
						<span className="heading">Job Description: </span>
						<span className="text">
							<span
								dangerouslySetInnerHTML={{
									__html:
										allData.jobDetails && allData.jobDetails.jobDescription,
								}}
							></span>
							{/* <span dangerouslySetInnerHTML={{ __html: job.job_description }}></span> */}
						</span>
					</p>
					{/* <p>
						<span className="heading">Skills: </span>
						<span className="text">
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text
							ever since the 1500s, when an unknown printer took a galley of
							type and scrambled it to make a type specimen book. It has
							survived not only five centuries, but also the leap into
							electronic typesetting, remaining essentially unchanged.
						</span>
					</p> */}
					<h2>A Certified Nursing Assistant's Job</h2>
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

						<Link className="primary-btn blue" to="/jobs/application">
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
				</div>
				<div className="marginal">
					<h3>Top 5 Contributors to CredREadiness</h3>
					<MarginalAssociation />
				</div>
			</div>
		</div>
	);
}

export default JobView;
