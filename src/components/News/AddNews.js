import React, {Fragment} from 'react';
import {Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
    Button, Row, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import * as classnames from "classnames";
import {replace} from "connected-react-router";
import {connect} from "react-redux";
import {getUser, logoutUser, clearUser} from "../../reducers/user";
import {loadNews, getNews, deleteNews, createNews} from "../../reducers/news";
import {bindActionCreators} from "redux";
import Newsi18n from "./Newsi18n";
import {withRouter} from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import compose from "recompose/compose";
import {success, failure} from "../../util";

class AddNews extends React.Component {

    constructor(props) {
        super(props);

        this.toggleCategory = this.toggleCategory.bind(this);
        this.toggleStatus = this.toggleStatus.bind(this);
        this.state = {
            user: {},
            StatusDropdown: false,
            CategoryDropdown: false,
            statusDropdownValue: "draft",
            categoryDropdownValue: 22,
            allowedStatus:
                [
                    "draft",
                    "customer_input",
                    "published",
                    "archived"
                ],
            i18nComponents:
                []


        }
    }

    async componentDidMount() {
        let c = this.state.i18nComponents;
        c.push(<Newsi18n/>);
        this.setState({i18nComponents: c})
    }

    logout = async () => {
        this.props.logoutUser();
        this.props.clearUser();
        this.props.replace('/login');
    };

    toggleStatus(){
        this.setState(prevState => ({
            StatusDropdown: !prevState.StatusDropdown
        }));
    }
    toggleCategory(){
        this.setState(prevState => ({
            CategoryDropdown: !prevState.CategoryDropdown
        }));
    }

    selectStatusChange(event){
        console.log(event.currentTarget.value);
        this.setState({ statusDropdownValue: event.currentTarget.value }) // I tried before target.value, or nativeEvent.value
    }

    selectCategoryChange = (event) => {
        this.setState({ categoryDropdownValue: event.currentTarget.value })
    };

    handleOnChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name] : value })
    };

    addi18n= (e) => {
        let c = this.state.i18nComponents;
        c.push(<Newsi18n/>);
        this.setState({i18nComponents: c})
    };

    onSubmit = async (e) => {
        e.preventDefault();
        var data = {};
        data['status'] = this.state.statusDropdownValue;
        data['image'] = this.state.image;
        data['category'] = this.state.categoryDropdownValue;
        data['editorialAuthor'] = this.state.editorialAuthor;

        console.log("data", data);

        try {
            await this.props.createNews(data);
            success("News created successfully!");
            this.props.replace('/news');
        } catch (e) {
            failure(e.toString());
        }
    };

    render(){
        return <Fragment>
            <Container className="content">
                <h1>Add News</h1>
            </Container>
            <Container style={{width: "1050px"}}>
                <Form onSubmit={(e, data) => this.onSubmit(e, data)}>
                    <h3>Basic Data</h3>
                    <hr />
                    <Row>
                    <Col>
                <FormGroup inline>
                    <Label for="status">Status</Label>
                    <Input type="select" name="status" id="status" value={this.state.statusDropdownValue} onChange={(e) => this.selectStatusChange(e)}>
                        {
                            this.state.allowedStatus.map(status => {
                                return (
                                    <option value={status}>{status}</option>
                                );
                            })
                        }
                    </Input>
                </FormGroup>
                    </Col>
                <Col>
                <FormGroup inline>
                    <Label for="editorialAuthor">Editorial Author</Label>
                    <Input type="text" name="editorialAuthor" id="editorialAuthor" onChange={(e) => this.handleOnChange(e)} placeholder="Enter author ..." />
                </FormGroup>
                </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup inline>
                            <Label for="image">Image</Label>
                            <Input type="text" name="image" id="image" onChange={(e) => this.handleOnChange(e)} placeholder="Enter image's relative path ..." />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup inline>
                            <Label for="category">Category</Label>
                            <Input type="select" name="category" id="category" value={this.state.categoryDropdownValue} onChange={(e) => this.selectCategoryChange(e)}>
                                {
                                    this.props.newsCategories.map(category => {
                                        return (
                                            <option value={category.id}>{category.labels.de}</option>
                                        );
                                    })
                                }
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                    <h3 style={{marginTop: "60px"}}>Internationalization</h3>
                    <hr />
                <Container id={'i18n'} style={{padding: "0"}}>
                    {this.state.i18nComponents}
                </Container>
                <Row style={{paddingTop: '30px'}}>
                    <Col>
                        <Button onClick={this.addi18n}>Add i18n</Button>
                    </Col>
                </Row>
                    <h3 style={{marginTop: "60px"}}>Components</h3>
                    <hr />
                <Row>
                    <Col>
                        <Button>Add Component</Button>
                    </Col>
                </Row>

                <Button className="btn btn-success" style={{width: "100%", marginTop: "100px"}}>Confirm</Button>
                </Form>
            </Container>
        </Fragment>
    };
}

function mapState(state){
    return {
        user: state.user.user,
        news: state.news.news,
        newsCategories: state.news.newsCategories
    }
}

function mapActions(dispatch) {
    return bindActionCreators({getUser, logoutUser, clearUser, loadNews, getNews, deleteNews, createNews, replace}, dispatch)
}

export default withRouter(connect(mapState, mapActions)(AddNews));
