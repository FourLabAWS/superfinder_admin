import * as React from "react";
import { useState } from "react";
import axios from "axios";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import "../../Table/styles.css";
import "./flag.css";

function FlagRegModal(obj) {
  const modalObj = obj.modalObj;
  const userInfo = obj.data;
  const [title, setTitle] = useState("깃발 등록");
  const [openCreateFlagModal, setOpenCreateFlagModal] = useState(false);
  const [formData, setFormData] = useState({
    flagCd: "",
    plcId: "",
    hzLnth: "",
    vrLnth: "",
  });

  const handleOpenCreateFlagModal = () => {
    setOpenCreateFlagModal(true);
  };

  const handleCloseCreateFlagModal = () => {
    setOpenCreateFlagModal(false);
  };

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const doSave = (event) => {
    event.preventDefault();

    createFlag(formData)
      .then(() => {
        handleCloseCreateFlagModal();
        obj.onClose();
        window.location.reload(false);
        console.log(formData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createFlag = async (formData) => {
    let rtnData = null;
    const postUrl =
      "https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/flagReg";
    try {
      const response = await axios.post(postUrl, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      rtnData = response.data;
    } catch (error) {
      console.error(error);
    }
    return rtnData;
  };

  return (
    <Modal open={modalObj}>
      <Box
        className="modalBoxWrap"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="text"
                id="plcId"
                name="plcId"
                label="장소 아이디"
                fullWidth
                value={formData.plcId}
                onChange={handleFormChange}
                required
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                id="flagCd"
                name="flagCd"
                label="깃발 코드"
                fullWidth
                value={formData.flagCd}
                onChange={handleFormChange}
                required
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="hzLnth"
                name="hzLnth"
                label="가로 길이"
                fullWidth
                value={formData.hzLnth}
                onChange={handleFormChange}
                required
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                id="vrLnth"
                name="vrLnth"
                label="세로 길이"
                fullWidth
                value={formData.vrLnth}
                onChange={handleFormChange}
                required
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
          </Grid>
          <div className="btn-area">
            <Button onClick={doSave} variant="contained" sx={{ mt: 2, mr: 1 }}>
              저장
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 2, mr: 1 }}
              onClick={obj.onClose}
            >
              취소
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

export default FlagRegModal;
