import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "./index.scss";
import Accordion from "../../../../_Elements/Accordion";
import userData from "../../../../_data/userData.json";
import {
	toggleOverlay,
	togglePopup,
} from "../../../../../store/actions/popup_overlay";

function Education() {
	const dispatch = useDispatch();

	const showCertificate = (certificate) => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "certificate", { certificate }]));
	};

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

	const renderEducation = userData.profile.education.map((data, i) => {
		return (
			<div className="content" key={i}>
				<h2>{data.title}</h2>
				<p>
					{data.profile} - {data.institute}
				</p>
				<p>
					{data.date.from} to {data.date.to}
				</p>
				<p>
					<span className="heading">Major:</span>
					{data.major}
				</p>
				<p>
					<span className="heading">Minor: </span>
					<span className="text">{data.minor}</span>
				</p>
				<p>
					<span className="heading">Strenghts: </span>
					<span className="text">{data.strengths}</span>
				</p>

				<FontAwesomeIcon
					className="action-btn edit"
					icon={faPen}
					id={"educationEdit_" + i}
					onClick={handleEdit}
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

	const renderOtherExperiences = userData.profile.workExperiences.map(
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

	const renderCertifications = userData.profile.certifications.map(
		(data, i) => {
			return (
				<div className="content" key={i}>
					<h2>{data.title}</h2>
					<p>
						<span className="heading">Issuer: </span>
						{data.issuer}
					</p>
					<p>
						<span className="heading">Issued Date: </span>
						{data.issudeDate}
					</p>
					<p>
						<span className="heading">Certificate Link: </span>
						{data.certificateLink}
					</p>
					<p>
						<span className="heading">Description: </span>
						<span className="text">{data.description}</span>
					</p>
					<p className="docs">
						<span className="heading">Certificate image: </span>
						<span
							className="doc"
							to={data.doc}
							onClick={() => showCertificate(data.doc)}
							id={"showCertificate_" + i}
						>
							<img src={data.doc} alt={data.doc} />
						</span>
					</p>

					<FontAwesomeIcon
						className="action-btn edit"
						icon={faPen}
						id={"certificateEdit_" + i}
						onClick={handleEdit}
					/>
					<FontAwesomeIcon
						className="action-btn delete"
						icon={faTrash}
						id={"certificateDelete_" + i}
						onClick={() => handleDelete("certificate")}
					/>
				</div>
			);
		}
	);

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
				active
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
				<Link to="/profile/strengths" className="primary-btn" id="nextLink">
					Next
				</Link>
			</div>
		</div>
	);
}

export default Education;
