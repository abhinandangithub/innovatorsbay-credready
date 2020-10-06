import React from "react";

import "./index.scss";

function Certificate({ certificate }) {
	return (
		<div className="certificate">
			<img src={certificate} alt="Certificate" />
		</div>
	);
}

export default Certificate;
