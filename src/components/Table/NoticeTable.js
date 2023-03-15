import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { darken, lighten } from "@mui/material/styles";
import "./styles.css";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';


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

function GetNotiList(props) {
    const [rows, setRows] = useState();
    const [selectedRows, setSelectedRows] = React.useState([]);
    const movePage = useNavigate();

    const apiUrl = 'https://o0a46p97p0.execute-api.ap-northeast-2.amazonaws.com/v1/getNotiList';
    let [list, setList] = useState([]);  // 공지사항 데이터를 담을 곳

    const getBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

    // 보여줄 칼럼 정의
    const columns = [
        {
          field: "notiId",
          headerName: "공지번호",
          // width: 90,
        },
        {
          field: "notiTl",
          headerName: "제목",
          //   width: 110,
        },
        {
          field: "notiTpSe",
          headerName: "구분",
          //   width: 110,
        },
        {
          field: "useYn",
          headerName: "사용여부",
          //   width: 110,
        },
        {
          field: "delYn",
          headerName: "삭제여부",
          //   width: 110,
        },
        {
          field: "regDt",
          headerName: "등록일",
          //   width: 110,
        },
        {
          field: "regId",
          headerName: "등록자",
          //   width: 110,
        },
        {
          field: "modfDt",
          headerName: "수정일",
          //   width: 110,
        },
        {
          field: "modfId",
          headerName: "수정자",
          //   width: 110,
        },
    ];

    // 공지사항 DB 데이터 불러오기
    useEffect(()=> {
        axios.get(`${apiUrl}`)
        .then(response => {
            let items = response.data.Items;
            setRows(items.length);
            let item = [];
            items.map(function(a,i){
                item.push({
                    id : i,
                    notiId : items[i].NOTI_ID.S, // 공지사항ID
                    notiTl : items[i].NOTI_TL.S, // 제목
                    notiCt : items[i].NOTI_CT, // 내용
                    notiTpSe : items[i].NOTI_TP_SE.S, // 분류(긴급/일반)
                    atchDocId : items[i].ATCH_DOC_ID.S, // 첨부파일ID
                    useYn : items[i].USE_YN.S, // 사용여부
                    delYn : items[i].DEL_YN.S, // 삭제여부
                    regDt : items[i].REG_DT.S, // 등록일
                    regId : items[i].REG_ID.S, // 등록자
                    modfDt : items[i].MODF_DT.S, // 수정일
                    modfId : items[i].MODF_ID.S, // 수정자
                })
            })
            setList(item);


        })
        .catch(error => {
            console.error(error);
            
        });
    },[] )


  return (
    <div>
        <Typography variant="h7" noWrap component="div" sx={headingTextStyle}>
            공지사항 리스트 (총 건수 : {rows} 건)
        </Typography>
        <Button
            variant="contained" size="large"
            sx={btnStyle}
            onClick={()=>{
              movePage('/notice/add');
            } }
        >
            추가
        </Button>
        <Box
        // 백그라운드
        sx={{
          height: 860,
          width: "100%",
          "& .super-app-theme--unsuccess": {
            bgcolor: (theme) =>
              getBackgroundColor(
                theme.palette.warning.main,
                theme.palette.mode
              ),
          },
        }}
        >
        
{/* {rows &&         <DataGrid  */}
        
        <DataGrid
          rows={list}
          columns={columns}
          paginationMode="server"
          keepNonExistentRowsSelected
          pageSize={15}
          rowHeight={50}
          rowsPerPageOptions={[15]}
          rowSelectionModel={15}
          getRowClassName={(params) => `super-app-theme--${params.row.status}`}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          initialState={{
            sorting: {
              sortModel: [{ field: "date", sort: "desc" }],
            },
          }}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = rows.filter((row) => selectedIDs.has(row.id));

            setSelectedRows(selectedRows);
          }}
        />
        {/* }  */}
        </Box>
    </div>
  );
}

export default GetNotiList;

