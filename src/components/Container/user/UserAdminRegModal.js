import * as React from "react";
import { useState } from "react";
import axios from "axios";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "../../Table/styles.css";
import "./UserAdmin.css";

function UserAdminRegModal(obj) {
  const modalObj = obj.modalObj;
  const userInfo = obj.data;
  const [title, setTitle] = useState("사용자 등록");
  const [openCreateAdminModal, setOpenCreateAdminModal] = useState(false);
  const [formData, setFormData] = useState({
    admnrId: "",
    admnrPw: "",
    admnrPwConfirm: "",
    admnrNm: "",
    admnrEmail: "",
  });

  if (userInfo !== undefined) {
    setTitle("사용자 수정");
    setFormData({
      admnrId: userInfo.admnrId || "",
      admnrPw: userInfo.admnrPw || "",
      admnrPwConfirm: "", // 비밀번호 확인을 위한 초기값 설정
      admnrNm: userInfo.admnrNm || "",
      admnrEmail: userInfo.admnrEmail || "",
    });
  }

  const handleOpenCreateAdminModal = () => {
    setOpenCreateAdminModal(true);
  };

  const handleCloseCreateAdminModal = () => {
    setOpenCreateAdminModal(false);
  };

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const doSave = (event) => {
    event.preventDefault();

    // Check if passwords match
    if (formData.admnrPw !== formData.admnrPwConfirm) {
      alert("비밀번호가 일치하지 않습니다. 다시 입력해 주세요.");
      return;
    }
    event.preventDefault();

    createAdminAccount(formData)
      .then(() => {
        console.log("Successfully inserted admin account into DynamoDB");
        handleCloseCreateAdminModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createAdminAccount = async (formData) => {
    console.log("Sending formData:", formData);
    const postUrl =
      "https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/signUpAdmin";
    try {
      const response = await axios.post(postUrl, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // close는 List함수에서 받아 처리할수 있도록.
  return (
    <Modal open={modalObj} onClose={() => handleOpenCreateAdminModal(false)}>
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
                onChange={handleFormChange}
                required
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
                value={formData.admnrPwConfirm}
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
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            저장
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 2, mr: 1 }}
            onClick={handleCloseCreateAdminModal}
          >
            취소
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default UserAdminRegModal;
