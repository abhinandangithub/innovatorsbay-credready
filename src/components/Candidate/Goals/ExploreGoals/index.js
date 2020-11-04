import React from "react";

import "./index.scss";
import userData from "../../../_data/userData.json";
import WidgetExploreGoal from "../../../_Elements/Widgets/ExploreGoal";
import Input from "../../../_Elements/Input";

const careerOptions = [
	{
		title: "Building and fixing things",
		child: ["Title 1", "Title 2"],
	},
	{
		title: "Computers",
		child: ["Title 1", "Title 2"],
	},
	{
		title: "Food",
		child: ["Title 1", "Title 2"],
	},
	{
		title: "Healthcare",
		child: [
			"Pharmacist",
			"Certified Nursing Assistant",
			"Registered Nurse",
			"Optometrist",
			"Doctor",
		],
	},
	{
		title: "Helping your community",
		child: ["Title 1", "Title 2"],
	},
	{
		title: "Law",
		child: ["Title 1", "Title 2"],
	},
	{
		title: "Managing Money",
		child: ["Title 1", "Title 2"],
	},
	{
		title: "Maths",
		child: ["Title 1", "Title 2"],
	},
	{
		title: "Music and art",
		child: ["Title 1", "Title 2"],
	},
	{
		title: "Nature",
		child: ["Title 1", "Title 2"],
	},
	{
		title: "Reading",
		child: ["Title 1", "Title 2"],
	},
	{
		title: "Science",
		child: ["Title 1", "Title 2"],
	},
	{
		title: "Social Studies",
		child: ["Title 1", "Title 2"],
	},
	{
		title: "Sports",
		child: ["Title 1", "Title 2"],
	},
	{
		title: "Teaching",
		child: ["Title 1", "Title 2"],
	},
	{
		title: "Transportation",
		child: ["Title 1", "Title 2"],
	},
];
let prevActiveId = null;

function ExploreGoals() {
	const [activeId, setActiveId] = React.useState();

	const exploreGoals = userData.goals.current.map((goal, i) => {
		return <WidgetExploreGoal goal={goal} key={i} />;
	});

	const handleMainClick = (id) => {
		id = prevActiveId === id ? null : id;
		prevActiveId = id;
		setActiveId(id);
	};

	return (
		<div className="explore-goals">
			<div className="common-main-heading no-icon">
				<h2>Explore Career Options</h2>
			</div>
			<div className="outer">
				<div className="left">
					<Input type="text" placeholder="Search by Job Title" />
					<ul>
						{careerOptions.map((career, i) => {
							return (
								<li key={i}>
									<div
										className={`top_1${activeId === i ? " active" : ""}`}
										onClick={() => handleMainClick(i)}
									>
										{career.title} <span>{activeId === i ? "-" : "+"}</span>
									</div>
									<ul>
										{career.child.map((title, i) => {
											return (
												<li key={i}>
													<div className="top_2">
														{title}
														<span className="common-check-icon active"></span>
													</div>
												</li>
											);
										})}
									</ul>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="right">
					<div className="widgets">{exploreGoals}</div>
				</div>
			</div>
		</div>
	);
}

export default ExploreGoals;
