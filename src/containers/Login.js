import React, {Fragment} from 'react';
import './login.module.css';
import {toast} from "react-toastify";
import {connect} from 'react-redux';
import {loginUser} from "../reducers/user";
import {bindActionCreators} from "redux";
import {replace} from 'connected-react-router';
import {Col, Container, Input, Row} from "reactstrap";
import * as classnames from "classnames";
import {Link} from "react-router-dom";
import style from "./login.module.css";
import Button from "reactstrap/es/Button";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            data: null
        };
    }

    componentWillMount() {
        if (this.props.user.first_name !== undefined){
            this.props.replace('/');
        }
    }

    componentDidUpdate() {
        if (this.props.user.first_name !== undefined){
            this.props.replace('/');
        }
    }

    success = (message) => toast.info(message);

    failure = (message) => toast.error(message);

    handleLogin = async (e) => {
        e.preventDefault();
        const data = {...this.state.data};
        var obj = {};
        obj['username'] = this.state.username;
        obj['password'] = this.state.password;
        console.log(this.props.loginUser);
        console.log(this.props);
        try {
            await this.props.loginUser(obj);
            this.success("Logged in");
            this.props.replace('/');
        } catch (e) {
            this.failure(e.toString());
        }
    };

    handleInput = e => {
        const key = e.target.name;
        this.setState({ [key]: e.target.value });
    };

    render() {
        const {username, password} = this.state;
        return <Fragment>
            <Container className="content">
                <h1 className={classnames("heading-1", style.title)}>Login</h1>
                <Row>
                    <Col className={classnames(style["column-left"], style.column)} sm={4} />
                    <Col className={classnames(style["column-mid"], style.column)} sm={4}>
                        <form className={style.form} onSubmit={(e) => this.handleLogin(e)}>
                            <div>
                                <label className={style.label}>Benutzername</label>
                                <Input onChange={(e) => this.handleInput(e)} value={username}
                                       placeholder={"Benutzername / E-Mail-Adresse"} className={style.input} name={"username"} />
                            </div>
                            <div>

                                <label className={style.label}>Password</label>
                                <Input onChange={(e) => this.handleInput(e)} value={password}
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

const mapState = state => ({
    ...state.user,
});

const mapActions = dispatch => bindActionCreators({loginUser, replace}, dispatch);

export default connect(mapState, mapActions)(Login);