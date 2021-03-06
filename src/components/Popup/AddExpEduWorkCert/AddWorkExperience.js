import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./AddExpEduWorkCert.scss";
import Input from "../../_Elements/Input";
import Textarea from "../../_Elements/Textarea";
import {
	toggleOverlay,
	togglePopup,
} from "../../../store/actions/popup_overlay";
import { addWorkExperience } from "../../../modals/candidateProfile/thunk";
import { findIndexOfObjInArr } from "../../../assets/js/Utility";
import CustomDatePicker from "../../_Elements/CustomDatePicker";

function AddWorkExperience() {
	const dispatch = useDispatch();

	const info = useSelector((state) => state.popupOverlayReducer.popup.info);
	const dataArr = useSelector(
		(state) => state.candidateSetDataReducer.data.work_experience
	);

	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [activeTab, setActiveTab] = useState("add");
	const [allowContact, setAllowContact] = useState(true);

	const handleTabChange = (id) => {
		setActiveTab(id);
		setFormData({
			...formData,
			formValid: {
				add: false,
				verify: false,
			},
		});
	};

	const [formData, setFormData] = React.useState({
		/**
		 * * field: ['value', 'error']
		 */
		title: [],
		company: [],
		location: [],
		currentCompany: [],
		startDate: [],
		endDate: [],
		description: [],
		employerWebsite: [],

		supervisorName: [],
		supervisorTitle: [],
		phoneNumber: [],
		email: [],
		isContactable: [],

		formValid: {
			add: false,
			verify: false,
		},
	});

	function formatDate(date) {
		var d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return [year, month, day].join("-");
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		let oldFormData = { ...formData };
		oldFormData.formValid.add = true;
		oldFormData.formValid.verify = true;

		for (var field in oldFormData) {
			if (
				oldFormData.hasOwnProperty(field) &&
				field !== "formValid" &&
				field !== "employerWebsite" &&
				field !== "isContactable" &&
				(oldFormData[field][0] === "" ||
					oldFormData[field][0] === undefined ||
					oldFormData[field][0] === null)
			) {
				oldFormData[field][0] = "";
				if (oldFormData[field][1] !== "Required") {
					oldFormData[field].push("Required");
				}
				if (
					field === "supervisorName" ||
					field === "supervisorTitle" ||
					field === "phoneNumber" ||
					field === "email"
				) {
					oldFormData.formValid.verify = false;
				} else {
					console.log(field);
					oldFormData.formValid.add = false;
				}
			}
		}
		console.log(activeTab, oldFormData, oldFormData.formValid.add);

		if (activeTab === "add" && oldFormData.formValid.add) {
			setActiveTab("verify");
			return;
		}
		if (oldFormData.formValid.add && oldFormData.formValid.verify) {
			let obj = {
				title: formData.title[0],
				company: formData.company[0],
				location: formData.location[0],
				isCurrentlyEmployed: formData.currentCompany[0],
				employmentFrom: formatDate(formData.startDate[0]),
				employmentTo: formatDate(formData.endDate[0]),
				jobDescription: formData.description[0],
				employerWebsite: formData.employerWebsite[0],
				workexVerification: {
					supervisorName: formData.supervisorName[0],
					title: formData.supervisorTitle[0],
					phone: formData.phoneNumber[0],
					email: formData.email[0],
					isContactable: formData.isContactable[0],
				},
			};

			if (info) {
				obj.id = info.id;
			}

			dispatch(addWorkExperience(obj));
			dispatch(toggleOverlay(false));
			dispatch(togglePopup([false, ""]));
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
			formValid: {
				add: false,
				verify: false,
			},
		});
	};

	React.useEffect(() => {
		console.log("................");
		console.log(formData);
	}, [formData]);

	React.useEffect(() => {
		if (info) {
			let i = findIndexOfObjInArr(dataArr, "work_ex_id", info.id);
			let arr = dataArr[i];

			setFormData({
				...formData,
				title: [arr.title],
				company: [arr.company],
				location: [arr.location],
				currentCompany: [arr.is_currently_employed],
				startDate: [arr.employment_from],
				endDate: [arr.employment_to],
				description: [arr.job_description],
				employerWebsite: [arr.employer_website],

				supervisorName: [arr.workex_verification.supervisorName],
				supervisorTitle: [arr.workex_verification.title],
				phoneNumber: [arr.workex_verification.phone],
				email: [arr.workex_verification.email],
				isContactable: [arr.workex_verification.isContactable],

				formValid: {
					add: false,
					verify: false,
				},
			});

			setStartDate(new Date(arr.employment_from));
			setEndDate(new Date(arr.employment_to));
		}
	}, []);

	return (
		<div className="add-ex-ed-cert">
			{info && info.purpose === "edit" ? (
				<h1>Edit Work Experience</h1>
			) : (
				<h1>Add Work Experience</h1>
			)}

			<form onSubmit={(e) => handleSubmit(e)}>
				<div className="popup-tabs flex">
					<div
						id="add"
						className={`tab flex ${activeTab === "add" ? "active" : ""}`}
						onClick={(e) => handleTabChange(e.target.id)}
					>
						Add Employment
					</div>
					<div
						id="verify"
						className={`tab flex ${activeTab === "verify" ? "active" : ""}`}
						onClick={(e) => handleTabChange(e.target.id)}
					>
						Verification
					</div>
				</div>
				<ul className={`listing add ${activeTab === "add" ? "" : "hidden"}`}>
					<li>
						<label htmlFor="title">
							Title <span>*</span>
							<span className={`error-text ${!formData.title[1] && "hidden"}`}>
								Required
							</span>
						</label>
						<Input
							type="text"
							id="title"
							defaultValue={formData.title[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="company">
							Company <span>*</span>
							<span
								className={`error-text ${!formData.company[1] && "hidden"}`}
							>
								Required
							</span>
						</label>
						<Input
							type="text"
							id="company"
							defaultValue={formData.company[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="location">
							Location <span>*</span>
							<span
								className={`error-text ${!formData.location[1] && "hidden"}`}
							>
								Required
							</span>
						</label>
						<Input
							type="text"
							id="location"
							defaultValue={formData.location[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
						{/* <Dropdown placeholder={location.heading} content={location.content} /> */}
					</li>
					<li className="industry">
						<label htmlFor="currentCompany">
							Is this your current company?
							<span> * </span>
							<span
								className={`error-text ${
									!formData.currentCompany[1] && "hidden"
								}`}
							>
								Required
							</span>
						</label>
						<div>
							<input
								className="fancy-toggle yes"
								id="currentCompanyYes"
								name="currentCompany"
								type="radio"
								// defaultChecked
								checked={formData.currentCompany[0] === true}
								onChange={(e) => handleFieldChange("currentCompany", true)}
							/>
							<label htmlFor="currentCompanyYes">
								<span className="input"></span>Yes
							</label>
							<input
								className="fancy-toggle no"
								id="currentCompanyNo"
								name="currentCompany"
								type="radio"
								checked={formData.currentCompany[0] === false}
								// defaultChecked
								onChange={(e) => handleFieldChange("currentCompany", false)}
							/>
							<label htmlFor="currentCompanyNo">
								<span className="input"></span>No
							</label>
						</div>
					</li>
					<li>
						<label>
							Employment <span>*</span>
							<span
								className={`error-text ${
									!formData.startDate[1] && !formData.endDate[1] && "hidden"
								}`}
							>
								Required
							</span>
						</label>
						<div className="date-outer">
							<div className="date">
								<CustomDatePicker
									id="startDate"
									selected={startDate}
									placeholderText="Start Date"
									onChange={(date) => {
										setStartDate(date);
										handleFieldChange("startDate", date);
									}}
								/>
							</div>
							<span>to</span>
							<div className="date">
								<CustomDatePicker
									id="endDate"
									selected={endDate}
									placeholderText="End Date"
									minDate={startDate}
									onChange={(date) => {
										setEndDate(date);
										handleFieldChange("endDate", date);
									}}
								/>
							</div>
						</div>
					</li>
					<li>
						<label htmlFor="employerWebsite">Employer website</label>
						<Input
							id="employerWebsite"
							defaultValue={formData.employerWebsite[0]}
							type="text"
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="description">
							Description <span>*</span>
							<span
								className={`error-text ${!formData.description[1] && "hidden"}`}
							>
								Required
							</span>
						</label>
						<Textarea
							id="description"
							defaultValue={formData.description[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
				</ul>

				<ul
					className={`listing verify ${activeTab === "verify" ? "" : "hidden"}`}
				>
					<li>
						<label htmlFor="supervisorName">
							Supervisor Name <span>*</span>
							<span
								className={`error-text ${
									!formData.supervisorName[1] && "hidden"
								}`}
							>
								Required
							</span>
						</label>
						<Input
							type="text"
							id="supervisorName"
							defaultValue={formData.supervisorName[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="supervisorTitle">
							Title <span>*</span>
							<span
								className={`error-text ${
									!formData.supervisorTitle[1] && "hidden"
								}`}
							>
								Required
							</span>
						</label>
						<Input
							type="text"
							id="supervisorTitle"
							defaultValue={formData.supervisorTitle[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="phoneNumber">
							Phone Number <span>*</span>
							<span
								className={`error-text ${!formData.phoneNumber[1] && "hidden"}`}
							>
								Required
							</span>
						</label>
						<Input
							type="number"
							id="phoneNumber"
							defaultValue={formData.phoneNumber[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="email">
							Email <span>*</span>
							<span className={`error-text ${!formData.email[1] && "hidden"}`}>
								Required
							</span>
						</label>
						<Input
							type="email"
							id="email"
							defaultValue={formData.email[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<input
							className="fancy-toggle checkbox"
							type="checkbox"
							name="isContactable"
							id="isContactable"
							checked={formData.isContactable[0] === true}
							onChange={(e) => handleFieldChange(e.target.id, e.target.checked)}
						/>
						<label htmlFor="isContactable">
							<span className="input"></span>Allow recruiters to contact your
							Supervisor
						</label>
					</li>
				</ul>
				<div className="cta">
					<span className={`error-text ${!formData.formValid.add && "hidden"}`}>
						{activeTab === "add" &&
							!formData.formValid.verify &&
							"Verification tab is not filled correctly."}
					</span>
					<span
						className={`error-text ${!formData.formValid.verify && "hidden"}`}
					>
						{activeTab === "verify" &&
							!formData.formValid.add &&
							"Please fill required fields"}
					</span>
					<button className="primary-btn blue" id="submitBtn" type="submit">
						{activeTab === "add" ? "Next" : "Submit"}
					</button>
				</div>
			</form>
		</div>
	);
}

export default AddWorkExperience;
