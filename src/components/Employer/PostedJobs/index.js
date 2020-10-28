import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
	getPostedJobs,
	sendNotification,
	getCandidatesList
} from "../../../store/thunks/employer";
import { clearSelectedJobs } from "../../../store/actions/employer";
import Spinner from "../../_Elements/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

import "./index.scss";

function PostedJobs(props) {
	const [jobs, setJobs] = useState(props.postedJobs);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPostedJobs());
		dispatch(clearSelectedJobs());
	}, [dispatch]);

	useEffect(() => {
		setJobs(props.postedJobs);
	}, [props.postedJobs]);

	const handleSendEmail = (e, job_id) => {
		// if(e.target.checked) {
		let jobs = props.postedJobs.map(j => {
			if (j.job_id === job_id) {
				j.is_following_on_email = e.target.checked;
			};
			return j;
		})
		setJobs(jobs);
		dispatch(
			sendNotification({
				jobId: job_id,
				optStatus: e.target.checked,
				source: "Email",
			})
		);
		// }
	};

	const handleSendSMS = (e, job_id) => {
		// if(e.target.checked) {
		let jobs = props.postedJobs.map(j => {
			if (j.job_id === job_id) {
				j.is_following_on_sms = e.target.checked;
			};
			return j;
		})
		setJobs(jobs);
		dispatch(
			sendNotification({
				jobId: job_id,
				optStatus: e.target.checked,
				source: "SMS",
			})
		);
		// }
	};

	const handleViewCandidates = (job_id) => {
		dispatch(getCandidatesList(job_id));
	};

	const handleSearch = (searchSting) => {
		setJobs(
			props.postedJobs.filter((val) => val.job_title.toLowerCase().includes(searchSting.toLowerCase()))
		);
	};

	const jobsList = [1, 2];
	// const jobsList = props.postedJobs;

	const List = ({ job }) => {
		console.log(job);
		return (
			<>	
				<div className="list-btn">
					<h2 className="heading">{job.job_title}</h2>
					<Link to="/jobs/create-job" className="edit" id="editBtn">
						<FontAwesomeIcon icon={faPencilAlt} />
					</Link>
				</div>
				
				<div className="description">
					<p>
						<span>Description: </span>
					</p>
					<div dangerouslySetInnerHTML={{ __html: job.job_description }}></div>
				</div>

				<ul className="common-skills-list">
					<li>Certificates: </li>
					{!!job.certificates &&
						job.certificates.length &&
						job.certificates.map((val, i) => {
							return <li key={i}>{val.title_name}</li>;
						})}
				</ul>
				<p className="job-openings">
					<span>Job Openings: </span>
					{job.open_positions}
				</p>
				<div className="list-btn">
					<ul className="info">
						{/* <li>Warren, NY</li> */}
						<li>
							{!!job.address && job.address.city},{" "}
							{!!job.address && job.address.state}
						</li>
						{/* <li>January 21, 2020</li> */}
						<li>{job.modified_on}</li>
						<li>{job.modified_by}</li>
						<li>Candidates applied {job.count_of_applied_candidates}</li>
					</ul>
					<Link
						to={"/jobs/candidates-list/" + job.job_id}
						className="primary-btn blue"
						onClick={() => handleViewCandidates(job.job_id)}
					>
						View Candidates
					</Link>
				</div>
				<div className="checkboxes">
					<input
						id={"EMAIL" + job.job_id}
						type="checkbox"
						className="fancy-toggle blue"
						onChange={(e) => handleSendEmail(e, job.job_id)}
						checked={job.is_following_on_email}
					/>
					<label htmlFor={"EMAIL" + job.job_id}>
						<span className="input"></span>Receive Email Notification
					</label>
					<input
						id={"SMS" + job.job_id}
						type="checkbox"
						className="fancy-toggle blue"
						onChange={(e) => handleSendSMS(e, job.job_id)}
						checked={job.is_following_on_sms}
					/>
					<label htmlFor={"SMS" + job.job_id}>
						<span className="input"></span>Receive SMS Notification
					</label>
				</div>
			</>
		);
	};

	const renderJobsList = (
		<>
			<div className="common-heading-button">
				<h1 className="heading">My Posted Jobs</h1>
				<Link to="/jobs/create-job" className="btn">
					<span></span>Post the Job
				</Link>
			</div>
			<div className="search-panel">
				<div className="searches">
					<input
						type="text"
						placeholder="Search by Job Title"
						onChange={(e) => handleSearch(e.target.value)}
					/>
					{/* <input type="text" placeholder="Search by Skills" /> */}
				</div>
			</div>

			<div className="listings">
				<ul>
					{/* {jobsList.map((_, i) => {
						return <li key={i}>{list}</li>;
					})} */}
					{jobs.map((_, i) => {
						// console.log(_);
						return (
							<li key={i}>
								<List job={_}></List>
							</li>
						);
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
					Why don't you post the job by clicking on the button below
				</p>
				<div className="common-heading-button">
					<Link to="/jobs/create-job" className="btn">
						<span></span>Post the Job
					</Link>
				</div>
			</div>
		</div>
	);

	return props.loading ? (
		<Spinner />
	) : (
			<div className="posted-jobs-page">
				{props.postedJobs.length === 0 ? renderEmptyList : renderJobsList}
			</div>
		);
}

function mapStateToProps(state) {
	return {
		postedJobs: state.employerReducer.postedJobs.data.reverse(),
		loading: state.commonReducer.apiCallsInProgress,
	};
}

// export default PostedJobs;
export default connect(mapStateToProps)(PostedJobs);
