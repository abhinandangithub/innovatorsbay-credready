import React from "react";
import { connect, useDispatch } from 'react-redux';
import { getEmploymentType, getIndustry, getFunction } from '../../../store/thunks/employer';

import Input from "../../_Elements/Input";
import Dropdown from "../../_Elements/Dropdown";

const employmentType = {
	heading: "Employment Type",
	content: ["Option 1", "Option 2", "Option 3", "Option 4"],
};

const industry = {
	heading: "Select Industry",
	content: ["Option 1", "Option 2", "Option 3", "Option 4"],
};

const _function = {
	heading: "Select Function",
	content: ["Option 1", "Option 2", "Option 3", "Option 4"],
};

function CreateJob(props) {
	const parent = React.useRef();
	const dispatch = useDispatch();

	React.useEffect(() => {
		props.calHeight(parent.current.clientHeight);
	}, [props]);

	React.useEffect(() => {
		dispatch(getEmploymentType());
		dispatch(getIndustry());
		dispatch(getFunction());
	}, [dispatch]);

	return (
		<div className="job-details" ref={parent}>
			<div className="heading">
				<h2>
					Job Details <span>*</span>
				</h2>
			</div>
			<div className="content">
				<ul>
					<li>
						<label>
							Job Title <span>*</span>
						</label>
						<Input type="text" />
					</li>
					<li>
						<label>
							Job Location <span>*</span>
						</label>
						<Input type="text" placeholder="Zip or city, state" />
					</li>
					<li>
						<label>
							Employment Type <span>*</span>
						</label>
						<Dropdown
							placeholder={employmentType.heading}
							content={props.employmentType}
						/>
					</li>
					<li>
						<label>
							Industry <span>*</span>
						</label>
						<Dropdown
							placeholder={industry.heading}
							content={props.industry}
						/>
					</li>
					<li>
						<label>
							Function <span>*</span>
						</label>
						<Dropdown
							placeholder={_function.heading}
							content={props.functionType}
						/>
					</li>
					<li>
						<label>How many Open Positions Are There?</label>
						<Input type="text" />
					</li>
				</ul>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		employmentType: state.employerReducer.employmentType,
		functionType: state.employerReducer.functionType.data,
		industry: state.employerReducer.industry.data
	}
}

// export default CreateJob;
export default connect(mapStateToProps)(CreateJob);
