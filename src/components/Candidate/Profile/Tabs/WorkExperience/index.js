import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./index.scss";
import Accordion from "../../../../_Elements/Accordion";
import userData from "../../../../_data/userData.json";
import {
	togglePopup,
	toggleOverlay,
} from "../../../../../store/actions/popup_overlay";

function WorkExperience() {
	const dispatch = useDispatch();

	const handleEdit = () => {
		// console.log("editing");
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "addWorkExperience"]));
	};
	const handleDelete = (type) => {
		// console.log("deleting");
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "delete", { what: type }]));
	};

	const renderWorkExperiences = userData.profile.workExperiences.map(
		(data, i) => {
			return (
				<div className="content" key={i}>
					<h2>{data.title}</h2>
					<h3>
						{data.company} - <span>{data.location}</span>
					</h3>
					<h4>
						<span>{data.date.from}</span> - <span>{data.date.to}</span>
					</h4>
					<p className="description">
						<span className="heading">Description: </span>
						<span className="text">{data.description}</span>
					</p>
					<FontAwesomeIcon
						className="action-btn edit"
						icon={faPen}
						id={"workExperienceEdit_" + i}
						onClick={handleEdit}
					/>
					<FontAwesomeIcon
						className="action-btn delete"
						icon={faTrash}
						id={"workExperienceDelete_" + i}
						onClick={() => handleDelete("workExperience")}
					/>
				</div>
			);
		}
	);

	const renderOtherExperiences = userData.profile.otherExperiences.map(
		(data, i) => {
			return (
				<div className="content" key={i}>
					<h2>{data.title}</h2>
					<h3>
						{data.company} - <span>{data.location}</span>
					</h3>
					<h4>
						<span>{data.date.from}</span> - <span>{data.date.to}</span>
					</h4>
					<p className="description">
						<span className="heading">Description: </span>
						<span className="text">{data.description}</span>
					</p>
					<FontAwesomeIcon
						className="action-btn edit"
						icon={faPen}
						id={"otherExperienceEdit_" + i}
						onClick={handleEdit}
					/>
					<FontAwesomeIcon
						className="action-btn delete"
						icon={faTrash}
						id={"otherExperienceDelete_" + i}
						onClick={() => handleDelete("otherExperience")}
					/>
				</div>
			);
		}
	);

	return (
		<div className="work-experience">
			<Accordion
				title="Work Experience"
				type="addWorkExperience"
				addButton="Add Work Experience"
				id="addWorkExperienceAccordion"
				active
			>
				{renderWorkExperiences}
			</Accordion>
			<Accordion
				title="Other Experiences"
				type="addOtherExperience"
				addButton="Add Other Experience"
				id="addOtherExperienceAccordion"
				active
			>
				{renderOtherExperiences}
			</Accordion>

			<div className="cta">
				<Link
					to="/profile/personal-details"
					className="primary-btn outline"
					id="previousLink"
				>
					Previous
				</Link>
				<Link to="/profile/education" className="primary-btn" id="nextLink">
					Next
				</Link>
			</div>
		</div>
	);
}

export default WorkExperience;
