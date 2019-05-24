import React, {Fragment} from 'react';
import {Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button, Row} from "reactstrap";
import style from "./NewsAdd.module.css";
import * as classnames from "classnames";
import {replace} from "connected-react-router";
import {connect} from "react-redux";
import {getUser, logoutUser, clearUser} from "../reducers/user";
import {loadNews, getNews, deleteNews} from "../reducers/news";
import {bindActionCreators} from "redux";
import Newsi18n from "../components/News/Newsi18n";

class NewsAdd extends React.Component {

    constructor(props) {
        super(props);

        this.toggleCategory = this.toggleCategory.bind(this);
        this.toggleStatus = this.toggleStatus.bind(this);
        this.state = {
            user: {},
            StatusDropdown: false,
            CategoryDropdown: false,
            statusDropdownValue: '',
            categoryDropdownValue: '',
            allowedStatus:
                [
                    "draft",
                    "customer_input",
                    "published",
                    "archived"
                ],
            categories:
                [
                    "cat 1",
                    "cat 2",
                    "cat 3"
                ],
            i18nComponents:
                [
                    <Newsi18n/>,
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

    changeDropdownStatus = (e) => {
        this.setState({statusDropdownValue: e.currentTarget.innerHTML})
    };

    changeDropdownCategory = (e) => {
        this.setState({categoryDropdownValue: e.currentTarget.innerHTML})
    };

    addi18n= (e) => {
        let c = this.state.i18nComponents;
        c.push(<Newsi18n/>);
        this.setState({i18nComponents: c})
    };

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
                                {this.state.statusDropdownValue}
                            </DropdownToggle>
                            <DropdownMenu>
                                {this.state.allowedStatus.map(status => (
                                    <DropdownItem onClick={this.changeDropdownStatus}>{status}</DropdownItem>
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
                                {this.state.categoryDropdownValue}
                            </DropdownToggle>
                            <DropdownMenu>
                                {this.state.categories.map(status => (
                                    <DropdownItem onClick={this.changeDropdownCategory}>{status}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </Row>
                <Container id={'i18n'}>
                    {this.state.i18nComponents}
                </Container>
                <Row style={{paddingTop: '30px'}}>
                    <Col>
                        <Button onClick={this.addi18n}>Add i18n</Button>
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
    return {
        user: state.user.user,
        news: state.news.news
    }
}

function mapActions(dispatch) {
    return bindActionCreators({getUser, logoutUser, clearUser, loadNews, getNews, deleteNews, replace}, dispatch)
}

export default connect(mapState, mapActions)(NewsAdd);
