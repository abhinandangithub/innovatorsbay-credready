export const formatDate = (date) => {
	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	let m = "" + date.getMonth(),
		d = "" + date.getDate(),
		y = date.getFullYear();

	if (d.length < 2) d = "0" + d;

	return `${months[m].substr(0, 3)} ${d}, ${y}`;
};

export const checkFileSize = (file, limit) => {
	// compare file type find doesn't matach
	if (file.size / 1024 / 1024 >= limit) {
		return `Maximum file size limit is ${limit} MB`;
	} else {
		return true;
	}
};

export const checkMimeType = (file, type) => {
	// list allow mime type
	const pdfTypes = [
		"application/pdf",
		"application/msword",
		"application/vnd.openxmlformats-officedocument.wordprocessing",
	];

	const imgTypes = ["image/jpeg", "image/gif", "image/png"];

	// compare file type find doesn't matach
	if (type === "pdf") {
		if (pdfTypes.every((type) => file.type !== type)) {
			return "Unsupported resume format. Please upload the resume in PDF or Word (.docx) format.";
		} else {
			return true;
		}
	} else if (type === "img") {
		if (imgTypes.every((type) => file.type !== type)) {
			return "Unsupported image format. Please upload the image in JPEG, JPG, PNG or GIF format.";
		} else {
			return true;
		}
	}
};

export const calculateTimeLeft = (timerDuration) => {
	const difference = timerDuration;
	let timeLeft = {};

	if (difference > 0) {
		let minutes = parseInt(difference / 60, 10);
		let seconds = parseInt(difference % 60, 10);
		timeLeft = {
			m: minutes < 10 ? "0" + minutes : minutes,
			s: seconds < 10 ? "0" + seconds : seconds,
		};
	}
	return timeLeft;
};
