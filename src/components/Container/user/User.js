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

import UserList from "./UserList";

import { client } from "../../../routes/routes";

import "../../Table/styles.css";

export default function Notice() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [params, pushParams] = useState({});

  // 맨처음 사용자를 불러온다.
  useEffect(() => {
    client
      .get("getusertable")
      .then((response) => {
        console.log("유저수세기", response);
        let items = [];
        let responseBody = response.data;
        let dataItems = responseBody;
        console.log("뿌려지는?", dataItems);
        dataItems.map(function (item, index) {
          items.push({
            id: item.device_id,
            device_id: item.device_id,
            device_model: item.device_model,
            shot_count: item.shot_count,
            last_dt: item.last_dt,
          });
        });

        let uniqueItems = Array.from(new Set(items.map((item) => item.device_id))).map(
          (device_id) => {
            return items.find((item) => item.device_id === device_id);
          }
        );

        setList(uniqueItems);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // 사용자를 검색한다.
  const doSearch = () => {
    setText(text);

    client.post("getUser").then((response) => {
      let item = [];
      let items = response.data.Items;
      items.map(function (a, itemNm) {
        item.push({
          id: itemNm,
          admnrId: items[itemNm].ADMNR_ID?.S, // ID
          admnrEmail: items[itemNm].ADMNR_EMAIL?.S, // 이메일
          admnrNm: items[itemNm].ADMNR_NM?.S, // 이름
          useYn: items[itemNm].ADMNR_USEYN?.S, // 사용여부
          regDt: items[itemNm].ADMNR_REGDT?.S, // 등록일
          regId: items[itemNm].ADMNR_REGID?.S, // 등록자
        });
      });

      item = item.filter((i) => i.admnrNm && i.admnrNm.includes(text));
      setList(item);
    });
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}>
      <br />
      <Toolbar />
      <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 550 }}>
        유저 관리
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
                    width: "100%",
                    fontSize: 12,
                    //marginLeft: "30vw",
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
        <UserList data={list} />
      </div>
    </Box>
  );
}
