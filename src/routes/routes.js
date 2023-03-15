import axios from "axios";
import PublicRoute from "../components/Routes/PublicRoute";
import PrivateRoute from "../components/Routes/PrivateRoute";

import Board from "../pages/Board";

import Login from '../pages/Login';
import Dashboard from "../pages/Dashboard";
import DataTable from "../pages/DataTable";
import Management from "../pages/Management";

import Notice from "../pages/notice/Notice";
import NoticeReg from "../pages/notice/NoticeReg";
import NoticeDtl from "../pages/notice/NoticeDtl";


const BASE_URL = "https://o0a46p97p0.execute-api.ap-northeast-2.amazonaws.com/v1/";
const client = axios.create({baseURL: BASE_URL});

const routes = [
    {
      id: 1,
      path: '/',
      component: <PrivateRoute> <Dashboard /> </PrivateRoute>
    },
    {
      id: 2,
      path: '/management/:id',
      component: <PrivateRoute> <Management /> </PrivateRoute>
    },
    {
      id: 3,
      path: '/analysis',
      component: <PrivateRoute> <DataTable /> </PrivateRoute>
    },
    {
      id: 4,
      path: '/login',
      component: <PublicRoute> <Login /> </PublicRoute>
    },
    {
      id: 5,
      path: "/notice",
      component: (<PrivateRoute> <Notice /> </PrivateRoute>)
    },
    {
      id: 6,
      path: "/noticeReg",
      component: (<PrivateRoute> <NoticeReg /> </PrivateRoute>)
    },
    {
      id: 7,
      path: "/noticeDtl/:notiId",
      component: (<PrivateRoute> <NoticeDtl /> </PrivateRoute>)
    },
    // { // 공지사항 수정
    //   id: 8,
    //   path: "/noticeModf",
    //   component: (<PrivateRoute> <NoticeModf /> </PrivateRoute>)
    // },
    // { // 공지사항 삭제
    //   id: 9,
    //   path: "/noticeDet",
    //   component: (<PrivateRoute> <NoticeDet /> </PrivateRoute>)
    // },
    {
        id: 99,
        path: '/board',
        component: <PrivateRoute> <Board /> </PrivateRoute>
    }
]

export { routes, client };
