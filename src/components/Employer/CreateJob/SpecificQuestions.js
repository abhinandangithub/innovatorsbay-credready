import React from "react";

import "./Questions/index.scss";
import PersonalityAssessment from "./Questions/PersonalityAssessment";
import CourseWork from "./Questions/CourseWork";
import WorkHistory from "./Questions/WorkHistory";
import CommuteQuestions from "./Questions/CommuteQuestions";
import GeneralQuestions from "./Questions/GeneralQuestions";
import JobSpecificQuestions from "./Questions/JobSpecificQuestions";

function SpecificQuestions(props) {
	const parent = React.useRef();
	const [activeTab, setActiveTab] = React.useState(0);

	React.useEffect(() => {
		// props.calHeight(parent.current.clientHeight);
	}, [props]);

	const handleTabClick = (i) => {
		setActiveTab(i);
	};

	return (
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
	);
}

export default SpecificQuestions;
