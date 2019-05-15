import {createLogger} from "redux-logger";
import {applyMiddleware, compose, createStore} from "redux";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";
//import createHistory from 'history/createBrowserHistory'
import {createBrowserHistory} from "history";
//import {connectRouter, routerMiddleware} from "connected-react-router";
import {routerMiddleware} from "connected-react-router";
import reducers from "./reducers";

const logger = createLogger({
    collapsed: true,
    colors: {
        title: () => "green"
    }
});

export const history = createBrowserHistory();

const middleware = applyMiddleware(routerMiddleware(history), promise, thunk, logger);

export default function configureStore(preloadedState){
    const store = createStore(
        reducers(history),
        preloadedState,
        compose(
            middleware
        )
    );

    return store;
}
