import React, { useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { connect, useDispatch } from "react-redux";

import "./index.scss";
import JobDetails from "./JobDetails";
import JobDescription from "./JobDescription";
import ExperienceCertificates from "./ExperienceCertificates";
import EmailTemplate from "./EmailTemplate";
import SpecificQuestions from "./SpecificQuestions";
import CopyLink from "./CopyLink";
import { Link, useParams } from "react-router-dom";
import { jobToUpdate } from "../../../store/actions/employer";
import { getPostedJobs } from "../../../store/thunks/employer";
import Spinner from "../../_Elements/Spinner";
import { setPostedJobURL } from "../../../store/actions/employer";

let scrollBarStyle = {
	height: "calc(100vh - 280px)",
	transition: "all 0.2s ease",
};

let scrollHeights = [];
let count = 0;

function CreateJob(props) {
	count++;
	let { jobId } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setPostedJobURL(null));
	}, [dispatch]);

	useEffect(() => {
		dispatch(getPostedJobs("update", jobId));
		//	dispatch(jobToUpdate(jobId));
	}, [dispatch, jobId]);

	useEffect(() => {
		console.log("props.jobURL...", props.jobURL);
	}, [props]);

	let heights = [0];
	const [activeTab, setActiveTab] = React.useState(0);
	const [enableLink, setEnableLink] = React.useState(false);
	const [isClicked, setIsClicked] = React.useState(false);

	const scrollBar = React.useRef();

	const handleScroll = (i) => {
		setIsClicked(true);
		setActiveTab(i);
		let scrollTo = heights[i] + i * 30;
		scrollBar.current.view.scroll({
			top: scrollTo,
			behavior: "smooth",
		});
	};

	const calHeight = (height) => {
		let lastHeight = heights[heights.length - 1];
		heights.push(lastHeight + height);
		if (heights.length < 7) {
		}
		scrollHeights = [];
		calScrollHeight();
	};

	const calScrollHeight = () => {
		for (let i = 0; i < heights.length; i++) {
			scrollHeights.push(heights[i] + i * 30);
		}
	};

	const handleScrolling = (e) => {
		let t = e.target.scrollTop;
		if (!isClicked) {
			for (let i = 0; i < scrollHeights.length; i++) {
				if (t > scrollHeights[i] && t < scrollHeights[i + 1]) {
					setActiveTab(i);
				} else if (t > scrollHeights[scrollHeights.length - 1]) {
					setActiveTab(scrollHeights.length - 1);
				}
			}
		}
	};

	const handleScrollStop = () => {
		setIsClicked(false);
	};

	useEffect(() => {
		if (enableLink) {
			scrollBar.current &&
				scrollBar.current.view.scroll({
					top:
						document.getElementById("copyLink") &&
						document.getElementById("copyLink").offsetTop,
					behavior: "smooth",
				});
		}
		return () => {
			// cleanup
		};
	}, [enableLink]);

	/* TO SHOW SPINNER ONLY WHEN PAGE LOADS FIRST TIME */
	return props.loading && count === 1 ? (
		<Spinner />
	) : (
		<div className="create-job-page">
			<h1 className="common-heading">
				{jobId ? "Update " + props.jobToUpdate.job_title : "Create the Job"}
			</h1>

			<div className="outer">
				<div className="left">
					<ul>
						<li
							className={`${enableLink ? "done" : ""} ${
								activeTab === 0 ? "active" : ""
							}`}
							onClick={() => handleScroll(0)}
						>
							Job Details
							<span className="common-check-icon"></span>
						</li>
						<li
							className={`${enableLink ? "done" : ""} ${
								activeTab === 1 ? "active" : ""
							}`}
							onClick={() => handleScroll(1)}
						>
							Job Description <span className="common-check-icon"></span>
						</li>
						<li
							className={`${enableLink ? "done" : ""} ${
								activeTab === 2 ? "active" : ""
							}`}
							onClick={() => handleScroll(2)}
						>
							Experience and Certificate{" "}
							<span className="common-check-icon"></span>
						</li>
						<li
							className={`${enableLink ? "done" : ""} ${
								activeTab === 3 ? "active" : ""
							}`}
							onClick={() => handleScroll(3)}
						>
							Email Template <span className="common-check-icon"></span>
						</li>
						<li
							className={`${enableLink ? "done" : ""} ${
								activeTab === 4 ? "active" : ""
							}`}
							onClick={() => handleScroll(4)}
						>
							Specific Questions <span className="common-check-icon"></span>
						</li>
						<li
							className={` ${activeTab === 5 ? "active" : ""}`}
							// onClick={() => handleScroll(5)}
						>
							Copy Link <span className="common-check-icon"></span>
						</li>
					</ul>
				</div>
				<div className="right">
					<Scrollbars
						onScroll={handleScrolling}
						onScrollStop={handleScrollStop}
						ref={scrollBar}
						className="custom-scrollbar"
						style={scrollBarStyle}
						// autoHide
						autoHideTimeout={1000}
						autoHideDuration={600}
						renderTrackVertical={({ style, ...props }) => (
							<div
								{...props}
								className="bar"
								style={{
									...style,
								}}
							/>
						)}
						renderTrackHorizontal={() => (
							<div
								style={{
									display: "none",
								}}
							/>
						)}
					>
						{props.jobURL === null ? (
							<>
								<JobDetails calHeight={calHeight} />
								<JobDescription calHeight={calHeight} />
								<ExperienceCertificates calHeight={calHeight} />
								<EmailTemplate calHeight={calHeight} />
								<SpecificQuestions
									onEnableLink={() => {
										setActiveTab(5);
										setEnableLink(true);
										setIsClicked(true);
									}}
									calHeight={calHeight}
								/>
							</>
						) : (
							<CopyLink calHeight={calHeight} />
						)}

						<div className="blank"></div>
					</Scrollbars>
				</div>
			</div>
		</div>
	);
}

// export default CreateJob;

function mapStateToProps(state) {
	return {
		loading: state.commonReducer.apiCallsInProgress,
		jobToUpdate: state.employerReducer.jobToUpdate,
		jobURL: state.employerReducer.jobURL,
	};
}

// export default PostedJobs;
export default connect(mapStateToProps)(CreateJob);
