import React, {Fragment} from 'react';
import {Button, Col, Container, Row} from "reactstrap";
import style from "./News.module.css";
import * as classnames from "classnames";
import {redirect, routes} from "../utility/routes";
import { userService } from "../utility/user.service";

class News extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            users: []
        }

    }

    componentDidMount() {
        this.setState({
            user: JSON.parse(localStorage.getItem('user')),
            users: { loading: true }
        });
        userService.login();
        //userService.getAll().then(users => this.setState({ users }));
    }

    componentDidUpdate() {
    }


    render() {
        const { user, users } = this.state;
        return <Fragment>
            <Container className="content">
                <h1 className={classnames("heading-1")}>News</h1>
                <div>
                    <Button className={classnames(style['button'])} onClick={() => redirect(this.props.history, routes.login.path)}>
                        Back to login
                    </Button>
                </div>
            </Container>
        </Fragment>
    };

}

export default News;
