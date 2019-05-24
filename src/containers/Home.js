import React, {Fragment} from 'react';
import './home.module.css';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import compose from "recompose/compose";
import News from "./News";
import {replace} from "connected-react-router";
import {getUser, logoutUser, clearUser} from "../reducers/user";
import {Col, Container, Input, Row} from "reactstrap";
import {history} from "../store";
import {withRouter, Link} from "react-router-dom";
import {isEmpty, routes} from "../util";
import * as classnames from "classnames";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <Container>
                <img className={classes.dashboardBackground} src="http://www.skyleet.com/images/newlogo.png" alt="Dashboard"/>
            </Container>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapState(state){
    console.log("Home");
    console.log(state);
    return {
        user: state.user.user
    }
}

function mapActions(dispatch) {
    return bindActionCreators({getUser, logoutUser, clearUser, replace}, dispatch)
}

export default withRouter(compose(withStyles(dashboardStyle), connect(mapState, mapActions))(Home));
