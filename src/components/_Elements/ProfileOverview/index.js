import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
	uploadProfileImage,
} from "../../../store/thunks/employer";
import {
	updateCandidatePhone,
	updateCandidateAbout,
	updateCandidateEmail,
	uploadCandidateImage,
	fetchAllAnswers,
} from "../../../modals/candidateProfile/thunk";

function ProfileOverview(props) {
	const dispatch = useDispatch();
	const allData = useSelector((state) => state.candidateSetDataReducer.data);
	const employerProfile = useSelector((state) => state.employerReducer.profile);
	const [email, setEmail] = useState(
		props.type === "candidate" &&
			allData.contacts &&
			allData.contacts.length > 0
			? allData.contacts.find((el) => el.contact_type === "email").contact
			: ""
	);
	const [about, setAbout] = useState(
		props.type === "candidate" && allData.about_me ? allData.about_me : ""
	);
	const [phone, setPhone] = useState(
		props.type === "candidate" &&
			allData.contacts &&
			allData.contacts.length > 0
			? allData.contacts.find((el) => el.contact_type === "phone").contact
			: ""
	);
	const [editingPhone, setEditingPhone] = useState(false);
	const [editingEmail, setEditingEmail] = useState(false);
	const [editingAboutMe, setEditingAboutMe] = useState(false);
	const [image, setImage] = useState({
		preview:
			employerProfile.data.org.logo_path !== ""
				? employerProfile.data.org.logo_path
				: ImgUserPlaceholder,
		raw: "",
	});
	const [candidateImage, setCandidateImage] = useState({
		preview:
			allData.profile_image_path && allData.profile_image_path !== ""
				? allData.profile_image_path
				: ImgUserPlaceholder,
		raw: "",
	});

	useEffect(() => {
		console.log(
			props.type === "candidate" && allData.about_me ? allData.about_me : ""
		);
		setEmail(
			props.type === "candidate"
				? allData.username
					? allData.username
					: ""
				: employerProfile.data.contacts.length > 0
				? employerProfile.data.contacts.find(
						(el) => el.contact_type === "email"
				  ).contact
				: ""
		);
		setAbout(
			props.type === "candidate" && allData.about_me ? allData.about_me : ""
		);
		setPhone(
			props.type === "candidate"
				? allData.contacts
					? allData.contacts.find((el) => el.contact_type === "phone").contact
					: ""
				: employerProfile.data.contacts.length > 0
				? employerProfile.data.contacts.find(
						(el) => el.contact_type === "phone"
				  ).contact
				: ""
		);
		setCandidateImage({
			preview: allData.profile_image_path,
			raw: "",
		});
		setImage({
			preview: employerProfile.data.org.logo_path,
			raw: "",
		});
		dispatch(fetchAllAnswers());
	}, [employerProfile, allData]);

	const handleDelete = () => {
		// console.log("deleting");
		dispatch(toggleOverlay(true));
		if (props.type === "candidate") {
			dispatch(togglePopup([true, "delete", { what: "profileCandidate" }]));
		} else {
			dispatch(togglePopup([true, "delete", { what: "profileEmployer" }]));
		}
		// if (props.type !== "candidate") dispatch(deleteAccount());
	};

	const handleClick = (id) => {
		if (id === "checkPhoneBtn" || id === "closePhoneBtn") {
			setEditingPhone(false);
			if (id === "checkPhoneBtn") {
				if (props.type !== "candidate") {
					dispatch(updatePhoneThunk(phone));
				} else {
					dispatch(updateCandidatePhone(phone));
				}
			}
		} else if (id === "editPhoneBtn") {
			setEditingPhone(true);
		} else if (id === "checkAboutMeBtn" || id === "closeAboutMeBtn") {
			setEditingAboutMe(false);
			if (id === "checkAboutMeBtn") {
				if (props.type === "candidate") dispatch(updateCandidateAbout(about));
			}
		} else if (id === "checkEmailBtn" || id === "closeEmailBtn") {
			setEditingEmail(false);
			if (id === "checkEmailBtn") {
				if (props.type !== "candidate") dispatch(updateEmailThunk(email));
				dispatch(updateCandidateEmail(email));
			}
		} else if (id === "editEmailBtn") {
			setEditingEmail(true);
		} else if (id === "checkAboutMeBtn" || id === "closeAboutMeBtn") {
			setEditingAboutMe(false);
		} else if (id === "editAboutMeBtn") {
			setEditingAboutMe(true);
		}
	};

	const handleChange = (e) => {
		console.log(e.target.files[0]);
		const formData = new FormData();
		if (props.type === "candidate") {
			if (e.target.files.length) {
				setCandidateImage({
					preview: URL.createObjectURL(e.target.files[0]),
					raw: e.target.files[0],
				});
			}
			formData.set("dp", e.target.files[0]);
			console.log(formData);
			dispatch(uploadCandidateImage(formData));
		} else {
			if (e.target.files.length) {
				setImage({
					preview: URL.createObjectURL(e.target.files[0]),
					raw: e.target.files[0],
				});
			}
			formData.set("logo", e.target.files[0]);
			console.log(formData);
			dispatch(uploadProfileImage(formData));
		}
	};

	return (
		<div className="profile-overview">
			<div className="primary">
				<div className="avatar">
					{props.type === "candidate" ? (
						<img src={candidateImage.preview} alt="Guest" />
					) : (
						<img src={image.preview} alt="NYP" />
					)}
					<div className="edit" id="editPicBtn">
						<label htmlFor="upload-button">
							<FontAwesomeIcon className="btn" icon={faPen} />
						</label>
						<input
							type="file"
							id="upload-button"
							style={{ display: "none" }}
							onChange={(e) => handleChange(e)}
						/>
					</div>
				</div>
				{props.type === "candidate" && (
					<h1>
						{allData.first_name ? allData.first_name : ""}{" "}
						{allData.last_name ? allData.last_name : ""}
					</h1>
				)}
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
							// defaultValue={allData.contacts[0] && allData.contacts[0].contact ? allData.contacts[0].contact : ""}
							value={phone}
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
								value={about}
								className={`${editingAboutMe ? "edit" : ""}`}
								readOnly={editingAboutMe ? false : true}
								onChange={(e) => setAbout(e.target.value)}
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

// function mapStateToProps(state) {
// 	return {
// 		employerProfile: state.employerReducer.profile,
// 	}
// }

// export default connect(mapStateToProps)(ProfileOverview);
export default ProfileOverview;
