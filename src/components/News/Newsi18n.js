import React from 'react';
import {Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row, FormGroup, Input, Label} from "reactstrap";
import * as classnames from "classnames";

class Newsi18n extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            langValue: "",
            langCode:
                [
                    "EN",
                    "DE"
                ]
        }

    }

    selectLanguageChange(event){
        this.setState({ langValue: event.currentTarget.value })
    }

    render() {
        return <Container style={{padding: "0"}}>
            <div style={{fontWeight: "bold", padding: "30px 0"}}>Language</div>
            <Row>
                <Col>
                    <FormGroup inline>
                        <Label for="language_code">Language Code</Label>
                        <Input type="select" name="language_code" id="language_code" value={this.state.langValue} onChange={this.props.selectLanguageChange}>
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
                        <Input type="text" name="title" id="title" placeholder="Enter title ..."/>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup inline>
                        <Label for="subline">Subline</Label>
                        <Input type="text" name="subline" id="subline" placeholder="Enter subline ..."/>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup inline>
                        <Label for="slug">Slug</Label>
                        <Input type="text" name="slug" id="slug" placeholder="Enter slug ..."/>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup inline>
                        <Label for="text">Text</Label>
                        <Input type="text" name="text" id="text" placeholder="Enter text ..."/>
                    </FormGroup>
                </Col>
                <Col></Col>
            </Row>
            <hr/>
        </Container>
    };

}

export default Newsi18n;
