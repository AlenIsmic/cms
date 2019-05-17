import React, {Component, Fragment} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Redirect, Route, Switch} from "react-router";
import Home from './containers/Home';
import Login from './containers/Login';
import Header from "./components/Header/Header";
import News from "./containers/News";
import configureStore from "./store"
import PrivateRoute from "./components/utility/PrivateRoute"
import { getUser, loginUser, clearUser } from "./reducers/user"
import { ToastContainer } from 'react-toastify';
import {routes} from './util';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class App extends Component {
    async componentDidMount() {
        await this.props.getUser();

        console.log("App Mount");
        console.log(this.props.user);
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <ToastContainer/>
                <Switch>
                    <Route exact path={routes.home} component={Home}/>
                    <Route path={routes.login} component={Login}/>
                    <Route path={routes.news} component={News}/>
                    <Route path='*' exact={true} component={Home} />
                </Switch>
            </Fragment>
        );
    }
}

function mapState(state) {
    console.log("App");
    console.log(state);
    return {
        user: state.user.user,
        token: state.user.token
    }
}

function mapActions(dispatch) {
    return bindActionCreators({ getUser, clearUser, loginUser }, dispatch);
}

export default connect(mapState, mapActions)(App);