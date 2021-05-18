/*!

=========================================================
* Light Bootstrap Dashboard PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Buttons from "views/Components/Buttons.js";
import GridSystem from "views/Components/GridSystem.js";
import Panels from "views/Components/Panels.js";
import SweetAlert from "views/Components/SweetAlertPage.js";
import Notifications from "views/Components/Notifications.js";
import Icons from "views/Components/Icons.js";
import Typography from "views/Components/Typography.js";
import RegularForms from "views/Forms/RegularForms.js";
import ExtendedForms from "views/Forms/ExtendedForms.js";
import ValidationForms from "views/Forms/ValidationForms.js";
import Wizard from "views/Forms/Wizard/Wizard.js";
import RegularTables from "views/Tables/RegularTables.js";
import ExtendedTables from "views/Tables/ExtendedTables.js";
import ReactTables from "views/Tables/ReactTables.js";
import GoogleMaps from "views/Maps/GoogleMaps.js";
import FullScreenMap from "views/Maps/FullScreenMap.js";
import VectorMap from "views/Maps/VectorMap.js";
import Charts from "views/Charts.js";
import Calendar from "views/Calendar.js";
import UserPage from "views/Pages/UserPage.js";
import LoginPage from "views/Pages/LoginPage.js";
import RegisterPage from "views/Pages/RegisterPage.js";
import LockScreenPage from "views/Pages/LockScreenPage.js";


import OrderManage from "views/OrderManage/OrderManage.js";
import UserManage from "views/UserManage/UserManage.js";
import ProductManage from "views/ProductManage/ProductManage.js";
import ProductDetails from "views/ProductManage/ProductDetails.js";
import NewUser from "views/UserManage/NewUser.js"
import EditUser from "views/UserManage/EditUser.js"
var routes = [
  {
    path: "/dashboard",
    layout: "/admin",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    params:"",
  },
  {
    collapse: true,
    path:"/product-manage",
    name:"商品管理",
    state:"openProductManage",
    icon: "nc-icon nc-bag",
    views:[
      {
        path:"/product-manage/oneday",
        layout:"/admin",
        name:"一日游",
        params:"",
        mini:"OD",
        component: ProductManage
      },
      {
        path: "/productDetails",
        params: "/:id?",
        name: "产品细节",
        icon: "nc-icon nc-single-copy-04",
        component: ProductDetails,
        layout: "/admin",
        invisible: true,
      }
    ]

  },
  {
    collapse: true,
    path:"/order-manage",
    name:"订单管理",
    state:"openOrderManage",
    icon: "nc-icon nc-single-copy-04",
    views:[
      {
        path:"/order-manage/oneday",
        layout:"/admin",
        name:"一日游",
        params:"",
        mini:"OD",
        component: OrderManage
      }
    ]

  },
  {
    collapse: true,
    path: "/users-manage",
    name:"用户管理",
    state:"openUserManage",
    icon: "nc-icon nc-circle-09",
    params:"",

    views:[
      {
        path:"/user-manage/admin-manage",
        layout:"/admin",
        name:"系统管理员",
        params:"",
        mini:"Ad",
        component: UserManage
      },
      {
        path:"/user-manage/supplier-manage",
        layout:"/admin",
        name:"供应商",
        params:"",
        mini:"Sup",
        component: UserManage
      },
      {
        path:"/user-manage/new-user",
        layout:"/admin",
        name:"新增用户",
        params:"",
        mini:"",
        component: NewUser,
        invisible: true
      },
      {
        path:"/user-manage/edit-user",
        layout:"/admin",
        name:"修改用户",
        params:"/:id?/:email?",
        mini:"",
        component: EditUser,
        invisible: true
      },
    ]
  },
  
];
export default routes;
