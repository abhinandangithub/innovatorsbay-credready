import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";

function AddButton(props) {
	return (
		<button className="add-btn" onClick={props.onclick} id={props.id} disabled={props.disable}>
			<span className="icon">
				<FontAwesomeIcon icon={faPlus} />
			</span>
			{props.content}
		</button>
	);
}

export default AddButton;
