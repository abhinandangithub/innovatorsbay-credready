import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
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
import {
	deleteAccount,
	updateEmailThunk,
	updatePhoneThunk,
	getProfileThunk,
} from "../../../store/thunks/employer";

function ProfileOverview(props) {
	const dispatch = useDispatch();
	const allData = useSelector((state) => state.candidateSetDataReducer.data);
	const employerProfile = useSelector((state) => state.employerReducer.profile);
	console.log('employerProfile ', props.type, employerProfile);
	const [email, setEmail] = useState(
		props.type === "candidate"
			? allData.username
				? allData.username
				: ""
			: employerProfile.data.contacts.length > 0
				? employerProfile.data.contacts.find((el) => el.contact_type === "email")
					.contact
				: ""
	);
	const [phone, setPhone] = useState(
		props.type === "candidate"
			? allData.phone_no
				? allData.phone_no
				: ""
			: employerProfile.data.contacts.length > 0
				? employerProfile.data.contacts.find((el) => el.contact_type === "phone")
					.contact
				: ""
	);
	const [editingPhone, setEditingPhone] = useState(false);
	const [editingEmail, setEditingEmail] = useState(false);
	const [editingAboutMe, setEditingAboutMe] = useState(false);

	useEffect(() => {
		dispatch(getProfileThunk());
	}, [dispatch]);

	useEffect(() => {
		setEmail(
			props.type === "candidate"
				? allData.username
					? allData.username
					: ""
				: employerProfile.data.contacts.length > 0
					? employerProfile.data.contacts.find((el) => el.contact_type === "email")
						.contact
					: ""
		);
		setPhone(
			props.type === "candidate"
				? allData.phone_no
					? allData.phone_no
					: ""
				: employerProfile.data.contacts.length > 0
					? employerProfile.data.contacts.find((el) => el.contact_type === "phone")
						.contact
					: ""
		);
	}, [employerProfile]);


	const handleDelete = () => {
		// console.log("deleting");
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "delete", { what: "profile" }]));
		dispatch(deleteAccount());
	};

	const handleClick = (id) => {
		console.log(id);
		if (id === "checkPhoneBtn" || id === "closePhoneBtn") {
			setEditingPhone(false);
			if (id === "checkPhoneBtn") {
				dispatch(updatePhoneThunk(phone));
			}
		} else if (id === "editPhoneBtn") {
			setEditingPhone(true);
		} else if (id === "checkEmailBtn" || id === "closeEmailBtn") {
			setEditingEmail(false);
			if (id === "checkEmailBtn") {
				dispatch(updateEmailThunk(email));
			}
		} else if (id === "editEmailBtn") {
			setEditingEmail(true);
		} else if (id === "checkAboutMeBtn" || id === "closeAboutMeBtn") {
			setEditingAboutMe(false);
		} else if (id === "editAboutMeBtn") {
			setEditingAboutMe(true);
		}
	};

	return (
		<div className="profile-overview">
			<div className="primary">
				<div className="avatar">
					{props.type === "candidate" ? (
						<img src={ImgUserPlaceholder} alt="Guest" />
					) : (
							<img src={ImgUserPlaceholder} alt="NYP" />
						)}
					<div className="edit" id="editPicBtn">
						<FontAwesomeIcon className="btn" icon={faPen} />
					</div>
				</div>

				<h1>{allData.first_name ? allData.first_name : ""}</h1>
				{props.type === "employer" && (
					<>
						<h2>{employerProfile.data.name}</h2>
						<h3>{employerProfile.data.title}</h3>
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
						<input
							type="text"
							defaultValue={allData.contacts[0] && allData.contacts[0].contact ? allData.contacts[0].contact : ""}
							className={`${editingPhone ? "edit" : ""}`}
							readOnly={editingPhone ? false : true}
							onChange={(e) => setPhone(e.target.value)}
						/>
						<FontAwesomeIcon
							id="editPhoneBtn"
							icon={faPen}
							className={`edit ${editingPhone ? "hidden" : ""}`}
							onClick={(e) => handleClick(e.target.id)}
						/>
						<FontAwesomeIcon
							className={`close ${editingPhone ? "" : "hidden"}`}
							id="closePhoneBtn"
							icon={faTimes}
							onClick={(e) => handleClick(e.target.id)}
						/>
						<FontAwesomeIcon
							className={`check ${editingPhone ? "" : "hidden"}`}
							id="checkPhoneBtn"
							icon={faCheck}
							onClick={(e) => handleClick(e.target.id)}
						/>
					</li>
					<li>
						<FontAwesomeIcon className="icon" icon={faMailBulk} />
						<input
							type="text"
							// defaultValue={allData.username ? allData.username : ""}
							value={email}
							className={`${editingEmail ? "edit" : ""}`}
							readOnly={editingEmail ? false : true}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<FontAwesomeIcon
							id="editEmailBtn"
							icon={faPen}
							className={`edit ${editingEmail ? "hidden" : ""}`}
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
							{/* <textarea
								defaultValue="About me"
								className={`${editingAboutMe ? "edit" : ""}`}
								readOnly={editingAboutMe ? false : true}
							></textarea> */}
							<input
								type="text"
								defaultValue="About me"
								className={`${editingAboutMe ? "edit" : ""}`}
								readOnly={editingAboutMe ? false : true}
							/>
							<FontAwesomeIcon
								id="editAboutMeBtn"
								icon={faPen}
								className={`edit ${editingAboutMe ? "hidden" : ""}`}
								onClick={(e) => handleClick(e.target.id)}
							/>
							<FontAwesomeIcon
								className={`close ${editingAboutMe ? "" : "hidden"}`}
								id="closeAboutMeBtn"
								icon={faTimes}
								onClick={(e) => handleClick(e.target.id)}
							/>
							<FontAwesomeIcon
								className={`check ${editingAboutMe ? "" : "hidden"}`}
								id="checkAboutMeBtn"
								icon={faCheck}
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

function mapStateToProps(state) {
	return {
		employerProfile: state.employerReducer.profile,
	}
}

export default connect(mapStateToProps)(ProfileOverview);
