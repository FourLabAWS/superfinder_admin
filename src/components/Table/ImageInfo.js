import * as React from "react";
import Grid from "@mui/material/Grid";
import ImgBox from "../Image/ImageBox";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { client } from "../../routes/routes";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(1),
  borderRadius: 0,
  fontSize: 12,
}));

export default function ImageTable() {
  const inch = 0.4;
  const params = useParams();
  const [inchW, setWidth] = React.useState(0);
  const [inchH, setHeight] = React.useState(0);
  const [rowData, setData] = React.useState({});
  const [memo, setMemo] = React.useState("");
  let navigate = useNavigate();

  const goToPrev = () => {
    navigate("/analysis");
  };

  const updateItem = () => {
    const obj = params["id"];
    const path = "getdata/update/" + obj;
    //console.log(path, memo);
    client
      .patch(path, {
        body: JSON.stringify(memo),
      })
      .then((response) => {
        //console.log(response.data);
      });
  };

  // React.useEffect(() => {
  //   client.get("getdata/" + params["id"]).then((response) => {
  //     setData(response["data"]["Item"]);
  //   });
  // }, []);

  React.useEffect(() => {
    rowData["flagW"] !== undefined &&
      setWidth(rowData["flagW"]["S"].split(" ")[0] * inch);
  }, [rowData]);
  React.useEffect(() => {
    rowData["flagH"] !== undefined &&
      setHeight(rowData["flagH"]["S"].split(" ")[0] * inch);
  }, [rowData]);
  React.useEffect(() => {
    rowData["memo"] !== undefined && setMemo(rowData["memo"]["S"]);
  }, [rowData]);

  return (
    <Paper elevation={0} square sx={{ fontSize: 14 }}>
      <FormGroup>
        <Grid container spacing={0} component={Paper} padding={2} variant="outlined">
          <Grid
            container
            padding="1%"
            component={Paper}
            elevation={2}
            borderRadius={0}
            backgroundColor="#1976d2"
            color="#fff"
          >
            <Grid item xs={1}>
              <strong>디바이스 ID :</strong>
            </Grid>
            <Grid item xs={3}>
              {rowData["device_id"] !== undefined && rowData["device_id"]["S"]}
            </Grid>
            <Grid item xs={1}>
              <strong>등록일자 : </strong>
            </Grid>
            <Grid item xs={2}>
              {rowData["registered_date"] !== undefined &&
                rowData["registered_date"]["S"]}
            </Grid>
            <Grid item xs={1}>
              <strong>깃발 크기 :</strong>
            </Grid>
            <Grid item xs={4}>
              {rowData["flagW"] !== undefined && rowData["flagW"]["S"]} x{" "}
              {rowData["flagH"] !== undefined && rowData["flagH"]["S"]} = {inchW} inch x{" "}
              {inchH} inch
            </Grid>
          </Grid>

          <Grid container spacing={1} marginTop="1%" padding="2%">
            <Grid className="imagebox">
              <ImgBox data={rowData} />
            </Grid>
          </Grid>
        </Grid>
      </FormGroup>
      <div>
        <Button
          variant="contained"
          className="prevButton"
          sx={{ marginTop: "3%" }}
          onClick={goToPrev}
        >
          이전
        </Button>
      </div>
    </Paper>
  );
}
