import React from "react";
import { Switch } from "react-router-dom";
import RouteWithLayout from "../components/RouteWithLayout";
import {DefaultLayout} from "../components/layouts";
import Landing from "../components/landingPage";
import SignIn from "../components/signin/signInPage"

const Routes = ()=>{
    return(
        <Switch>
            {/* <Redirect
                exact
                from="/"
                to="/we"
            /> */}
            <RouteWithLayout
                component={Landing}
                exact
                layout={DefaultLayout}
                path="/"
            />
            <RouteWithLayout
                component={SignIn}
                exact
                layout={DefaultLayout}
                path="/signin"
            />
        </Switch>
    )
}

export default Routes;