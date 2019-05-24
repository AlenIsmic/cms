import React, {Fragment} from 'react';
import './login.module.css';
import {toast} from "react-toastify";
import {connect} from 'react-redux';
import {loginUser, getUser} from "../reducers/user";
import {bindActionCreators} from "redux";
import {replace} from 'connected-react-router';
import {Col, Container, Input, Row} from "reactstrap";
import * as classnames from "classnames";
import {Link, Redirect} from "react-router-dom";
import style from "./login.module.css";
import Button from "reactstrap/es/Button";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {history} from "../store";
import {isEmpty} from "../util"

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    static propTypes = {
        loginUser: PropTypes.func.isRequired,
        getUser: PropTypes.func.isRequired,
        user: PropTypes.object
    };

    success = (message) => toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    });

    failure = (message) => toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });

    onSubmit = async (e) => {
        e.preventDefault();
        const data = {...this.state.data};
        try {
            await this.props.loginUser(this.state);
            this.success("Logged in");
            this.props.replace('/');
        } catch (e) {
            this.failure(e.toString());
        }
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });


    render() {
        const {username, password} = this.state;
        return <Fragment>
            <Container className="content">
                <h1 className={classnames("heading-1", style.title)}>Login</h1>
                <Row>
                    <Col className={classnames(style["column-left"], style.column)} sm={4} />
                    <Col className={classnames(style["column-mid"], style.column)} sm={4}>
                        <form className={style.form} onSubmit={this.onSubmit}>
                            <div>
                                <label className={style.label}>Benutzername</label>
                                <Input onChange={(e) => this.onChange(e)} value={username}
                                       placeholder={"Benutzername / E-Mail-Adresse"} className={style.input} name={"username"} />
                            </div>
                            <div>

                                <label className={style.label}>Password</label>
                                <Input onChange={(e) => this.onChange(e)} value={password}
                                       placeholder={"Passwort"} className={classnames(style.input, style.password)} type={"password"} name={"password"} />
                            </div>
                            <div className="d-flex justify-content-between align-items-start">

                                <Button position={"left"}>
                                    Login
                                </Button>
                                <Link className={classnames("link-primary", style.link)} to={"/"}>
                                    Forgotten login?
                                </Link>
                            </div>
                        </form>
                        <div className={style.disclaimer}>
                            Disclaimer.
                        </div>
                    </Col>
                    <Col className={classnames(style["column-right"], style.column)} sm={4} />

                </Row>
            </Container>
        </Fragment>

    };

}

function mapState(state){
    console.log("Login");
    console.log(state);
    return {
        user: state.user.user
    }
}

const mapActions = dispatch => bindActionCreators({loginUser, getUser, replace}, dispatch);

export default connect(mapState, mapActions)(Login);