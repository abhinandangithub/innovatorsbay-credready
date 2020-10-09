import React from "react";

import Dropdown from "../../_Elements/Dropdown";
import { getEmailTemplate } from '../../../store/thunks/employer';
import { connect, useDispatch } from 'react-redux';

const employmentStatus = {
	heading: "Select Employment Type",
	content: ["Employed", "Self Employed", "Available", "On Break"],
};

function EmailTemplate(props) {
	const parent = React.useRef();
	const dispatch = useDispatch();

	React.useEffect(() => {
		props.calHeight(parent.current.clientHeight);
	}, [props]);

	
	// React.useEffect(() => {
	// 	dispatch(getEmailTemplate());
	// }, [dispatch]);

	return (
		<div className="email-templates" ref={parent}>
			<div className="heading">
				<h2>
					Email Template m<span>*</span>
				</h2>
			</div>
			<div className="content">
				<h2 className="sub-heading">Attach Email</h2>
				<p>Select / Modify Introduction Email Template</p>
				<Dropdown
					placeholder={employmentStatus.heading}
					content={employmentStatus.content}
				/>
				<h2 className="sub-heading">Email</h2>
				<textarea
					name="email"
					id="email"
					defaultValue="Hi {candidate_name},
Thanks for applying for the position of {job_title}, we will review your profile and share an update on the next steps soon."
				></textarea>
			</div>
		</div>
	);
}

export default EmailTemplate;

// function mapStateToProps(state) {
// 	return {
// 		employmentType: state.employerReducer.employmentType.data,
// 	}
// }

// export default connect(mapStateToProps)(EmailTemplate);