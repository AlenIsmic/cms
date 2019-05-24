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

import {withRouter} from "react-router-dom"

// core components
import tableStyle from "../../assets/jss/material-dashboard-react/components/tableStyle.jsx";
import {deleteNews, getNews, loadNews} from "../../reducers/news";
import {bindActionCreators} from "redux";
import {replace} from "connected-react-router";
import {clearUser, getUser, logoutUser} from "../../reducers/user";
import {connect} from "react-redux";
import compose from "recompose/compose"

class CustomTable extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            news: []
        }
    }

    removeNews = async (url) => {
        console.log("Delete news");
        console.log(url);
        try {
            await this.props.deleteNews("/cms/news/" + url + "/");
            this.props.replace('/news');
        } catch (e) {
            this.failure(e.toString());
        }
    };

    render()
    {
        const {classes, tableHead, tableData, tableHeaderColor} = this.props;
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
                                        <Tooltip
                                            id="tooltip-top"
                                            title="Edit Task"
                                            placement="top"
                                            classes={{tooltip: classes.tooltip}}
                                        >
                                            <IconButton
                                                aria-label="Edit"
                                                className={classes.tableActionButton}
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
                                            title="Remove"
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
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
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
    return bindActionCreators({getUser, logoutUser, clearUser, loadNews, getNews, deleteNews, replace}, dispatch)
}

export default withRouter(compose(withStyles(tableStyle), connect(mapState, mapActions))(CustomTable));
