import Dashboard from "views/Dashboard.jsx";
import NewSell from "views/NewSell.jsx";
import NewClient from "views/NewUser.jsx";
import NewProduct from "views/NewProduct.jsx"
import Sells from "views/Sells.jsx";

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
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: DashboardOld,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/new-client",
    name: "Novo Cliente",
    rtlName: "لوحة القيادة",
    component: NewClient,
    icon: "tim-icons icon-single-02",
    layout: "/admin"
  },
  {
    path: "/new-product",
    name: "Novo Produto",
    rtlName: "لوحة القيادة",
    component: NewProduct,
    icon: "tim-icons icon-single-02",
    layout: "/admin"
  },
  {
    path: "/new-sell",
    name: "Nova Venda",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-notes",
    component: NewSell,
    layout: "/admin"
  },
  {
    path: "/sells",
    name: "Vendas",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-paper",
    component: Sells,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/map",
    name: "Map",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    component: Map,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: "tim-icons icon-align-center",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/rtl-support",
    name: "RTL Support",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-world",
    component: Rtl,
    layout: "/rtl"
  }
];
export default routes;
