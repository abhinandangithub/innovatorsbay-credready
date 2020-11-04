import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Document, Page, pdfjs } from "react-pdf";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";

import "./index.scss";
import {
	formatDate,
	checkFileSize,
	checkMimeType,
} from "../../../../../assets/js/Utility";
import {
	togglePopup,
	toggleOverlay,
} from "../../../../../store/actions/popup_overlay";
import {
	uploadCandidateResume,
	fetchCandidateDetails,
} from "../../../../../modals/candidateProfile/thunk";
import { fetchAllCandidateDataUrl } from "../../../../../modals/candidateProfile/api";
import Spinner from "../../../../_Elements/Spinner";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Resume(props) {
	const dispatch = useDispatch();
	const allData = useSelector((state) =>
		state.candidateSetDataReducer.data ? state.candidateSetDataReducer.data : []
	);
	const [success, setSuccess] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [isFormValid, setIsFormValid] = useState(null);
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [resume, setResume] = useState({
		preview:
			allData.resume_path && allData.resume_path !== ""
				? allData.resume_path
				: "",
		raw: "",
	});

	const uploadBtnRef = useRef(null);
	const reUploadBtnRef = useRef(null);

	useEffect(() => {
		if (errorMessage === "") {
			setSuccess(true);
		}
		dispatch(fetchCandidateDetails());
		setResume({
			preview:
				allData.resume_path && allData.resume_path !== ""
					? allData.resume_path
					: "",
			raw: "",
		});
	}, [errorMessage]);

	const handleChange = (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		let msg = checkFileSize(file, 6);
		if (e.target.files.length) {
			setResume({
				preview: URL.createObjectURL(e.target.files[0]),
				raw: e.target.files[0],
			});
		}
		formData.set("resume", e.target.files[0]);
		console.log(formData);
		dispatch(uploadCandidateResume(formData));
		setIsFormValid(null);

		if (msg !== true) {
			setErrorMessage(msg);
		} else {
			msg = checkMimeType(file, "pdf");
			if (msg !== true) {
				setErrorMessage(msg);
			} else {
				setErrorMessage("");
				setSelectedFile(file);
			}
		}
	};

	function onDocumentLoadSuccess({ numPages }) {
		console.log("onDocumentLoadSuccess", numPages);
		setNumPages(numPages);
	}

	const handleUpload = (e) => {
		let btnId = e.target.id;
		btnId === "uploadBtn"
			? uploadBtnRef.current.click()
			: reUploadBtnRef.current.click();
	};

	const renderNormal = () => {
		return (
			<div className="content">
				<div className={`error ${errorMessage ? "" : "hidden"}`}>
					<h4>Error</h4>
					<p>{errorMessage}</p>
				</div>
				<div className="info">
					<h4>Attach Resume </h4>
					<p>Upload resume will save time in completing your profile</p>
				</div>
				<div className="upload flex">
					<div className="content">
						<FontAwesomeIcon className="icon" icon={faUpload} />
						<br />
						<button
							className="btn"
							id="uploadBtn"
							onClick={(e) => handleUpload(e)}
						>
							Select file to upload
						</button>
						<input
							type="file"
							ref={uploadBtnRef}
							onChange={(e) => handleChange(e)}
							id="upoloadBtn"
						/>
						<p>doc, docx, pdf - Max 6 MB</p>
						{isFormValid === false && (
							<p className="error-text">Resume is not selected yet.</p>
						)}
					</div>
				</div>
			</div>
		);
	};

	const renderSuccess = () => {
		if (selectedFile || (allData && allData.resume_path)) {
			// let filePath = uploadBtnRef.current
			// 	? uploadBtnRef.current.value
			// 	: reUploadBtnRef.current.value;
			const date = formatDate(new Date());
			let name = selectedFile && selectedFile.name;
			if (allData.resume_name) name = allData.resume_name;

			return (
				<div className="content">
					<div className={`success ${errorMessage ? "hidden" : ""}`}>
						<h4>Success</h4>
						<p>Resume has been successfully uploaded.</p>
					</div>
					<div className={`error ${errorMessage ? "" : "hidden"}`}>
						<h4>Error</h4>
						<p>{errorMessage}</p>
					</div>
					<div className="info">
						<h4>Attached Resume </h4>

						<div className="history flex">
							<p>
								<span className="name">{name}</span> -{" "}
								<span className="date">Updaded on {date}</span>
							</p>
							<button
								className="re-upload-btn"
								id="reUploadBtn"
								onClick={(e) => handleUpload(e)}
							>
								Re-upload Resume
							</button>
							<input
								type="file"
								ref={reUploadBtnRef}
								onChange={(e) => handleChange(e)}
							/>
						</div>
					</div>

					<div className="preview">
						<AutoSizer disableHeight>
							{({ width }) => (
								<Document
									file={allData.resume_path ? allData.resume_path : ""}
									onLoadSuccess={onDocumentLoadSuccess}
									loading={
										<div className="spinner_outer">
											<Spinner />
										</div>
									}
								>
									{Array.from(new Array(numPages), (el, index) => (
										<Page
											// size="A4"
											loading=""
											key={`page_${index + 1}`}
											pageNumber={index + 1}
											// width={1000}
											width={width}
										/>
									))}
								</Document>
							)}
						</AutoSizer>
					</div>
				</div>
			);
		}
	};

	const handleSubmit = () => {
		console.log("form submitting...");
		console.log(success || (allData && allData.resume_path));

		if (success || (allData && allData.resume_path)) {
			dispatch(toggleOverlay(true));
			dispatch(togglePopup([true, "populateInformation"]));
			// props.history.push("/profile/personal-details");
		} else {
			setIsFormValid(false);
		}
	};
	console.log(allData);
	return (
		<div className="resume">
			{success || (allData && allData.resume_path)
				? renderSuccess()
				: renderNormal()}
			<div className="cta">
				{/* <input
					className="primary-btn blue"
					type="submit"
					value="Next"
					id="nextLink"
					onClick={handleSubmit}
				/> */}
				<Link
					className="primary-btn blue"
					to="/profile/personal-details"
					id="nextLink"
				>
					Next
				</Link>
			</div>
		</div>
	);
}

export default Resume;
