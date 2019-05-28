// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import List from "@material-ui/icons/ListAlt";
// core components/views for Admin layout
import Home from "./containers/Home";
import News from "./containers/News";
import AddNews from "./components/News/AddNews";
import EditNews from "./components/News/EditNews";
// core components/views for RTL layout
const dashboardRoutes = [
  {
    path: "",
    name: "Dashboard",
    icon: Dashboard,
    component: Home,
    layout: "/",
    show: true
  },
  {
    path: "news",
    name: "News",
    icon: List,
    component: News,
    layout: "/",
    show: true
  },
  {
    path: "/add",
    component: AddNews,
    layout: "/news",
    show: false
  },
  {
      path: "/:id/edit",
      component: EditNews,
      layout: "/news",
      show: false
  }
];

export default dashboardRoutes;
