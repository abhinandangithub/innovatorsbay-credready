import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "./index.scss";
import {
	togglePopup,
	toggleOverlay,
} from "../../../store/actions/popup_overlay";

function InputDropdown({
	id,
	placeholder,
	content,
	selected,
	onchange,
	search_term,
	intellisense,
	allow_random,
	disable = false
}) {
	const dispatch = useDispatch();
	const [active, setactive] = useState(false);
	const [value, setvalue] = useState(null);
	const [isChanged, setIsChanged] = useState(false);
	const dropDownEl = React.useRef();

	const toTitleCase = (str) => {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	};

	const handleItemClick = (item) => {
		onchange && onchange(item.id ? item.id : item);
		setvalue(item.val ? toTitleCase(item.val) : toTitleCase(item));
		setactive(false);
		setIsChanged(true);
	};

	const handleClickOutside = (e) => {
		if (e.target.closest(".common-dropdown") !== dropDownEl.current) {
			if (!dropDownEl.current.classList.contains("changed") && !allow_random) {
				setvalue("");
			}
			setactive(false);
		}
	};

	const createEmailTemplate = () => {
		dispatch(toggleOverlay(true));
		dispatch(togglePopup([true, "createEmailTemplate", { type: "add", data: undefined }]));

		setactive(false);
	};

	const renderContent = () => {
		let searchItem = null;

		if (value) {
			searchItem = value.toLowerCase();
		}

		return (
			<ul className="content">
				{id === "emailtemplate" ? (
					<li onClick={createEmailTemplate} className="create_new_template">
						+ Create a new template
					</li>
				) : (
						""
					)}
				{content &&
					content.map((item, key) => {
						if (searchItem) {
							if (search_term && searchItem.length !== 0) {
								if (!item.val.toLowerCase().includes(searchItem)) {
									return null;
								}
							} else if (!item.toLowerCase().includes(searchItem)) {
								return null;
							}
						}
						if (typeof item === "object" && item.val === undefined) return null;

						return (
							<li onClick={() => handleItemClick(item)} key={key}>
								{item.val ? item.val : item}
							</li>
						);
					})}
			</ul>
		);
	};

	React.useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div
			className={`common-dropdown common-input-dropdown ${
				active ? "active" : ""
				}  ${isChanged || selected ? "changed" : ""}`}
			id={id && id}
			ref={dropDownEl}
		>
			<div className="heading" onClick={() => setactive(true)}>
				<input
					type="text"
					placeholder={placeholder}
					value={selected ? selected : value ? value : ""}
					autoComplete="none"
					onChange={(e) => {
						dropDownEl.current.classList.remove("changed");
						setvalue(e.target.value);
						onchange && onchange(e.target.value);
					}}
					disabled={disable}
				/>
			</div>
			{intellisense
				? value && value.length > 0
					? renderContent()
					: null
				: renderContent()}
		</div>
	);
}

export default InputDropdown;
