import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import View from "@material-ui/icons/Visibility";

import {withRouter} from "react-router-dom"

// core components
import tableStyle from "../../assets/jss/material-dashboard-react/components/tableStyle.jsx";
import {deleteNews, getNews, loadNews, loadNewsCategories} from "../../reducers/news";
import {bindActionCreators} from "redux";
import {replace} from "connected-react-router";
import {clearUser, getUser, logoutUser} from "../../reducers/user";
import {connect} from "react-redux";
import compose from "recompose/compose"

import ViewNewsModal from "../News/ViewNews";
import EditNews from "../News/EditNews";

class CustomTable extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            news: [],
            viewNewsIdx: null,
            ViewNewsModal: false,
            EditNewsModal: false
        }
    }

    removeNews = async (url) => {
        console.log("Delete news");
        console.log(url);
        try {
            await this.props.deleteNews("/cms/news/" + url + "/");
            await this.props.loadNewsCategories();
            await this.props.loadNews();
        } catch (e) {
            this.failure(e.toString());
        }
    };

    // toggleModal = (modal, idx) => {
    //     this.setState({ [modal]: [!this.state[modal]], viewNewsIdx: idx});
    //     console.log(this.state[modal], this.state.viewNewsIdx);
    // };

    toggleViewModal = (idx) => {
        this.setState({ViewNewsModal: !this.state.ViewNewsModal, viewNewsIdx: idx});
    };

    EditNewsRedirect = (idx) => {
        this.props.replace();
    };

    render()
    {
        const {classes, tableHead, tableData, tableHeaderColor, news, newsCategories} = this.props;
        const {viewNewsIdx} = this.state;
        return (
            <div className={classes.tableResponsive}>
                <Table className={classes.table}>
                    {tableHead !== undefined ? (
                        <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                            <TableRow>
                                {tableHead.map((prop, key) => {
                                    return (
                                        <TableCell
                                            className={classes.tableCell + " " + classes.tableHeadCell}
                                            key={key}
                                        >
                                            {prop}
                                        </TableCell>
                                    );
                                })}
                                <TableCell
                                    className={classes.tableCell + " " + classes.tableHeadCell}
                                >
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    ) : null}
                    <TableBody>
                        {tableData.map((prop, key) => {
                            return (
                                <TableRow key={key}>
                                    {prop.map((prop, key) => {
                                        return (
                                            <TableCell className={classes.tableCell} key={key}>
                                                {prop}
                                            </TableCell>
                                        );
                                    })}

                                    <TableCell className={classes.tableActions}>
                                        <div style={{float: "right"}}>
                                        <Tooltip
                                            id="tooltip-top-get"
                                            title="View News"
                                            placement="top"
                                            classes={{tooltip: classes.tooltip}}
                                        >
                                            <IconButton
                                                aria-label="View"
                                                className={classes.tableActionButton}
                                                onClick={(e) => this.toggleViewModal(key, e)}
                                            >
                                                <View
                                                    className={
                                                        classes.tableActionButtonIcon + " " + classes.view
                                                    }
                                                />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip
                                            id="tooltip-top"
                                            title="Edit News"
                                            placement="top"
                                            classes={{tooltip: classes.tooltip}}
                                        >
                                            <IconButton
                                                aria-label="Edit"
                                                className={classes.tableActionButton}
                                                onClick={(e) => this.EditNewsRedirect(key, e)}
                                            >
                                                <Edit
                                                    className={
                                                        classes.tableActionButtonIcon + " " + classes.edit
                                                    }
                                                />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip
                                            id="tooltip-top-start"
                                            title="Remove News"
                                            placement="top"
                                            classes={{tooltip: classes.tooltip}}
                                        >
                                            <IconButton
                                                aria-label="Close"
                                                className={classes.tableActionButton}
                                                onClick={(e) => this.removeNews(prop[0], e)}
                                            >
                                                <Close
                                                    className={
                                                        classes.tableActionButtonIcon + " " + classes.close
                                                    }
                                                />
                                            </IconButton>
                                        </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <ViewNewsModal
                    isOpen={this.state.ViewNewsModal}
                    toggle={() => this.toggleViewModal()}
                    data={{viewNewsIdx, news, newsCategories}}
                />
            </div>
        );
    }
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

function mapState(state){
    console.log("Table");
    console.log(state);
    return {
        user: state.user.user,
        news: state.news.news,
        newsCategories: state.news.newsCategories
    }
}

function mapActions(dispatch) {
    return bindActionCreators({getUser, logoutUser, clearUser, loadNews, loadNewsCategories, getNews, deleteNews, replace}, dispatch)
}

export default withRouter(compose(withStyles(tableStyle), connect(mapState, mapActions))(CustomTable));
