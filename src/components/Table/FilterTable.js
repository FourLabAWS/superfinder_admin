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
import { LocalizationProvider } from "@mui/x-date-pickers";
import "./styles.css";

export default function FilterTable() {
  const [value, setValue] = React.useState("");
  const [text, setText] = React.useState("");
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [rows, setPosts] = React.useState([]);

  const doSearch = () => {
    const queryParams = {
      keyword: value,
      text: text,
      startDate: startDate,
      endDate: endDate,
    };

    client
      .get("getdata", {
        params: queryParams,
      })
      .then((response) => {
        let data = [];
        response.data["Items"].map((item) => {
          if (item["deleted"]["BOOL"] === false) {
            data.push({
              id: item["id"]["N"],
              fileName: item["original_file"]["S"],
              status: item["error_status"]["S"],
              date: item["registered_date"]["S"],
              device_id: item["device_id"]["S"],
              flag_size: item["flagH"]["S"] + " x " + item["flagW"]["S"],
            });
          }
        });
        setPosts(data);
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
            <Grid item xs={2}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={2}>
              <DatePicker
                label="End Date"
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
      <Toolbar />

      {/* 데이터그리드 */}
      <DataTable data={rows} />
    </div>
  );
}
