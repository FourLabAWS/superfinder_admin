import * as React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";

import { client } from '../../../routes/routes';
import "./Notice.css";


// 버튼 CSS
const btnStyle = {
    width: "50%",
    fontSize: 12,
    marginLeft: '50%',
    height: '100%'
}

function NoticeReg() {
    const movePage = useNavigate();
    const apiUrl = 'https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/AddNoti';
    
    const [notiTpSe, setNotiTpSe] = useState('');
    const [notiTl, setNotiTl] = useState('');
    const [notiCt, setNotiCt] = useState('');
    const [message, setMessage] = useState('');

    function sendPostRequest() {

      if (notiTpSe === '') {
        alert('공지 구분을 선택해주세요.');
        return false;
      }

      const requestBody = {
        notiTpSe:notiTpSe,
        notiTl:notiTl,
        notiCt:notiCt,
      };

      axios
        .post(`${apiUrl}`, requestBody)
        .then(response => {

          // 등록 결과 메시지 설정
          setMessage('등록되었습니다.');
          alert('등록되었습니다.');

          movePage('/notice')
        })
        .catch(error => {
          //console.error(error);

          setMessage('저장중 오류가 발생되었습니다.');
        });
    }

    return (
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 2 }}>
        <br />
        <Toolbar />
        
        <div>
          <Typography variant="h7" noWrap component="div" sx={{fontWeight: 550}}>
            공지사항 등록
          </Typography>
          
          <Toolbar />

          <form className="notice-form">
            <input type="hidden" id="regId" name="regId"/>
            <div className="form-group">
              <label htmlFor="notiTpSe">공지 구분</label>
              <select id="notiTpSe" name="notiTpSe" value={notiTpSe} onChange={(event) => setNotiTpSe(event.target.value)}>
                <option value="" >선택</option>
                <option value="일반">일반</option>
                <option value="긴급">긴급</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="title">제목</label>
              <input type="text" id="notiTl" name="notiTl" required value={notiTl} onChange={(event) => setNotiTl(event.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="content">내용</label>
              <textarea id="notiCt" name="notiCt" rows="10" required value={notiCt} onChange={(event) => setNotiCt(event.target.value)}/>
            </div>
          </form>         
          <Button variant="contained" 
            sx={{width: "100px", fontSize: 12}}
            onClick={()=> {sendPostRequest()}}
          >
            저장
          </Button>
          <br/>
          <div className="message">{message}</div>
        </div>
      </Box>
    )
}

export default NoticeReg;