import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import SelectField from "../../Inputs/SelectInput";
import DateInput from "../../Inputs/DateInput";

import BoardList from "./BoardList";
import { client } from "../../../routes/routes";
import "../../Table/styles.css";

const btnStyle = {
  width: "50%",
  fontSize: 12,
  marginLeft: "50%",
  height: "100%",
};

const headingTextStyle = {
  fontWeight: 550,
};

export default function Container() {
  const [text, setText] = React.useState("");
  const [rows, setPosts] = React.useState([]);
  const [params, pushParams] = React.useState({});

  const handleFilter = () => {
    pushParams({
      text: text,
    });

    client
      .get("getTest", {
        params: {
          text: params["text"],
        },
      })
      .then((response) => {
        let data = [];
        response.data.map((item) => {
          if (item.DEL_YN === "N") {
            data.push({
              id: item.NOTI_ID,
              NOTI_ID: item.NOTI_ID,
              NOTI_TL: item.NOTI_TL,
              USE_YN: item.USE_YN,
              REG_DT: item.REG_DT,
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
    client.get("getTest").then((response) => {
      let data = [];
      response.data.map((item) => {
        console.log(item.DEL_YN);
        if (item.DEL_YN === "N") {
          data.push({
            id: item.NOTI_ID,
            NOTI_ID: item.NOTI_ID,
            NOTI_TL: item.NOTI_TL,
            USE_YN: item.USE_YN,
            REG_DT: item.REG_DT,
          });
        }
      });
      setPosts(data);
    });
  }, []);

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}>
      <br />
      <Toolbar />
      <Typography variant="h7" noWrap component="div" sx={headingTextStyle}>
        게시판 테스트
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
                      제목
                    </Box>
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      sx={{ height: "70%" }}
                      value={text}
                      onChange={handleInput}
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      fullWidth
                      placeholder="제목을 입력하세요"
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={2}>
                <Button
                  variant="contained"
                  size="large"
                  sx={btnStyle}
                  startIcon={<SearchIcon />}
                  onClick={handleFilter}
                >
                  검색
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </FormGroup>

        <Toolbar />
        <BoardList data={rows} />
      </div>
    </Box>
  );
}
