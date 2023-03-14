import * as React from "react";
import Box from "@mui/material/Box";
import NoticeList from "../Table/Notice";

export default function Container() {

  return (
    <Box component={'main'} sx={{ flexGrow: 1, mt:'64px', bgcolor: 'background.default', p: 2 }}>
      <NoticeList />
    </Box>
  );
}
