import React from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPen,
	faPhone,
	faMailBulk,
	faInfoCircle,
	faDownload,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";

import "./index.scss";
import ImgNYP from "../../../assets/nyp.png";
import ImgUserPlaceholder from "../../../assets/user-placeholder.jpg";
import {
	togglePopup,
	toggleOverlay,
} from "../../../store/actions/popup_overlay";
import { deleteAccount } from '../../../store/thunks/employer';

function ProfileOverview(props) {
	const dispatch = useDispatch();

	const handleDelete = () => {
		// console.log("deleting");
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "delete", { what: "profile" }]));
		dispatch(deleteAccount());
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
						<FontAwesomeIcon className="edit" id="editPhoneBtn" icon={faPen} />
					</li>
					<li>
						<FontAwesomeIcon className="icon" icon={faMailBulk} />
						marryjane@gmail.com
						<FontAwesomeIcon className="edit" id="editEmailBtn" icon={faPen} />
					</li>
					{props.type === "candidate" && (
						<li>
							<FontAwesomeIcon className="icon" icon={faInfoCircle} />
							About me
							<FontAwesomeIcon
								className="edit"
								id="editAboutMeBtn"
								icon={faPen}
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
