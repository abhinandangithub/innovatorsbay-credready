import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";

import "./index.scss";
import Accordion from "../../../../_Elements/Accordion";
import userData from "../../../../_data/userData.json";
import {
	togglePopup,
	toggleOverlay,
} from "../../../../../store/actions/popup_overlay";
import { fetchCandidateDetails } from "../../../../../modals/candidateProfile/thunk";

function WorkExperience(props) {
	const dispatch = useDispatch();
	const [workExperieneData, setworkExperieneData] = React.useState(props.workExpData);
	const [otherExperienceData, setotherExperienceData] = React.useState(props.otherExpData)

	const handleEdit = (id, type) => {
		console.log(id);
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, type, id]));
	};
	const handleDelete = (type) => {
		// console.log("deleting");
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "delete", { what: type }]));
	};

	React.useEffect(() => {
		dispatch(fetchCandidateDetails());
	}, [workExperieneData, otherExperienceData])

	// const renderWorkExperiences = userData.profile.workExperiences.map(
	const renderWorkExperiences = workExperieneData.length > 0 ? workExperieneData.map(

		(data, i) => {
			return (
				<div className="content" key={i}>
					<h2>{data.title}</h2>
					<h3>
						{data.company} - <span>{data.location}</span>
					</h3>
					<h4>
						<span>{data.employment_from}</span> - <span>{data.employment_to}</span>
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
						onClick={() => handleDelete("workExperience")}
					/>
				</div>
			);
		}
	) : ""

	// const renderOtherExperiences = userData.profile.otherExperiences.map(
	const renderOtherExperiences = otherExperienceData.length > 0 ? otherExperienceData.map(
		(data, i) => {
			return (
				<div className="content" key={i}>
					<h2>{data.title}</h2>
					<h3>
						{data.organization_name} - <span>{data.description}</span>
					</h3>
					<h4>
						<span>{data.employment_from}</span> - <span>{data.employed_till}</span>
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
						onClick={() => handleDelete("otherExperience")}
					/>
				</div>
			);
		}
	) : "";

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
function mapStateToProps(state) {
	return {
		workExpData: state.candidateSetDataReducer && state.candidateSetDataReducer.data && state.candidateSetDataReducer.data.work_experience ? state.candidateSetDataReducer.data.work_experience : [],
		otherExpData: state.candidateSetDataReducer && state.candidateSetDataReducer.data && state.candidateSetDataReducer.data.additional_experiences ? state.candidateSetDataReducer.data.additional_experiences : []
	};
}

const mapDispatchToProps = {
	fetchCandidateDetails: fetchCandidateDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkExperience);
