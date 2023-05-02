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

import GetParam from "./paramList";

import { client } from "../../../routes/routes";

import "../../Table/styles.css";

export default function Param() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [params, pushParams] = useState({});

  // 맨처음 파라미터를 불러온다.
  useEffect(() => {
    client
      .get("getParam")
      .then((response) => {
        let item = [];
        let items = response.data.Items || []; // 응답이 없는 경우에는 빈 배열로 초기화

        items.map(function (a, itemNm) {
          item.push({
            id: itemNm,
            paramNm: items[itemNm].PARAM_NM.S,
            paramVal: items[itemNm].PARAM_VAL.S,
            regId: items[itemNm].REG_ID.S,
            regDt: items[itemNm].REG_DT.S,
            modId: items[itemNm].MOD_ID.S,
            modDt: items[itemNm].MOD_DT.S,
            pixel: items[itemNm].PIXEL.S,
            dpi: items[itemNm].DPI.S,
            flagDownRate: items[itemNm].FLAG_DOWN_RATE.S,
            customMaxRate: items[itemNm].CUSTOM_MAX_RATE.S,
            customMinRate: items[itemNm].CUSTOM_MIN_RATE.S,
          });
        });
        setList(item);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // 파라미터를 검색한다.
  const doSearch = () => {
    pushParams({
      text: text,
    });

    client
      .get("getParam", {
        params: {
          contains: params["text"],
        },
      })
      .then((response) => {
        let item = [];
        let items = response.data.Items;
        items.map(function (a, itemNm) {
          item.push({
            id: itemNm,
            paramNm: items[itemNm].PARAM_NM.S,
            paramVal: items[itemNm].PARAM_VAL.S,
            regId: items[itemNm].REG_ID.S,
            regDt: items[itemNm].REG_DT.S,
            modId: items[itemNm].MOD_ID.S,
            modDt: items[itemNm].MOD_DT.S,
            pixel: items[itemNm].PIXEL.S,
            dpi: items[itemNm].DPI.S,
            flagDownRate: items[itemNm].FLAG_DOWN_RATE.S,
            customMaxRate: items[itemNm].CUSTOM_MAX_RATE.S,
            customMinRate: items[itemNm].CUSTOM_MIN_RATE.S,
          });
        });

        setList(item);
      });
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}>
      <br />
      <Toolbar />
      <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 550 }}>
        파라미터 관리
      </Typography>
      <br />
      <div>
        <FormGroup sx={{ width: "100%" }}>
          <Grid container spacing={0} component={Paper} padding={2} variant="outlined">
            <Grid container spacing={1}>
              <Grid item xs={10}>
                <Grid container spacing={1}>
                  <Grid item xs={2} backgroundColor="#1976d2" color="#fff" marginTop={1} width="10%">
                    <Box component="div" align="center">
                      파라미터
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
                      placeholder="파라미터를 입력하세요"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <h1>으악</h1>
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
        <GetParam data={list} />
      </div>
    </Box>
  );
}
