import * as React from "react";
import { useState,useEffect } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { client } from '../../../routes/routes';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import "../../Table/styles.css";

const headingTextStyle = {
    fontWeight: 500,
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(1),
    borderRadius: 0,
    fontSize: 12
}));

function Content(){
    // 전달받은 파라미터 : notiId 값
    const paramObj = useParams();

    const [notiTl, setNotiTl] = useState('');
    const [regId, setRegId] = useState('');
    const [regDt, setRegDt] = useState('');
    const [content, setContent] = useState('');
    
    // 네비게이트 코드를 어떻게해야 간단하게 바꿀 수 있을까?
    let navigate = useNavigate();
    const goToPrev = () => { navigate('/notice'); }
    const goToModf = () => { navigate('/noticeModf/' + paramObj['notiId']); }

    // 공지사항 DB 데이터 불러오기
    useEffect(()=> {
        const apiUrl = 'https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/getNoticeList/{notiId}';
        //axios.get(`${apiUrl}`, { params: {notiId : paramObj['notiId']} })
        client.get('getNoticeList/' + paramObj['notiId'])
        // axios({
        //     method: 'get',
        //     url: apiUrl,
        //     params: {notiId : paramObj['notiId']} ,
        // })
        .then(response => {
            console.log(response);
            setNotiTl(response.data.Item.NOTI_TL.S);
            setRegId(response.data.Item.REG_ID.S);
            setRegDt(response.data.Item.REG_DT.S);
            setContent(response.data.Item.NOTI_CT.S);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <div>
            <div className="detail-area">
                
                <div>
                    <h2>{notiTl}</h2>
                </div>
                <div className="regInfo-box">
                    작성자 : {regId} 작성일 : {regDt}
                </div>
                <div className="notiCt-box">
                    {content}
                </div>
            
            </div>
            <div className="btn-area">
                <Button variant="contained" className='prevButton'
                    sx={{ marginRight: '3%' }}
                    onClick={goToModf}
                >
                    수정
                </Button>
                <Button variant="contained" className='prevButton'
                    sx={{ marginRight: '3%' }}
                    onClick={goToPrev}
                >
                    목록
                </Button>
            </div>
        </div>

    );
}

function Dtl(props){
    
    return(
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 2, }}
        >
            <br />
            <Toolbar />
            <Typography variant="h6" noWrap component="div"
                sx={headingTextStyle}>
                공지사항
            </Typography>
            <br />
            <Content />
        </Box>
    )
}

export default Dtl;