import Dashboard from "../pages/Dashboard";
import Management from "../pages/Management";
import ErrorImages from "../pages/ErrorImages";
import Login from '../pages/Login';


const routes = [
    { path: '/', component: <Dashboard />, hideSidebar: false, requresAuth: true },
    { path: '/management', component: <Management />, hideSidebar: false, requresAuth: true },
    { path: '/errors', component: <ErrorImages />, hideSidebar: false, requresAuth: true },
    { path: '/login', component: <Login />, hideSidebar: true, requresAuth: false }
]

export default routes;