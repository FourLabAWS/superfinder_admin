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

const UserInquiryModal = ({ modalObj, onClose, selectedUser, onEdit }) => {
  const [formData, setFormData] = useState({
    device_id: "",
    shot_count: "",
  });

  useEffect(() => {
    setFormData(selectedUser);
  }, [selectedUser]);

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const doSave = async (event) => {
    event.preventDefault();

    if (!window.confirm("선택한 사용자를 수정하겠습니까?")) {
      return;
    }

    try {
      await updateAccount(formData);
      alert("수정되었습니다.");
      onClose();
      window.location.reload(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateAccount = async (formData) => {
    const editUrl = `https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/editUser/`;
    try {
      await axios.put(
        editUrl,
        {
          device_id: formData.device_id,
          shot_count: formData.shot_count,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(editUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={modalObj} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>사용자 정보</DialogTitle>
      <DialogContent>
        <form onSubmit={doSave}>
          <Grid container spacing={2} my={1}>
            <Grid item xs={12}>
              <TextField
                type="text"
                id="id"
                name="device_id"
                label="디바이스 ID"
                fullWidth
                value={formData.device_id}
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
                id="shot_count"
                name="shot_count"
                label="촬영 횟수"
                fullWidth
                value={formData.shot_count}
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

export default UserInquiryModal;
