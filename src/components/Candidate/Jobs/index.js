import React, { useEffect, useState } from "react";

import "./index.scss";
import userData from "../../_data/userData.json";
import WidgetAppliedRelatedJobs from "../../_Elements/Widgets/AppliedRelatedJobs";
import { useDispatch, useSelector } from "react-redux";
import {
	candidateGetAppliedJobs,
	fetchCandidateDetails,
	fetchCandidateJobs,
} from "../../../modals/candidateProfile/thunk";
import Spinner from "../../_Elements/Spinner";

function Jobs() {
	const dispatch = useDispatch();
	const allJobs = useSelector((state) => state.setCandidateJobsReducer.data);
	let [appliedJob, setAppliedJob] = useState(allJobs.appliedJobs ? allJobs.appliedJobs : []);
	let [relatedJob, setRelatedJob] = useState(allJobs.relatedJobs ? allJobs.relatedJobs : []);

	useEffect(() => {
		setAppliedJob(allJobs.appliedJobs);
	}, [allJobs.appliedJobs]);

	useEffect(() => {
		setRelatedJob(allJobs.relatedJobs);
	}, [allJobs.relatedJobs]);

	const handleSearch = (searchSting, key = "jobTitle") => {
		console.log('appliedJob ', searchSting, key, appliedJob);
		if (!!allJobs && allJobs.appliedJobs && allJobs.appliedJobs.length) {
			let temp = allJobs.appliedJobs.filter((val) =>
				val[key].toLowerCase().includes(searchSting.toLowerCase())
			);
			console.log('appliedJob temp ', temp);
			setAppliedJob(temp);
		}
		if (!!allJobs && allJobs.relatedJobs && allJobs.relatedJobs.length) {
			let temp = allJobs.relatedJobs.filter((val) =>
				val[key].toLowerCase().includes(searchSting.toLowerCase())
			);
			console.log('relatedJobs temp ', temp);
			setRelatedJob(temp);
		}

	};

	const appliedJobs = appliedJob ? (
		appliedJob.map((job, i) => {
			return <WidgetAppliedRelatedJobs applied={job} key={i} />;
		})
	) : (
			<Spinner />
		);

	const relatedJobs = relatedJob ? (
		relatedJob.map((job, i) => {
			return <WidgetAppliedRelatedJobs related={job} key={i} />;
		})
	) : (
			<Spinner />
		);

	useEffect(() => {
		dispatch(fetchCandidateDetails());
		dispatch(candidateGetAppliedJobs());
		dispatch(fetchCandidateJobs());
	}, []);

	return (
		<div className="jobs">
			<div className="search-panel">
				<div className="common-main-heading">
					<h2>My Jobs</h2>
					{/* <button className="btn">Sory by</button> */}
				</div>
				<div className="searches">
					<input type="text" placeholder="Search by Job Title" onChange={(e) => handleSearch(e.target.value, 'jobTitle')} />
					<input type="text" placeholder="Search by Location" onChange={(e) => handleSearch(e.target.value, 'location')} />
					<input type="text" placeholder="Search by Salary" />
				</div>
			</div>

			<div className="applied-jobs">
				<div className="common-main-heading no-icon">
					<h2>Applied Jobs</h2>
					{/* <button className="btn">&lt; 3 / 4 &gt;</button> */}
				</div>
				<div className="widgets">{appliedJobs}</div>
			</div>

			<div className="related-jobs">
				<div className="common-main-heading no-icon">
					<h2>Related Jobs</h2>
					{/* <button className="btn">&lt; 3 / 4 &gt;</button> */}
				</div>
				<div className="widgets">{relatedJobs}</div>
			</div>
		</div>
	);
}

export default Jobs;
