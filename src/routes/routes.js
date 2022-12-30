import Dashboard from "../pages/Dashboard";
import Management from "../pages/Management";
import ErrorImages from "../pages/ErrorImages";
import Login from '../pages/Login';
import axios from "axios";

const BASE_URL = "https://o0a46p97p0.execute-api.ap-northeast-2.amazonaws.com/v1/"
const client = axios.create({
    baseURL: BASE_URL
});


const routes = [
    { id: 1, path: '/', component: <Dashboard />, hideSidebar: false, requresAuth: true },
    { id: 2, path: '/management/:id', component: <Management />, hideSidebar: false, requresAuth: true },
    { id: 3, path: '/errors', component: <ErrorImages />, hideSidebar: false, requresAuth: true },
    { id: 4, path: '/login', component: <Login />, hideSidebar: true, requresAuth: false }
]

export { routes, client };