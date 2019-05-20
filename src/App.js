import React, {Component, Fragment} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Redirect, Route, Switch} from "react-router";
import {replace} from "connected-react-router";
import Home from './containers/Home';
import Login from './containers/Login';
import Header from "./components/Header/Header";
import News from "./containers/News";
import configureStore from "./store"
import PrivateRoute from "./components/utility/PrivateRoute"
import { getUser, loginUser, clearUser, logoutUser } from "./reducers/user"
import { ToastContainer } from 'react-toastify';
import {routes, isEmpty} from './util';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import NewsAdd from "./containers/NewsAdd";

class App extends Component {

    state = {
        firstLoad: true,
    };

    async componentDidMount() {
        await this.props.getUser();

        console.log("App Mount");
        console.log(this.props.user);

        this.setState({firstLoad: false});
    }

    render() {
        const {firstLoad} = this.state;
        return (
            <Fragment>
                <Header/>
                <ToastContainer/>
                {
                    isEmpty(this.props.user) && !firstLoad ?
                    <Switch>
                        <Route exact path={routes.login} component={Login}/>
                        <Redirect to={routes.login}/>
                    </Switch>
                    : <Switch>
                        <Route exact path={routes.home} component={Home}/>
                        <Route exact path={routes.news} component={News}/>
                        <Route exact path={routes.news_add} component={NewsAdd}/>
                        <Redirect to={routes.home}/>
                    </Switch>
                }
            </Fragment>
        );
    }
}

function mapState(state) {
    console.log("App");
    console.log(state);
    return {
        user: state.user.user
    }
}

function mapActions(dispatch) {
    return bindActionCreators({ getUser, clearUser, loginUser, logoutUser, replace }, dispatch);
}

export default connect(mapState, mapActions)(App);
