import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const routes = {
    login:
        {
            path: '/login'
        },
    news:
        {
            path: '/news'
        }
};

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)


export function redirect(history, route){
    history.push(route);
}
