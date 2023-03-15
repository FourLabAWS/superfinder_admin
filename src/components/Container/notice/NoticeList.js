import * as React from "react";
import { useState,useEffect } from 'react';
import axios from 'axios';

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { darken, lighten } from "@mui/material/styles";

import "../../Table/styles.css";

function GetNotiList(props) {
    const apiUrl = 'https://o0a46p97p0.execute-api.ap-northeast-2.amazonaws.com/v1/getNotiList';

    const [rows, setRows] = useState();
    const [selectedRows, setSelectedRows] = React.useState([]);
    const movePage = useNavigate();

    
    let [list, setList] = useState([]);  // 공지사항 데이터를 담을 곳

    const getBackgroundColor = (color, mode) => mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

    // 제목 클릭 시, 상세페이지로 이동할 파라미터 전달
    function routeChange(data) {
      let path = `/noticeDtl/` + data;
      movePage(path);
    }

    // 보여줄 칼럼 정의
    const columns = [
      {field: "notiId"  , headerName: "번호", width: 80},
      {field: "notiTpSe", headerName: "구분", width: 100},
      {field: "notiTl", headerName: "제목", width: 600,
        renderCell: (params) => {
          const onClick = (e)=>{
            e.stopPropagation();

            const api = params.api; // api를 왜 조회할까?
            const thisRow = {};     // thisRow는 왜 작성할까? thisRow["id"]는 무슨 의미일까

            api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
              );

            return routeChange(thisRow["notiId"]);

          }
          // params.row["notiTl"] 으로 작성해야 제목에 notiTL의 값이 출력된다.
          return <Button onClick={onClick}>{params.row["notiTl"]}</Button>;
        }
      },
      {field: "useYn", headerName: "사용여부", width: 100},
      {field: "regId", headerName: "등록자", width: 100},
      {field: "regDt", headerName: "등록일자", width: 120},
    ];

    // 공지사항 DB 데이터 불러오기
    useEffect(()=> {
        axios.get(`${apiUrl}`).then(response => {

          let item = [];  
          let items = response.data.Items;

          setRows(items.length);
            
          items.map(function(a, itemNm) {
              item.push({
                id : itemNm,
                notiId : items[itemNm].NOTI_ID.S, // 공지사항ID
                notiTpSe : items[itemNm].NOTI_TP_SE.S, // 분류(긴급/일반)
                notiTl : items[itemNm].NOTI_TL.S, // 제목
                useYn : items[itemNm].USE_YN.S, // 사용여부
                atchDocId : items[itemNm].ATCH_DOC_ID.S, // 첨부파일ID
                regDt : items[itemNm].REG_DT.S, // 등록일
                regId : items[itemNm].REG_ID.S, // 등록자
              })
          })
          setList(item);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

  return (
    <div>
        <Typography variant="h7" noWrap component="div" sx={{fontWeight: 550}}>
            목록 (총 건수 : {rows} 건)
        </Typography>
        <Divider sx={{ padding: 1, border: "none" }} />
        <Box
          sx={{
            height: 560,
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
                sortModel: [{ field: "regDt", sort: "desc" }],
              },
            }}
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRows = rows.filter((row) => selectedIDs.has(row.id));

              setSelectedRows(selectedRows);
            }}
          />
        </Box>
        <Divider sx={{ padding: 1, border: "none" }} />
        <Button variant="contained" 
          sx={{width: "100px", fontSize: 12}}
          onClick={()=> {
            movePage('/noticeReg');
          }}
        >
          추가
        </Button>
    </div>
  );
}

export default GetNotiList;

