import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPen,
	faPhone,
	faMailBulk,
	faInfoCircle,
	faDownload,
	faTrash,
	faTimes,
	faCheck,
} from "@fortawesome/free-solid-svg-icons";

import "./index.scss";
import ImgNYP from "../../../assets/nyp.png";
import ImgUserPlaceholder from "../../../assets/user-placeholder.jpg";
import {
	togglePopup,
	toggleOverlay,
} from "../../../store/actions/popup_overlay";
import { updateEmailThunk } from '../../../store/thunks/employer';

function ProfileOverview(props) {
	const dispatch = useDispatch();
	const [editingEmail, setEditingEmail] = useState(false);
	const [email, setEmail] = useState("marryjane@gmail.com");

	const handleDelete = () => {
		// console.log("deleting");
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "delete", { what: "profile" }]));
	};

	const handleClick = (id) => {
		console.log(id);
		setEditingEmail(true);
		if(id === "checkEmailBtn") {
			dispatch(updateEmailThunk(email));
		}
	};

	return (
		<div className="profile-overview">
			<div className="primary">
				<div className="avatar">
					{props.type === "candidate" ? (
						<img src={ImgUserPlaceholder} alt="Guest" />
					) : (
						<img src={ImgNYP} alt="NYP" />
					)}
					<div className="edit" id="editPicBtn">
						<FontAwesomeIcon className="btn" icon={faPen} />
					</div>
				</div>

				<h1>{}</h1>
				{props.type === "employer" && (
					<>
						<h2>Chelsea Senior</h2>
						<h3>Living</h3>
					</>
				)}
			</div>
			<div className="secondary">
				<ul>
					<li>
						<FontAwesomeIcon
							className="icon"
							icon={faPhone}
							style={{ transform: "rotateY(180deg)" }}
						/>
						212-639-9675
						<FontAwesomeIcon
							className={`edit ${editingEmail ? "hidden" : ""}`}
							id="editPhoneBtn"
							icon={faPen}
							onClick={(e) => handleClick(e.target.id)}
						/>
					</li>
					<li>
						<FontAwesomeIcon className="icon" icon={faMailBulk} />
						<input type="text" defaultValue="marryjane@gmail.com" onChange={(e) => setEmail(e.target.value)}/>
						<FontAwesomeIcon
							className="edit"
							id="editEmailBtn"
							icon={faPen}
							onClick={(e) => handleClick(e.target.id)}
						/>
						<FontAwesomeIcon
							className={`close ${editingEmail ? "" : "hidden"}`}
							id="closeEmailBtn"
							icon={faTimes}
							onClick={(e) => handleClick(e.target.id)}
						/>
						<FontAwesomeIcon
							className={`check ${editingEmail ? "" : "hidden"}`}
							id="checkEmailBtn"
							icon={faCheck}
							onClick={(e) => handleClick(e.target.id)}
						/>
					</li>
					{props.type === "candidate" && (
						<li>
							<FontAwesomeIcon className="icon" icon={faInfoCircle} />
							About me
							<FontAwesomeIcon
								className="edit"
								id="editAboutMeBtn"
								icon={faPen}
								onClick={(e) => handleClick(e.target.id)}
							/>
						</li>
					)}

					<li className="highlight">
						<a
							href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
							download="myFile"
							id="downloadPersonalInfoLink"
						>
							<FontAwesomeIcon className="icon" icon={faDownload} />
							Download personal information
						</a>
					</li>
					<li className="highlight">
						<div onClick={handleDelete} id="deleteProfileBtn">
							<FontAwesomeIcon className="icon" icon={faTrash} />
							Delete Account
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default ProfileOverview;
