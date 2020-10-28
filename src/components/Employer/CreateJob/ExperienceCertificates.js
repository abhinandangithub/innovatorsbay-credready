import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import InputRange from "react-input-range";
import { getSkills } from "../../../store/thunks/employer";
import { Multiselect } from "multiselect-react-dropdown";
import { setNewJob } from "../../../store/actions/employer";
import { Link, useParams } from "react-router-dom";

function CreateJob(props) {
	let { jobId } = useParams();

	const dispatch = useDispatch();
	const [value, setValue] = React.useState({
		min: 3,
		max: 7,
	});

	const [certificates, setCertificates] = React.useState([]);

	const options = [
		{ name: "Srigar", id: 1 },
		{ name: "Sam", id: 2 },
	];

	const [disableCtrl, setDisableCtrl] = useState(false);
	const [certValidation, setCertValidation] = useState("");

	const parent = React.useRef();

	React.useEffect(() => {
		props.calHeight(parent.current.clientHeight);
	}, [props]);

	React.useEffect(() => {
		dispatch(getSkills());
	}, [dispatch]);

	React.useEffect(() => {
		console.log('certificates ', props.jobToUpdate.certificates);
		if (!!jobId) {
			setValue({
				min: props.jobToUpdate.min_experience,
				max: props.jobToUpdate.max_experience,
			});
			setCertificates(props.jobToUpdate.certificates);
			dispatch(setNewJob({ jobCertificateMap: props.jobToUpdate.certificates }));
		}
		if (props.jobToUpdate.count_of_applied_candidates && jobId)
			setDisableCtrl(true)
	}, [props.jobToUpdate]);

	React.useEffect(() => {
		dispatch(setNewJob({ minExp: value.min, maxExp: value.max }));
	}, [value]);

	const handleSelect = (selectedList, selectedItem) => {
		console.log('selectedList ', selectedList);
		let msg = selectedList.length === 0 ? "Required" : "";
		setCertValidation(msg);
		dispatch(setNewJob({ jobCertificateMap: selectedList }));
	};

	const handleRemove = (selectedList, selectedItem) => {
		console.log('selectedList ', selectedList);
		let msg = selectedList.length === 0 ? "Required" : "";
		setCertValidation(msg);
		dispatch(setNewJob({ jobCertificateMap: selectedList }));
	};

	return (
		<div className="experience-certificates" ref={parent}>
			<div className="heading">
				<h2>
					Experience and Certificate <span>*</span>
				</h2>
			</div>
			<div className="content">
				<h2 className="sub-heading">
					Certificates <span>*</span>
					<span className={`error-text ${!certValidation && "hidden"}`}>
						Required
					</span>
				</h2>

				<Multiselect
					style={{
						multiselectContainer: {
							width: "35%",
							height: "50%",
							marginBottom: "2%",
						},
					}}
					options={props.skills} // Options to display in the dropdown
					selectedValues={certificates} // Preselected value to persist in dropdown
					onSelect={(selectedList, selectedItem) =>
						handleSelect(selectedList, selectedItem)
					} // Function will trigger on select event
					onRemove={(selectedList, selectedItem) =>
						handleRemove(selectedList, selectedItem)
					} // Function will trigger on remove event
					displayValue="title_name" // Property name to display in the dropdown options
					disable={disableCtrl}
				/>
				{/* </div> */}
				<h2 className="sub-heading">
					Years of experience <span>*</span>
				</h2>
				<p>Experience in similar roles </p>
				<InputRange
					draggableTrack
					minValue={0}
					maxValue={10}
					value={value}
					// formatLabel={(value) => `${value} years`}
					onChange={(value) => setValue(value)}
				//	disabled={disableCtrl}
				/>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		skills: state.employerReducer.skills.data,
		jobToUpdate: state.employerReducer.jobToUpdate
	};
}

// export default CreateJob;
export default connect(mapStateToProps)(CreateJob);