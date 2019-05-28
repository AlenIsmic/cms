import React, {Fragment} from 'react';
import {Col, Container, Row} from "reactstrap";
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
import Button from "../components/CustomButtons/Button.jsx";
import {getProp} from "../util";
import AddNewsModal from "../components/News/AddNews";
import {blackColor, hexToRgb, infoColor, successColor} from "../assets/jss/material-dashboard-react";

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
    },
    cardTitleBadge: {
        height: "40px",
        width: "97%",
        position: "absolute",
        marginTop: "-10px",
        "& button": {
            float: 'right',
            backgroundColor: successColor[1],
            color: "inherit",
            boxShadow:
            "0 12px 20px -10px rgba(" +
            hexToRgb(successColor[1]) +
            ",.28), 0 4px 20px 0 rgba(" +
            hexToRgb(blackColor) +
            ",.12), 0 7px 8px -5px rgba(" +
            hexToRgb(successColor[1]) +
            ",.2)",
            "&:hover,&:focus": {
                backgroundColor: successColor[1],
                boxShadow:
                "0 12px 20px -10px rgba(" +
                hexToRgb(successColor[1]) +
                ",.28), 0 4px 20px 0 rgba(" +
                hexToRgb(blackColor) +
                ",.12), 0 7px 8px -5px rgba(" +
                hexToRgb(successColor[1]) +
                ",.2)"
            }
        }
    }
};

class News extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            news: [],
            AddNewsModal: false
        }

    }

    async componentDidMount() {
        await this.props.loadNews();

        console.log("News Mount");
        console.log(this.props);
    }

    toggleAddModal = () => {
        this.setState({ AddNewsModal: !this.state.AddNewsModal});
    };

    render() {
        const {classes, news, newsCategories} = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card plain>
                        <CardHeader plain color="primary" style={{paddingBottom: "20px"}}>
                            <h4 className={classes.cardTitleWhite}>
                                List news
                            </h4>
                            <p className={classes.cardTitleBadge}>
                                <Button onClick={(e) => this.toggleAddModal(e)}>
                                    Add News
                                </Button>
                            </p>
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
                                    categorymatch = newsCategories.find(function(category) {
                                        console.log(category);
                                        if (category.id === item.category) {
                                            return getProp(newsCategories[category], "labels.de");
                                        }
                                    });

                                    data.push(categorymatch);

                                    data.push(item.status);

                                    return data;
                                })}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
                <AddNewsModal
                    isOpen={this.state.AddNewsModal}
                    toggle={() => this.toggleAddModal()}
                    data={{news, newsCategories}}
                />
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
