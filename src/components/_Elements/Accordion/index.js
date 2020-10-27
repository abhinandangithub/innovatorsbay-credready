import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";
import {
	toggleOverlay,
	togglePopup,
} from "../../../store/actions/popup_overlay";

import AddButton from "../AddButton";

function Accordion(props) {
	const dispatch = useDispatch();
	const [active, setActive] = useState(false);
	const contentRef = useRef(null);

	useEffect(() => {
		if (props.active) {
			setActive(true);
		}
	}, [props.active]);

	useEffect(() => {
		contentRef.current.style.height = active
			? "auto"
			: props.type === "blank"
			? "60px"
			: "0px";
		// contentRef.current.style.height = active
		// 	? `${contentRef.current.scrollHeight}px`
		// 	: props.type === "blank"
		// 	? "60px"
		// 	: "0px";
	}, [contentRef, active, props.type]);

	const addExperience = (type) => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, type]));
	};

	const arrowIcon = (
		<FontAwesomeIcon
			className="icon"
			icon={active ? faChevronUp : faChevronDown}
		/>
	);

	return (
		<div
			className={`accordion ${props.className ? props.className : ""} ${
				active ? "active" : ""
			}`}
			id={props.id}
		>
			{props.type === "blank" ? (
				<>
					<div
						className="contents"
						ref={contentRef}
						id={props.id + "heading"}
						onClick={(e) => {
							e.target.closest("ul").classList.contains("for-click") &&
								setActive(!active);
						}}
					>
						{props.children}
					</div>
					{arrowIcon}
				</>
			) : (
				<>
					<h1
						className="title flex"
						onClick={() => setActive(!active)}
						id={props.id + "heading"}
					>
						{props.title}
						{arrowIcon}
					</h1>
					<div className="contents" ref={contentRef}>
						{/* add button iff addButton prop is defined */}
						{props.addButton ? (
							<AddButton
								id={props.id + "Btn"}
								onclick={() => addExperience(props.type)}
								content={props.addButton}
							/>
						) : (
							""
						)}
						{props.children}
					</div>
				</>
			)}
		</div>
	);
}

export default Accordion;
