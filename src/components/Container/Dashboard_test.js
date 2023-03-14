import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stats from "../Table/Stats";
const headingTextStyle = {
  fontWeight: 550,
};
export default function Container() {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}
    >
      {/* 여기에 넣으세요 */}
      화면에 데이터가 안 띄워지는데 왜그럴까
    </Box>
  );
}
