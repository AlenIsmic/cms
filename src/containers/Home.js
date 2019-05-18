import React, {Fragment} from 'react';
import './home.module.css';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import News from "./News";
import {replace} from "connected-react-router";
import {getUser, logoutUser, clearUser} from "../reducers/user";
import {Col, Container, Input, Row} from "reactstrap";
import {history} from "../store";
import {withRouter, Link} from "react-router-dom";
import {isEmpty, routes} from "../util";
import * as classnames from "classnames";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    logout = async (e) => {
        e.preventDefault();
        console.log(this.props);
        this.props.logoutUser();
        this.props.clearUser();
        this.props.replace('/login');
    };

    render() {
        return (
             <Fragment>
                <Container className="content">
                    <h1 className={classnames("heading-1")}>News</h1>
                    <div>
                        <Link to={routes.news}>News</Link>
                        <a onClick={this.logout}>Log out</a>
                    </div>
                </Container>
            </Fragment>
        )
    }
}

function mapState(state){
    console.log("Home");
    console.log(state);
    return {
        user: state.user.user,
        token: state.user.token
    }
}

function mapActions(dispatch) {
    return bindActionCreators({getUser, logoutUser, clearUser, replace}, dispatch)
}

export default connect(mapState, mapActions)(Home);