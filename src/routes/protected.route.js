import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ProtectedRoute = props => {
    const { layout: Layout, component: Component, ...rest } = props;
    const token = cookies.get('auth-token')
    if (token) {
        return (
            <Route
                {...rest}
                render={matchProps => (
                    <Layout>
                        <Component {...matchProps} />
                    </Layout>
                )}
            />
        )
    } else {
        return <Redirect to="/auth" />
    }

};

ProtectedRoute.propTypes = {
    component: PropTypes.any.isRequired,
    layout: PropTypes.any.isRequired,
    path: PropTypes.string
};

export default ProtectedRoute;