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
  const [pageNo, setPageNo] = React.useState(0);
  const [imgLoading, setImgLoading] = React.useState(false);

  const [pageParam, setPageParam] = React.useState("null");

  const migrateData = async () => {
    try {
      setImgLoading(true);
      const res = await client.get(`getPageImg/${pageParam}`);
      //const res = await client.get(`getPageImg/${pageParam}`);
      console.log(res);
      let data = [];
      let devices = [];

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
            file_size: item.size,
            converted_path: item.converted_path,
            plc_lat: "",
            plc_lng: "",
            count: "",
          });
        }

        if (!devices.includes(item.device_model)) {
          devices.push(item.device_model);
        }
      }
      setDeviceModels(devices);
      setPosts(data);
      setImgLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    migrateData();
  }, [pageParam]);

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
  };

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const [deviceModels, setDeviceModels] = React.useState([]);
  const [selectedDeviceModel, setSelectedDeviceModel] = React.useState("");

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
        {/* <Grid>
          {deviceModels.map((deviceModel) => (
            <Button
              key={deviceModel}
              onClick={() => setSelectedDeviceModel(deviceModel)}
            >
              {deviceModel}
            </Button>
          ))}
        </Grid> */}
      </FormGroup>
      <Toolbar />

      {/* 데이터그리드 */}
      <DataTable
        imgLoading={imgLoading}
        page={pageNo}
        setPage={setPageNo}
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
