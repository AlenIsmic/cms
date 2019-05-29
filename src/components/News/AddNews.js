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

        this.state = {
            user: {},
            StatusDropdown: false,
            CategoryDropdown: false,
            statusDropdownValue: "draft",
            categoryDropdownValue: 22,
            relatedNews: [""],
            allowedStatus:
                [
                    "draft",
                    "customer_input",
                    "published",
                    "archived"
                ],
            i18nComponents:
                [
                    {
                    title: "",
                    slug: "",
                    subline: "",
                    text: "",
                    language: "de"
                }
                ],
            langCode:
                [
                    "EN",
                    "DE"
                ]


        }
    }

    async componentDidMount() {
    }

    logout = async () => {
        this.props.logoutUser();
        this.props.clearUser();
        this.props.replace('/login');
    };

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
        if(c.length < 2) {
            c.push({
                title: "",
                slug: "",
                subline: "",
                text: "",
                language: c[0].language === "en" ? "de" : "en"
            });
            this.setState({i18nComponents: c})
        }
    };

    selectLanguage = (id, e) => {
        let newi18nComponents = this.state.i18nComponents;
        newi18nComponents[id].language = e.currentTarget.value.toLowerCase();
        this.setState({ i18nComponents: newi18nComponents })
    };

    onChangei18n = (id, e) => {
        const { value, name } = e.target;
        let newi18nComponents = this.state.i18nComponents;
        newi18nComponents[id][name] = value;
        this.setState({ i18nComponents : newi18nComponents })
    };

    onSubmit = async (e) => {
        e.preventDefault();
        var data = {};
        data['status'] = this.state.statusDropdownValue;
        data['image'] = this.state.image;
        data['category'] = this.state.categoryDropdownValue;
        data['editorialAuthor'] = this.state.editorialAuthor;
        data['relatedTo'] = this.state.relatedNews;
        data['pageRef'] = this.state.pageRef;
        data['i18n'] = this.state.i18nComponents;

        console.log("data", data);

        try {
            await this.props.createNews(data);
            success("News created successfully!");
            this.props.replace('/news');
        } catch (e) {
            failure(e.toString());
        }
    };

    handleRelatedNewsChange = idx => evt => {
        const newRelatedNews = this.state.relatedNews.map((related, sidx) => {
            if (idx !== sidx) return related;
            return evt.target.value;
        });

        this.setState({ relatedNews: newRelatedNews });
    };

    handleAddRelatedNewsholder = () => {
        this.setState({
            relatedNews: this.state.relatedNews.concat([""])
        });
    };

    handleRemoveRelatedNews = idx => () => {
        this.setState({
            relatedNews: this.state.relatedNews.filter((s, sidx) => idx !== sidx)
        });
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
                <Row>
                    <Col>
                        <FormGroup inline>
                            <Label for="pageRef">Page Ref</Label>
                            <Input type="text" name="pageRef" id="pageRef" onChange={(e) => this.handleOnChange(e)} placeholder="Enter Page Ref relative path ..." />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup inline>
                            <Label for="relatedTo">Related To</Label>
                            {this.state.relatedNews.map((related, idx) => (
                                <Row style={{paddingBottom: "5px"}}>
                                    <Col style={{maxWidth: "91%"}}>
                                    <Input
                                        type="text"
                                        placeholder={`Enter Related News relative path ...`}
                                        value={related}
                                        onChange={this.handleRelatedNewsChange(idx)}
                                    />
                                    </Col>
                                    <Button
                                        type="button"
                                        onClick={this.handleRemoveRelatedNews(idx)}
                                        className="small"
                                    >
                                        -
                                    </Button>
                                </Row>
                            ))}
                            <br/>
                            <Button
                                type="button"
                                onClick={this.handleAddRelatedNewsholder}
                                className="small"
                            >
                                Add Related News
                            </Button>
                        </FormGroup>
                    </Col>
                </Row>
                    <h3 style={{marginTop: "60px"}}>Internationalization</h3>
                    <hr />
                <Container id={'i18n'} style={{padding: "0"}}>
                    { this.state.i18nComponents.map((language, idx) => (
                        <Container style={{padding: "0"}}>
                    <div style={{fontWeight: "bold", padding: "30px 0"}}>Language {language.language.toUpperCase()}</div>
                    <Row>
                        <Col>
                            <FormGroup inline>
                                <Label for="language">Language Code</Label>
                                <Input type="select" name="language" id="language" value={language.language.toUpperCase()} onChange={(e) => this.selectLanguage(idx, e)}>
                                    {
                                        this.state.langCode.map(lang => {
                                            return (
                                                <option>{lang}</option>
                                            );
                                        })
                                    }
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup inline>
                                <Label for="title">Title</Label>
                                <Input type="text" name="title" id="title" onChange={(e) => this.onChangei18n(idx, e)} placeholder="Enter title ..."/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup inline>
                                <Label for="subline">Subline</Label>
                                <Input type="text" name="subline" id="subline" onChange={(e) => this.onChangei18n(idx, e)} placeholder="Enter subline ..."/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup inline>
                                <Label for="slug">Slug</Label>
                                <Input type="text" name="slug" id="slug" onChange={(e) => this.onChangei18n(idx, e)} placeholder="Enter slug ..."/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup inline>
                                <Label for="text">Text</Label>
                                <Input type="text" name="text" id="text" onChange={(e) => this.onChangei18n(idx, e)} placeholder="Enter text ..."/>
                            </FormGroup>
                        </Col>
                        <Col></Col>
                    </Row>
                    <hr/>
                        </Container>
                        ))
                    }
                </Container>
                <Row style={{paddingTop: '30px'}}>
                    <Col>
                        <Button onClick={this.addi18n}>New language</Button>
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
