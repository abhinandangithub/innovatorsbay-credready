import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import "./AddExpEduWorkCert.scss";
import Input from "../../_Elements/Input";
import Textarea from "../../_Elements/Textarea";
import Dropdown from "../../_Elements/Dropdown";
import {
	toggleOverlay,
	togglePopup,
} from "../../../store/actions/popup_overlay";
import { addEducationExperience, fetchCandidateInstituteType, fetchCandidateDegreeTitles } from "../../../modals/candidateProfile/thunk";
import InputDropdown from "../../_Elements/InputDropdown";

function AddEducation(props) {
	var data = props.candidateInstiType;
	const id = useSelector((state) => state.popupOverlayReducer.popup.info);

	const dispatch = useDispatch();
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [major, setMajor] = useState([null]);
	const [minor, setMinor] = useState([null]);
	const [institutions, setInstitutions] = useState(data);

	const degreeTitle = {
		heading: "Select Title of Degree",
		content: ["Degree 1", "Degree 2", "Degree 3", "No Degree"],
	};

	const institution = {
		heading: "Select Institution",
		content: [
			"Institution 1",
			"Institution 2",
			"Institution 3",
			"No Institution",
		],
	};

	const handleAddMajorMinor = (type) => {
		if (type === "major") {
			setMajor([...major, null]);
		} else {
			setMinor([...minor, null]);
		}
	};

	const [formData, setFormData] = useState({
		/**
		 * * field: ['value', 'error']
		 */
		degreeTitle: [],
		institution: [],
		startDate: [],
		endDate: [],
		major: [],
		minor: [],
		strengths: [],
		comments: [],
		degreeGranted: [],

		formValid: false,
	});
	function formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2)
			month = '0' + month;
		if (day.length < 2)
			day = '0' + day;

		return [year, month, day].join('-');
	}

	const handleSubmit = () => {
		let oldFormData = { ...formData };
		oldFormData.formValid = true;

		for (var field in oldFormData) {
			if (
				oldFormData.hasOwnProperty(field) &&
				field !== "formValid" &&
				(oldFormData[field][0] === "" ||
					oldFormData[field][0] === undefined ||
					oldFormData[field][0] === null)
			) {
				oldFormData[field][0] = "";
				oldFormData[field].push("Required");
				oldFormData.formValid = false;
			}
		}
		if (id) {
			let objEdited = {
				"work_ex_id": id,
				"titleOfDegree": formData ? formData.degreeTitle[0] : "",
				"majors": [731, 732],
				"minors": [741, 742],
				"institution": 2,
				"isUnfinished": formData && formData.degreeGranted[0] === "on" ? false : true,
				"educationDescription": formData ? formData.comments[0] : "",
				"attendedFrom": formData ? formatDate(formData.startDate[0]) : "",
				"attendedTill": formData ? formatDate(formData.endDate[0]) : "",
			}
			if (oldFormData.formValid) {
				console.log("submitting form...");
				/* send data to api */
				props.addEducationExperience(objEdited)
				dispatch(toggleOverlay(false));
				dispatch(togglePopup([false, ""]));
			}
		}
		else {
			let obj = {
				"titleOfDegree": formData ? formData.degreeTitle[0] : "",
				"majors": [731, 732],
				"minors": [741, 742],
				"institution": 2,
				"isUnfinished": formData && formData.degreeGranted[0] === "on" ? false : true,
				"educationDescription": formData ? formData.comments[0] : "",
				"attendedFrom": formData ? formatDate(formData.startDate[0]) : "",
				"attendedTill": formData ? formatDate(formData.endDate[0]) : "",
			}
			if (oldFormData.formValid) {
				console.log("submitting form...");
				/* send data to api */
				props.addEducationExperience(obj)
				dispatch(toggleOverlay(false));
				dispatch(togglePopup([false, ""]));
			}
		}

		setFormData(oldFormData);
	};

	const handleFieldChange = (field, value) => {
		let msg = value === "" || value === null ? "Required" : "";

		let arr = [];
		arr[0] = value;
		arr[1] = msg;

		setFormData({
			...formData,
			[field]: arr,
		});
	};
	React.useEffect(() => {
		if (props.candidateInstiType.length === 0)
			props.fetchCandidateInstituteType();
		if (props.candidateDegreeTitles.length === 0)
			props.fetchCandidateDegreeTitles();
	}, [])




	const handleInstitutionSearch = (value) => {
		console.log(value);
		if (typeof value === 'number') return;
		const filteredData = data.filter(
			({ institute_name }) =>
				institute_name.toUpperCase().indexOf(value.toUpperCase()) > -1
		);
		console.log(filteredData)
		setInstitutions([...filteredData]);
	}

	return (
		<div className="add-ex-ed-cert">
			<h1>Add Education</h1>

			<ul className="listing">
				<li>
					<label>
						Title of Degree <span>*</span>
						<span
							className={`error-text ${!formData.degreeTitle[1] && "hidden"}`}
						>
							Required
						</span>
					</label>
					<Dropdown
						placeholder={degreeTitle.heading}
						content={props.candidateDegreeTitles.map((val) => ({ val: val.title, id: val.id }))}
						id="degreeTitle"
						defaultValue={formData.degreeTitle[0]}
						onchange={(value) => handleFieldChange("degreeTitle", value)}
					/>
				</li>
				<li>
					<label>
						Institution <span>*</span>
						<span
							className={`error-text ${!formData.institution[1] && "hidden"}`}
						>
							Required
						</span>
					</label>
					<InputDropdown
						placeholder={institution.heading}
						content={institutions.map((val) => ({ val: val.institute_name, id: val.id }))}
						id="institution"
						defaultValue={formData.institution[0]}
						onchange={(value) => {
							handleFieldChange("institution", value);
							handleInstitutionSearch(value);
						}
						}
					/>
				</li>
				<li>
					<label>
						Attend <span>*</span>
						<span
							className={`error-text ${!formData.startDate[1] && !formData.endDate[1] && "hidden"
								}`}
						>
							Required
						</span>
					</label>
					<div className="date-outer">
						<div className="date">
							<DatePicker
								selected={startDate}
								placeholderText="Start Date"
								id="startDate"
								onChange={(date) => {
									setStartDate(date);
									handleFieldChange("startDate", date);
								}}
							/>
						</div>
						<span>to</span>
						<div className="date">
							<DatePicker
								selected={endDate}
								placeholderText="End Date"
								id="endDate"
								onChange={(date) => {
									setEndDate(date);
									handleFieldChange("endDate", date);
								}}
							/>
						</div>
					</div>
				</li>
				<li className="major-minor">
					<div className="label">
						<label>
							Major <span>*</span>
							<span className={`error-text ${!formData.major[1] && "hidden"}`}>
								Required
							</span>
						</label>
					</div>
					<div className="inputs">
						{major.map((mj, i) => {
							return (
								<Input
									type="text"
									key={i}
									id={`major_${i}`}
									onChange={(e) => handleFieldChange("major", e.target.value)}
								/>
							);
						})}
					</div>
					<div className="button">
						<button
							className="circle-btn"
							id="addMajorBtn"
							onClick={() => handleAddMajorMinor("major")}
						>
							<FontAwesomeIcon icon={faPlus} />
						</button>
					</div>
				</li>
				<li className="major-minor">
					<div className="label">
						<label>
							Minor <span>*</span>
							<span className={`error-text ${!formData.minor[1] && "hidden"}`}>
								Required
							</span>
						</label>
					</div>
					<div className="inputs">
						{minor.map((m, i) => {
							return (
								<Input
									type="text"
									key={i}
									id={`minor_${i}`}
									onChange={(e) => handleFieldChange("minor", e.target.value)}
								/>
							);
						})}
					</div>
					<div className="button">
						<button
							className="circle-btn"
							id="addMinorBtn"
							onClick={() => handleAddMajorMinor("minor")}
						>
							<FontAwesomeIcon icon={faPlus} />
						</button>
					</div>
				</li>
				<li>
					<label htmlFor="strengths">
						Strengths <span>*</span>
						<span
							className={`error-text ${!formData.strengths[1] && "hidden"}`}
						>
							Required
						</span>
					</label>
					<Input
						id="strengths"
						type="text"
						defaultValue={formData.strengths[0]}
						onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
					/>
				</li>
				<li>
					<label htmlFor="comments">Additional Comments</label>
					<Textarea id="comments" onChange={(e) => handleFieldChange(e.target.id, e.target.value)} />
				</li>
				<li>
					<input
						className="fancy-toggle checkbox"
						type="checkbox"
						name="termsandconditions"
						id="degreeGranted"
						onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
					/>
					<label htmlFor="degreeGranted">
						<span className="input"></span>Degree Granted
					</label>
				</li>
			</ul>
			<div className="cta">
				<button className="primary-btn" id="submitBtn" onClick={handleSubmit}>
					Submit
				</button>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		candidateInstiType: state.setCandidateInstitutionTypeReducer.data,
		candidateDegreeTitles: state.setCandidateDegreeTitlesReducer.data
	};
}
const mapDispatchToProps = {
	addEducationExperience: addEducationExperience,
	fetchCandidateInstituteType: fetchCandidateInstituteType,
	fetchCandidateDegreeTitles: fetchCandidateDegreeTitles
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEducation);
