import * as React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';


import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { darken, lighten } from "@mui/material/styles";

import "../../Table/styles.css";

function GetAdminList(props) {
  const apiUrl = 'https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/getadmin';

  const [rows, setRows] = useState();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const movePage = useNavigate();

  let [list, setList] = useState([]);  // 데이터를 담을 곳

  const getBackgroundColor = (color, mode) => mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

  // 보여줄 컬럼 정의
  const columns = [
    { field: "admnrId", headerName: "관리자ID", width: 120 },
    { field: "admnrEmail", headerName: "이메일", width: 200 },
    { field: "admnrNm", headerName: "이름", width: 120 },
  ];

  // 데이터 불러오기
  useEffect(() => {
    axios.get(apiUrl).then(response => {
      let items = response.data.Items;

      setRows(items.length);

      let item = items.map((item, index) => ({
        admnrId: item.ADMNR_ID.S, // 관리자 ID
        admnrEmail: item.ADMNR_EMAIL.S, // 이메일
        admnrNm: item.ADMNR_NM.S, // 이름
      }));
      setList(item);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  return(
    
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={list}
        columns={columns}
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
    </div>
  );
}

export default GetAdminList;