// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import List from "@material-ui/icons/ListAlt";
// core components/views for Admin layout
import Home from "./containers/Home";
import News from "./containers/News";
import NewsAdd from "./containers/NewsAdd";
// core components/views for RTL layout
const dashboardRoutes = [
  {
    path: "",
    name: "Dashboard",
    icon: Dashboard,
    component: Home,
    layout: "/",
    dashboard: true
  },
  {
    path: "news",
    name: "News",
    icon: List,
    component: News,
    layout: "/",
    dashboard: true
  },
  {
    path: "newsadd",
    name: "Add News",
    icon: List,
    component: NewsAdd,
    layout: "/",
    dashboard: false
  }
];

export default dashboardRoutes;
