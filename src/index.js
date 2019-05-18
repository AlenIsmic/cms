import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Router} from "react-router";
// import {ConnectedRouter} from "connected-react-router";
import configureStore, {history} from "./store";
import {Provider} from "react-redux";

ReactDOM.render(
    <Provider store={configureStore()}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>, document.getElementById('root'));

// ReactDOM.render(
//     <Provider store={store}>
//         <ConnectedRouter history={history}>
//             <App/>
//         </ConnectedRouter>
//     </Provider>, document.getElementById('root'));