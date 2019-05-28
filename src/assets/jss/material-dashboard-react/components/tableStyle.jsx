import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont
} from "../../material-dashboard-react.jsx";

const tableStyle = theme => ({
  warningTableHeader: {
    color: warningColor[0]
  },
  primaryTableHeader: {
    color: primaryColor[0]
  },
  dangerTableHeader: {
    color: dangerColor[0]
  },
  successTableHeader: {
    color: successColor[0]
  },
  infoTableHeader: {
    color: infoColor[0]
  },
  roseTableHeader: {
    color: roseColor[0]
  },
  grayTableHeader: {
    color: grayColor[0]
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse"
  },
  tableHeadCell: {
    color: "inherit",
    ...defaultFont,
    fontSize: "1em"
  },
  tableCell: {
    ...defaultFont,
    lineHeight: "1.42857143",
    padding: "12px 8px",
    verticalAlign: "middle",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    minWidth: "50px",
    maxWidth: "300px"
  },
  tableResponsive: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  tableActions: {
    paddingRight: "0px !important"
  },
  edit: {
      backgroundColor: "transparent",
      color: primaryColor[0],
      boxShadow: "none"
  },
  close: {
      backgroundColor: "transparent",
      color: dangerColor[0],
      boxShadow: "none"
  },
  view: {
      backgroundColor: "transparent",
      color: grayColor[0],
      boxShadow: "none"
  }
});

export default tableStyle;
