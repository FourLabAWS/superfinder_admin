import React from "react";
import Box from '@mui/material/Box';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from "./pages/Dashboard";
import Management from "./pages/Management";
import ErrorImages from "./pages/ErrorImages";

import "./App.css";

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />

      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/management" element={<Management />}></Route>
          <Route path="/errors" element={<ErrorImages />}></Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
