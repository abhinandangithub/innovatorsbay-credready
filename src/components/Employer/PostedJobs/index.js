import React, { useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import { getPostedJobs, sendNotification, getCandidatesList } from '../../../store/thunks/employer';

import { Link } from "react-router-dom";

import "./index.scss";

function PostedJobs(props) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPostedJobs());
	}, [dispatch]);

	const handleSendEmail = (e, job_id) => {
		// if(e.target.checked) {
			dispatch(sendNotification({
  				"jobId": job_id,
  				"optStatus": e.target.checked,
  				"source": "Email"
			}));
		// }
	}

	const handleSendSMS = (e, job_id) => {
		// if(e.target.checked) {
			dispatch(sendNotification({
  				"jobId": job_id,
  				"optStatus": e.target.checked,
  				"source": "SMS"
			}));
		// }
	}

	const handleViewCandidates = (job_id) => {
		dispatch(getCandidatesList(job_id));
	}

	const jobsList = [1, 2];
	// const jobsList = props.postedJobs;

	const List = ({job}) => {
		return (
		<>
			{/* <h2 className="heading">Certified Nursing Assistant</h2> */}
			<h2 className="heading">{job.job_title}</h2>
			<p>
				<span>Description: </span>{job.job_description}
			</p>
			<ul className="common-skills-list">
				<li>Skills: </li>
				{!!job.strengths && job.strengths.length && job.strengths.map((val,i) => {
					return <li key={i}>{val.name}</li>
				})}
			</ul>
			<p className="job-openings">
				<span>Job Openings: </span>{job.open_positions}
			</p>
			<div className="list-btn">
				<ul className="info">
					{/* <li>Warren, NY</li> */}
					<li>{!!job.address && job.address.city}, {!!job.address && job.address.state}</li>
					{/* <li>January 21, 2020</li> */}
					<li>{job.modified_on}</li>
					<li>{job.modified_by}</li>
					<li>Candidates applied {job.count_of_applied_candidates}</li>
				</ul>
				<Link to="/jobs/candidates-list" className="primary-btn blue" onClick={() => handleViewCandidates(job.job_id)}>
					View Candidates
				</Link>
			</div>
			<div className="checkboxes">
				<input
					id={'SMS'+job.job_id}
					type="checkbox"
					className="fancy-toggle blue"
					onChange={(e) => handleSendEmail(e, job.job_id)}
				/>
				<label htmlFor={'SMS'+job.job_id}>
					<span className="input"></span>Receive Email Notification
				</label>
				<input
					id={'EMAIL'+job.job_id}
					type="checkbox"
					className="fancy-toggle blue"
					onChange={(e) => handleSendSMS(e, job.job_id)}
				/>
				<label htmlFor={'EMAIL'+job.job_id}>
					<span className="input"></span>Receive SMS Notification
				</label>
			</div>
		</>
	);
}

	const renderJobsList = (
		<>
			<div className="common-heading-button">
				<h1 className="heading">My Posted Jobs</h1>
				<Link to="/jobs/create-job" className="btn">
					<span></span>Post a Job
				</Link>
			</div>
			<div className="search-panel">
				<div className="searches">
					<input type="text" placeholder="Search by Job Title" />
					<input type="text" placeholder="Search by Skills" />
				</div>
			</div>

			<div className="listings">
				<ul>
					{/* {jobsList.map((_, i) => {
						return <li key={i}>{list}</li>;
					})} */}
					{props.postedJobs.map((_, i) => {
						// console.log(_);
						return <li key={i}><List job={_}></List></li>;
					})}
				</ul>
			</div>
		</>
	);

	const renderEmptyList = (
		<div className="no-jobs">
			<div className="common-heading-button">
				<h1 className="heading">No Posted Jobs</h1>
			</div>
			<div className="content">
				<p>
					No jobs have been created yet.
					<br />
					Why don't you post a job by clicking on the button below
				</p>
				<div className="common-heading-button">
					<Link to="/jobs/create-job" className="btn">
						<span></span>Post a Job
					</Link>
				</div>
			</div>
		</div>
	);

	return (
		<div className="posted-jobs-page">
			{jobsList.length === 0 ? renderEmptyList : renderJobsList}
		</div>
	);
}

function mapStateToProps(state) {
	return {
		postedJobs: state.employerReducer.postedJobs.data
	}
}

// export default PostedJobs;
export default connect(mapStateToProps)(PostedJobs);