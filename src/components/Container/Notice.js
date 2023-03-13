import * as React from "react";
import {useState, useEffect,useRef } from 'react';
import Box from "@mui/material/Box";
import { Table, TableBody, TableHead } from "@mui/material";
import NoticeTable from "../Table/Notice";

export default function Container() {

  return (
    <Box component={'main'} sx={{ flexGrow: 1, mt:'64px', bgcolor: 'background.default', p: 2 }}>
      <NoticeTable />
    </Box>
  );
}
