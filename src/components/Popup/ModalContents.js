import * as React from "react";
import Grid from "@mui/material/Grid";
import ImgBox from "../Image/ImageBox";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";

import { useParams } from "react-router-dom";
import { client } from "../../routes/routes";
import { Typography } from "@mui/material";

// import "./styles.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(1),
  borderRadius: 0,
  fontSize: 12,
}));

// 이미지 팝업
export function ImageTablePopup({ ...props }) {
  const { id, deviceId, data } = props;

  console.log("@@@", props.data);
  const [flagX, flagY] = props.data[0].flag_size.split("x").map(Number);
  //@@@ 07_2023/4659969d9f892a7e/original/CAP564986289656992820_48x35_8_SM-F926N_1.6_originalIMG.jpg

  const inch = 0.4;
  const params = useParams();
  const [inchW, setWidth] = React.useState(0);
  const [inchH, setHeight] = React.useState(0);
  const [rowData, setData] = React.useState({});
  // const [memo, setMemo] = React.useState("");

  //console.log("params", params);

  React.useEffect(() => {
    client.get("getdata/" + id).then((response) => {
      setData(response["data"]["Item"]);
      //console.log("testing2", params);
    });
  }, [id]);

  //console.log("id", id);
  //console.log("data", rowData);

  React.useEffect(() => {
    const flagHValue = flagX;
    const flagWValue = flagY;
    const numericHValue = parseFloat(flagHValue);
    const numericWValue = parseFloat(flagWValue);
    const numericHInInch = numericHValue * inch;
    const numericWinInch = numericWValue * inch;

    if (!isNaN(numericHInInch) && !isNaN(numericWinInch)) {
      setWidth(numericWinInch);
      setHeight(numericHInInch);
    }
  }, [flagX, flagY]);

  //   React.useEffect(() => {
  //     rowData["flagW"] !== undefined &&
  //       setWidth(rowData["flagW"]["S"].split(" ")[0] * inch);
  //   }, [rowData]);

  //   React.useEffect(() => {
  //     rowData["flagH"] !== undefined &&
  //       setHeight(rowData["flagH"]["S"].split(" ")[0] * inch);
  //   }, [rowData]);

  //   React.useEffect(() => {
  //     rowData["memo"] !== undefined && setMemo(rowData["memo"]["S"]);
  //   }, [rowData]);

  return (
    <Paper elevation={0} square sx={{ fontSize: 14 }}>
      <FormGroup>
        <Grid
          container
          spacing={0}
          component={Paper}
          padding={2}
          variant="outlined"
        >
          {/* 이미지 정보 */}
          <Grid
            container
            padding="1%"
            component={Paper}
            elevation={2}
            borderRadius={0}
            backgroundColor="#1976d2"
            color="#fff"
            alignItems={"center"}
          >
            <Grid item xs={4}>
              <div
              // style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                <Typography strong>디바이스 ID :</Typography>
                <Typography>
                  {/* {rowData["device_id"] !== undefined &&
                    rowData["device_id"]["S"]}
                  {deviceId} */}
                  {data[0].device_id}
                </Typography>
              </div>
            </Grid>

            <Grid item xs={4}>
              <div
              // style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                <Typography strong>등록일자 :</Typography>
                <Typography>
                  {/* {rowData["registered_date"] !== undefined &&
                    rowData["registered_date"]["S"]} */}
                  {data[0].date}
                </Typography>
              </div>
            </Grid>

            <Grid item xs={4}>
              <Typography>깃발 크기 :</Typography>
              <Typography>
                <Grid item xs={10}>
                  {flagX} x {flagY} = {Math.ceil(inchW)} inch x{" "}
                  {Math.ceil(inchH)} inch
                </Grid>
              </Typography>
            </Grid>
          </Grid>

          {/* 원본/변환 이미지 */}
          <Grid
            container
            spacing={1}
            marginTop="1%"
            boxSizing={"border-box"}
            // padding="2%"
            style={{ height: "50vh" }}
          >
            <Grid className="imagebox">
              <ImgBox data={data[0]} />
            </Grid>
          </Grid>
        </Grid>
      </FormGroup>
    </Paper>
  );
}