import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
	sendEmail,
	updateStatus,
	getAppliedCandidateDetails,
	getCandidatesList,
	getPostedJobs,
} from "../../../store/thunks/employer";

import "./index.scss";
import Dropdown from "../../_Elements/Dropdown";
import SortIcon from "../../_Elements/SortIcon";
import Pagination from "../../_Elements/Pagination";
import ImgUser from "../../../assets/user-placeholder.jpg";
import ImgMail from "../../../assets/email.svg";
import ImgDownload from "../../../assets/download.svg";
import Input from "../../_Elements/Input";
import Spinner from "../../_Elements/Spinner";
import { dateFormats } from "highcharts";
import { useToasts } from "react-toast-notifications";

const faker = require("faker");

function CandidateList(props) {
	let { jobId } = useParams();
	const [selectedStatus, setSelectedStatus] = useState([]);
	const [selectedExperience, setSelectedExperience] = useState([]);
	const [selectedLastUpdate, setSelectedLastUpdate] = useState([]);
	const [selectedRedinessIndex, setSelectedRedinessIndex] = useState([]);
	const { addToast } = useToasts();

	// let selectedStatus = [];
	const dispatch = useDispatch();
	const [jobTitle, setJobTitle] = useState(() => {
		let job = props.postedJobs.map((val) => {
			if (val.job_id == jobId) {
				return val.job_title;
			} else {
				return "";
			}
		});
		console.log(job);
		return job;
	});
	const [candidateList, setCandidateList] = useState(props.candidatesList);

	const handleUpdateStatus = (e, job_app_id) => {
		dispatch(
			updateStatus({
				jobAppId: job_app_id,
				status: e,
			})
		);
		let candidateListTemp = candidateList.map((val) => {
			if (val.job_app_id == job_app_id) {
				val.status = e;
			}
			return val;
		});
		setCandidateList(candidateListTemp);
	};

	const handleSendEmail = (candidate_id, template_id) => {
		dispatch(
			sendEmail({
				candidateId: candidate_id,
				emailTemplateId: template_id,
				job_id: jobId,
			})
		);
	};

	const handleDownloadClick = (candidate) => {
		console.log("url ", candidate.resume_path);
		if (candidate.resume_path) {
			fetch(candidate.resume_path).then((response) => {
				response.blob().then((blob) => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement("a");
					a.href = url;
					a.download = "resume.pdf";
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

	const handleRowClick = (e) => {
		dispatch(getAppliedCandidateDetails(e.candidate_id, e.job_id));
	};

	useEffect(() => {
		dispatch(getCandidatesList(jobId));
		dispatch(getPostedJobs());
	}, [dispatch]);

	useEffect(() => {
		const jobTitleTemp = props.postedJobs.map((val) => {
			if (val.job_id == jobId) {
				return val.job_title;
			} else {
				return "";
			}
		});
		setJobTitle(jobTitleTemp);
	}, [props.postedJobs]);

	useEffect(() => {
		setCandidateList(props.candidatesList);
	}, [props.candidatesList]);

	const handleFilterSelect = (option, id, title) => {
		if (document.getElementById(id).checked) {
			if (title === "Status") {
				setSelectedStatus([...selectedStatus, option]);
			}
			if (title === "Experience") {
				setSelectedExperience([...selectedExperience, option]);
			}
			if (title === "Last Update") {
				setSelectedLastUpdate([...selectedLastUpdate, option]);
			}
			if (title === "CredReadiness Range") {
				setSelectedRedinessIndex([...selectedRedinessIndex, option]);
			}
		}
		if (!document.getElementById(id).checked) {
			if (title === "Status") {
				setSelectedStatus(selectedStatus.filter((val) => val !== option));
			}
			if (title === "Experience") {
				setSelectedExperience(
					selectedExperience.filter((val) => val !== option)
				);
			}
			if (title === "Last Update") {
				setSelectedLastUpdate(
					selectedLastUpdate.filter((val) => val !== option)
				);
			}
			if (title === "CredReadiness Range") {
				setSelectedRedinessIndex(
					selectedRedinessIndex.filter((val) => val !== option)
				);
			}
		}
	};

	const handleApplyFilters = () => {
		setFilterOptions(false);
		let candidatesListStatusFiltered =
			selectedStatus.length !== 0
				? props.candidatesList.filter((val) => {
						for (let i = 0; i < selectedStatus.length; i++) {
							if (val.status == selectedStatus[i]) {
								return val;
							}
						}
				  })
				: props.candidatesList;

		let candidatesListExpFiltered =
			selectedExperience.length !== 0
				? candidatesListStatusFiltered.filter((val) => {
						for (let i = 0; i < selectedExperience.length; i++) {
							if (selectedExperience[i] == "10+ years") {
								let exp = val.candidate_experience.substring(0, 2);
								if (parseInt(exp) >= 10) {
									return val;
								}
							}
							if (selectedExperience[i] == "6 to 9 years") {
								let exp = val.candidate_experience.substring(0, 2);
								if (parseInt(exp) >= 6 && parseInt(exp) <= 9) {
									return val;
								}
							}
							if (selectedExperience[i] == "3 to 5 years") {
								let exp = val.candidate_experience.substring(0, 2);
								if (parseInt(exp) >= 3 && parseInt(exp) <= 5) {
									return val;
								}
							}
							if (selectedExperience[i] == "0 to 2 years") {
								let exp = val.candidate_experience.substring(0, 2);
								if (parseInt(exp) >= 0 && parseInt(exp) <= 2) {
									return val;
								}
							}
						}
				  })
				: candidatesListStatusFiltered;

		let candidatesListLastUpdateFiltered =
			selectedLastUpdate.length !== 0
				? candidatesListExpFiltered.filter((val) => {
						for (let i = 0; i < selectedLastUpdate.length; i++) {
							const today = new Date();
							if (selectedLastUpdate[i] == "1 Week") {
								let date = new Date(val.modified_on);
								let lastWeek = new Date(
									today.getFullYear(),
									today.getMonth(),
									today.getDate() - 7
								);
								if (date >= lastWeek && date <= today) {
									return val;
								}
							}
							if (selectedLastUpdate[i] == "2 Weeks") {
								let date = new Date(val.modified_on);
								let lastWeek = new Date(
									today.getFullYear(),
									today.getMonth(),
									today.getDate() - 7
								);
								let lastTwoWeeks = new Date(
									today.getFullYear(),
									today.getMonth(),
									today.getDate() - 14
								);
								if (date >= lastTwoWeeks && date <= lastWeek) {
									return val;
								}
							}
							if (selectedLastUpdate[i] == "3 Weeks") {
								let date = new Date(val.modified_on);
								let lastTwoWeeks = new Date(
									today.getFullYear(),
									today.getMonth(),
									today.getDate() - 14
								);
								let lastThreeWeeks = new Date(
									today.getFullYear(),
									today.getMonth(),
									today.getDate() - 21
								);
								if (date >= lastThreeWeeks && date <= lastTwoWeeks) {
									return val;
								}
							}
							if (selectedLastUpdate[i] == "4 Weeks +") {
								let date = new Date(val.modified_on);
								let lastFourWeeks = new Date(
									today.getFullYear(),
									today.getMonth(),
									today.getDate() - 28
								);
								if (date >= lastFourWeeks) {
									return val;
								}
							}
						}
				  })
				: candidatesListExpFiltered;

		let candidatesListRedIndexFiltered =
			selectedRedinessIndex.length !== 0
				? candidatesListLastUpdateFiltered.filter((val) => {
						for (let i = 0; i < selectedRedinessIndex.length; i++) {
							if (selectedRedinessIndex[i] == "70 to 100 (Ready)") {
								if (
									parseInt(val.readiness_index) >= 71 &&
									parseInt(val.readiness_index) <= 100
								) {
									return val;
								}
							}
							if (selectedRedinessIndex[i] == "41 to 70 (Almost Ready)") {
								if (
									parseInt(val.readiness_index) >= 41 &&
									parseInt(val.readiness_index) <= 70
								) {
									return val;
								}
							}
							if (selectedRedinessIndex[i] == "0 to 40 (Getting Started)") {
								if (
									parseInt(val.readiness_index) >= 0 &&
									parseInt(val.readiness_index) <= 40
								) {
									return val;
								}
							}
						}
				  })
				: candidatesListLastUpdateFiltered;

		setCandidateList(candidatesListRedIndexFiltered);
	};

	const handleFreeSearch = (searchString) => {
		setCandidateList(
			props.candidatesList.filter((val) =>
				val.candidate_name.includes(searchString)
			)
		);
	};

	const [filterOptions, setFilterOptions] = React.useState(false);

	const crRange = {
		heading: "CreadReadines Range",
		content: ["cr 1", "cr 2", "cr 3", "No cr"],
	};
	const status = {
		heading: "Status",
		content: [
			"Viewed",
			"Emailed",
			"Phone",
			"Interviewed",
			"Offer",
			"Hired",
			"Rejected",
		],
	};
	const experience = {
		heading: "Experience",
		content: ["cr 1", "cr 2", "cr 3", "No cr"],
	};
	const currentOrganisation = {
		heading: "Current Organisation",
		content: ["cr 1", "cr 2", "cr 3", "No cr"],
	};
	// const candidateList = [
	// 	{
	// 		name: "Mary Jane",
	// 		currentPosition: "CNA",
	// 		experience: 5,
	// 		credReadiness: 82,
	// 		currentOrganisation: "One Springfield",
	// 		lastUpdate: "9/15/2020",
	// 		status: "Viewed",
	// 	},
	// 	{
	// 		name: "William",
	// 		currentPosition: "Home Health Aid",
	// 		experience: 4,
	// 		credReadiness: 73,
	// 		currentOrganisation: "XYZ Company",
	// 		lastUpdate: "9/15/2020",
	// 		status: "Phone",
	// 	},
	// 	{
	// 		name: "Charlotte",
	// 		currentPosition: "CNA",
	// 		experience: 2,
	// 		credReadiness: 73,
	// 		currentOrganisation: "ABC Company",
	// 		lastUpdate: "9/15/2020",
	// 		status: "Viewed",
	// 	},
	// 	{
	// 		name: "Marry jane",
	// 		currentPosition: "Certified Nursing Assistant",
	// 		experience: 5,
	// 		credReadiness: 50,
	// 		currentOrganisation: "ABC Company",
	// 		lastUpdate: "9/15/2020",
	// 		status: "Offer",
	// 	},
	// 	{
	// 		name: "Kris Connor",
	// 		currentPosition: "CNA",
	// 		experience: 1,
	// 		credReadiness: 40,
	// 		currentOrganisation: "ABC Company",
	// 		lastUpdate: "9/15/2020",
	// 		status: "Hired",
	// 	},
	// 	{
	// 		name: "Mary jane",
	// 		currentPosition: "Home Health Aid",
	// 		experience: 2,
	// 		credReadiness: 35,
	// 		currentOrganisation: "ABC Company",
	// 		lastUpdate: "9/15/2020",
	// 		status: "Hired",
	// 	},
	// 	{
	// 		name: "Mary jane",
	// 		currentPosition: "CNA",
	// 		experience: 4,
	// 		credReadiness: 35,
	// 		currentOrganisation: "ABC Company",
	// 		lastUpdate: "9/15/2020",
	// 		status: "Viewed",
	// 	},
	// 	{
	// 		name: "Charlotte",
	// 		currentPosition: "Certified Nursing Assistant",
	// 		experience: 5,
	// 		credReadiness: 35,
	// 		currentOrganisation: "ABC Company",
	// 		lastUpdate: "9/15/2020",
	// 		status: "Emailed",
	// 	},
	// 	{
	// 		name: "Kris Connor",
	// 		currentPosition: "Home Health Aid",
	// 		experience: 5,
	// 		credReadiness: 35,
	// 		currentOrganisation: "ABC Company",
	// 		lastUpdate: "9/15/2020",
	// 		status: "Viewed",
	// 	},
	// ];

	const filtersList = [
		{
			title: "Status",
			options: [
				"New",
				"Applied",
				"Viewed",
				"Emailed",
				"Phone",
				"Interviewed",
				"Job",
				"Hired",
				"Rejected",
			],
		},
		{
			title: "Experience",
			options: ["10+ years", "6 to 9 years", "3 to 5 years", "0 to 2 years"],
		},
		{
			title: "Last Update",
			options: ["1 Week", "2 Weeks", "3 Weeks", "4 Weeks +"],
		},
		{
			title: "CredReadiness Range",
			options: [
				"70 to 100 (Ready)",
				"41 to 70 (Almost Ready)",
				"0 to 40 (Getting Started)",
			],
		},
	];

	const renderCandidateList = candidateList.map((candidate, i) => {
		let index = candidate.readiness_index;
		let crColor = index < 40 ? "red" : index > 70 ? "green" : "yellow";
		return (
			<ul key={i}>
				<li>
					{/* <input className="fancy-toggle" id={`row_${i}`} type="checkbox" /> */}
					<label htmlFor={`row_${i}`}>
						<span className="input"></span>
					</label>
				</li>
				<li>
					{/* <Link to="/jobs/candidate-view"> */}
					<Link
						onClick={() => handleRowClick(candidate)}
						to={
							"/jobs/candidate-view/" +
							candidate.job_id +
							"/" +
							candidate.candidate_id
						}
					>
						{/* <img src={faker.image.avatar()} alt="User" /> */}
						<img src={ImgUser} alt="User" />
						{candidate.candidate_name}
					</Link>
				</li>
				<li>{candidate.title}</li>
				<li>{candidate.candidate_experience}</li>
				<li>
					<span className={`cr_index ${crColor}`}>
						{candidate.readiness_index}
					</span>
				</li>
				<li>{candidate.current_organization}</li>
				<li>{candidate.modified_on}</li>
				<li>
					<Dropdown
						placeholder={status.heading}
						content={status.content}
						selected={candidate.status}
						onchange={(item) => handleUpdateStatus(item, candidate.job_app_id)}
					/>
				</li>
				<li>
					<Link
						className="mail"
						onClick={() =>
							handleSendEmail(
								candidate.candidate_id,
								candidate.email_template_id
							)
						}
					>
						<img src={ImgMail} alt="Email" />
					</Link>
					<Link
						className="download"
						onClick={() => handleDownloadClick(candidate)}
					>
						<img src={ImgDownload} alt="Download" />
					</Link>
				</li>
			</ul>
		);
	});

	// console.log(props.candidatesList.length);
	return props.loading ? (
		<Spinner />
	) : (
		<div className="candidate-list">
			<div className="top-heading">
				<h1>
					{/* Candidates for “Certified Nursing Assistant - in Warren New Jersey” */}
					{jobTitle}
				</h1>
				<h3>CredReadiness Index for this job is 75</h3>
			</div>
			{/* <div className="search-panel">
					<div className="searches">
						<input type="text" placeholder="Candidate Name" />
						<Dropdown placeholder={crRange.heading} content="slider" />
						<Dropdown placeholder={status.heading} content={status.content} onchange={handleUpdateStatus} />
						<Dropdown
							placeholder={experience.heading}
							content={experience.content}
						/>
						<Dropdown
							placeholder={currentOrganisation.heading}
							content={currentOrganisation.content}
						/>
					</div>
				</div> */}
			<div className="lists-outer">
				<div className="heading flex">
					<h2>List of Candidate</h2>
					{/* <p>Showing Result 1-10 of 200</p> */}
					<div className="search_filter flex">
						<Input
							type="text"
							placeholder="Search by Name"
							onChange={(e) => handleFreeSearch(e.target.value)}
						/>
						<button
							className="primary-btn blue"
							onClick={() => setFilterOptions(!filterOptions)}
						>
							Filter
						</button>
						<div className={`options ${filterOptions ? "on" : "off"}`}>
							<div className="listing">
								{filtersList.map((filter, i) => {
									let trimTitle = filter.title.replace(/ /g, "");
									return (
										<ul key={i}>
											<li>{filter.title}</li>
											{filter.options.map((option, i) => {
												return (
													<li key={i}>
														<input
															id={`${trimTitle}_${i}`}
															type="checkbox"
															className="fancy-toggle blue"
															onChange={() =>
																handleFilterSelect(
																	option,
																	`${trimTitle}_${i}`,
																	filter.title
																)
															}
														/>
														<label htmlFor={`${trimTitle}_${i}`}>
															<span className="input"></span>
															{option}
														</label>
													</li>
												);
											})}
										</ul>
									);
								})}
							</div>
							<div className="cta">
								<button
									className="primary-btn blue outline"
									onClick={() => setFilterOptions(false)}
								>
									Cancel
								</button>
								<button
									className="primary-btn blue"
									onClick={() => handleApplyFilters()}
								>
									Done
								</button>
							</div>
						</div>
					</div>
				</div>
				{props.candidatesList.length > 0 ? (
					<>
						{/* <div className="actions">
						<div className="left">
							<Link onClick={handleSendEmail} >Send Email</Link>
								&nbsp;&nbsp;{" |  "}&nbsp;&nbsp;
						<Link onClick={handleUpdateStatus}>Change Status</Link>
						</div>
						<div className="right">
							<input
								className="fancy-toggle"
								id="viewRejectedCandidate"
								type="checkbox"
							/>
							<label htmlFor="viewRejectedCandidate">
								<span className="input"></span>View Rejected Candidates
						</label>
						</div>
					</div> */}
						<ul className="lists">
							<li className="list">
								<ul className="head">
									<li>
										{/* <input className="fancy-toggle" id="1" type="checkbox" /> */}
										<label htmlFor="1">
											<span className="input"></span>
										</label>
									</li>
									<li>
										<img src={ImgUser} alt="User" />
										Name
										{/* <SortIcon active="up" /> */}
									</li>
									<li>
										Current Position
										{/* <SortIcon /> */}
									</li>
									<li>Exp (in years)</li>
									<li>CredReadiness</li>
									<li>Current Organization</li>
									<li>Last Update</li>
									<li>Status</li>
									<li>Action</li>
								</ul>
								{renderCandidateList}
							</li>
						</ul>
					</>
				) : (
					<p>No candidates found for this job </p>
				)}
			</div>
			{/* <Pagination /> */}
		</div>
	);
	// )
}

function mapStateToProps(state) {
	return {
		candidatesList: state.employerReducer.candidatesList.data,
		postedJobs: state.employerReducer.postedJobs.data,
		loading: state.commonReducer.apiCallsInProgress,
	};
}

// export default CandidateList;
export default connect(mapStateToProps)(CandidateList);
