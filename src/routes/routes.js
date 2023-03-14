import Dashboard from "../pages/Dashboard";
import DataTable from "../pages/DataTable";
import Management from "../pages/Management";
import Login from "../pages/Login";
import axios from "axios";
import PublicRoute from "../components/Routes/PublicRoute";
import PrivateRoute from "../components/Routes/PrivateRoute";
import Notice from "../pages/Notice";
import NotiAdd from "../pages/notice/NotiAdd";

const BASE_URL =
  "https://o0a46p97p0.execute-api.ap-northeast-2.amazonaws.com/v1/";
const client = axios.create({
  baseURL: BASE_URL,
});

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
  // 아래부터는 깃 충돌발생할 것 같다....
  {
    id: 6,
    path: "/notice/add",
    component: (
      <PrivateRoute>
        {" "}
        <NotiAdd />{" "}
      </PrivateRoute>
    ),
  },
];

export { routes, client };
