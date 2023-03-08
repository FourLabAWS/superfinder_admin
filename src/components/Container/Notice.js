import * as React from "react";
import Box from "@mui/material/Box";

export default function Container() {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}
    ></Box>
  );
}
