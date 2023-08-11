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
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { client } from "../../../routes/routes";

import UserInquiryModal from "./UserInquiryModal";

import "../../Table/styles.css";

const today = new Date();

function GetUserList(props) {
  const rows = props.data;
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openInquiryModal, setOpenInquiryModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  //const [openModal, setOpenModal] = useState(false);    // 모달 창 열림 여부 상태
  // 상태 추가
  const [editRows, setEditRows] = useState({});
  function exportToExcel(columns, selectedRows) {
    let dataToExport = selectedRows.length > 0 ? selectedRows : rows;

    let newRows = dataToExport.map((row) => {
      let newRow = {};
      columns.forEach((column) => {
        newRow[column.headerName] = row[column.field];
      });
      return newRow;
    });

    const ws = XLSX.utils.json_to_sheet(newRows, {
      header: columns.map((column) => column.headerName),
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const fileName = `${today.getFullYear()}_${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}_${today.getDate().toString().padStart(2, "0")}.xlsx`;
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const file = new Blob([excelBuffer], { type: fileType });
    saveAs(file, fileName);
  }

  const getBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

  // 보여줄 칼럼 정의
  const columns = [
    { field: "device_id", headerName: "디바이스 ID", width: 150 },
    {
      field: "device_model",
      headerName: "휴대폰 기종",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "shot_count",
      headerName: "촬영 횟수",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

          userInquiryModal(thisRow);
        };
        return <Button onClick={onClick}>{params.row["shot_count"]}</Button>;
      },
    },
    { field: "useYn", headerName: "사용여부", width: 100, hide: true },
    {
      field: "last_dt",
      headerName: "등록일자",
      align: "center",
      headerAlign: "center",
      width: 200,
      // valueGetter: (params) => {
      //   // UTC를 기준으로 Date 객체를 생성합니다.
      //   const date = new Date(params.value + "Z");

      //   // Date 객체를 한국 시간으로 변환합니다.
      //   const koreanDate = date.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

      //   return koreanDate;
      // },
    },
    { field: "regId", headerName: "등록자", width: 120, hide: true },
  ];

  // //사용자 모달
  // const userAddModal = () => {
  //   setOpenCreateModal(true);
  // };

  // const userAddCloseModal = () => {
  //   setOpenCreateAdminModal(false);
  // };

  const userInquiryModal = (selectedRows) => {
    setSelectedRows(selectedRows);
    setOpenInquiryModal(true);
  };

  const userInquiryCloseModal = () => {
    setOpenInquiryModal(false);
  };

  const handleEditModalOpen = (selectedRows) => {
    selectedRows(selectedRows);
    setOpenInquiryModal(false);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  // const handleEditCellChangeCommitted = (params) => {
  //   const { id, field, value } = params;
  //   const updatedRows = rows.map((row) => {
  //     if (row.id === id) {
  //       return { ...row, [field]: value };
  //     }
  //     return row;
  //   });

  //   setSelectedRows(updatedRows);
  // };

  // const onSave = () => {
  //   if (selectedRows.length === 0) {
  //     alert("데이터를 선택해주세요.");
  //     return;
  //   }

  //   if (!window.confirm("선택한 사용자를 수정하겠습니까?")) {
  //     return;
  //   }

  //   selectedRows.map((item) => {
  //     client
  //       .put("editUser/" + item["device_id"])
  //       .then((response) => {
  //         alert("수정되었습니다.");
  //         window.location.reload(false);
  //         return response;
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   });
  // };

  return (
    <div>
      <div id="buttonArea">
        <Button
          variant="contained"
          sx={{ width: "125px", marginLeft: "1%" }}
          onClick={() => exportToExcel(columns, selectedRows)}
        >
          엑셀 다운로드
        </Button>
        {/* <Button
          variant="contained"
          sx={{ width: "100px", marginLeft: "1%" }}
          onClick={userAddModal}
        >
          추가
        </Button> */}
        {/* <Button
          variant="contained"
          sx={{ width: "100px", marginLeft: "1%" }}
          onClick={onSave}
        >
          수정 
        </Button>*/}
      </div>
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
              getBackgroundColor(theme.palette.warning.main, theme.palette.mode),
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          // paginationMode="server"
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
              sortModel: [{ field: "lastDt", sort: "desc" }],
            },
          }}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = rows
              .map((row) => {
                return {
                  ...row,
                  device_id: row.device_id,
                  shot_count: row.shot_count,
                };
              })
              .filter((row) => selectedIDs.has(row.id));

            setSelectedRows(selectedRows.length === 0 ? [] : selectedRows);
          }}
        />
      </Box>
      <Divider sx={{ padding: 1, border: "none" }} />

      <UserInquiryModal
        modalObj={openInquiryModal}
        onClose={userInquiryCloseModal}
        selectedUser={selectedRows}
        onEdit={handleEditModalOpen}
      />
    </div>
  );
}

export default GetUserList;
