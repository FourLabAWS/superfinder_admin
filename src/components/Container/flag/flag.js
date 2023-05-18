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

import GetFlag from "./flagList";

import { client } from "../../../routes/routes";

import "../../Table/styles.css";

export default function Flag() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [params, pushParams] = useState({});

  // 맨처음 깃발을 불러온다.
  useEffect(() => {
    client
      .get("getFlag")
      .then((response) => {
        let item = [];
        let items = response.data.Items || []; // 응답이 없는 경우에는 빈 배열로 초기화
        console.log(items);
        items.map(function (a, itemNm) {
          item.push({
            id: itemNm,
            flagCd: items[itemNm].FLAG_CD.S,
            plcId: items[itemNm].PLC_ID.S,
            plcNm: items[itemNm].PLC_NM.S,
            plcLat: items[itemNm].PLC_LAT?.S,
            plcLng: items[itemNm].PLC_LNG?.S,
            unitNm: items[itemNm].UNIT_NM.S,
            hzLnth: parseInt(items[itemNm].HZ_LNTH.S),
            vrLnth: parseInt(items[itemNm].VR_LNTH.S),
            regId: items[itemNm].REG_ID.S,
            regDt: items[itemNm].REG_DT.S,
            regSe: items[itemNm].REG_SE.S,
            modId: items[itemNm].MOD_ID.S,
            modDt: items[itemNm].MOD_DT.S,
            modSe: items[itemNm].MOD_SE.S,
          });
        });
        setList(item);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // 깃발을 검색한다.
  const doSearch = () => {
    pushParams({
      text: text,
    });

    client
      .get("getFlag", {
        params: {
          contains: params["text"], // 이름이 포함된 깃발 검색
        },
      })
      .then((response) => {
        let item = [];
        let items = response.data.Items;
        items.map(function (a, itemNm) {
          item.push({
            id: itemNm,
            flagCd: items[itemNm].FLAG_CD.S,
            plcId: items[itemNm].PLC_ID.S,
            plcNm: items[itemNm].PLC_NM.S,
            plcLat: items[itemNm].PLC_LAT.S,
            plclng: items[itemNm].PLC_LNG.S,
            unitNm: items[itemNm].UNIT_NM.S,
            hzLnth: parseInt(items[itemNm].HZ_LNTH.S),
            vrLnth: parseInt(items[itemNm].VR_LNTH.S),
            regId: items[itemNm].REG_ID.S,
            regDt: items[itemNm].REG_DT.S,
            regSe: items[itemNm].REG_SE.S,
            modId: items[itemNm].MOD_ID.S,
            modDt: items[itemNm].MOD_DT.S,
            modSe: items[itemNm].MOD_SE.S,
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
        깃발 관리
      </Typography>
      <br />
      <div>
        <FormGroup sx={{ width: "100%" }}>
          <Grid container spacing={0} component={Paper} padding={2} variant="outlined">
            <Grid container spacing={1}>
              <Grid item xs={10}>
                <Grid container spacing={1}>
                  <Grid
                    item
                    xs={1}
                    backgroundColor="#1976d2"
                    color="#fff"
                    marginTop={1}
                    width="10%"
                  >
                    <Box component="div" align="center">
                      골프장
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
                      placeholder="골프장을 입력하세요"
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
        <GetFlag data={list} />
      </div>
    </Box>
  );
}
