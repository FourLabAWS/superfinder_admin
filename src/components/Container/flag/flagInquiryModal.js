import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import "../../Table/styles.css";

const FlagInquiryModal = ({ modalObj, onClose, selectedFlag, onEdit }) => {
  const [formData, setFormData] = useState({
    flagCd: "",
    plcId: "",
    hzLnth: "",
    vrLnth: "",
  });

  useEffect(() => {
    setFormData(selectedFlag);
  }, [selectedFlag]);

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const doSave = async (event) => {
    event.preventDefault();

    if (!window.confirm("선택한 깃발을 수정하겠습니까?")) {
      return;
    }

    try {
      await updateFlag(formData);
      alert("수정되었습니다.");
      onClose();
      window.location.reload(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateFlag = async (formData) => {
    const editUrl = `https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/editFlag/`;
    try {
      await axios.put(
        editUrl,
        {
          flagCd: formData.flagCd,
          plcId: formData.plcId,
          hzLnth: formData.hzLnth,
          vrLnth: formData.vrLnth,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={modalObj} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>깃발 정보</DialogTitle>
      <DialogContent>
        <form onSubmit={doSave}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="text"
                id="flagCd"
                name="flagCd"
                label="깃발코드"
                fullWidth
                value={formData.flagCd}
                onChange={handleFormChange}
                required
                inputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                id="plcId"
                name="plcId"
                label="장소 아이디"
                fullWidth
                value={formData.plcId}
                required
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
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
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={doSave}
          sx={{ width: "100px", marginRight: "1%" }}
        >
          수정
        </Button>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{ width: "100px", marginRight: "1%" }}
        >
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FlagInquiryModal;
