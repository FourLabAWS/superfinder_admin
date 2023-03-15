import * as React from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import "../../Table/styles.css";
import { useState,useEffect } from 'react';
import axios from 'axios';


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
    const [data, setData] = useState(); // DB에서 가져온 데이터를 저장할 값
    let navigate = useNavigate();

    const goToPrev = () => {
        navigate('/notice');
    }
    const notiId = '1';

    // 공지사항 DB 데이터 불러오기
    useEffect(()=> {
        const apiUrl = 'https://o0a46p97p0.execute-api.ap-northeast-2.amazonaws.com/v1/getNotiList/{notiId}';
        axios.get(`${apiUrl}`, {params: {notiId: '1'}})
        .then(response => {
            console.log(response.data.Item);          
          setData(response.data.Item);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);
    console.log("1111");
    console.log(data);
    return (
        <div>
            <div>
                공지사항 제목
            </div>
            <div>
                작성자 작성일
            </div>
            <div>
                내용
            </div>
           
        </div>

    );
}

function Dtl(props){

    // 네비게이트 코드를 어떻게해야 간단하게 바꿀 수 있을까?
    let navigate = useNavigate();
    const goToPrev = () => {
        navigate('/notice');
    }
    return(
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 2, }}
        >
            <br />
            <Toolbar />
            <Typography variant="h6" noWrap component="div"
                sx={headingTextStyle}>
                공지사항 정보
            </Typography>
            <br />
            <Content />
            <div className="btn-area">
                <Button variant="contained" className='prevButton'
                    sx={{ marginTop: '3%' }}
                    onClick={goToPrev}
                >
                    목록
                </Button>
            </div>
        </Box>
    )
}

export default Dtl;