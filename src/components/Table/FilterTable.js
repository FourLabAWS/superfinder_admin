import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import * as React from "react";
import moment from "moment";
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { FormGroup } from "@mui/material";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import DataTable from "../Table/DataTable";
import { client } from "../../routes/routes";
import { DatePicker } from "antd";

import axios from "axios";
import "./styles.css";

export default function FilterTable() {
  const [value, setValue] = React.useState("");
  const [text, setText] = React.useState("");
  // 날짜 검색용 Date
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [numStart, setNumStart] = React.useState();
  const [numEnd, setNumEnd] = React.useState();
  // 이미지 배열들
  const [rows, setPosts] = React.useState([]);
  const [filterRow, setFilterRow] = React.useState([]);

  const migrateData = async () => {
    try {
      const res = await client.get("postImg");
      console.log(res);
      let data = [];
      for (const item of res.data) {
        if (item.status === "original") {
          data.push({
            id: item.id,
            fileName: item.name,
            status: item.status,
            date: item.reg_date,
            device_id: item.device_id,
            flag_size: item.flagW + "x" + item.flagH,
            origin_path: item.original_path,
            device_model: item.device_model,
            plc_lat: "",
            plc_lng: "",
            count: "",
            //plc_lat: res.
          });
        } else {
          data.push({
            id: item.id,
            fileName: item.name,
            status: item.status,
            date: item.reg_date,
            //.replace(/(.+?)-(.+?)-/, "$1-$2-\n"),
            device_id: item.device_id,
            flag_size: item.flagW + "x" + item.flagH,
            converted_path: item.converted_path,
            device_model: item.device_model,
            plc_lat: "",
            plc_lng: "",
            count: "",
            //plc_lat: res.
          });
        }
      }
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (rows.length > 1) {
    } else {
      migrateData();
    }
  }, []);

  const doSearch = () => {
    let filterArr = [];
    console.log(numStart, numEnd);
    if (numStart && numEnd) {
      if (numStart > numEnd) {
        alert("종료 일자는 시작 일자보다 뒤여야 합니다.");
        return;
      }
    } else if (!numStart && numEnd) {
      alert("시작 날짜도 선택해 주세요.");
      return;
    } else if (numStart && !numEnd) {
      alert("종료 날짜도 선택해 주세요.");
      return;
    }

    rows.filter((el) => {
      let numDate = el.date.replace(/-/g, "");
      if (numDate >= numStart && numDate <= numEnd) {
        filterArr.push(el);
      }
      setFilterRow(filterArr);
    });

    // axios
    //   .get(
    //     "https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/getdata"
    //   )
    //   .then(async (response) => {
    //     console.log(response.data);
    //     let data = [];
    //     for (const item of response.data["Items"]) {
    //       if (item["deleted"]["BOOL"] === false) {
    //         const fileName = item["original_file"]["S"];
    //         const splitName = fileName.split("_").reverse();
    //         const flagSize = splitName[1].toUpperCase();
    //         const [flagW, flagH] = flagSize.split("X");
    //         const date = item["registered_date"]["S"];
    //         const startDateStr = startDate.toISOString().split("T")[0];
    //         const endDateStr = endDate.toISOString().split("T")[0];
    //         const origin_path = item["original_path"]["S"];
    //         const device_model = item["device_model"]["S"];
    //         const count = item["count"]["S"];
    //         if (date >= startDateStr && date <= endDateStr) {
    //           data.push({
    //             id: item["id"]["N"],
    //             fileName: fileName,
    //             status: item["error_status"]["S"],
    //             date: date,
    //             device_id: item["device_id"]["S"],
    //             flag_size: flagW + " x " + flagH,
    //             origin_path: origin_path,
    //             plc_lat: item["plc_lat"]?.S || "35.2",
    //             plc_lng: item["plc_lng"]?.S || "129.1598",
    //             device_model: item["device_model"]?.S,
    //             count: item["count"]?.N,
    //           });
    //         }
    //       }
    //     }
    //     setPosts(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error retrieving data:", error);
    //   });
  };

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const [deviceModels, setDeviceModels] = React.useState([]);
  const [selectedDeviceModel, setSelectedDeviceModel] = React.useState("");

  // React.useEffect(() => {
  //   client.get("getdata").then((response) => {
  //     // 기기 모델을 저장할 빈 배열 생성
  //     let deviceModelsArray = [];
  //     let countModelsArray = [];

  //     response.data["Items"].map((item) => {
  //       if (item["deleted"]["BOOL"] === false) {
  //         const fileName = item["original_file"]["S"];
  //         const flagMatch = fileName.match(/\d+x\d+/);

  //         if (flagMatch) {
  //           const [flagW, flagH] = flagMatch[0].split("x");
  //           // console.log(flagW, flagH);

  //           data.push({
  //             id: item["id"]["N"],
  //             fileName: fileName,
  //             status: item["error_status"]["S"],
  //             date: item["registered_date"]["S"],
  //             device_id: item["device_id"]["S"],
  //             flag_size: flagW + " x " + flagH,
  //             origin_path: item["original_path"]["S"],
  //             plc_lat: item["plc_lat"]?.S || "35.2",
  //             plc_lng: item["plc_lng"]?.S || "129.1598",
  //             device_model: item["device_model"]?.S,
  //             count: item["count"]?.N,
  //           });

  //           // 기기 모델이 배열에 아직 없다면 추가
  //           if (!deviceModelsArray.includes(item["device_model"]?.S)) {
  //             deviceModelsArray.push(item["device_model"]?.S);
  //           }
  //           if (!countModelsArray.includes(item["count"]?.S)) {
  //             countModelsArray.push(item["count"]?.S);
  //           }
  //         }
  //       }
  //     });
  //     setPosts(data);
  //     setDeviceModels(deviceModelsArray); // 상태 업데이트
  //   });
  // }, []);

  return (
    <div>
      <FormGroup sx={{ width: "100%" }}>
        <Grid container spacing={0} component={Paper} padding={2} variant="outlined">
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
                날짜
              </Box>
            </Grid>
            <Grid item xs={2}>
              <DatePicker
                format="YYYY-MM-DD"
                placeholder="시작 일자"
                defaultValue={startDate}
                onChange={(newValue) => {
                  console.log("시작 일자", moment(newValue.$d).format("YYYY-MM-DD"));
                  setStartDate(moment(newValue.$d).format("YYYY-MM-DD"));
                  setNumStart(Number(moment(newValue.$d).format("YYYYMMDD")));
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={2}>
              <DatePicker
                format="YYYY-MM-DD"
                placeholder="종료 일자"
                defaultValue={endDate}
                onChange={(newValue) => {
                  console.log("종료 일자", moment(newValue.$d).format("YYYY-MM-DD"));
                  setEndDate(moment(newValue.$d).format("YYYY-MM-DD"));
                  setNumEnd(Number(moment(newValue.$d).format("YYYYMMDD")));
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={2}>
              {/* Select 컴포넌트 추가 */}
              <Select
                value={selectedDeviceModel}
                onChange={(event) => setSelectedDeviceModel(event.target.value)}
                displayEmpty
                sx={{ width: "100%" }}
              >
                <MenuItem value="" disabled>
                  휴대폰 기종 선택
                </MenuItem>
                {deviceModels.map((deviceModel) => (
                  <MenuItem key={deviceModel} value={deviceModel}>
                    {deviceModel}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={2} sx={{ marginLeft: "400px" }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<SearchIcon />}
                onClick={doSearch}
              >
                검색
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          {deviceModels.map((deviceModel) => (
            <Button key={deviceModel} onClick={() => setSelectedDeviceModel(deviceModel)}>
              {deviceModel}
            </Button>
          ))}
        </Grid>
      </FormGroup>
      <Toolbar />

      {/* 데이터그리드 */}
      <DataTable
        data={
          filterRow.length > 1
            ? selectedDeviceModel
              ? filterRow.filter((filter) => filter.device_model === selectedDeviceModel)
              : filterRow
            : selectedDeviceModel
            ? rows.filter((row) => row.device_model === selectedDeviceModel)
            : rows
        }
      />
    </div>
  );
}
