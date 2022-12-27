import React from "react";
import Box from '@mui/material/Box';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import routes from './routes/routes'
import Dashboard from "./pages/Dashboard";
import { useNavigate } from 'react-router-dom';
import { createBrowserHistory } from "history";

import "./App.css";


const history = createBrowserHistory();


function App() {
  const isLogged = localStorage.getItem('authenticated');

  console.log(isLogged);
  return (
    <Box sx={{ display: 'flex' }}>
      {isLogged !== true && <Navbar />}
      <BrowserRouter>
        {isLogged !== true && <Sidebar />}
        <Routes history={history}>
          {routes.map(route => {
            return (
              route.path === '/login' && isLogged ? history.push('/') :
                <Route path={route.path} element={route.component}></Route>
            )
          })}
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
