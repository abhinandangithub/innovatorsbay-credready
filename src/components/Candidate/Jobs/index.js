import React, { useEffect } from "react";

import "./index.scss";
import userData from "../../_data/userData.json";
import WidgetAppliedRelatedJobs from "../../_Elements/Widgets/AppliedRelatedJobs";
import { useDispatch, useSelector } from "react-redux";
import { candidateGetAppliedJobs, fetchCandidateDetails, fetchCandidateJobs } from "../../../modals/candidateProfile/thunk";

function Jobs() {
	const dispatch = useDispatch();
	const allJobs = useSelector(state => state.setCandidateJobsReducer.data);
	const appliedJob = allJobs.appliedJobs ? allJobs.appliedJobs : "";
	const relatedJob = allJobs.relatedJobs ? allJobs.relatedJobs : "";
	console.log(appliedJob, relatedJob)
	const appliedJobs = appliedJob ? appliedJob.map((job, i) => {
		return <WidgetAppliedRelatedJobs applied={job} key={i} />;
	}) : ""

	const relatedJobs = relatedJob ? relatedJob.map((job, i) => {
		return <WidgetAppliedRelatedJobs related={job} key={i} />;
	}) : ""

	console.log(allJobs);

	useEffect(() => {
		dispatch(fetchCandidateDetails());
		dispatch(candidateGetAppliedJobs());
		dispatch(fetchCandidateJobs())
	}, [])


	return (
		<div className="jobs">
			<div className="search-panel">
				<div className="common-main-heading">
					<h2>My Jobs</h2>
					<button className="btn">Sory by</button>
				</div>
				<div className="searches">
					<input type="text" placeholder="Search by Job Title" />
					<input type="text" placeholder="Search by Location" />
					<input type="text" placeholder="Search by Salary" />
				</div>
			</div>

			<div className="applied-jobs">
				<div className="common-main-heading no-icon">
					<h2>Applied Jobs</h2>
					<button className="btn">&lt; 3 / 4 &gt;</button>
				</div>
				<div className="widgets">{appliedJobs}</div>
			</div>

			<div className="related-jobs">
				<div className="common-main-heading no-icon">
					<h2>Related Jobs</h2>
					<button className="btn">&lt; 3 / 4 &gt;</button>
				</div>
				<div className="widgets">{relatedJobs}</div>
			</div>
		</div>
	);
}

export default Jobs;