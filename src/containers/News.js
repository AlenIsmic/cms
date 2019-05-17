import React, {Fragment} from 'react';
import {Button, Col, Container, Row} from "reactstrap";
import style from "./News.module.css";
import * as classnames from "classnames";
import {replace} from "connected-react-router";
import {connect} from "react-redux";
import {getUser, logoutUser, clearUser} from "../reducers/user";
import {bindActionCreators} from "redux";
import {history} from "../store";
import {withRouter} from "react-router-dom";
import {isEmpty} from "../util";

class News extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            users: []
        }

    }

    componentDidMount() {
        // this.props.getUser();

        if(isEmpty(this.props.user)) {
            this.props.replace('/login');
        }
    }

    logout = async () => {
        console.log(this.props);
        this.props.logoutUser();
        this.props.clearUser();
        this.props.replace('/login');
    };


    render() {
        const { user, users } = this.state;
        return <Fragment>
            <Container className="content">
                <h1 className={classnames("heading-1")}>News</h1>
                <div>
                    <Button className={classnames(style['button'])} onClick={this.logout}>
                        Back to login
                    </Button>
                </div>
            </Container>
        </Fragment>
    };

}

function mapState(state){
    return {
        user: state.user.user
    }
}

function mapActions(dispatch) {
    return bindActionCreators({getUser, logoutUser, clearUser, replace}, dispatch)
}

export default withRouter(connect(mapState, mapActions)(News));