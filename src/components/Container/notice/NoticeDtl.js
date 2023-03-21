import * as React from "react";
import { useState,useEffect } from 'react';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Person from '@mui/icons-material/Person';
import CalendarMonth from '@mui/icons-material/CalendarMonth';

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
    const paramObj = useParams();

    const [notiTl, setNotiTl] = useState('');
    const [regId, setRegId] = useState('');
    const [regDt, setRegDt] = useState('');
    const [content, setContent] = useState('');
    
    let navigate = useNavigate();
    const goToPrev = () => { navigate('/notice'); }
    const goToModf = () => { navigate('/noticeModf/' + paramObj['notiId']); }

    useEffect(()=> {
        const apiUrl = 'https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/getNoticeList/{notiId}';

        client.get('getNoticeList/' + paramObj['notiId'])
        .then(response => {
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
                    <CalendarMonth fontSize="small" />{regDt} <Person fontSize="small"  sx={{marginLeft: "1%" }} /> {regId} 
                </div>
                <div className="notiCt-box">
                    {content}
                </div>
            </div>
            <div className="btn-area">
                <Button variant="contained" 
                    sx={{width: "100px",  marginRight: "1%" }}
                    onClick={goToModf}
                >
                    수정
                </Button>
                <Button variant="contained" 
                    sx={{width: "100px",  marginRight: "1%" }}
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