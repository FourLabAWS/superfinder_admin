import React from "react";
import Box from '@mui/material/Box';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { routes } from './routes/routes'
import { createBrowserHistory } from "history";

import "./App.css";


const history = createBrowserHistory();


function App() {
  const isLogged = localStorage.getItem('authenticated');
  console.log(history)
  var timeOutInterval = 10;
  var now = new Date().getTime();
  var setupTime = localStorage.getItem('setupTime');
  if (setupTime == null) {
    localStorage.setItem('setupTime', now)
  } else {
    if (now - setupTime > timeOutInterval * 1000) {
      localStorage.clear()
      localStorage.setItem('setupTime', now);
    }
  }

  console.log('logged in ', isLogged);
  return (
    <Box sx={{ display: 'flex' }}>
      {isLogged !== true && <Navbar />}
      <BrowserRouter>
        {isLogged !== true && <Sidebar />}
        <Routes history={history}>
          {routes.map(route => {
            return (
              route.path === '/login' && isLogged !== null ? history.push('/') :
                <Route key={route.id} path={route.path} element={route.component}></Route>
            )
          })}
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
