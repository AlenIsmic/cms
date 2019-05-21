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
import { loadNewsCategories } from "./reducers/news"
import { setError } from "./reducers/auth"
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
        console.log("App Mount");
        try {
            await this.props.getUser();
            await this.props.loadNewsCategories();
        }
        catch (e) {
            console.log(e);
        }
        this.setState({firstLoad: false});
    }

    async componentDidUpdate(newProps) {
        console.log("UPdate",this.props.auth.error);
        console.log("Props", newProps.auth.error);
        console.log("Test", newProps);
        if (this.props.news.error !== newProps.news.error){
            if(true) {
                await this.props.logoutUser();
                await this.props.clearUser();
                await this.props.setError(null);
                this.props.replace(routes.login);
            }
        }
    }

    render() {
        const {firstLoad} = this.state;
        console.log("firstLoad", firstLoad);
        return (
            !firstLoad && <Fragment>
                <Header/>
                <ToastContainer/>
                {
                    isEmpty(this.props.user) ?
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
        user: state.user.user,
        news: state.news,
        auth: state.auth
    }
}

function mapActions(dispatch) {
    return bindActionCreators({ getUser, clearUser, loginUser, logoutUser, loadNewsCategories, setError, replace }, dispatch);
}

export default connect(mapState, mapActions)(App);
