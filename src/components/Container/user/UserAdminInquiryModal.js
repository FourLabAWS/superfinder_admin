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

const UserAdminInquiryModal = ({ modalObj, onClose, selectedUser, onEdit }) => {
  const [formData, setFormData] = useState({
    admnrId: "",
    admnrPw: "",
    admnrPwConfirm: "",
    admnrNm: "",
    admnrEmail: "",
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

    if (formData.admnrPw !== formData.admnrPwConfirm) {
      alert("비밀번호가 일치하지 않습니다. 다시 입력해 주세요.");
      return;
    }

    try {
      await updateAdminAccount(formData);
      onClose();
      window.location.reload(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateAdminAccount = async (formData) => {
    const editUrl = `https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/editAdmin/`;
    try {
      await axios.put(
        editUrl,
        {
          admnrId: formData.admnrId,
          admnrPw: formData.admnrPw,
          admnrNm: formData.admnrNm,
          admnrEmail: formData.admnrEmail,
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
      <DialogTitle>사용자 정보</DialogTitle>
      <DialogContent>
        <form onSubmit={doSave}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="text"
                id="id"
                name="admnrId"
                label="아이디"
                fullWidth
                value={formData.admnrId}
                required
                readOnly
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                id="pw"
                name="admnrPw"
                label="비밀번호"
                fullWidth
                value={formData.admnrPw}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                id="pwConfirm"
                name="admnrPwConfirm"
                label="비밀번호 확인"
                fullWidth
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                id="name"
                name="admnrNm"
                label="이름"
                fullWidth
                value={formData.admnrNm}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                id="email"
                name="admnrEmail"
                label="이메일"
                fullWidth
                value={formData.admnrEmail}
                onChange={handleFormChange}
                required
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
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserAdminInquiryModal;
