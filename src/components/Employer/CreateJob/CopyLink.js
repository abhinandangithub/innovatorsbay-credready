import React, { useState } from "react";
import Input from "../../_Elements/Input";
import { connect, useDispatch } from "react-redux";
import { postJob } from "../../../store/thunks/employer";
import { Link } from "react-router-dom";

function CopyLink(props) {
	const parent = React.useRef();
	const dispatch = useDispatch();
	const [URL, setURL] = useState("www.credready.com/jobs/chelsea/2367");

	React.useEffect(() => {
		props.calHeight(parent.current.clientHeight);
	}, [props]);

	const handlePostJob = () => {
		dispatch(
			postJob({
				emailTemplateId: 3,
				employmentType: 3,
				function: 1,
				industry: 1,
				jobDescription: "Some nice job description",
				jobQuestionnaireMap: [1, 2, 3],
				jobTitle: "Senior Nursing Assistant",
				location: 3,
				maxExp: 1,
				minExp: 4,
				openPositions: 15,
			})
		);
	};

	return (
		<>
			<div className="copy-link" ref={parent} id="copyLink">
				<div className="heading">
					<h2>
						Add to Your Website and Job Postings <span>*</span>
					</h2>
				</div>
				<div className="content">
					<h2 className="thank-you">
						{/* Thank you, You have successfully posted “C.N.A in Warren New Jersey” */}
						{"Thank you, You have successfully posted " + props.newJob.jobTitle}
					</h2>
					<p className="status">We have sent you a confirmation email.</p>
					<p className="link">Here is the link to the post on CredReady.com</p>
					<Input
						value={props.jobURL}
						onChange={(e) => setURL(e.target.value)}
					/>
					<p className="status">
						Please paste this link in your job post. So that they may apply
						through CredReady.
					</p>
					<p className="link">
						Here are the steps to add this link to your website{" "}
					</p>
					<p className="status">
						Let the world know you`re hiring! Add the C.N.A job to any page on
						your website tp promote your open positions!{" "}
					</p>
					<p className="link">1. Copy the code: </p>
					<textarea
						name="link"
						id="link"
						defaultValue={`<a href=${props.jobURL} id='jobs_embed_link' tartget='_black'> ${props.newJob.jobTitle}</a>`}
					></textarea>
					{/* <a href="www.credready.com/jobs/chelsea/2367" id="jobs_embed_link" tartget="_black">
						{props.newJob.jobTitle}</a> */}
					<p className="link">
						2. Paste into your job post to direct applicants to CredReady.
					</p>
				</div>
			</div>
			<div className="cta">
				<Link to="/jobs" className="primary-btn blue">
					View the Job
				</Link>
			</div>
		</>
	);
}

function mapStateToProps(state) {
	return {
		//jobURL: state.employerReducer.jobURL.replace("https://dev.innovatorsbay.in/credready/jobs/", "http://localhost:3000/postings/")
		jobURL: state.employerReducer.jobURL,
		newJob: state.employerReducer.newJob,
	};
}

// export default CopyLink;

export default connect(mapStateToProps)(CopyLink);
