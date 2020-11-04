import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";
import userData from "../../_data/userData.json";
import WidgetCurrentGoal from "../../_Elements/Widgets/CurrentGoal";

function Goals() {
	const currentGoals = userData.goals.current.map((goal, i) => {
		return <WidgetCurrentGoal goal={goal} key={i} />;
	});

	const alternateGoals = userData.goals.alternate.map((goal, i) => {
		return <WidgetCurrentGoal goal={goal} key={i} />;
	});

	return (
		<div className="goals">
			<div className="search-panel">
				<div className="common-main-heading">
					<h2>My Goals</h2>
					<button className="btn">Sory by</button>
				</div>
				<div className="searches">
					<input type="text" placeholder="Search by Goal Title" />
					<input type="text" placeholder="Search by Location" />
					<input type="text" placeholder="Search by Salary" />
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
					<h2>Alternate Goals</h2>
					<button className="btn">&lt; 3 / 4 &gt;</button>
				</div>
				<div className="widgets">{alternateGoals}</div>
			</div>

			<div className="cta">
				<Link className="primary-btn blue" to="goals/explore-goals">
					Click here for Explore Career Options
				</Link>
			</div>
		</div>
	);
}

export default Goals;
