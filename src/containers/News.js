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
import {withRouter} from "react-router-dom";
import {isEmpty} from "../util";
import compose from "recompose/compose";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../components/Grid/GridItem.jsx";
import GridContainer from "../components/Grid/GridContainer.jsx";
import Table from "../components/Table/Table.jsx";
import Card from "../components/Card/Card.jsx";
import CardHeader from "../components/Card/CardHeader.jsx";
import CardBody from "../components/Card/CardBody.jsx";
import {getProp} from "../util";
import NewsAdd from "./NewsAdd";
import NavItem from "reactstrap/es/NavItem";

const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    }
};

class News extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            news: []
        }

    }

    async componentDidMount() {
        await this.props.loadNews();

        console.log("News Mount");
        console.log(this.props);
    }

    render() {
        const {classes, news, newsCategories} = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card plain>
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite}>
                                List news
                                <Button style={{float: 'right'}}> Add new</Button>
                            </h4>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="primary"
                                tableHead={["ID", "Title", "Category", "Status"]}
                                tableData={news.map(function(item, i){
                                    var data = [];
                                    data.push(item.url.match(/\d/g).join(""));
                                    data.push(isEmpty(getProp(item, "i18n.0.title")) ? "" : getProp(item, "i18n.0.title"));
                                    var category;
                                    var categorymatch = "";
                                    for(category in newsCategories){
                                        if (newsCategories[category].id === item.category) {
                                            categorymatch = getProp(newsCategories[category], "labels.de");
                                        }
                                    }

                                    data.push(categorymatch);

                                    data.push(item.status);

                                    return data;
                                })}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

function mapState(state){
    console.log("News");
    console.log(state);
    return {
        user: state.user.user,
        news: state.news.news,
        newsCategories: state.news.newsCategories
    }
}

function mapActions(dispatch) {
    return bindActionCreators({getUser, logoutUser, clearUser, loadNews, getNews, deleteNews, replace}, dispatch)
}

export default withRouter(compose(withStyles(styles), connect(mapState, mapActions))(News));
