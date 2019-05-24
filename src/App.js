import React, {Component, Fragment} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Switch, Route, Redirect } from "react-router-dom";
import {replace} from "connected-react-router";
import compose from "recompose/compose"
import Home from './containers/Home';
import Login from './containers/Login';
import Header from "./components/Header/Header";
import News from "./containers/News";
import configureStore from "./store"
import { getUser, loginUser, clearUser, logoutUser } from "./reducers/user"
import { loadNewsCategories } from "./reducers/news"
import { setError } from "./reducers/auth"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom"

// core components
import "./assets/css/material-dashboard-react.css?v=1.6.0";
import dashboardStyle from "./assets/jss/material-dashboard-react/layouts/dashboardStyle";
import withStyles from "@material-ui/core/styles/withStyles";
// import PerfectScrollbar from "perfect-scrollbar/types/perfect-scrollbar";

/* eslint-disable */
import PropTypes from "prop-types";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
// core components
import Navbar from "./components/Navbars/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import { isEmpty, specialRoutes } from "./util";

import routes from "./routes.js";

import logo from "./assets/img/reactlogo.png";

const switchRoutes = (
    <Switch>
        {routes.map((prop, key) => {
            return (
                <Route
                    exact path={prop.layout + prop.path}
                    component={prop.component}
                    key={key}
                />
            );
        })}
        <Redirect to="/"/>
    </Switch>
);

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: "http://skyleet.com/images/newlogo.png",
            color: "blue",
            hasImage: true,
            firstLoad: true,
            mobileOpen: false
        };
    }

    static propTypes = {
        classes: PropTypes.object.isRequired
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
        if (navigator.platform.indexOf("Win") > -1) {
            const ps = new PerfectScrollbar(this.refs.mainPanel);
        }
        window.addEventListener("resize", this.resizeFunction);
        this.setState({firstLoad: false});

    }

    componentDidUpdate(e) {
        // if (e.history.location.pathname !== e.location.pathname) {
        //     this.refs.mainPanel.scrollTop = 0;
        //     if (this.state.mobileOpen) {
        //         this.setState({ mobileOpen: false });
        //     }
        // }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeFunction);
    }

    // // async componentDidUpdate(newProps) {
    // //     if (this.props.news.error !== newProps.news.error){
    // //         if(true) {
    // //             await this.props.logoutUser();
    // //             await this.props.clearUser();
    // //             await this.props.setError(null);
    // //             this.props.replace(routes.login);
    // //         }
    // //     }
    // // }
    //
    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };

    resizeFunction = () => {
        if (window.innerWidth >= 960) {
            this.setState({mobileOpen: false});
        }
    };

    render() {
        const {firstLoad} = this.state;
        const {classes, ...rest} = this.props;
        console.log("firstLoad", firstLoad);
        return (
            !firstLoad && <Fragment>
                <ToastContainer/>
                {   isEmpty(this.props.user)
                    ?
                    <Switch>
                        <Route exact path={specialRoutes.login} component={Login}/>
                        <Redirect to={specialRoutes.login}/>
                    </Switch>
                    :
                    <div className={classes.wrapper}>
                    <Sidebar
                        routes={routes}
                        logoText={"CMS"}
                        logo={logo}
                        image={this.state.image}
                        handleDrawerToggle={this.handleDrawerToggle}
                        open={this.state.mobileOpen}
                        color={this.state.color}
                        {...rest}
                    />
                    <div className={classes.mainPanel} ref="mainPanel">
                        <Navbar
                            routes={routes}
                            handleDrawerToggle={this.handleDrawerToggle}
                            {...rest}
                        />
                        <div className={classes.content}>
                            <div className={classes.container}>{switchRoutes}</div>
                        </div>
                        <Footer/>
                    </div>
                    </div>
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

export default withRouter(compose(withStyles(dashboardStyle), connect(mapState, mapActions))(App));