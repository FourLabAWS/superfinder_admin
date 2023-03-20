import * as React from "react";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import UserAdminList from "./UserAdminList";

import { client } from "../../../routes/routes";

import "../../Table/styles.css";

export default function Notice() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [params, pushParams] = useState({});

  // 맨처음 사용자를 불러온다.
  useEffect(() => {
    client
      .get("getadmin")
      .then((response) => {
        let item = [];
        let items = response.data.Items;

        items.map(function (a, itemNm) {
          item.push({
            id: itemNm,
            admnrId: items[itemNm].ADMNR_ID.S, // ID
            admnrEmail: items[itemNm].ADMNR_EMAIL.S, // 이메일
            admnrNm: items[itemNm].ADMNR_NM.S, // 이름
            useYn: items[itemNm].ADMNR_USEYN.S, // 사용여부
            regDt: items[itemNm].ADMNR_REGDT.S, // 등록일
            regId: items[itemNm].ADMNR_REGID.S, // 등록자
          });
        });

        setList(item);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // 사용자를 검색한다.
  const doSearch = () => {
    pushParams({
      text: text,
    });

    client
      .get("getadmin", {
        params: {
          text: params["text"],
        },
      })
      .then((response) => {
        let item = [];
        let items = response.data.Items;
        items.map(function (a, itemNm) {
          item.push({
            id: itemNm,
            admnrId: items[itemNm].ADMNR_ID.S, // ID
            admnrEmail: items[itemNm].ADMNR_EMAIL.S, // 이메일
            admnrNm: items[itemNm].ADMNR_NM.S, // 이름
            useYn: items[itemNm].ADMNR_USEYN.S, // 사용여부
            regDt: items[itemNm].ADMNR_REGDT.S, // 등록일
            regId: items[itemNm].ADMNR_REGID.S, // 등록자
          });
        });

        setList(item);
      });
  };

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}
    >
      <br />
      <Toolbar />
      <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 550 }}>
        사용자 관리
      </Typography>
      <br />
      <div>
        <FormGroup sx={{ width: "100%" }}>
          <Grid
            container
            spacing={0}
            component={Paper}
            padding={2}
            variant="outlined"
          >
            <Grid container spacing={1}>
              <Grid item xs={10}>
                <Grid container spacing={1}>
                  <Grid
                    item
                    xs={2}
                    backgroundColor="#1976d2"
                    color="#fff"
                    marginTop={1}
                    width="10%"
                  >
                    <Box component="div" align="center">
                      이름
                    </Box>
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      sx={{ width: "70%" }}
                      value={text}
                      onChange={(event) => setText(event.target.value)}
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      fullWidth
                      placeholder="이름을 입력하세요"
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={2}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    width: "50%",
                    fontSize: 12,
                    marginLeft: "50%",
                    height: "100%",
                  }}
                  startIcon={<SearchIcon />}
                  onClick={doSearch}
                >
                  검색
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </FormGroup>
        <Divider sx={{ padding: 2, border: "none" }} />
        <UserAdminList data={list} />
      </div>
    </Box>
  );
}
