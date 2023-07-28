import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { client } from "../../routes/routes";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./styles.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #0000001f",
  boxShadow: 24,
  p: 4,
};

export default function ImgBox({ ...props }) {
  console.log("###", props.data);
  const [openOne, setOpenOne] = React.useState(false);
  const [openTwo, setOpenTwo] = React.useState(false);

  const handleOpenOne = () => setOpenOne(true);
  const handleOpenTwo = () => setOpenTwo(true);
  const handleCloseOne = () => setOpenOne(false);
  const handleCloseTwo = () => setOpenTwo(false);

  const handleImage = (e, pathName, fileName) => {
    const FileSaver = require("file-saver");

    if (pathName !== undefined && fileName !== undefined) {
      console.log(pathName);
      axios
        .get(`https://superfind.s3.ap-northeast-2.amazonaws.com/${pathName}`, {
          responseType: "blob", // blob data is expected
        })
        .then((response) => {
          FileSaver.saveAs(response.data, fileName);
        });
    }

    //console.log("imgP", pathName["S"]);
    //console.log("imgF", fileName["S"]);
  };

  return (
    <React.Fragment>
      <Grid container spacing={0}>
        <Grid
          item
          xs={6}
          component={Paper}
          variant="outlined"
          borderRadius={0}
          // style={{ width: "40%", height: "auto" }}
        >
          <Grid sx={{ borderBottom: 1, borderColor: "#0000001f" }}>
            <div className="title">
              <strong>원본 이미지</strong>
            </div>
          </Grid>

          <Grid
            container
            spacing={0}
            sx={{
              padding: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid
              onClick={handleOpenOne}
              component={Paper}
              elevation={3}
              style={{
                width: "40%",
                height: "auto",
              }}
            >
              <img
                className="imageBox"
                src={`https://superfind.s3.ap-northeast-2.amazonaws.com/${props.data.origin_path}`}
                //src={`data:image/jpg;base64,${data["original_img"]}`}
                alt="default"
              />
            </Grid>
            {/* 팝업 */}
            <Modal
              open={openOne}
              onClose={handleCloseOne}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Paper elevation={0} className="imgdesc">
                  <Typography variant="h6">
                    {/* {data["original_file"] !== undefined &&
                      data["original_file"]["S"]} */}
                    {props.data.origin_path}
                  </Typography>
                  <br />
                  <List>
                    <ListItem>
                      <ListItemText primary="크기:" />
                      {/* {data["flagW"] !== undefined && data["flagW"]["S"]} x{" "}
                      {data["flagH"] !== undefined && data["flagH"]["S"]} */}
                      {props.data.flag_size}
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="용량:" />
                      {/* {data["origin_file_size"] !== undefined &&
                        data["origin_file_size"]["N"]}{" "} */}
                      {props.data.file_size}
                      KB
                    </ListItem>
                  </List>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={(e) => {
                      handleImage(
                        e,
                        props.data.origin_path,
                        props.data.origin_path
                      );
                    }}
                  >
                    이미지 다운로드
                  </Button>
                </Paper>
              </Box>
            </Modal>
          </Grid>
        </Grid>

        <Grid item xs={6} component={Paper} variant="outlined" borderRadius={0}>
          <Grid sx={{ borderBottom: 1, borderColor: "#0000001f" }}>
            <div className="title">
              <strong>변환 이미지</strong>
            </div>
          </Grid>
          <Grid
            container
            spacing={0}
            sx={{ padding: 2, display: "flex", justifyContent: "center" }}
          >
            <Grid
              onClick={handleOpenTwo}
              component={Paper}
              elevation={3}
              style={{
                width: "40%",
                height: "auto",
                maxHeight: "50vh",
                // maxHeight: "calc(50vh - 150px)",
                // backgroundSize: "contain",
                // backgroundRepeat: "no-repeat",
              }}
            >
              <img
                className="imageBox"
                src={`https://superfind.s3.ap-northeast-2.amazonaws.com/${props.data.converted_path}`}
                //src={`data:image/jpg;base64,${data["converted_img"]}`}
                alt="converted"
              />
            </Grid>

            <Modal
              open={openTwo}
              onClose={handleCloseTwo}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Paper elevation={0} square className="imgdesc">
                  <Typography variant="h6">
                    {/* {data["converted_file"] !== undefined &&
                      data["converted_file"]["S"]} */}
                    {props.data.converted_path}
                  </Typography>
                  <br />
                  <List>
                    <ListItem>
                      <ListItemText primary="크기:" />
                      {/* {data["convW"] !== undefined && data["convW"]["S"]} x{" "}
                      {data["convH"] !== undefined && data["convH"]["S"]} */}
                      {props.data.flag_size}
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="용량:" />
                      {/* {data["conv_file_size"] !== undefined &&
                        data["conv_file_size"]["N"]}{" "} */}
                      {props.data.file_size}
                      KB
                    </ListItem>
                  </List>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={(e) => {
                      handleImage(
                        e,
                        props.data.converted_path,
                        props.data.converted_path
                      );
                    }}
                  >
                    이미지 다운로드
                  </Button>
                </Paper>
              </Box>
            </Modal>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}