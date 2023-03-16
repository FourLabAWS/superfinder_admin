import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { darken, lighten } from "@mui/material/styles";
import { client } from "../../../routes/routes";

import UserAdminRegModal from "./UserAdminRegModal";
import "../../Table/styles.css";

function GetUserAdminList(props) {
  const rows = props.data;
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [openCreateAdminModal, setOpenCreateAdminModal] = useState(false);
  //const [openModal, setOpenModal] = useState(false);    // 모달 창 열림 여부 상태

  const getBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

  // 보여줄 칼럼 정의
  const columns = [
    { field: "admnrId", headerName: "아이디", width: 150 },
    {
      field: "admnrNm",
      headerName: "이름",
      width: 200,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          const api = params.api; // api를 왜 조회할까?
          const thisRow = {}; // thisRow는 왜 작성할까? thisRow["id"]는 무슨 의미일까

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );

          return userAddModal(thisRow["admnrId"]);
        };
        return <Button onClick={onClick}>{params.row["admnrId"]}</Button>;
      },
    },
    { field: "admnrEmail", headerName: "이메일", width: 200 },
    //{field: "useYn", headerName: "사용여부", width: 100},
    //{field: "regId", headerName: "등록자", width: 100},
    //{field: "regDt", headerName: "등록일자", width: 120},
  ];

  //사용자 모달
  const userAddModal = () => {
    setOpenCreateAdminModal(true);
  };

  //사용자 삭제
  const deleteUser = () => {
    if (selectedRows.length === 0) {
      alert("삭제할 사용자를 선택해주세요.");
      return;
    }

    selectedRows.map((item) => {
      client
        .delete("DelUserAdmin/" + item["admnrId"])
        .then((response) => {
          alert("모달을 닫는다.");
          //1. 모달을 닫는다.
          //2. 리로드 한다.
          window.location.reload(false);
          return response;
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  return (
    <div>
      <Typography variant="h7" noWrap component="div" sx={{ fontWeight: 550 }}>
        목록 (총 건수 : {rows.length} 건)
      </Typography>
      <Divider sx={{ padding: 1, border: "none" }} />
      <Box
        sx={{
          width: "100%",
          height: 560,
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
          rows={rows}
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
      <Button
        variant="contained"
        sx={{ width: "100px", fontSize: 12 }}
        onClick={() => setOpenCreateAdminModal(true)}
      >
        추가
      </Button>
      <Button
        variant="contained"
        sx={{ width: "100px", marginLeft: "1%" }}
        onClick={deleteUser}
      >
        삭제
      </Button>
      <UserAdminRegModal modalObj={openCreateAdminModal} />
    </div>
  );
}

export default GetUserAdminList;
