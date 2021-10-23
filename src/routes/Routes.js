import React from "react";
import { Switch, Redirect } from "react-router-dom";
import RouteWithLayout from "../components/RouteWithLayout";
import {DefaultLayout} from "../components/layouts";
import Landing from "../components/landingPage";

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
        </Switch>
    )
}

export default Routes;