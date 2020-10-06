import React from "react";
import InputRange from "react-input-range";

function CreateJob(props) {
	const [value, setValue] = React.useState({
		min: 3,
		max: 7,
	});

	// value.min
	// value.max

	const parent = React.useRef();

	React.useEffect(() => {
		props.calHeight(parent.current.clientHeight);
	}, [props]);

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
					<li>
						Nursing <span></span>{" "}
					</li>
					<li>
						Take Care <span></span>{" "}
					</li>
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

export default CreateJob;
