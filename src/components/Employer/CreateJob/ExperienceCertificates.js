import React from "react";

function CreateJob(props) {
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
			</div>
		</div>
	);
}

export default CreateJob;
