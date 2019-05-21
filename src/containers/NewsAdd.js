import React, {Fragment} from 'react';
import {Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button, Row} from "reactstrap";
import style from "./NewsAdd.module.css";
import * as classnames from "classnames";
import {replace} from "connected-react-router";
import {connect} from "react-redux";
import {getUser, logoutUser, clearUser} from "../reducers/user";
import {loadNews, getNews, deleteNews} from "../reducers/news";
import {bindActionCreators} from "redux";
import {NewsI18N} from "../Webapi/model/news";
import Newsi18n from "../components/News/Newsi18n";

class NewsAdd extends React.Component {

    constructor(props) {
        super(props);

        this.toggleCategory = this.toggleCategory.bind(this);
        this.toggleStatus = this.toggleStatus.bind(this);
        this.state = {
            user: {},
            news: [],
            StatusDropdown: false,
            CategoryDropdown: false,
            allowedStatus:
                [
                    "draft",
                    "customer_input",
                    "published",
                    "archived"
                ]
        }

    }

    async componentDidMount(){

    }

    logout = async () => {
        this.props.logoutUser();
        this.props.clearUser();
        this.props.replace('/login');
    };

    toggleStatus() {
        this.setState(prevState => ({
            StatusDropdown: !prevState.StatusDropdown
        }));
    }
    toggleCategory() {
        this.setState(prevState => ({
            CategoryDropdown: !prevState.CategoryDropdown
        }));
    }

    render() {
        return <Fragment>
            <Container className="content">
                <h1>News</h1>
            </Container>
            <Container>
                <Row>
                    <Col>
                        <label>Status</label>
                        <Dropdown isOpen={this.state.StatusDropdown} toggle={this.toggleStatus}>
                            <DropdownToggle caret id="StatusDropdown">
                                Draft
                            </DropdownToggle>
                            <DropdownMenu>
                                {this.state.allowedStatus.map(status => (
                                    <DropdownItem>{status}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <label>Editorial Author</label><br/>
                        <input type='text'/>
                    </Col>
                </Row>
                <Row style={{paddingTop: '30px'}}>
                    <Col>
                        <label>Image</label><br/>
                        <Button>Image Upload</Button>
                    </Col>
                    <Col>
                        <label>Category</label>
                        <Dropdown isOpen={this.state.CategoryDropdown} toggle={this.toggleCategory}>
                            <DropdownToggle caret id="CategoryDropdown">
                                Dropdown
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Some Action</DropdownItem>
                                <DropdownItem>Foo Action</DropdownItem>
                                <DropdownItem>Bar Action</DropdownItem>
                                <DropdownItem>Quo Action</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </Row>
                <Newsi18n/>
                <Row style={{paddingTop: '30px'}}>
                    <Col>
                        <Button>Add i18n</Button>
                    </Col>
                </Row>
                <Row style={{paddingTop: '30px'}}>
                    <Col>
                        <Button>Add Component</Button>
                    </Col>
                </Row>
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

export default connect(mapState, mapActions)(NewsAdd);
