import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./screens/login";
import MainLayout from "./layout/mainLayout";
import ProtectedRoutes from "./helpers/protectedRoutes";

class App extends Component {
	render() {
		return (
			<Fragment>
				<Switch>
					<Route path={"/login"} component={Login} />
					<ProtectedRoutes path={"/"} component={MainLayout} />
				</Switch>
			</Fragment>
		);
	}
}

export default App;
