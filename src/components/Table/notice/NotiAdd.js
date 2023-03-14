import * as React from 'react';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

// 폰트
const headingTextStyle = {
    fontWeight: 550,
  };
// 버튼 CSS
const btnStyle = {
    width: "50%",
    fontSize: 12,
    marginLeft: '50%',
    height: '100%'
}


function Add(){
    const movePage = useNavigate();
    const apiUrl = 'https://o0a46p97p0.execute-api.ap-northeast-2.amazonaws.com/v1/AddNoti';
    const [item, setItem] = useState();

    return (
        <div>
          <Typography variant="h7" noWrap component="div" sx={headingTextStyle}>
            공지사항 작성
          </Typography>
          <div>공지번호</div>
          <input name='notiId' placeholder='공지번호'></input>

          <div>구분</div>
          <input name='notiTpSe' placeholder='공지번호' value="일반"></input>

          <div>제목</div>
          <input name='notiTl' placeholder='제목'></input>
          
          <div>내용</div>
          <input name='notiCt' placeholder='내용'></input>
          
          <div>작성자</div>
          <input name='regId' placeholder='작성자'></input>

          <Button
            variant="contained" size="large"
            sx={btnStyle}
            onClick={
              
                // 공지사항 DB 데이터 보내기
                useEffect(()=> {
                    axios.post(`${apiUrl}`, {
                        notiId : '000004',
                        notiTl : '제목테스트',
                        // notiCt : items[i].NOTI_CT, // 내용
                        // notiTpSe : items[i].NOTI_TP_SE.S, // 분류(긴급/일반)
                        // atchDocId : items[i].ATCH_DOC_ID.S, // 첨부파일ID
                        // useYn : items[i].USE_YN.S, // 사용여부
                        // delYn : items[i].DEL_YN.S, // 삭제여부
                        // regDt : items[i].REG_DT.S, // 등록일
                        // regId : items[i].REG_ID.S, // 등록자
                        // modfDt : items[i].MODF_DT.S, // 수정일
                        // modfId : items[i].MODF_ID.S, // 수정자
                    })
                    .then(response => {
                        console.log(response.data);


                    })
                    .catch(error => {
                        console.error(error);
                        
                    });
                },[] )

            }
          >
            취소
          </Button>

          <Button
            variant="contained" size="large"
            sx={btnStyle}
            onClick={()=>{
              movePage('/notice');
            } }
          >
            작성
          </Button>
        </div>
    )
}

export default Add;