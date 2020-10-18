import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, connect, useSelector } from "react-redux";

import "./AddExpEduWorkCert.scss";
import Input from "../../_Elements/Input";
import Textarea from "../../_Elements/Textarea";
import Dropdown from "../../_Elements/Dropdown";
import {
	toggleOverlay,
	togglePopup,
} from "../../../store/actions/popup_overlay";
import {
	addEducationCertificate,
	fetchAllCertificateTitles,
	fetchAllFunctions,
	fetchAllIndustries,
} from "../../../modals/candidateProfile/thunk";
import { checkFileSize, checkMimeType } from "../../../assets/js/Utility";
import { findIndexOfObjInArr } from "../../../assets/js/Utility";

const industry = {
	heading: "Select Industry",
	content: ["Industry 1", "Industry 2", "Industry 3", "No Industry"],
};

const title = {
	heading: "Select Title",
	content: ["Title 1", "Title 2", "Title 3", "No Title"],
};

const functions = {
	heading: "Select Function",
	content: ["Function 1", "Function 2", "Function 3", "No Function"],
};

const issuer = {
	heading: "Select Issuer",
	content: ["Issuer 1", "Issuer 2", "Issuer 3", "No Issuer"],
};

function AddCertificate({ addEducationCertificate }) {
	const dispatch = useDispatch();
	const [issueDate, setIssueDate] = useState();
	const [errorMessage, setErrorMessage] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);

	const info = useSelector((state) => state.popupOverlayReducer.popup.info);
	const dataArr = useSelector(
		(state) => state.candidateSetDataReducer.data.certificate
	);

	const AllTitles = useSelector(
		(state) => state.setCandidateCertificateTitlesReducer.data
	);
	const AllIndustries = useSelector(
		(state) => state.setAllIndustriesReducer.data
	);
	const AllFunctions = useSelector(
		(state) => state.setAllFunctionsReducer.data
	);
	const uploadBtnRef = useRef(null);
	const handleUpload = (btnId) => {
		uploadBtnRef.current.click();
	};
	// console.log(AllIndustries, AllFunctions);

	const handleChange = (e) => {
		const file = e.target.files[0];

		let msg = checkFileSize(file, 10);

		if (msg !== true) {
			setErrorMessage(msg);
		} else {
			msg = checkMimeType(file, "img");
			if (msg !== true) {
				setErrorMessage(msg);
			} else {
				setErrorMessage("");
				setSelectedFile(file);
			}
		}
	};

	const [formData, setFormData] = useState({
		/**
		 * * field: ['value', 'error']
		 */
		industry: [],
		title: [],
		issuer: [],
		function: [],
		issueDate: [],
		description: [],
		certificateLink: [],

		formValid: false,
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
				oldFormData.formValid = false;
				if (oldFormData[field][1] !== "Required") {
					oldFormData[field].push("Required");
				}
			}
		}

		// if (oldFormData.formValid) {
		console.log(oldFormData, "submitting form...");
		/* send data to api */
		let obj = {
			certificateLink: "http://localhost:3000/profile/education",
			description: formData ? formData.description[0] : "",
			functionId: formData ? formData.function[0] : "",
			industryId: formData ? formData.industry[0] : "",
			issuedDate: formData ? formatDate(formData.issueDate[0]) : "",
			issuer: formData ? formData.issuer[0] : "",
			title: formData ? formData.title[0] : "",
		};
		addEducationCertificate(obj);
		dispatch(toggleOverlay(false));
		dispatch(togglePopup([false, ""]));
		// }

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
		dispatch(fetchAllCertificateTitles());
		dispatch(fetchAllFunctions());
		dispatch(fetchAllIndustries());

		if (info) {
			let i = findIndexOfObjInArr(dataArr, "id", info.id);
			let arr = dataArr[i];
			console.log(formData, arr);

			setFormData({
				...formData,

				industry: [arr.industry_id],
				title: [arr.title_id],
				issuer: [arr.issuer],
				function: [arr.function_id],
				issueDate: [arr.issued_date],
				description: [arr.description],
				certificateLink: [arr.certificate_link],
			});

			setIssueDate(new Date(arr.issued_date));
		}
	}, []);

	const findIndustry = () => {
		let i = findIndexOfObjInArr(AllIndustries, "id", formData.industry[0]);
		let name = AllIndustries[i].industry_name;
		console.log(i, name);
		return "working on";
	};

	return (
		<div className="add-ex-ed-cert">
			{info && info.purpose === "edit" ? (
				<h1>Edit Certificate</h1>
			) : (
				<h1>Add Certificate</h1>
			)}

			<ul className="listing">
				<li>
					<label>
						Industry <span>*</span>
						<span className={`error-text ${!formData.industry[1] && "hidden"}`}>
							Required
						</span>
					</label>
					<Dropdown
						placeholder={industry.heading}
						content={
							AllIndustries.length > 0
								? AllIndustries.map((val) => ({
										val: val.industry_name,
										id: val.id,
								  }))
								: ""
						}
						selected={formData.industry[0]}
						/**
						 * TODO: Not working as expected for all cases
						 */
						// selected={
						// 	AllIndustries.length > 0
						// 		? AllIndustries.filter((val) => {
						// 				return val.id === formData.industry[0];
						// 		  })[0].industry_name
						// 		: undefined
						// }
						id="industry"
						defaultValue={formData.industry[0]}
						onchange={(value) => handleFieldChange("industry", value)}
					/>
				</li>
				<li>
					<label>
						Title <span>*</span>
						<span className={`error-text ${!formData.title[1] && "hidden"}`}>
							Required
						</span>
					</label>
					<Dropdown
						placeholder={title.heading}
						content={
							AllTitles.length > 0
								? AllTitles.map((val) => ({ val: val.title_name, id: val.id }))
								: ""
						}
						selected={formData.title[0]}
						id="title"
						onchange={(value) => handleFieldChange("title", value)}
					/>
				</li>
				<li>
					<label>Function</label>
					<Dropdown
						placeholder={functions.heading}
						content={
							AllFunctions.length > 0
								? AllFunctions.map((val) => ({
										val: val.function_name,
										id: val.id,
								  }))
								: ""
						}
						id="function"
						selected={formData.function[0]}
						onchange={(value) => handleFieldChange("function", value)}
					/>
				</li>
				<li>
					<label>
						Issuer <span>*</span>
						<span className={`error-text ${!formData.issuer[1] && "hidden"}`}>
							Required
						</span>
					</label>
					<Input
						id="issuer"
						defaultValue={formData.issuer[0]}
						onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
					/>
				</li>
				<li>
					<label>
						Issue Date <span>*</span>
						<span
							className={`error-text ${!formData.issueDate[1] && "hidden"}`}
						>
							Required
						</span>
					</label>
					<div className="date-outer">
						<div className="date">
							<DatePicker
								selected={issueDate}
								placeholderText="Issue Date"
								id="issueDate"
								onChange={(date) => {
									setIssueDate(date);
									handleFieldChange("issueDate", date);
								}}
							/>
						</div>
					</div>
				</li>
				<li>
					<label>Certificate Link</label>
					<Input
						type="text"
						id="certificateLink"
						defaultValue={formData.certificateLink[0]}
						onChange={(value) => handleFieldChange("certificateLink", value)}
					/>
				</li>
				<li>
					<label>Certificate Image</label>
					<div className="upload">
						<div className="content">
							<Input
								type="text"
								defaultValue={selectedFile && selectedFile.name}
								id="certificateImage"
								cls={`${errorMessage ? "error" : ""}`}
							/>
							<button
								className="upload-btn"
								onClick={handleUpload}
								id="uploadBtn"
							>
								Upload
							</button>
							<input
								ref={uploadBtnRef}
								type="file"
								defaultValue=""
								onChange={(e) => handleChange(e)}
								className="hidden"
								id="uploadFileInput"
							/>
						</div>
						<p className={`${errorMessage ? "" : "hidden"}`}>{errorMessage}</p>
					</div>
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
		cerificatedata: state.candidateSetDataReducer.certificate
			? state.candidateSetDataReducer.certificate
			: "",
	};
}
const mapDispatchToProps = {
	addEducationCertificate: addEducationCertificate,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCertificate);
