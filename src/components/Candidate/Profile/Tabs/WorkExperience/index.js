import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./index.scss";
import Accordion from "../../../../_Elements/Accordion";
import {
	togglePopup,
	toggleOverlay,
} from "../../../../../store/actions/popup_overlay";
import { fetchCandidateDetails } from "../../../../../modals/candidateProfile/thunk";

function WorkExperience(props) {
	const dispatch = useDispatch();

	const work_experience = useSelector(
		(state) => state.candidateSetDataReducer.data.work_experience
	);
	const additional_experiences = useSelector(
		(state) => state.candidateSetDataReducer.data.additional_experiences
	);

	const handleEdit = (id, type) => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, type, { id, purpose: "edit" }]));
	};
	const handleDelete = (id, type) => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "delete", { what: type, id: id }]));
	};

	React.useEffect(() => {
		dispatch(fetchCandidateDetails());
	}, [dispatch]);

	const renderWorkExperiences = work_experience.map((data, i) => {
		return (
			<div className="content" key={i}>
				<h2>{data.title}</h2>
				<h3>
					{data.company} - <span>{data.location}</span>
				</h3>
				<h4>
					<span>{data.employment_from}</span> -{" "}
					<span>{data.employment_to}</span>
				</h4>
				<p className="description">
					<span className="heading">Description: </span>
					<span className="text">{data.job_description}</span>
				</p>
				<FontAwesomeIcon
					className="action-btn edit"
					icon={faPen}
					id={"workExperienceEdit_" + i}
					onClick={() => handleEdit(data.work_ex_id, "addWorkExperience")}
				/>
				<FontAwesomeIcon
					className="action-btn delete"
					icon={faTrash}
					id={"workExperienceDelete_" + i}
					onClick={() => handleDelete(data.work_ex_id, "workExperience")}
				/>
			</div>
		);
	});

	const renderOtherExperiences = additional_experiences.map((data, i) => {
		if (data.career_path === "work") {
			return (
				<div className="content" key={i}>
					<h2>{data.title}</h2>
					<h3>
						{data.organization_name} - <span>{data.description}</span>
					</h3>
					<h4>
						<span>{data.employed_from}</span> -{" "}
						<span>{data.employed_till}</span>
					</h4>
					<p className="description">
						<span className="heading">Description: </span>
						<span className="text">{data.description}</span>
					</p>
					<FontAwesomeIcon
						className="action-btn edit"
						icon={faPen}
						id={"otherExperienceEdit_" + i}
						onClick={() => handleEdit(data.id, "addOtherExperience")}
					/>
					<FontAwesomeIcon
						className="action-btn delete"
						icon={faTrash}
						id={"otherExperienceDelete_" + i}
						onClick={() => handleDelete(data.id, "otherExperience")}
					/>
				</div>
			);
		}
	});

	return (
		<div className="work-experience">
			<Accordion
				title="Work Experience"
				type="addWorkExperience"
				addButton="Add Work Experience"
				id="addWorkExperienceAccordion"
			>
				{renderWorkExperiences}
			</Accordion>
			<Accordion
				title="Other Experiences"
				type="addOtherExperience"
				addButton="Add Other Experience"
				id="addOtherExperienceAccordion"
			>
				{renderOtherExperiences}
			</Accordion>

			<div className="cta">
				<Link
					to="/profile/personal-details"
					className="primary-btn blue outline"
					id="previousLink"
				>
					Previous
				</Link>
				<Link
					to="/profile/education"
					className="primary-btn blue"
					id="nextLink"
				>
					Next
				</Link>
			</div>
		</div>
	);
}

export default WorkExperience;
