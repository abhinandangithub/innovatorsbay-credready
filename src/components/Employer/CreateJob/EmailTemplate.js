import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import Dropdown from "../../_Elements/Dropdown";
import { getEmailTemplate } from "../../../store/thunks/employer";
import { connect, useDispatch } from "react-redux";
import { setNewJob } from "../../../store/actions/employer";
import InputDropdown from "../../_Elements/InputDropdown";
import {
	togglePopup,
	toggleOverlay,
} from "../../../store/actions/popup_overlay";

const employmentStatus = {
	heading: "Select Email Template",
	content: ["Employed", "Self Employed", "Available", "On Break"],
};

function EmailTemplate(props) {
	const parent = React.useRef();
	const emailBodyEl = React.useRef();
	const dispatch = useDispatch();
	const [emailBody, setEmailBody] = useState("");
	const [templateID, setTemplateID] = useState(0);
	const [emailTemplates, setEmailTemplates] = useState(props.emailTemplate);

	React.useEffect(() => {
		props.calHeight(parent.current.clientHeight);
	}, [props]);

	React.useEffect(() => {
		dispatch(getEmailTemplate());
	}, [dispatch]);

	React.useEffect(() => {
		console.log('props.emailTemplate ', props.emailTemplate);
		if (!!templateID) {
			document.getElementById('emailtemplate').value = props.emailTemplate.find(
				(x) => x.public_template_id === templateID || x.template_id === templateID
			).template_name;
			handleTemplateChange(templateID);
		}
		setEmailTemplates(props.emailTemplate);
	}, [props.emailTemplate]);

	React.useEffect(() => {
		dispatch(setNewJob({ emailTemplateId: templateID }));
		// setEmailBody(props.emailTemplate[0].email_body);
	}, [dispatch, templateID]);

	const handleTemplateChange = (item) => {
		console.log('item ', item);
		if (typeof item !== "number") return;
		setEmailBody(
			// props.emailTemplate.find((x) => x.public_template_id === item).email_body
			(emailBodyEl.current.innerHTML = props.emailTemplate.find(
				(x) => x.public_template_id === item || x.template_id === item
			).email_body)
		);
		console.log('item ', item);

		// props.emailTemplate
		// 	.find((x) => x.public_template_id === item)
		// 	.email_body.replace(/(<([^>]+)>)/gi, "")
		// if (
		// 	props.emailTemplate.find((x) => x.template_name === item).template_id ===
		// 	undefined
		// ) {
		// 	setTemplateID(
		// 		props.emailTemplate.find((x) => x.template_name === item)
		// 			.public_template_id
		// 	);
		// } else {
		// 	setTemplateID(
		// 		props.emailTemplate.find((x) => x.template_name === item).template_id
		// 	);
		// }
		setTemplateID(item);
	};

	const handleTemplateSearch = (value) => {
		if (typeof value === "number") return;
		const filteredData = props.emailTemplate.filter((val) => {
			if (val.template_name.includes(value)) {
				return {
					id: val.public_template_id,
					val: val.template_name,
				};
			}
		});
		setEmailTemplates([...filteredData]);
	};

	const createEmailTemplate = () => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "createEmailTemplate", {
			type: "edit",
			data: props.emailTemplate.find(
				(x) => x.public_template_id === templateID || x.template_id === templateID
			)
		}]));
	};

	return (
		<div className="email-templates" ref={parent}>
			<div className="heading">
				<h2>
					Email Template<span>*</span>
				</h2>
			</div>
			<div className="content">
				<h2 className="sub-heading">Attach Email</h2>
				<p>Select / Modify Introduction Email Template</p>
				<div className="input_button">
					<InputDropdown
						placeholder={employmentStatus.heading}
						content={emailTemplates.map((val) => ({
							val: val.template_name,
							id: val.public_template_id || val.template_id,
						}))}
						id="emailtemplate"
						search_term
						// selected={institution.content[formData.institution[0]]}
						onchange={(value) => {
							handleTemplateChange(value);
							// handleTemplateSearch(value);
						}}
					/>
					<button onClick={createEmailTemplate}>
						<FontAwesomeIcon className="icon" icon={faPencilAlt} />
					</button>
				</div>

				<h2 className="sub-heading">Email</h2>

				<div className="email_body" ref={emailBodyEl}></div>
				{/* <textarea
					name="email"
					id="email"
					onChange={(e) => setEmailBody(e.target.value)}
					value={emailBody}
					disabled
				></textarea>
				></textarea> */}
			</div>
		</div>
	);
}

// export default EmailTemplate;

function mapStateToProps(state) {
	return {
		employmentType: state.employerReducer.employmentType.data,
		emailTemplate: state.employerReducer.emailTemplate,
		emailTemplateNames: state.employerReducer.emailTemplateNames,
	};
}

export default connect(mapStateToProps)(EmailTemplate);
