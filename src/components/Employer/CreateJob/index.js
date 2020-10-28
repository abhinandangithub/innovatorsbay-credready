import React, { useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { useParams } from "react-router-dom";
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

let scrollHeights = [];

function CreateJob() {
	const { action } = useParams();
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
			console.log("Scrolling", isClicked);
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
		console.log(heights, scrollHeights);
		return () => {
			// cleanup
		};
	}, []);

	return (
		<div className="create-job-page">
			<h1 className="common-heading">Create a Job</h1>

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
						<JobDetails calHeight={calHeight} />
						<JobDescription calHeight={calHeight} />
						<ExperienceCertificates calHeight={calHeight} />
						<EmailTemplate calHeight={calHeight} />
						<SpecificQuestions
							onEnableLink={() => {
								setActiveTab(5);
								setEnableLink(true);
								scrollBar.current.view.scroll({
									top: scrollHeights[scrollHeights.length - 1] + 60,
									behavior: "smooth",
								});
								setIsClicked(true);
							}}
							calHeight={calHeight}
						/>
						{enableLink ? <CopyLink calHeight={calHeight} /> : null}
						<div className="blank"></div>
					</Scrollbars>
				</div>
			</div>
		</div>
	);
}

export default CreateJob;
