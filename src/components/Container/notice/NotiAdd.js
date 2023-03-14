import * as React from "react";
import Box from "@mui/material/Box";
import NotiAdd from "../../Table/notice/NotiAdd";

function Add(){
  return (
    <Box component='main' sx={{ flexGrow: 1, mt:'64px', bgcolor: 'background.default', p: 2 }}>
      <NotiAdd />
    </Box>
  )
}

export default Add;