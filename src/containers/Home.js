import React from 'react';
import './home.module.css';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import News from "../components/News/News";
import {replace} from "connected-react-router";
import {getUser} from "../reducers/user";

class Home extends React.Component {

    state = {
        username: "",
        password: ""
    };

    render() {
        return (
            <main>
                Anes test redirect
            </main>
        )
    }
}

function mapState(state) {
    console.log(this);
    return state.user;
}

function mapActions(dispatch) {
    return bindActionCreators({getUser, replace}, dispatch)
}

export default connect(mapState, mapActions)(Home);
