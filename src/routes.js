import Dashboard from "views/Dashboard.jsx";
import SellNew from "views/SellNew.jsx";
import NewClient from "views/NewUser.jsx";
import Sells from "views/Sells.jsx";
import SellEdit from "views/SellEdit.jsx";

import DashboardOld from "views/DashboardOld.jsx";
import Icons from "views/Icons.jsx";
import Map from "views/Map.jsx";
import Notifications from "views/Notifications.jsx";
import Rtl from "views/Rtl.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import UserProfile from "views/UserProfile.jsx";

var routes = [
  {
    path: "/dashboard-old",
    name: "DashboardOld",
    icon: "tim-icons icon-chart-pie-36",
    component: DashboardOld,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/new-client",
    name: "Novo Cliente",
    component: NewClient,
    icon: "tim-icons icon-single-02",
    layout: "/admin"
  },
  {
    path: "/new-sell",
    name: "Nova Venda",
    icon: "tim-icons icon-notes",
    component: SellNew,
    layout: "/admin"
  },
  {
    path: "/sells",
    name: "Vendas",
    icon: "tim-icons icon-paper",
    component: Sells,
    layout: "/admin"
  },
  {
    path: "/sell/:id",
    name: "Editar venda",
    icon: "tim-icons icon-paper",
    component: SellEdit,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/map",
    name: "Map",
    icon: "tim-icons icon-pin",
    component: Map,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "tim-icons icon-align-center",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/rtl-support",
    name: "RTL Support",
    icon: "tim-icons icon-world",
    component: Rtl,
    layout: "/rtl"
  }
];
export default routes;
