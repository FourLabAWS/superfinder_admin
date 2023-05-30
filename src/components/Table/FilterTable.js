import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import SelectField from "../Inputs/SelectInput";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DateInput from "../Inputs/DateInput";
import Toolbar from "@mui/material/Toolbar";
import DataTable from "../Table/DataTable";
import { client } from "../../routes/routes";
import "./styles.css";

const contentStyle = {};

const titleStyle = {
  wordBreak: "keep-all",
  //   fontWeight: "bold",
};

const btnStyle = {
  // width: "50%",
  // marginLeft: '50%',
  fontSize: 16,
  position: "absolute",
  right: 0,
  height: "100%",
  wordBreak: "keep-all",
};

export default function FilterTable() {
  const [value, setValue] = React.useState("");
  const [text, setText] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [rows, setPosts] = React.useState([]);
  const [params, pushParams] = React.useState({});

  const handleFilter = () => {
    pushParams({
      keyword: value,
      text: text,
      startDate: startDate,
      endDate: endDate,
    });
    client
      .get("getdata", {
        params: {
          keyword: params["keyword"],
          text: params["text"],
          startDate: params["startDate"],
          endDate: params["endDate"],
        },
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
          data.push({
            id: item["id"]["N"],
            fileName: item["original_file"]["S"],
            status: item["error_status"]["S"],
            date: item["registered_date"]["S"],
            device_id: item["device_id"]["S"],
            flag_size: item["flagH"]["S"] + " x " + item["flagW"]["S"],
            origin_path: item["converted_path"]["S"],
            plc_lat: item.plc_lat?.S,
            plc_lng: item.plc_lng?.S,
          });
        }
      });
      setPosts(data);
    });
  }, []);

  return (
    <div>
      {/* <FormGroup sx={{ width: "100%" }}>
        <Grid
          container
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          component={Paper}
          variant="outlined"
          p={"20px"}
        >
          <Grid
            container
            className={"3"}
            style={{ paddingRight: "0", position: "relative" }}
          >
      <Grid item xs={10}>
        {/* 1st line _검색어 
        <Grid container spacing={1} flexDirection={"row"} alignItems={"center"}>
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
                  이미지
                </Box>
              </Grid>
            </Grid>
          </Grid>
          {/* 셀렉트 
                <Grid item xs={4}>
                  <SelectField setVal={setValue} />
                </Grid>
          {/* 인풋 
          <Grid item xs={5} p={"0"}>
            <TextField
              sx={{ height: "40px" }}
              value={text}
              onChange={handleInput}
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              placeholder="이미지를 입력하세요"
            />
          </Grid>
        </Grid>
        <br />
        {/* 2nd line _검색기간 
              <Grid container flexDirection={"row"} alignItems={"center"}>
                <Grid item xs={2} color="#000">
                  <Box component="div" style={titleStyle}>
                    검색기간
                  </Box>
                </Grid>
                {/* 인풋1 
                <Grid item xs={4}>
                  <DateInput setDate={setStartDate} />
                </Grid>

                <Grid item xs={1}>
                  <Box component="div" style={{ textAlign: "center" }}>
                    ~
                  </Box>
                </Grid>
                {/* 인풋2
                <Grid item xs={4}>
                  <DateInput setDate={setEndDate} />
                </Grid>
              </Grid> 
      </Grid> */}

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
                    검색어
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
                    placeholder="검색어를 입력하세요"
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
                // onClick={doSearch}
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
