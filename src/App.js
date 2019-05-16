import React, {Component, Fragment} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Redirect, Route, Switch} from "react-router";
import Home from './containers/Home';
import Login from './containers/Login';
import Header from "./components/Header/Header";
import configureStore from "./store"
import PrivateRoute from "./components/utility/PrivateRoute"
import { getUser } from "./reducers/user"
import { ToastContainer } from 'react-toastify';

class App extends Component {

    componentDidMount() {
        configureStore().dispatch(getUser());
    }

    render() {
        return (
            <Fragment>
                <ToastContainer/>
                <Header/>
                <Switch>
                    <PrivateRoute exact path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                </Switch>
            </Fragment>
        );
    }
}

export default App;
