import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
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
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [rows, setPosts] = React.useState([]);

  const doSearch = () => {
    if (startDate && endDate) {
      if (startDate > endDate) {
        alert("종료 일자는 시작 일자보다 뒤여야 합니다.");
        return;
      }
    } else if (!startDate && endDate) {
      alert("시작 날짜도 선택해 주세요.");
      return;
    } else if (startDate && !endDate) {
      alert("종료 날짜도 선택해 주세요.");
      return;
    }

    axios
      .get("https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/getdata")
      .then(async (response) => {
        let data = [];
        for (const item of response.data["Items"]) {
          if (item["deleted"]["BOOL"] === false) {
            const fileName = item["original_file"]["S"];
            const splitName = fileName.split("_").reverse();
            const flagSize = splitName[1].toUpperCase();
            const [flagW, flagH] = flagSize.split("X");

            const date = item["registered_date"]["S"];
            const startDateStr = startDate.toISOString().split("T")[0];
            const endDateStr = endDate.toISOString().split("T")[0];

            const origin_path = item["converted_path"]["S"];

            if (date >= startDateStr && date <= endDateStr) {
              data.push({
                id: item["id"]["N"],
                fileName: fileName,
                status: item["error_status"]["S"],
                date: date,
                device_id: item["device_id"]["S"],
                flag_size: flagW + " x " + flagH,
                origin_path: origin_path,
                plc_lat: item["plc_lat"]?.S || "35.2",
                plc_lng: item["plc_lng"]?.S || "129.1598",
              });
            }
          }
        }
        setPosts(data);
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
  };

  const handleInput = (e) => {
    setText(e.target.value);
  };

  React.useEffect(() => {
    client.get("getdata").then((response) => {
      let data = [];
      response.data["Items"].map((item) => {
        if (item["deleted"]["BOOL"] === false) {
          const fileName = item["original_file"]["S"];
          const splitName = fileName.split("_").reverse();
          const flagSize = splitName[1].toUpperCase();
          const [flagW, flagH] = flagSize.split("X");
          data.push({
            id: item["id"]["N"],
            fileName: fileName,
            status: item["error_status"]["S"],
            date: item["registered_date"]["S"],
            device_id: item["device_id"]["S"],
            flag_size: flagW + " x " + flagH,
            origin_path: item["converted_path"]["S"],
            plc_lat: item["plc_lat"]?.S || "35.2",
            plc_lng: item["plc_lng"]?.S || "129.1598",
          });
        }
      });
      setPosts(data);
    });
  }, []);

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
            <Grid item xs={1}>
              <DatePicker
                placeholder="시작 일자"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={1}>
              <DatePicker
                placeholder="종료 일자"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>

            <Grid item xs={2}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  width: "50%",
                  fontSize: 12,
                  marginLeft: "55vw",
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
      <Toolbar />

      {/* 데이터그리드 */}
      <DataTable data={rows} />
    </div>
  );
}
