import React from 'react';
import './home.module.css';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import News from "../components/News/News";

class Home extends React.Component {

    state = {
        username: '',
        data: null
    };

     componentDidMount(){
    }

    render() {
        return (
            <main>
                <News/>
            </main>
        )
    }
}

function mapState(state) {
    return state.home;
}

function mapActions(dispatch) {
    return bindActionCreators({}, dispatch)
}

export default connect(mapState, mapActions)(Home);
