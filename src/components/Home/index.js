import React, { useState } from "react";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector } from "react-redux";
// import { Breadcrumbs } from "react-breadcrumbs-dynamic";

import "./index.scss";
import Header from "../Header";
import Navigation from "../Navigation";
import Footer from "../Footer";
// import Breadcrumbs from "../_Elements/Breadcrumbs/Breadcrumbs";

import CandidateDashboard from "../Candidate/Dashboard";
import CandidateProfile from "../Candidate/Profile";
import CandidateJobs from "../Candidate/Jobs";

import EmployerDashboard from "../Employer/Dashboard";
import EmployerProfile from "../Employer/Profile";
import EmployerPostedJobs from "../Employer/PostedJobs";
import EmployerCreateJob from "../Employer/CreateJob";
import EmployerCandidateList from "../Employer/CandidateList";
import EmployerCandidateView from "../Employer/CandidateView";

import JobApplied from "../Candidate/Jobs/JobApplied";
import JobApply from "../Candidate/Jobs/JobApply";
import Questions from "../Candidate/Jobs/Questions";
import JobSpecificQuestions from "../Candidate/Jobs/JobSpecificQuestions";
import Goals from "../Candidate/Goals";
import GoalView from "../Candidate/Goals/GoalView";
import ExploreGoals from "../Candidate/Goals/ExploreGoals";
import TermsAndConditions from "../TermsAndConditions";

let scrollBarStyle = {
	position: "fixed",
	height: "calc(100vh - 70px)",
	top: "70px",
	transition: "all 0.2s ease",
};

function Home(props) {
	const auth = useSelector((state) => state.authReducer);
	const [navOpen, setNavOpen] = useState(false);

	if (navOpen) {
		scrollBarStyle = {
			...scrollBarStyle,
			width: "calc(100vw - 230px)",
			left: "230px",
		};
	} else {
		scrollBarStyle = {
			...scrollBarStyle,
			width: "calc(100vw - 85px)",
			left: "85px",
		};
	}

	return (
		<div className={`home ${navOpen ? "open" : ""}`}>
			<Header onMenuClick={() => setNavOpen(!navOpen)} />
			<Navigation />

			<Scrollbars
				className="custom-scrollbar"
				style={scrollBarStyle}
				autoHide
				autoHideTimeout={1000}
				autoHideDuration={600}
				renderTrackVertical={({ style, ...props }) => (
					<div
						{...props}
						className="bar"
						style={{
							...style,
						}}
					/>
				)}
			>
				<div className="scroll-wrapper">
					<div className="content">
						<Switch>
							<Redirect exact from="/" to="/dashboard" />

							{auth.loggedIn.as === "candidate" ? (
								<>
									<Route
										exact
										path="/dashboard"
										component={CandidateDashboard}
									/>
									<Route path="/profile" component={CandidateProfile} />
									<Route exact path="/jobs" component={CandidateJobs} />
									<Route
										exact
										path="/jobs/preview/:id"
										component={JobApplied}
									/>
									<Route exact path="/jobs/view/:id" component={JobApply} />
									<Route
										path="/jobs/questions"
										exact
										render={(props) => (
											<Questions showEmployerQuestions={true} {...props} />
										)}
									/>
									<Route
										exact
										path="/jobs/job-specefic-questions"
										component={JobSpecificQuestions}
									/>
									<Route exact path="/goals" component={Goals} />
									<Route
										exact
										path="/goals/explore-goals"
										component={ExploreGoals}
									/>
									<Route exact path="/goals/view/:id" component={GoalView} />
								</>
							) : (
								<>
									<Route
										exact
										path="/dashboard"
										component={EmployerDashboard}
									/>
									<Route exact path="/jobs" component={EmployerPostedJobs} />
									<Route
										exact
										path="/jobs/create-job"
										component={EmployerCreateJob}
									/>
									<Route
										exact
										path="/jobs/candidates-list"
										component={EmployerCandidateList}
									/>
									<Route
										exact
										path="/jobs/candidate-view"
										component={EmployerCandidateView}
									/>
									<Route path="/profile" component={EmployerProfile} />
								</>
							)}
							<Route
								path="/term-and-conditions"
								component={TermsAndConditions}
							/>
						</Switch>
					</div>
					<Footer />
				</div>
			</Scrollbars>
		</div>
	);
}

export default Home;
