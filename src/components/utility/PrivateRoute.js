import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, user, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (!user) {
                return <Redirect to="/login" />;
            } else {
                return <Component {...props} />;
            }
        }}
    />
);

const mapState = state => ({
    user: state.user
});

export default connect(mapState)(PrivateRoute);