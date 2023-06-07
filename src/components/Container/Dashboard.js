import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { RegIdStats, Stats } from "../Table/Stats";

const headingTextStyle = {
  fontWeight: 550,
};
export default function Container() {
  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}>
      <br />
      <Toolbar />

      <Typography variant="h6" noWrap component="div" sx={headingTextStyle}>
        통계 데이터
      </Typography>

      <Toolbar />
      <RegIdStats />
      <Stats />
    </Box>
  );
}
