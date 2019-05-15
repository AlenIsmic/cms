import React, {Component, Fragment} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Redirect, Route, Switch} from "react-router";
import Home from './containers/Home';
import Login from './containers/Login';
import Header from "./components/Header/Header";

class App extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                </Switch>
            </Fragment>
        );
    }
}

export default App;
