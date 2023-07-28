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
  const [mapService, setMapService] = useState(null); // 상태로 MapService를 저장

  //https://velog.io/@altmshfkgudtjr/%EC%A2%8C%ED%91%9C%EB%A5%BC-%ED%86%B5%ED%95%B4%EC%84%9C-%EA%B5%AD%EB%82%B4%EC%99%B8-%ED%8C%90%EB%B3%84
  //23-07-28
  const KoreaCoordinate = [
    { lat: 37.65974, lng: 124.972107 },
    { lat: 39.105648, lng: 129.293848 },
    { lat: 37.472782, lng: 131.597259 },
    { lat: 34.743466, lng: 129.259321 },
    { lat: 33.810255, lng: 128.903499 },
    { lat: 32.599185, lng: 125.157071 },
    { lat: 34.458362, lng: 124.150105 },
    //{ lat: 37.515778, lng: 126.769852 }, // 시작점과 종료점이 같은 경우
  ];

  const checkInsideKorea = ({ lat, lng }) => {
    const coordinateList = KoreaCoordinate;
    const size = coordinateList.length;

    if (size < 3) {
      return false;
    }

    let isInner = false;
    let followIndex = size - 1;

    for (let cur = 0; cur < size; cur++) {
      const curPos = coordinateList[cur];
      const prevPos = coordinateList[followIndex];

      if (
        (curPos.lng < lng && prevPos.lng >= lng) ||
        (prevPos.lng < lng && curPos.lng >= lng)
      ) {
        /**
         * 직선의 방정식: y - y1 = M * (x - x1)
         * 기울기: M = (y2 - y1) / (x2 - x1)
         */
        if (
          curPos.lat +
            ((lng - curPos.lng) / (prevPos.lng - curPos.lng)) *
              (prevPos.lat - curPos.lat) <
          lat
        ) {
          isInner = !isInner;
        }
      }

      followIndex = cur;
    }

    return isInner;
  };

  // 맨처음 깃발을 불러온다.
  useEffect(() => {
    client
      .get("getFlag")
      .then((response) => {
        let item = [];
        let lat = "";
        let lng = "";
        let verifyForeign = "";
        let items = response.data.Items || []; // 응답이 없는 경우에는 빈 배열로 초기화
        console.log(response.data.Items);
        items.map(function (a, itemNm) {
          if (
            items[itemNm].PLC_LAT.S !== "" &&
            items[itemNm].PLC_LNG.S !== ""
          ) {
            lat = items[itemNm].PLC_LAT.S;
            lng = items[itemNm].PLC_LNG.S;
            if (checkInsideKorea({ lat, lng })) {
              verifyForeign = "국내";
            } else {
              verifyForeign = "국외";
            }
          } else {
            verifyForeign = "-";
          }
          item.push({
            id: itemNm,
            flagCd: items[itemNm].FLAG_CD.S,
            plcId: items[itemNm].PLC_ID.S,
            plcNm: items[itemNm].PLC_NM.S,
            plcLat: items[itemNm].PLC_LAT?.S,
            plcLng: items[itemNm].LNG?.S,
            unitNm: items[itemNm].UNIT_NM.S,
            hzLnth: parseInt(items[itemNm].HZ_LNTH.S),
            vrLnth: parseInt(items[itemNm].VR_LNTH.S),
            authYn: items[itemNm].AUTH_YN?.S,
            regId: items[itemNm].REG_ID.S,
            regDt: items[itemNm].REG_DT.S,
            regSe: items[itemNm].REG_SE.S,
            modId: items[itemNm].MOD_ID.S,
            modDt: items[itemNm].MOD_DT.S,
            modSe: items[itemNm].MOD_SE.S,
            foreign: verifyForeign,
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
    setText(text);

    client.get("getFlag").then((response) => {
      let item = [];
      let lat = "";
      let lng = "";
      let verifyForeign = "";
      let items = response.data.Items;
      items.map(function (a, itemNm) {
        if (items[itemNm].PLC_LAT.S !== "" && items[itemNm].PLC_LNG.S !== "") {
          lat = items[itemNm].PLC_LAT.S;
          lng = items[itemNm].PLC_LNG.S;
          if (checkInsideKorea({ lat, lng })) {
            verifyForeign = "국내";
          } else {
            verifyForeign = "국외";
          }
        } else {
          verifyForeign = "-";
        }
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
          authYn: items[itemNm].AUTH_YN?.S,
          regId: items[itemNm].REG_ID.S,
          regDt: items[itemNm].REG_DT.S,
          regSe: items[itemNm].REG_SE.S,
          modId: items[itemNm].MOD_ID.S,
          modDt: items[itemNm].MOD_DT.S,
          modSe: items[itemNm].MOD_SE.S,
          foreign: verifyForeign,
        });
      });
      console.log();
      item = item.filter((i) => i.plcNm && i.plcNm.includes(text));
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
        깃발 관리
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
        <GetFlag data={list} />
      </div>
    </Box>
  );
}