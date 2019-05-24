// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import List from "@material-ui/icons/ListAlt";
// core components/views for Admin layout
import Home from "./containers/Home";
import News from "./containers/News";
// core components/views for RTL layout
const dashboardRoutes = [
  {
    path: "",
    name: "Dashboard",
    icon: Dashboard,
    component: Home,
    layout: "/"
  },
  {
    path: "news",
    name: "News",
    icon: List,
    component: News,
    layout: "/"
  }
];

export default dashboardRoutes;
