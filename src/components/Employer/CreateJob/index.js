import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

import "./index.scss";
import JobDetails from "./JobDetails";
import JobDescription from "./JobDescription";
import ExperienceCertificates from "./ExperienceCertificates";
import EmailTemplate from "./EmailTemplate";
import SpecificQuestions from "./SpecificQuestions";
import CopyLink from "./CopyLink";

let scrollBarStyle = {
	height: "calc(100vh - 280px)",
	transition: "all 0.2s ease",
};

function CreateJob() {
	let heights = [0];
	const [activeTab, setActiveTab] = React.useState(0);

	const scrollBar = React.useRef();

	const handleScroll = (i) => {
		// console.log(heights, scrollTo, i);
		setActiveTab(i);
		let scrollTo = heights[i] + i * 30;
		// scrollBar.current.scrollTop(scrollTo);
		scrollBar.current.view.scroll({
			top: scrollTo,
			behavior: "smooth",
		});
	};

	React.useEffect(() => {
		return () => {
			// cleanup
		};
	}, []);

	const calHeight = (height) => {
		let lastHeight = heights[heights.length - 1];
		heights.push(lastHeight + height);
	};

	return (
		<div className="create-job-page">
			<h1 className="common-heading">Create a Job</h1>

			<div className="outer">
				<div className="left">
					<ul>
						<li
							className={`done ${activeTab === 0 ? "active" : ""}`}
							onClick={() => handleScroll(0)}
						>
							Job Details
							<span className="common-check-icon"></span>
						</li>
						<li
							className={`${activeTab === 1 ? "active" : ""}`}
							onClick={() => handleScroll(1)}
						>
							Job Description <span className="common-check-icon"></span>
						</li>
						<li
							className={`${activeTab === 2 ? "active" : ""}`}
							onClick={() => handleScroll(2)}
						>
							Experience and Certificate{" "}
							<span className="common-check-icon"></span>
						</li>
						<li
							className={`${activeTab === 3 ? "active" : ""}`}
							onClick={() => handleScroll(3)}
						>
							Email Template <span className="common-check-icon"></span>
						</li>
						<li
							className={`${activeTab === 4 ? "active" : ""}`}
							onClick={() => handleScroll(4)}
						>
							Specific Questions <span className="common-check-icon"></span>
						</li>
						<li
							className={`${activeTab === 5 ? "active" : ""}`}
							onClick={() => handleScroll(5)}
						>
							Copy Link <span className="common-check-icon"></span>
						</li>
					</ul>
				</div>
				<div className="right">
					<Scrollbars
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
						{/* <JobDetails calHeight={calHeight} />
						<JobDescription calHeight={calHeight} />
						<ExperienceCertificates calHeight={calHeight} />
						<EmailTemplate calHeight={calHeight} /> */}
						<SpecificQuestions calHeight={calHeight} />
						<CopyLink calHeight={calHeight} />
						<div className="blank"></div>
					</Scrollbars>
				</div>
			</div>
		</div>
	);
}

export default CreateJob;
