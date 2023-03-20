import React, { useState } from "react";
import Box from '@mui/material/Box';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { routes } from './routes/routes'
import { createBrowserHistory } from "history";
import "./App.css";
import moment from 'moment'

require('moment-timezone')
moment.tz.setDefault('Asia/Seoul')

const history = createBrowserHistory();

function setUpTiming() {
  var timeOutInterval = 120;
  var now = new Date().getTime();
  var setupTime = localStorage.getItem('setupTime');
  if (setupTime == null) {
    localStorage.setItem('setupTime', now)
  } else {
    if (now - setupTime > timeOutInterval * 1000) {
      localStorage.clear()
      window.location.reload(false);
      localStorage.setItem('setupTime', now);
    }
  }
}


function App() {
  const isLogged = localStorage.getItem('authenticated');
  //console.log('logged in ', isLogged);
  
  setUpTiming();

  return (
      <Box sx={{ display: 'flex' }}>
      {isLogged != null && <Navbar />}
      <BrowserRouter>
        {isLogged != null && <Sidebar />}
        <Routes history={history}>
          {routes.map(route => {
            return (
              <Route key={route.id} path={route.path} element={route.component}></Route>
            )
          })}
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
