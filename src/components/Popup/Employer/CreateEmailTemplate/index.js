import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./index.scss";
import {
	togglePopup,
	toggleOverlay,
} from "../../../../store/actions/popup_overlay";
import { addEmailTemplate, updateEmailTemplate } from '../../../../store/thunks/employer';

function CreateEmailTemplate(props) {
	console.log('props ', props.info);
	const dispatch = useDispatch();
	const { popup } = useSelector((state) => state.popupOverlayReducer);

	const [value, setValue] = React.useState(
		`Hello {candidate_first_name} {candidate_last_name}\nWe are looking out for {job_title} for our organization located at {location}.\n\nRegards,\n{recruiter_name}`
	);

	const [formData, setFormData] = React.useState({
		/**
		 * * field: ['value', 'error']
		 */
		name: [],
		email: [],
		body: [],

		formValid: false,
	});

	useEffect(() => {
		if (!!props.info.data) {
			setFormData({
				name: [props.info.data.template_name],
				email: [props.info.data.email || "test@gmail.com"],
				body: [props.info.data.email_body],
				formValid: true
			});
		} else {
			setFormData({
				name: [],
				email: [],
				body: [value],
				formValid: false
			});
		}
	}, [props.info.data]);

	const handleSubmit = (type = 'add') => {
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

		if (oldFormData.formValid) {
			/* create obj which needs to send to api */
			// let obj = {
			// 	name: formData ? formData.name[0] : "",
			// 	email: formData ? formData.email[0] : "",
			// };
			/* send data to api */
			// props.updateCandidateDetails(obj);
			// props.history.push("/profile/work-experience");
			console.log('formData ', formData);
			if (type === 'add') {
				dispatch(addEmailTemplate(formData));
			} else {
				let obj = { ...formData, templateId: props.info.data.template_id }
				dispatch(updateEmailTemplate(obj));
			}
			dispatch(toggleOverlay(false));
			dispatch(togglePopup(false));
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

	const updateTemplate = () => {
		console.log("updateTemplate");
		handleSubmit('edit');
	};

	const saveAsNewTemplate = () => {
		console.log("saveAsNewTemplate");
		handleSubmit('add');
	};

	const addTemplate = () => {
		console.log("addTemplate");
		handleSubmit('add');
	};

	return (
		<div className="create-email-template">
			{popup.info.type === "add" ? (
				<h1>Add Email Template</h1>
			) : (
					<h1>Edit Email Template</h1>
				)}

			<div className="content">
				<ul>
					<li>
						<label htmlFor="name">
							Template Name <span>*</span>
							<span className={`error-text ${!formData.name[1] && "hidden"}`}>
								Required
							</span>
						</label>
						<input
							type="text"
							id="name"
							defaultValue={formData.name[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="email">
							From Email Address <span>*</span>
							<span className={`error-text ${!formData.email[1] && "hidden"}`}>
								Required
							</span>
						</label>
						<input
							type="email"
							id="email"
							defaultValue={formData.email[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="body">Tags<span>*</span>
							<span className={`error-text ${!formData.body[1] && "hidden"}`}>
								Required
							</span>
						</label>
						<ul>
							<li>
								<input
									className="block-toggle blue checkbox"
									id="cert1"
									name="cert"
									type="checkbox"
								/>
								<label htmlFor="cert1">Job Title</label>
							</li>
							<li>
								<input
									className="block-toggle blue checkbox"
									id="cert2"
									name="cert"
									type="checkbox"
								/>
								<label htmlFor="cert2">Recruiter Name</label>
							</li>
							<li>
								<input
									className="block-toggle blue checkbox"
									id="cert3"
									name="cert"
									type="checkbox"
								/>
								<label htmlFor="cert3">Candidate First Name</label>
							</li>
							<li>
								<input
									className="block-toggle blue checkbox"
									id="cert4"
									name="cert"
									type="checkbox"
								/>
								<label htmlFor="cert4">Job Description</label>
							</li>
							<li>
								<input
									className="block-toggle blue checkbox"
									id="cert5"
									name="cert"
									type="checkbox"
								/>
								<label htmlFor="cert5">Job Title</label>
							</li>
							<li>
								<input
									className="block-toggle blue checkbox"
									id="cert6"
									name="cert"
									type="checkbox"
								/>
								<label htmlFor="cert6">Recruiter Name</label>
							</li>
							<li>
								<input
									className="block-toggle blue checkbox"
									id="cert7"
									name="cert"
									type="checkbox"
								/>
								<label htmlFor="cert7">Candidate First Name</label>
							</li>
							<li>
								<input
									className="block-toggle blue checkbox"
									id="cert8"
									name="cert"
									type="checkbox"
								/>
								<label htmlFor="cert8">Job Description</label>
							</li>
						</ul>
					</li>
					<li>
						<textarea
							name="body"
							id="body"
							cols="30"
							rows="10"
							//value={value}
							defaultValue={formData.body[0]}
							onChange={(e) => handleFieldChange(e.target.id, e.target.value)}
						//	onChange={(e) => setValue(e.target.value)}
						></textarea>
					</li>
				</ul>
				{popup.info.type === "add" ? (
					<div className="cta">
						<button className="primary-btn blue" onClick={addTemplate}>
							Add
						</button>
					</div>
				) : (
						<div className="cta">
							<button
								className="primary-btn blue outline"
								onClick={updateTemplate}
							>
								Update Template
						</button>
							<button className="primary-btn blue" onClick={saveAsNewTemplate}>
								Save as new Template
						</button>
						</div>
					)}
			</div>
		</div>
	);
}

export default CreateEmailTemplate;
