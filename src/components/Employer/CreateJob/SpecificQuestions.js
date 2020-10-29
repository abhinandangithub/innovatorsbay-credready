import React from "react";

import "./Questions/index.scss";
import PersonalityAssessment from "./Questions/PersonalityAssessment";
import CourseWork from "./Questions/CourseWork";
import WorkHistory from "./Questions/WorkHistory";
import CommuteQuestions from "./Questions/CommuteQuestions";
import GeneralQuestions from "./Questions/GeneralQuestions";
import JobSpecificQuestions from "./Questions/JobSpecificQuestions";
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { postJob } from "../../../store/thunks/employer";
import { useToasts } from "react-toast-notifications";

function SpecificQuestions(props) {
	let { jobId } = useParams();
	const { addToast } = useToasts();

	const parent = React.useRef();
	const [activeTab, setActiveTab] = React.useState(0);

	React.useEffect(() => {
		// props.calHeight(parent.current.clientHeight);
	}, [props]);

	const handleTabClick = (i) => {
		setActiveTab(i);
	};
	const dispatch = useDispatch();

	const handlePostJob = () => {
		let message = undefined;
		if (!props.jobData.emailTemplateId) {
			message = "<p>Please select email template.  </p> ";
		} if (!props.jobData.employmentType) {
			message += "<p>Please select employment type. </p> ";
		} if (!props.jobData.function) {
			message += "<p>Please select function.</p>";
		} if (!props.jobData.industry) {
			message += "<p>Please select industry.</p>";
		} if (!props.jobData.jobDescription) {
			message += "<p>Please select email template.</p>";
		} if (!props.jobData.jobCertificateMap.length) {
			message += "<p>Please select atleast one certificate.</p>";
		} if (!props.jobData.location) {
			message += "<p>Please select location.</p>";
		} if (!props.jobData.jobTitle) {
			message += "<p>Please select job title.</p>";
		}
		else {
			props.onEnableLink();
			dispatch(
				postJob(jobId)
			);
		}
		if (!!message) {
			addToast(<div dangerouslySetInnerHTML={{ __html: message }}></div>, {
				appearance: "warning",
				autoDismiss: true,
				placement: 'top-center'
			});
		}
	};

	return (
		<>
			<div className="specific-questions" ref={parent}>
				<div className="heading">
					<ul>
						<li
							onClick={() => handleTabClick(0)}
							className={activeTab === 0 ? "active" : ""}
						>
							CredReady Questions
						</li>
						<li
							onClick={() => handleTabClick(1)}
							className={activeTab === 1 ? "active" : ""}
						>
							General Questions
						</li>
						<li
							onClick={() => handleTabClick(2)}
							className={activeTab === 2 ? "active" : ""}
						>
							Employer Questions
						</li>
					</ul>
				</div>
				<div className="content questions_employer">
					{activeTab === 0 ? (
						<div>
							<PersonalityAssessment />
							<CourseWork />
							<WorkHistory />
							<CommuteQuestions />
						</div>
					) : activeTab === 1 ? (
						<GeneralQuestions />
					) : (
								<JobSpecificQuestions />
							)}
				</div>
			</div>

			{/* T/F: {props.jobData.emailTemplateId &&
				props.jobData.employmentType && props.jobData.function &&
				props.jobData.industry && props.jobData.jobDescription &&
				props.jobData.jobCertificateMap.length && props.jobData.jobTitle &&
				props.jobData.location}<br></br>*/}
			{/* 
			wmail: {props.jobData.emailTemplateId}><br></br>
			employmentType: {props.jobData.employmentType}<br></br>
			function:{props.jobData.function}<br></br>
			industry:{props.jobData.industry}<br></br>
			jobDescription:{props.jobData.jobDescription}<br></br>
			jobCertificateMap:{props.jobData.jobCertificateMap.length} <br></br>
			jobTitle:{props.jobData.jobTitle}<br></br>
			location:{props.jobData.location}<br></br> */}

			<div className="cta">
				<Link
					//to="/jobs/create-job"
					// style={{
					// 	pointerEvents: props.jobData.emailTemplateId &&
					// 		props.jobData.employmentType && props.jobData.function &&
					// 		props.jobData.industry && props.jobData.jobDescription &&
					// 		props.jobData.jobCertificateMap.length && props.jobData.jobTitle &&
					// 		props.jobData.location ? 'visible' : 'none'
					// }}
					className="primary-btn blue"
					onClick={handlePostJob}
				>
					{jobId ? "Update the job" : "Post the job"}
				</Link>
			</div>
		</>
	);
}

//export default SpecificQuestions;

function mapStateToProps(state) {
	return {
		jobToUpdate: state.employerReducer.jobToUpdate,
		jobData: state.employerReducer.newJob
	};
}

export default connect(mapStateToProps)(SpecificQuestions);
