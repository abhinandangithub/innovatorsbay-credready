import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./index.scss";
import Accordion from "../../../../_Elements/Accordion";
import userData from "../../../../_data/userData.json";
import {
	fetchCandidateDetails,
	fetchAllCertificateTitles,
	fetchCandidateDegreeTitles,
} from "../../../../../modals/candidateProfile/thunk";
import {
	toggleOverlay,
	togglePopup,
} from "../../../../../store/actions/popup_overlay";

function Education(props) {
	const dispatch = useDispatch();

	const certificateTitles = useSelector(
		(state) => state.setCandidateCertificateTitlesReducer.data
	);
	const degreeTitles = useSelector(
		(state) => state.setCandidateDegreeTitlesReducer.data
	);

	const showCertificate = (certificate) => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "certificate", { certificate }]));
	};

	const handleEdit = (id, type) => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, type, { id, purpose: "edit" }]));
	};

	const handleDelete = (type) => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "delete", { what: type }]));
	};

	// const renderEducation = userData.profile.education.map((data, i) => {
	const renderEducation = props.eduExpData.map((data, i) => {
		return (
			<div className="content" key={i}>
				<h2>
					{degreeTitles &&
						degreeTitles.map((entity) => {
							if (entity.id === parseInt(data.title)) return entity.title;
						})}
				</h2>
				<p>
					{data.education_description} - {"institute"}
				</p>
				<p>
					{data.attended_from} to {data.attended_till}
				</p>
				<p>
					<span className="heading">Major:</span>
					{data.education_major.map((entity) => entity.name)}
				</p>
				<p>
					<span className="heading">Minor: </span>
					<span className="text">
						{data.education_minor.map((entity) => entity.name)}
					</span>
				</p>
				{/* <p>
					<span className="heading">Strenghts: </span>
					<span className="text">{data.strengths}</span>
				</p> */}

				<FontAwesomeIcon
					className="action-btn edit"
					icon={faPen}
					id={"educationEdit_" + i}
					onClick={() => handleEdit(data.id, "addEducation")}
				/>
				<FontAwesomeIcon
					className="action-btn delete"
					icon={faTrash}
					id={"educationDelete_" + i}
					onClick={() => handleDelete("education")}
				/>
			</div>
		);
	});

	// const renderOtherExperiences = userData.profile.workExperiences.map(
	const renderOtherExperiences = props.otherExpData.map((data, i) => {
		if (data.career_path === "EDUCATION") {
			return (
				<div className="content" key={i}>
					<h2>{data.title}</h2>
					<h3>
						{data.organization_name} - <span>{data.location}</span>
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
						onClick={() => handleEdit(data.id, "addEduOtherExperience")}
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
		return "";
	});

	// const renderCertifications = userData.profile.certifications.map(
	const renderCertifications = props.certificateData.map((data, i) => {
		return (
			<div className="content" key={i}>
				<h2>
					{certificateTitles &&
						certificateTitles.map((entity) => {
							if (entity.id === data.title_id) return entity.title_name;
						})}
				</h2>
				<p>
					<span className="heading">Issuer: </span>
					{data.issuer}
				</p>
				<p>
					<span className="heading">Issued Date: </span>
					{data.issued_date}
				</p>
				<p>
					<span className="heading">Certificate Link: </span>
					{data.certificate_link}
				</p>
				<p>
					<span className="heading">Description: </span>
					<span className="text">{data.description}</span>
				</p>
				{/* <p className="docs">
						<span className="heading">Certificate image: </span>
						<span
							className="doc"
							to={data.doc}
							onClick={() => showCertificate(data.doc)}
							id={"showCertificate_" + i}
						>
							<img src={data.doc} alt={data.doc} />
						</span>
					</p> */}

				<FontAwesomeIcon
					className="action-btn edit"
					icon={faPen}
					id={"certificateEdit_" + i}
					onClick={() => handleEdit(data.id, "addCertificate")}
				/>
				<FontAwesomeIcon
					className="action-btn delete"
					icon={faTrash}
					id={"certificateDelete_" + i}
					onClick={() => handleDelete("certificate")}
				/>
			</div>
		);
	});
	React.useEffect(() => {
		dispatch(fetchAllCertificateTitles());
		dispatch(fetchCandidateDegreeTitles());
	}, []);

	return (
		<div className="education">
			<Accordion
				title="Education"
				type="addEducation"
				id="addEducation"
				addButton="Add Education"
			>
				{renderEducation}
			</Accordion>
			<Accordion
				title="Certification"
				type="addCertificate"
				id="addCertificate"
				addButton="Add Certificate"
			>
				{renderCertifications}
			</Accordion>
			<Accordion
				title="Other Experiences"
				type="addEduOtherExperience"
				id="addEduOtherExperience"
				addButton="Add Other Experiences"
			>
				{renderOtherExperiences}
			</Accordion>

			<div className="cta">
				<Link
					to="/profile/work-experience"
					className="primary-btn outline"
					id="previousLink"
				>
					Previous
				</Link>
				<Link to="/profile/preview" className="primary-btn" id="nextLink">
					Next
				</Link>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		eduExpData: state.candidateSetDataReducer.data
			? state.candidateSetDataReducer.data.education_experience
			: [],
		otherExpData: state.candidateSetDataReducer.data
			? state.candidateSetDataReducer.data.additional_experiences
			: [],
		certificateData: state.candidateSetDataReducer.data
			? state.candidateSetDataReducer.data.certificate
			: [],
	};
}

const mapDispatchToProps = {
	fetchCandidateDetails: fetchCandidateDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(Education);
