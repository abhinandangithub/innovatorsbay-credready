import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "./index.scss";
import Dropdown from "../../_Elements/Dropdown";
import CustomDatePicker from "../../_Elements/CustomDatePicker";

const metrics = {
	heading: "Select Metrics",
	content: ["All", "Certified Nursing Assistant", "Personal Care Aid"],
};

// Age categories
var categories = ["0-4", "5-9", "10-14", "15-19", "20-24", "25-29"];

function Dashboard() {
	const recruitmentFunnel = {
		chart: {
			type: "bar",
		},
		title: {
			text: "",
		},
		accessibility: {
			point: {
				valueDescriptionFormat: "{index}. Age {xDescription}, {value}%.",
			},
		},
		xAxis: [
			{
				categories: categories,
				reversed: false,
				labels: {
					step: 1,
				},
				accessibility: {
					description: "Age (male)",
				},
			},
			{
				// mirror axis on right side
				opposite: true,
				reversed: false,
				categories: categories,
				linkedTo: 0,
				labels: {
					step: 1,
				},
				accessibility: {
					description: "Age (female)",
				},
			},
		],
		yAxis: {
			title: {
				text: null,
			},
			labels: {
				formatter: function () {
					return Math.abs(this.value) + "%";
				},
			},
			accessibility: {
				description: "Percentage population",
				rangeDescription: "Range: 0 to 5%",
			},
		},

		plotOptions: {
			series: {
				stacking: "normal",
			},
		},

		tooltip: {
			formatter: function () {
				return (
					"<b>" +
					this.series.name +
					", age " +
					this.point.category +
					"</b><br/>" +
					"Population: " +
					Highcharts.numberFormat(Math.abs(this.point.y), 1) +
					"%"
				);
			},
		},

		series: [
			{
				name: "Male",
				data: [-2.2, -2.1, -2.2, -2.4, -2.7],
			},
			{
				name: "Female",
				data: [2.1, 2.0, 2.1, 2.3, 2.6],
			},
		],
	};
	const applicationsRecieved = {
		title: {
			text: "",
		},
		yAxis: {
			title: {
				text: "Number of Employees",
			},
		},

		xAxis: {
			accessibility: {
				rangeDescription: "Range: 2010 to 2017",
			},
		},

		legend: {
			layout: "vertical",
			align: "right",
			verticalAlign: "middle",
		},

		plotOptions: {
			series: {
				label: {
					connectorAllowed: false,
				},
				pointStart: 2010,
			},
		},

		series: [
			{
				name: "",
				data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
			},
			{
				name: "",
				data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
			},
		],

		responsive: {
			rules: [
				{
					condition: {
						maxWidth: 500,
					},
					chartOptions: {
						legend: {
							layout: "horizontal",
							align: "center",
							verticalAlign: "bottom",
						},
					},
				},
			],
		},
	};
	const offersMade = {
		title: {
			text: "",
		},
		yAxis: {
			title: {
				text: "Number of Employees",
			},
		},

		xAxis: {
			accessibility: {
				rangeDescription: "Range: 2010 to 2017",
			},
		},

		legend: {
			layout: "vertical",
			align: "right",
			verticalAlign: "middle",
		},

		plotOptions: {
			series: {
				label: {
					connectorAllowed: false,
				},
				pointStart: 2010,
			},
		},

		series: [
			{
				name: "",
				data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
			},
			{
				name: "",
				data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
			},
			{
				name: "",
				data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
			},
		],

		responsive: {
			rules: [
				{
					condition: {
						maxWidth: 500,
					},
					chartOptions: {
						legend: {
							layout: "horizontal",
							align: "center",
							verticalAlign: "bottom",
						},
					},
				},
			],
		},
	};
	const applicationsBySource = {
		chart: {
			type: "column",
		},
		title: {
			text: "",
		},
		xAxis: {
			categories: ["Apples", "Oranges", "Pears", "Grapes", "Bananas"],
		},
		yAxis: {
			min: 0,
			title: {
				text: "Total fruit consumption",
			},
			stackLabels: {
				enabled: true,
				style: {
					fontWeight: "bold",
					color:
						// theme
						(Highcharts.defaultOptions.title.style &&
							Highcharts.defaultOptions.title.style.color) ||
						"gray",
				},
			},
		},
		legend: {
			align: "right",
			x: -30,
			verticalAlign: "top",
			y: 25,
			floating: true,
			backgroundColor:
				Highcharts.defaultOptions.legend.backgroundColor || "white",
			borderColor: "#CCC",
			borderWidth: 1,
			shadow: false,
		},
		tooltip: {
			headerFormat: "<b>{point.x}</b><br/>",
			pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
		},
		plotOptions: {
			column: {
				stacking: "normal",
				dataLabels: {
					enabled: true,
				},
			},
		},
		series: [
			{
				name: "John",
				data: [5, 3, 4, 7, 2],
			},
			{
				name: "Jane",
				data: [2, 2, 3, 2, 1],
			},
			{
				name: "Joe",
				data: [3, 4, 4, 2, 5],
			},
		],
	};
	const applicantsAverage = {
		chart: {
			type: "column",
		},

		title: {
			text: "",
		},

		xAxis: {
			categories: ["Apples", "Oranges", "Pears", "Grapes", "Bananas"],
		},

		yAxis: {
			allowDecimals: false,
			min: 0,
			title: {
				text: "Number of fruits",
			},
		},

		tooltip: {
			formatter: function () {
				return (
					"<b>" +
					this.x +
					"</b><br/>" +
					this.series.name +
					": " +
					this.y +
					"<br/>" +
					"Total: " +
					this.point.stackTotal
				);
			},
		},

		plotOptions: {
			column: {
				stacking: "normal",
			},
		},

		series: [
			{
				name: "John",
				data: [5, 3, 4, 7, 2],
				stack: "male",
			},
			{
				name: "Joe",
				data: [3, 4, 4, 2, 5],
				stack: "male",
			},
			{
				name: "Jane",
				data: [2, 5, 6, 2, 1],
				stack: "female",
			},
			{
				name: "Janet",
				data: [3, 0, 4, 4, 3],
				stack: "female",
			},
		],
	};
	const jobPosts1 = {
		chart: {
			type: "areaspline",
		},
		title: {
			text: "",
		},
		legend: {
			layout: "vertical",
			align: "left",
			verticalAlign: "top",
			x: 150,
			y: 100,
			floating: true,
			borderWidth: 1,
			backgroundColor:
				Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
		},
		xAxis: {
			categories: [
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
				"Sunday",
			],
			plotBands: [
				{
					// visualize the weekend
					from: 4.5,
					to: 6.5,
					color: "rgba(68, 170, 213, .2)",
				},
			],
		},
		yAxis: {
			title: {
				text: "Fruit units",
			},
		},
		tooltip: {
			shared: true,
			valueSuffix: " units",
		},
		credits: {
			enabled: false,
		},
		plotOptions: {
			areaspline: {
				fillOpacity: 0.5,
			},
		},
		series: [
			{
				name: "John",
				data: [3, 4, 3, 5, 4, 10, 12],
			},
			{
				name: "Jane",
				data: [1, 3, 4, 3, 3, 5, 4],
			},
		],
	};
	const jobPosts2 = {
		chart: {
			type: "area",
		},
		accessibility: {
			description:
				"Image description: An area chart compares the nuclear stockpiles of the USA and the USSR/Russia between 1945 and 2017. The number of nuclear weapons is plotted on the Y-axis and the years on the X-axis. The chart is interactive, and the year-on-year stockpile levels can be traced for each country. The US has a stockpile of 6 nuclear weapons at the dawn of the nuclear age in 1945. This number has gradually increased to 369 by 1950 when the USSR enters the arms race with 6 weapons. At this point, the US starts to rapidly build its stockpile culminating in 32,040 warheads by 1966 compared to the USSR’s 7,089. From this peak in 1966, the US stockpile gradually decreases as the USSR’s stockpile expands. By 1978 the USSR has closed the nuclear gap at 25,393. The USSR stockpile continues to grow until it reaches a peak of 45,000 in 1986 compared to the US arsenal of 24,401. From 1986, the nuclear stockpiles of both countries start to fall. By 2000, the numbers have fallen to 10,577 and 21,000 for the US and Russia, respectively. The decreases continue until 2017 at which point the US holds 4,018 weapons compared to Russia’s 4,500.",
		},
		title: {
			text: "",
		},
		subtitle: {
			text:
				'Sources: <a href="https://thebulletin.org/2006/july/global-nuclear-stockpiles-1945-2006">' +
				'thebulletin.org</a> &amp; <a href="https://www.armscontrol.org/factsheets/Nuclearweaponswhohaswhat">' +
				"armscontrol.org</a>",
		},
		xAxis: {
			allowDecimals: false,
			labels: {
				formatter: function () {
					return this.value; // clean, unformatted number for year
				},
			},
			accessibility: {
				rangeDescription: "Range: 1940 to 2017.",
			},
		},
		yAxis: {
			title: {
				text: "Nuclear weapon states",
			},
			labels: {
				formatter: function () {
					return this.value / 1000 + "k";
				},
			},
		},
		tooltip: {
			pointFormat:
				"{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}",
		},
		plotOptions: {
			area: {
				pointStart: 1940,
				marker: {
					enabled: false,
					symbol: "circle",
					radius: 2,
					states: {
						hover: {
							enabled: true,
						},
					},
				},
			},
		},
		series: [
			{
				name: "USA",
				data: [
					null,
					null,
					null,
					null,
					null,
					6,
					11,
					32,
					110,
					235,
					369,
					640,
					1005,
					1436,
					2063,
					3057,
					4618,
					6444,
					9822,
					15468,
					20434,
					24126,
					27387,
					29459,
					31056,
					31982,
					32040,
					31233,
					29224,
					27342,
					26662,
					26956,
					27912,
					28999,
					28965,
					27826,
					25579,
					25722,
					24826,
					24605,
					24304,
					23464,
					23708,
					24099,
					24357,
					24237,
					24401,
					24344,
					23586,
					22380,
					21004,
					17287,
					14747,
					13076,
					12555,
					12144,
					11009,
					10950,
					10871,
					10824,
					10577,
					10527,
					10475,
					10421,
					10358,
					10295,
					10104,
					9914,
					9620,
					9326,
					5113,
					5113,
					4954,
					4804,
					4761,
					4717,
					4368,
					4018,
				],
			},
			{
				name: "USSR/Russia",
				data: [
					null,
					null,
					null,
					null,
					null,
					null,
					null,
					null,
					null,
					null,
					5,
					25,
					50,
					120,
					150,
					200,
					426,
					660,
					869,
					1060,
					1605,
					2471,
					3322,
					4238,
					5221,
					6129,
					7089,
					8339,
					9399,
					10538,
					11643,
					13092,
					14478,
					15915,
					17385,
					19055,
					21205,
					23044,
					25393,
					27935,
					30062,
					32049,
					33952,
					35804,
					37431,
					39197,
					45000,
					43000,
					41000,
					39000,
					37000,
					35000,
					33000,
					31000,
					29000,
					27000,
					25000,
					24000,
					23000,
					22000,
					21000,
					20000,
					19000,
					18000,
					18000,
					17000,
					16000,
					15537,
					14162,
					12787,
					12600,
					11400,
					5500,
					4512,
					4502,
					4502,
					4500,
					4500,
				],
			},
		],
	};

	const [startDate, setStartDate] = useState(new Date("05/24/99"));
	const [endDate, setEndDate] = useState(new Date());

	return (
		<div className="dashboard-employer">
			<div className="numbers">
				<div className="common-main-heading">
					<h2>Dashboard</h2>
				</div>
				<ul>
					<li>
						<h2>5</h2>
						<p>Job Posted</p>
					</li>
					<li>
						<h2>6</h2>
						<p>Open Positions</p>
					</li>
					<li>
						<h2>4</h2>
						<p>New Applications</p>
					</li>
					<li>
						<h2>3</h2>
						<p>Interviewed</p>
					</li>
					<li>
						<h2>2</h2>
						<p>Offer Placed</p>
					</li>
				</ul>
			</div>

			<div className="filters flex">
				<div className="left flex">
					<h3>Show Metrics For</h3>
					<Dropdown placeholder={metrics.heading} content={metrics.content} />
				</div>
				<div className="right flex">
					<h3>Duration</h3>
					<div className="start-date">
						<CustomDatePicker
							placeholderText="Start Date"
							selected={startDate}
							onChange={(date) => setStartDate(date)}
						/>
					</div>
					<div className="date">
						<CustomDatePicker
							placeholderText="End Date"
							selected={endDate}
							minDate={startDate}
							onChange={(date) => setEndDate(date)}
						/>
					</div>
				</div>
			</div>

			<div className="widgets widgets-dashboard">
				<div className="widget">
					<div className="heading">Recruitment funnel</div>
					<div className="content">
						<HighchartsReact
							highcharts={Highcharts}
							options={recruitmentFunnel}
						/>
					</div>
				</div>
				<div className="widget">
					<div className="heading">
						Trend of applications received over time
					</div>
					<div className="content">
						<HighchartsReact
							highcharts={Highcharts}
							options={applicationsRecieved}
						/>
					</div>
				</div>
				<div className="widget">
					<div className="heading">
						Ratio of offers made to candidates interviewed
					</div>
					<div className="content">
						<HighchartsReact highcharts={Highcharts} options={offersMade} />
					</div>
				</div>
				<div className="widget">
					<div className="heading">Applications by source</div>
					<div className="content">
						<HighchartsReact
							highcharts={Highcharts}
							options={applicationsBySource}
						/>
					</div>
				</div>
				<div className="widget">
					<div className="heading">
						Number of applicants across average days to hire
					</div>
					<div className="content">
						<HighchartsReact
							highcharts={Highcharts}
							options={applicantsAverage}
						/>
					</div>
				</div>
				<div className="widget">
					{/* <div className="heading">Distribution of application by location</div>
					<div className="content">
						<img src={ImgWD6} alt="Distribution of application by location" />
					</div> */}
				</div>
			</div>

			<h2>Job Posts</h2>
			<div className="widgets widgets-dashboard">
				<div className="widget">
					<div className="content">
						<HighchartsReact highcharts={Highcharts} options={jobPosts1} />
					</div>
				</div>
				<div className="widget">
					<div className="content">
						<HighchartsReact highcharts={Highcharts} options={jobPosts2} />
					</div>
				</div>
				<div className="widget"></div>
			</div>
		</div>
	);
}

export default Dashboard;
