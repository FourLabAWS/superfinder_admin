import axios from "axios";
import PublicRoute from "../components/Routes/PublicRoute";
import PrivateRoute from "../components/Routes/PrivateRoute";

import Board from "../pages/Board";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import DataTable from "../pages/DataTable";
import Management from "../pages/Management";

import Notice from "../pages/notice/Notice";
import NoticeReg from "../pages/notice/NoticeReg";
import NoticeDtl from "../pages/notice/NoticeDtl";
import NoticeModf from "../pages/notice/NoticeModf";

import UserAdmin from "../pages/user/UserAdmin";
import Flag from "../pages/flag/flag";
import Param from "../pages/param/param";
import Event from "../pages/event/event";
import BookMark from "../pages/bookmark/bookmark";
import User from "../pages/user/User";
import WorldMap from "../pages/map";
//const BASE_URL = "https://o0a46p97p0.execute-api.ap-northeast-2.amazonaws.com/v1/";
const BASE_URL = "https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/";
const client = axios.create({ baseURL: BASE_URL });
//1
const routes = [
  {
    id: 1,
    path: "/",
    component: (
      <PrivateRoute>
        {" "}
        <Dashboard />{" "}
      </PrivateRoute>
    ),
  },
  {
    id: 2,
    path: "/management/:id",
    component: (
      <PrivateRoute>
        {" "}
        <Management />{" "}
      </PrivateRoute>
    ),
  },
  {
    id: 3,
    path: "/analysis",
    component: (
      <PrivateRoute>
        {" "}
        <DataTable />{" "}
      </PrivateRoute>
    ),
  },
  {
    id: 4,
    path: "/login",
    component: (
      <PublicRoute>
        {" "}
        <Login />{" "}
      </PublicRoute>
    ),
  },
  {
    id: 5,
    path: "/notice",
    component: (
      <PrivateRoute>
        {" "}
        <Notice />{" "}
      </PrivateRoute>
    ),
  },
  {
    id: 6,
    path: "/noticeReg",
    component: (
      <PrivateRoute>
        {" "}
        <NoticeReg />{" "}
      </PrivateRoute>
    ),
  },
  {
    id: 7,
    path: "/userAdmin",
    component: (
      <PrivateRoute>
        {" "}
        <UserAdmin />{" "}
      </PrivateRoute>
    ),
  },
  {
    id: 14,
    path: "/user",
    component: (
      <PrivateRoute>
        {" "}
        <User />{" "}
      </PrivateRoute>
    ),
  },
  {
    id: 8,
    path: "/noticeDtl/:notiId",
    component: (
      <PrivateRoute>
        {" "}
        <NoticeDtl />{" "}
      </PrivateRoute>
    ),
  },
  {
    id: 9,
    path: "/noticeModf/:notiId",
    component: (
      <PrivateRoute>
        {" "}
        <NoticeModf />{" "}
      </PrivateRoute>
    ),
  },
  /*  {
    id: 10,
    path: "/UserAdminEdit/:admnrId",
    component: (
      <PrivateRoute>
        {" "}
        <UserAdminEdit />{" "}
      </PrivateRoute>
    ),
  },*/
  {
    id: 10,
    path: "/flag",
    component: (
      <PrivateRoute>
        {" "}
        <Flag />{" "}
      </PrivateRoute>
    ),
  },
  {
    id: 11,
    path: "/param",
    component: (
      <PrivateRoute>
        {" "}
        <Param />{" "}
      </PrivateRoute>
    ),
  },
  {
    id: 12,
    path: "/event",
    component: (
      <PrivateRoute>
        {" "}
        <Event />{" "}
      </PrivateRoute>
    ),
  },
  {
    id: 13,
    path: "/bookmark",
    component: (
      <PrivateRoute>
        {" "}
        <BookMark />{" "}
      </PrivateRoute>
    ),
  },
  {
    id: 97,
    path: "/map",
    component: (
      <PrivateRoute>
        <WorldMap />
      </PrivateRoute>
    ),
  },
  {
    id: 98,
    path: "/AddNoti",
    component: (
      <PrivateRoute>
        {" "}
        <NoticeReg />{" "}
      </PrivateRoute>
    ),
  },
  {
    id: 99,
    path: "/board",
    component: (
      <PrivateRoute>
        {" "}
        <Board />{" "}
      </PrivateRoute>
    ),
  },
];

export { routes, client };
