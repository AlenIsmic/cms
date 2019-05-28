import React, {Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Modal, ModalBody, ModalHeader, Col, Row} from "reactstrap";
import Button from "../CustomButtons/Button"
import compose from "recompose/compose"
import withStyles from "@material-ui/core/styles/withStyles";
import {primaryColor,dangerColor, hexToRgb} from "../../assets/jss/material-dashboard-react";

const styles = {
    "modalHeader": {
        backgroundColor: primaryColor[0],
        color: "#FFFFFF"
    },
    "modalBackButton": {
        fontSize: "15px",
        fontWeight: "500",
        width: "100%",
        marginTop: "40px",
        color: dangerColor[0],
        border: "1px solid",
        borderColor: "red",
        backgroundColor: "transparent",
        "&:hover,&:focus": {
            color: dangerColor[0],
            border: "1px solid",
            borderColor: "red",
            backgroundColor: "transparent"
        }
    }
};

class ViewNewsModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }

    componentDidUpdate() {
    }

    onSubmit = async (data) => {

        // try{
        //     const dataCopy = deepCopy(data);
        //     if(!isBase64(dataCopy.logo)) delete dataCopy.logo;
        //     await brand.update(dataCopy);
        //     createMessage('Successfully edited brand');
        //     this.props.reloadData();
        //     this.props.toggle();
        // }catch (e) {
        //     console.log("An error has occurred.");
        //     console.error(e);
        //     this.setState({ errors: parseErrors(e)});
        // }


    };
    render() {
        const {toggle, isOpen, data, classes} = this.props;
        if(!isOpen) return "";
        return <Fragment>
            <Modal toggle={toggle} isOpen={isOpen} size="lg">
                <ModalHeader className={classes.modalHeader}>
                    News Details
                </ModalHeader>
                <ModalBody>
                        {  Object.keys(data.news[data.viewNewsIdx]).map(function(key, index) {
                            if (key !== "i18n") {
                                return (
                                    <Col sm={6} className="my-2">
                                    <div className="form-label text-muted font-weight-bold">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                                    {data.news[data.viewNewsIdx][key]}
                                    </Col>
                                );
                            }
                            else {

                                return (Object.keys(data.news[data.viewNewsIdx][key]).map(function(language){
                                    return (
                                        <Col>
                                        <hr/>
                                        <div className="form-label text-muted font-weight-bold">{"Language " + language["language"]}</div>
                                            {/*return (Object.keys(language).map(function(language_key){*/}
                                            {/*<Col sm={6} className="my-2">*/}
                                                {/*<div className="form-label text-muted font-weight-bold">{key.charAt(0).toUpperCase() + key.slice(1)}</div>*/}
                                                {/*{data.news[data.viewNewsIdx][key]}*/}
                                            {/*</Col>*/}
                                        {/*}));*/}
                                        </Col>
                                    );
                                }));
                            }
                        })
                        }
                        <Button className={classes.modalBackButton} outline onClick={toggle}>BACK</Button>
                </ModalBody>
            </Modal>
        </Fragment>
    };

}

function mapState(state) {
    return {
    };
}

function mapActions(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default withRouter(compose(withStyles(styles), connect(mapState, mapActions))(ViewNewsModal));
