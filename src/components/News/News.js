import React, {Fragment} from 'react';
import {Button, Col, Container, Row} from "reactstrap";
import style from "./News.module.css";
import * as classnames from "classnames";
import {redirect, routes} from "../utility/routes";

class News extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }

    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }


    render() {

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
