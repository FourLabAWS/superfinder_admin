import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import FilterTable from "../Table/FilterTable";
import Typography from "@mui/material/Typography";
import { BasicModal } from "../Popup";
import { Button } from "@mui/material";

const headingTextStyle = {
  fontWeight: 550,
};

export default function Container() {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}
    >
      <br />
      <Toolbar />

      {/* 모달테스트 */}
      <BasicModal
      //   openBtn={<Button>Open modal</Button>}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </BasicModal>

      <Typography variant="h7" noWrap component="div" sx={headingTextStyle}>
        이미지 검색
      </Typography>

      <br />
      <FilterTable />
    </Box>
  );
}
