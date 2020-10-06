import React from "react";

import "./index.scss";
import ImgLock from "../../../../assets/lock.jpg";
import ImgGlobe from "../../../../assets/globe.jpg";

function AddNewQuestion() {
	return (
		<div className="add-new-question">
			<h1>Add New Question</h1>
			<div className="content">
				<div className="option">
					<div className="highlight">
						<img src={ImgLock} alt="Private Library" />
						<p>Private Library</p>
					</div>
					<p className="text">
						Set of questions creted by your teammates.
						<br />
						These are not visible to other companies.
					</p>
				</div>
				<div className="option">
					<div className="highlight">
						<img src={ImgGlobe} alt="Public Library" />
						<p>Public Library</p>
					</div>
					<p className="text">
						Set of questions for use across companies.
						<br />
						Suggested by other users & CredReady.
					</p>
				</div>
			</div>
		</div>
	);
}

export default AddNewQuestion;
