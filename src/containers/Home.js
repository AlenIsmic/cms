import React from 'react';
import './home.module.css';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import News from "./News";
import {replace} from "connected-react-router";
import {getUser} from "../reducers/user";
import {history} from "../store";
import {withRouter} from "react-router-dom";
import {isEmpty} from "../util";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    async componentDidMount() {
        await this.props.getUser();
        console.log("Home Mount");
        console.log(this.props.user);

        if(isEmpty(this.props.user)) {
            this.props.replace('/login');
        }
    }

    render() {
        return (
            <main>
                {/*<News/>*/}
            </main>
        )
    }
}

function mapState(state){
    console.log("Home");
    console.log(state);
    return {
        user: state.user.user,
        token: state.user.token
    }
}

function mapActions(dispatch) {
    return bindActionCreators({getUser, replace}, dispatch)
}

export default withRouter(connect(mapState, mapActions)(Home));