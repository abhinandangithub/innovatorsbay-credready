import React from "react";

function SpecificQuestions(props) {
	const parent = React.useRef();

	React.useEffect(() => {
		props.calHeight(parent.current.clientHeight);
	}, [props]);

	return (
		<div className="specific-questions" ref={parent}>
			<div className="heading">
				<h2>
					Specific Questions <span>*</span>
				</h2>
			</div>
			<div className="content">
				<ul className="common-questions-outer">
					<li className="inner">
						<h2 className="question">
							Acceptable Shifts? <span>*</span>
						</h2>
						<div className="options">
							<input
								className="block-toggle blue"
								id="edu1"
								name="edu"
								type="checkbox"
								defaultChecked
							/>
							<label htmlFor="edu1">7am - 3pm</label>
							<input
								className="block-toggle blue"
								id="edu2"
								name="edu"
								type="checkbox"
							/>
							<label htmlFor="edu2">3pm - 11pm</label>
							<input
								className="block-toggle blue"
								id="edu3"
								name="edu"
								type="checkbox"
							/>
							<label htmlFor="edu3">11pm - 7am</label>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default SpecificQuestions;
