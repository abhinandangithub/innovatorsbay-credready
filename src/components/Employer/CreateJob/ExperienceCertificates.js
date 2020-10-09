import React from "react";
import { connect, useDispatch } from 'react-redux';
import InputRange from "react-input-range";
import { getSkills } from '../../../store/thunks/employer';

function CreateJob(props) {
	const dispatch = useDispatch();
	const [value, setValue] = React.useState({
		min: 3,
		max: 7,
	});

	console.log('props ', props.skills)
	// value.min
	// value.max

	const parent = React.useRef();

	React.useEffect(() => {
		props.calHeight(parent.current.clientHeight);
	}, [props]);
	
	React.useEffect(() => {
		dispatch(getSkills());
	}, [dispatch]);

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
				</h2>
				<ul className="added-items">
					{props.skills.map((val, i) => {
						return(
							<li key={val.id}>
								{val.title_name} <span></span>{" "}
							</li>
						);
					})}
					{/* <li>
						Nursing <span></span>{" "}
					</li>
					<li>
						Take Care <span></span>{" "}
					</li> */}
					<li className="btn"></li>
				</ul>
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
				/>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		skills: state.employerReducer.skills.data,
	}
}

// export default CreateJob;
export default connect(mapStateToProps)(CreateJob);
// export default CreateJob;
