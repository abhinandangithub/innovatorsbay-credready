import React, { useState } from "react";
import DatePicker from "react-datepicker";
// import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

import "./index.scss";
import CandidateView from "../CandidateView";
import PostJob from "../PostJob";
import Dropdown from "../../_Elements/Dropdown";
import ImgWD1 from "../../../assets/wd-1.jpg";
import ImgWD2 from "../../../assets/wd-2.jpg";
import ImgWD3 from "../../../assets/wd-3.jpg";
import ImgWD4 from "../../../assets/wd-4.jpg";
import ImgWD5 from "../../../assets/wd-5.jpg";
// import ImgWD6 from "../../../assets/wd-6.jpg";
import ImgWD7 from "../../../assets/wd-7.jpg";
import ImgWD8 from "../../../assets/wd-8.jpg";

const metrics = {
	heading: "Select Metrics",
	content: ["All", "Certified Nursing Assistant", "Personal Care Aid"],
};

function Dashboard() {
	const [fromDate, setFromDate] = useState();
	const [toDate, setToDate] = useState();

	return (
		<div className="dashboard-employer">
			{/* <BreadcrumbsItem to="/">Dashboard</BreadcrumbsItem> */}
			{/* <PostJob /> */}
			{/* <CandidateView /> */}
			<div className="numbers">
				<div className="common-main-heading">
					<h2>Dashboard</h2>
				</div>
				<ul>
					<li>
						<h2>5</h2>
						<p>Job Posted</p>
					</li>
					<li>
						<h2>6</h2>
						<p>Open Positions</p>
					</li>
					<li>
						<h2>4</h2>
						<p>New Applications</p>
					</li>
					<li>
						<h2>3</h2>
						<p>Interviewed</p>
					</li>
					<li>
						<h2>2</h2>
						<p>Offer Placed</p>
					</li>
				</ul>
			</div>

			<div className="filters flex">
				<div className="left flex">
					<h3>Show Metrics For</h3>
					<Dropdown placeholder={metrics.heading} content={metrics.content} />
				</div>
				<div className="right flex">
					<h3>Duration</h3>
					<div className="start-date">
						<DatePicker
							selected={fromDate}
							onChange={(date) => setFromDate(date)}
							placeholderText="Start Date"
						/>
					</div>
					<div className="date">
						<DatePicker
							selected={toDate}
							onChange={(date) => setToDate(date)}
							placeholderText="End Date"
						/>
					</div>
				</div>
			</div>

			<div className="widgets widgets-dashboard">
				<div className="widget">
					<div className="heading">Recruitment funnel</div>
					<div className="content">
						<img src={ImgWD1} alt="Recruitment funnel" />
					</div>
				</div>
				<div className="widget">
					<div className="heading">
						Trend of applications received over time
					</div>
					<div className="content">
						<img src={ImgWD2} alt="Trend of applications received over time" />
					</div>
				</div>
				<div className="widget">
					<div className="heading">
						Ratio of offers made to candidates interviewed
					</div>
					<div className="content">
						<img
							src={ImgWD3}
							alt="Ratio of offers made to candidates interviewed"
						/>
					</div>
				</div>
				<div className="widget">
					<div className="heading">Applications by source</div>
					<div className="content">
						<img src={ImgWD4} alt="Applications by source" />
					</div>
				</div>
				<div className="widget">
					<div className="heading">
						Number of applicants across average days to hire
					</div>
					<div className="content">
						<img
							src={ImgWD5}
							alt="Number of applicants across average days to hire"
						/>
					</div>
				</div>
				<div className="widget">
					{/* <div className="heading">Distribution of application by location</div>
					<div className="content">
						<img src={ImgWD6} alt="Distribution of application by location" />
					</div> */}
				</div>
			</div>

			<h2>Job Posts</h2>
			<div className="widgets widgets-dashboard">
				<div className="widget">
					<div className="content">
						<img src={ImgWD7} alt="Job Posts" />
					</div>
				</div>
				<div className="widget">
					<div className="content">
						<img src={ImgWD8} alt="Job Posts" />
					</div>
				</div>
				<div className="widget"></div>
			</div>
		</div>
	);
}

export default Dashboard;
