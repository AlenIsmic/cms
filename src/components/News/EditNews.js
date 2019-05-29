import React, {Fragment} from 'react';
import {Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
    Button, Row, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import * as classnames from "classnames";
import Select from 'react-select';
import {replace} from "connected-react-router";
import {connect} from "react-redux";
import {getUser, logoutUser, clearUser} from "../../reducers/user";
import {loadNews, getNews, deleteNews, createNews, updateNews} from "../../reducers/news";
import {bindActionCreators} from "redux";
import Newsi18n from "./Newsi18n";
import {withRouter} from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import compose from "recompose/compose";
import {success, failure, isEmpty} from "../../util";

class EditNews extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newsId: null,
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
            defaulti18nComponents:
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
                ],
            currentNews: {}
        }
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        let data = {};
        try{
            data = await this.props.getNews(id);
            console.log(data);
        }
        catch(e){
            console.log(e.message);
            failure(e.toString());
        }
        try {
            await this.props.loadNews();
        }
        catch (e) {
            console.log(e.message);
            failure(e.toString());
        }
        this.setState({newsId: id, currentNews: data.value.data})
    }

    logout = async () => {
        this.props.logoutUser();
        this.props.clearUser();
        this.props.replace('/login');
    };

    selectStatusChange = (event) => {
        var currentNewsCopy = this.state.currentNews;
        currentNewsCopy.status = event.currentTarget.value;
        this.setState({ currentNews: currentNewsCopy }) // I tried before target.value, or nativeEvent.value
    };

    selectCategoryChange = (event) => {
        var currentNewsCopy = this.state.currentNews;
        currentNewsCopy.category = event.currentTarget.value;
        this.setState({ currentNews: currentNewsCopy }) // I tried before target.value, or nativeEvent.value
    };

    handleOnChange = (e) => {
        const { value, name } = e.target;
        var currentNewsCopy = this.state.currentNews;
        currentNewsCopy[name] = value;
        console.log(currentNewsCopy);
        this.setState({ currentNews: currentNewsCopy }) // I tried before target.value, or nativeEvent.value
    };

    addi18n= (e) => {
        let c = this.state.i18nComponents;
        c.push(<Newsi18n/>);
        this.setState({i18nComponents: c})
    };

    onSubmit = async (e) => {
        e.preventDefault();

        try {
            await this.props.updateNews(this.state.newsId, this.state.currentNews);
            success("News updated successfully!");
            this.props.replace('/news');
        } catch (e) {
            failure(e.toString());
        }
    };

    handleRelatedNewsChange = idx => evt => {
        let newCurrentNews = this.state.currentNews;
        const newRelatedNews = newCurrentNews.relatedTo.map((related, sidx) => {
            if (idx !== sidx) return related;
            return evt.target.value;
        });

        newCurrentNews.relatedTo = newRelatedNews;

        this.setState({ currentNews: newCurrentNews });
    };

    handleAddRelatedNewsholder = () => {
        let newCurrentNews = this.state.currentNews;
        newCurrentNews.relatedTo = newCurrentNews.relatedTo.concat([""]);
        this.setState({
            currentNews: newCurrentNews
        });
    };

    handleRemoveRelatedNews = idx => () => {
        let newCurrentNews = this.state.currentNews;
        newCurrentNews.relatedTo = newCurrentNews.relatedTo.filter((s, sidx) => idx !== sidx);
        this.setState({
            currentNews: newCurrentNews
        });
    };

    selectLanguage = (id, e) => {
        let newCurrentNews = this.state.currentNews;
        newCurrentNews.i18n[id].language = e.currentTarget.value.toLowerCase();
        this.setState({ currentNews: newCurrentNews })
    };

    onChangei18n = (id, e) => {
        const { value, name } = e.target;
        let newCurrentNews = this.state.currentNews;
        newCurrentNews.i18n[id][name] = value;
        this.setState({ currentNews : newCurrentNews })
    };

    addi18n= (e) => {
        let c = this.state.currentNews;
        if(c.i18n.length < 2) {
            c.i18n.push({
                title: "",
                slug: "",
                subline: "",
                text: "",
                language: c.i18n[0].language === "en" ? "de" : "en"
            });
            this.setState({currentNews: c})
        }
    };

    selectRelatedNews = (selectedOptions) => {
        let newCurrentNews = this.state.currentNews;
        newCurrentNews.relatedTo = selectedOptions.map((item) => {
            return item['value'];
        });
        this.setState({ currentNews: newCurrentNews });
    };

    render(){
        const {currentNews} = this.state;
        if(isEmpty(currentNews)){
            return ""
        }
        return <Fragment>
            <Container className="content">
                <h1>Edit News</h1>
            </Container>
            <Container style={{width: "1050px"}}>
                <Form onSubmit={(e, data) => this.onSubmit(e, data)}>
                    <h3>Basic Data</h3>
                    <hr />
                    <Row>
                        <Col>
                            <FormGroup inline>
                                <Label for="status">Status</Label>
                                <Input type="select" name="status" id="status" value={isEmpty(currentNews.status) ? "draft" : currentNews.status} onChange={(e) => this.selectStatusChange(e)}>
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
                                <Input type="text" name="editorialAuthor" id="editorialAuthor" value={isEmpty(currentNews.editorialAuthor) ? "" : currentNews.editorialAuthor} onChange={(e) => this.handleOnChange(e)} placeholder="Enter author ..." />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup inline>
                                <Label for="image">Image</Label>
                                <Input type="text" name="image" id="image" value={isEmpty(currentNews.image) ? "" : currentNews.image} onChange={(e) => this.handleOnChange(e)} placeholder="Enter image's relative path ..." />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup inline>
                                <Label for="category">Category</Label>
                                <Input type="select" name="category" id="category" value={isEmpty(currentNews.category) ? 22 : currentNews.category} onChange={(e) => this.selectCategoryChange(e)}>
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
                                <Input type="text" name="pageRef" id="pageRef" value={isEmpty(currentNews.pageRef) ? "" : currentNews.pageRef} onChange={(e) => this.handleOnChange(e)} placeholder="Enter Page Ref relative path ..." />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup inline>
                                <Label for="relatedTo">Related To</Label>
                                <Select
                                    isMulti={true}
                                    value={isEmpty(currentNews.relatedTo) ? "" : currentNews.relatedTo.map((related) => {
                                        return {"value": related, "label": related};
                                    })}
                                    onChange={this.selectRelatedNews}
                                    options={this.props.news.map((related) => {
                                        return {"value": related.url, "label": related.url};
                                    })
                                    }
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <h3 style={{marginTop: "60px"}}>Internationalization</h3>
                    <hr />
                    <Container id={'i18n'} style={{padding: "0"}}>
                        { isEmpty(currentNews.i18n) ? [] : currentNews.i18n.map((language, idx) => (
                            <Container style={{padding: "0"}}>
                                <div style={{fontWeight: "bold", padding: "30px 0"}}>Language {language.language.toUpperCase()}</div>
                                <Row>
                                    <Col>
                                        <FormGroup inline>
                                            <Label for="language">Language Code</Label>
                                            <Input type="select" name="language" id="language" value={isEmpty(language.language) ? "DE" : language.language.toUpperCase()} onChange={(e) => this.selectLanguage(idx, e)}>
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
                                            <Input type="text" name="title" id="title" value={isEmpty(language.title) ? "" :language.title} onChange={(e) => this.onChangei18n(idx, e)} placeholder="Enter title ..."/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup inline>
                                            <Label for="subline">Subline</Label>
                                            <Input type="text" name="subline" id="subline" value={isEmpty(language.subline) ? "" :language.subline} onChange={(e) => this.onChangei18n(idx, e)} placeholder="Enter subline ..."/>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup inline>
                                            <Label for="slug">Slug</Label>
                                            <Input type="text" name="slug" id="slug" value={isEmpty(language.slug) ? "" :language.slug} onChange={(e) => this.onChangei18n(idx, e)} placeholder="Enter slug ..."/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup inline>
                                            <Label for="text">Text</Label>
                                            <Input type="text" name="text" id="text" value={isEmpty(language.text) ? "" :language.text} onChange={(e) => this.onChangei18n(idx, e)} placeholder="Enter text ..."/>
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
        newsCategories: state.news.newsCategories,
        singleNews: state.news.singleNews
    }
}

function mapActions(dispatch) {
    return bindActionCreators({getUser, logoutUser, clearUser, loadNews, getNews, deleteNews, createNews, updateNews, replace}, dispatch)
}

export default withRouter(connect(mapState, mapActions)(EditNews));
