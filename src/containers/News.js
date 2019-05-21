import React, {Fragment} from 'react';
import {Button, Col, Container, Row} from "reactstrap";
import style from "./News.module.css";
import * as classnames from "classnames";
import {replace} from "connected-react-router";
import {connect} from "react-redux";
import {getUser, logoutUser, clearUser} from "../reducers/user";
import {loadNews, getNews, deleteNews} from "../reducers/news";
import {bindActionCreators} from "redux";
import {history} from "../store";
import {Link, withRouter} from "react-router-dom";
import {isEmpty, routes} from "../util";

class News extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            news: []
        }

    }

    async componentDidMount(){
        await this.props.loadNews();

        console.log("News Mount");
        console.log(this.props);
    }

    logout = async () => {
        console.log(this.props);
        this.props.logoutUser();
        this.props.clearUser();
        this.props.replace('/login');
    };

    render() {
        return <Fragment>
            <Container className="content">
                <h1 className={classnames("heading-1")}>News</h1>
                <Link to={routes.news_add}>Add new</Link>
                <ul>
                {this.props.news.map(news =>
                    <li key={news.url}>
                        <div>{ news.url }</div>
                        <img src={news.image} alt="" width={500} height={300}/>
                    </li>
                )}
                </ul>
                <div>
                    <Button className={classnames(style['button'])} onClick={this.logout}>
                        Back to login
                    </Button>
                </div>
            </Container>
        </Fragment>
    };

}

function mapState(state){
    console.log("News");
    console.log(state);
    return {
        user: state.user.user,
        news: state.news.news
    }
}

function mapActions(dispatch) {
    return bindActionCreators({getUser, logoutUser, clearUser, loadNews, getNews, deleteNews, replace}, dispatch)
}

export default connect(mapState, mapActions)(News);
