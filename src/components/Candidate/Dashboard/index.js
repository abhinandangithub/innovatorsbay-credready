import React from "react";

import "./index.scss";
import userData from "../../_data/userData.json";
import widgetLogo from "../../../assets/widget-logo.jpg";
import WidgetCurrentGoal from "../../_Elements/Widgets/CurrentGoal";
import WidgetLatestOpenings from "../../_Elements/Widgets/LatestOpenings";
import CredReadyIndex from "../../_Elements/CredReadyIndex";

function Dashboard() {
	const currentGoals = userData.goals.current.map((goal, i) => {
		return <WidgetCurrentGoal goal={goal} key={i} />;
	});

	const latestOpenings = userData.openings.map((opening, i) => {
		return <WidgetLatestOpenings job={opening} key={i} />;
	});

	return (
		<div className="dashboard-candidate">
			<div className="common-main-heading">
				<h2>Dashboard</h2>
				<button className="btn">Sory by</button>
			</div>
			<div className="search-panel">
				<div className="searches">
					<input type="text" placeholder="Search by Job Title" />
					<input type="text" placeholder="Search by Location" />
					<input type="text" placeholder="Search by Salary" />
				</div>
			</div>

			<div className="application-status">
				<div className="common-main-heading no-icon">
					<h2>Application Status</h2>
					<button className="btn">View All &gt;</button>
				</div>
				<div className="listing flex">
					<div className="left">
						<ul>
							<li>
								<div className="logo">
									<img src={widgetLogo} alt="Logo" />
								</div>
								<div className="text">
									<h2>Certified Nursing Assistant</h2>
									<p>
										Presbyterian Hospital - Warren, New Jersey Applied on 20
										June 2020
									</p>
								</div>
								<button className="primary-btn outline">Interviewed</button>
							</li>
							<li className="active">
								<div className="logo">
									<img src={widgetLogo} alt="Logo" />
								</div>
								<div className="text">
									<h2>Certified Nursing Assistant</h2>
									<p>
										Presbyterian Hospital - Warren, New Jersey Applied on 20
										June 2020
									</p>
								</div>
								<button className="primary-btn outline">Interviewed</button>
							</li>
							<li>
								<div className="logo">
									<img src={widgetLogo} alt="Logo" />
								</div>
								<div className="text">
									<h2>Certified Nursing Assistant</h2>
									<p>
										Presbyterian Hospital - Warren, New Jersey Applied on 20
										June 2020
									</p>
								</div>
								<button className="primary-btn outline">Interviewed</button>
							</li>
							<li>
								<div className="logo">
									<img src={widgetLogo} alt="Logo" />
								</div>
								<div className="text">
									<h2>Certified Nursing Assistant</h2>
									<p>
										Presbyterian Hospital - Warren, New Jersey Applied on 20
										June 2020
									</p>
								</div>
								<button className="primary-btn outline">Interviewed</button>
							</li>
						</ul>
					</div>
					<div className="right flex">
						<CredReadyIndex index={90} />
					</div>
				</div>
			</div>

			<div className="current-goals">
				<div className="common-main-heading no-icon">
					<h2>Current Goals</h2>
					<button className="btn">&lt; 3 / 4 &gt;</button>
				</div>
				<div className="widgets">{currentGoals}</div>
			</div>

			<div className="alternate-goals">
				<div className="common-main-heading no-icon">
					<h2>Latest Openings</h2>
					<button className="btn">&lt; 3 / 4 &gt;</button>
				</div>
				<div className="widgets">{latestOpenings}</div>
			</div>
		</div>
	);
}

export default Dashboard;
