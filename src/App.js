import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import PrivateRoute from "./routes/PrivateRoute";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Overlay from "./components/Overlay";
import Popup from "./components/Popup";
import JobView from "./components/LandingPage/JobView";
import LandingPage from "./components/LandingPage";

const App = () => {
	const { popup, overlay } = useSelector((state) => state.popupOverlayReducer);

	return (
		<BrowserRouter basename={"/"}>
			<Switch>
				<Route path="/login" component={Auth} />
				<Route path="/signup" component={Auth} />
				<Route path="/thank-you" component={Auth} />
				<Route path="/landing_page/:id" component={JobView} />
				<PrivateRoute path="/" component={Home} />
			</Switch>
			<Overlay active={overlay.show} />
			<Popup active={popup.show}></Popup>
		</BrowserRouter>
	);
};

export default App;
