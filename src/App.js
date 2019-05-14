import React, {Component, Fragment} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Redirect, Route, Switch} from "react-router";
import {routes} from "./components/utility/routes";
import News from './components/News/News';
import Login from './components/Login/Login';

export const navigationRoutes = [
    {
        path: routes.login.path,
        component: Login
    },
    {
        path: routes.news.path,
        component: News
    }
];

class App extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    {navigationRoutes.map(navItem => {
                        const TagName = navItem.component;
                        return <Route key={navItem.path} exact path={navItem.path} component={TagName} />
                    })}
                    <Redirect to={routes.login.path} />
                </Switch>
            </Fragment>
        );
    }
}

export default App;
