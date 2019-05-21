import React from 'react';
import {Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row} from "reactstrap";

import * as classnames from "classnames";

class Newsi18n extends React.Component {

    constructor(props) {
        super(props);

        this.toogleLangCode = this.toogleLangCode.bind(this);
        this.state = {
            LangDropdown: false,
            langCode:
                [
                    "EN",
                    "DE"
                ]
        }

    }

    toogleLangCode() {
        this.setState(prevState => ({
            LangDropdown: !prevState.LangDropdown
        }));
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    render() {

        return <Container>
            <Row>
                <Col>
                    <label>Language Code</label>
                    <Dropdown isOpen={this.state.LangDropdown} toggle={this.toogleLangCode}>
                        <DropdownToggle caret id="StatusDropdown">
                            Draft
                        </DropdownToggle>
                        <DropdownMenu>
                            {this.state.langCode.map(status => (
                                <DropdownItem>{status}</DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </Row>
            <Row style={{paddingTop: '30px'}}>
                <Col>
                    <label>Title</label><br/>
                    <input type={'text'}/>
                </Col>
                <Col>
                    <label>Sub line</label><br/>
                    <input type={'text'}/>
                </Col>
            </Row>
            <Row style={{paddingTop: '30px'}}>
                <Col>
                    <label>Slug EN</label><br/>
                    <input type={'text'}/>
                </Col>
                <Col>
                    <label>Text EN</label><br/>
                    <input type={'text'}/>
                </Col>
            </Row>
        </Container>
    };

}

export default Newsi18n;
