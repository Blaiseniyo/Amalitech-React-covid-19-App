import React from "react";
import { Switch } from "react-router-dom";
import RouteWithLayout from "../components/RouteWithLayout";
import {DefaultLayout, HomeLayout} from "../components/layouts";
import Landing from "../components/landingPage";
import SignIn from "../components/authComponents/signInPage";
import RestPasswordRequestForm from "../components/authComponents/restPasswordEmailForm";
import CreateNewPasswordForm from "../components/authComponents/createNewPasswordFrom";
import ProtectedRoute from './protected.route';
import UnloggedRoute from './unlogged.route';

const Routes = ()=>{
    return(
        <Switch>
            {/* <Redirect
                exact
                from="/"
                to="/we"
            /> */}
            <ProtectedRoute
                component={Landing}
                exact
                layout={DefaultLayout}
                path="/"
            />
            <UnloggedRoute
                component={SignIn}
                exact
                layout={HomeLayout}
                path="/auth"
            />
            <UnloggedRoute
                component={RestPasswordRequestForm}
                exact
                layout={HomeLayout}
                path="/request"
            />
            <UnloggedRoute
                component={CreateNewPasswordForm}
                exact
                layout={HomeLayout}
                path="/rest_password"
            />
        </Switch>
    )
}

export default Routes;