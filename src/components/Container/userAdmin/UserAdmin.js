import * as React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { darken, lighten } from "@mui/material/styles";
import Modal from '@mui/material/Modal';
import "../../Table/styles.css";
import "./UserAdmin.css";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function GetAdminList(props) {
  const getUrl = 'https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/getadmin';
  const [rows, setRows] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  let [list, setList] = useState([]);  // 데이터를 담을 곳
  const [openCreateAdminModal, setOpenCreateAdminModal] = useState(false);
  const [openModal, setOpenModal] = useState(false); // 모달 창 열림 여부 상태
  
  const [formData, setFormData] = useState({
    id: '',
    pw: '',
    name: '',
    email: ''
  }); // 입력한 데이터 상태

  const handleOpenCreateAdminModal = () => {
    setOpenCreateAdminModal(true); 
  };

  const handleCloseCreateAdminModal = () => {
    setOpenModal(false);
  };

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if passwords match
    if (formData.pw !== formData.pwConfirm) {
      alert("비밀번호가 일치하지 않습니다. 다시 입력해 주세요.");
      return;
    }

    createAdminAccount(formData)
      .then(() => {
        console.log('Successfully inserted admin account into DynamoDB');
        handleCloseCreateAdminModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const createAdminAccount = async (formData) => {
  console.log("Sending formData:", formData);
  const postUrl = 'https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/signUpAdmin';
    try {
      const response = await axios.post(postUrl, formData, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  // 보여줄 컬럼 정의
  const columns = [
    { field: "admnrId", headerName: "아이디", width: 120 },
    { field: "admnrEmail", headerName: "이메일", width: 200 },
    { field: "admnrNm", headerName: "이름", width: 120 },
  ];
  // 데이터 불러오기
  useEffect(() => {
    axios.get(getUrl).then(response => {
      let items = response.data.Items;
      setRows(items.length);
      let itemsArray = items.map((item, index) => ({
        admnrId: item.ADMNR_ID.S, // 관리자 ID
        admnrEmail: item.ADMNR_EMAIL.S, // 이메일
        admnrNm: item.ADMNR_NM.S, // 이름
      }));
      setList(itemsArray);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  return(
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={list}
        columns={columns}
        getRowId={(row) => row.admnrId}
        checkboxSelection
        onSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection.selectionModel);
        }}
        selectionModel={selectedRows}
        hideFooterSelectedRowCount={true}
        getRowClassName={(params) =>
          `super-app-theme--${params.getValue(params.id, "admnrId").toString().toLowerCase()}`
        }
      />
      <div id="buttonArea">
      <button id="adminButton" variant="contained" sx={{ mt: 2 }} /*onClick={handleOpenCreateAdminModal}*/>조회</button>
      <button id="adminButton" variant="contained" sx={{ mt: 2 }} onClick={handleOpenCreateAdminModal}>추가</button>
      <button id="adminButton" variant="contained" sx={{ mt: 2 }} /*onClick={handleOpenCreateAdminModal}*/>수정</button>
      <button id="adminButton" variant="contained" sx={{ mt: 2 }} /*onClick={handleOpenCreateAdminModal}*/>삭제</button>
      </div>
      <Modal open={openCreateAdminModal} onClose={() => setOpenCreateAdminModal(false)}>
  <Box sx={style}>
    <Typography variant="h6" gutterBottom>
      관리자 계정 등록
    </Typography>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="id"
            name="id"
            label="아이디"
            value={formData.id}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="pw"
            name="pw"
            label="비밀번호"
            type="password"
            value={formData.password}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="pwConfirm"
            name="pwConfirm"
            label="비밀번호 확인"
            type="password"
            onChange={handleFormChange}
            />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="name"
            name="name"
            label="이름"
            value={formData.name}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            name="email"
            label="이메일"
            type="email"
            value={formData.email}
            onChange={handleFormChange}
          />
        </Grid>              
      </Grid>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        저장
      </Button>
    </form>
  </Box>
</Modal>
    </div>
  );
}
export default GetAdminList;