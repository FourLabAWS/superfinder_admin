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
//import EvntRegModal from "./evntRegModal";
//import EvntInquiryModal from "./evntInquiryModal";
import "../../Table/styles.css";
import "./event.css";

function GetEvnt(props) {
  const rows = props.data;
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [openCreateEvntModal, setOpenCreateEvntModal] = useState(false);
  const [openInquiryEvntModal, setOpenInquiryEvntModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  //const [openModal, setOpenModal] = useState(false);    // 모달 창 열림 여부 상태
  const getBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);
  // 보여줄 칼럼 정의
  const columns = [
    {
      field: "plcNm",
      headerName: "골프장",
      width: 200,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          const api = params.api;
          const thisRow = {};
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
          //evntInquiryModal(thisRow);
        };
        return <Button onClick={onClick}>{params.row["plcNm"]}</Button>;
      },
    },
    { field: "flagCd", headerName: "깃발 코드", width: 100, hide: true },
    { field: "plcId", headerName: "장소 아이디", width: 100, hide: true },
    { field: "hzLnth", headerName: "가로 길이", width: 100 },
    { field: "vrLnth", headerName: "세로 길이", width: 100 },
    { field: "unitNm", headerName: "단위", width: 100 },
    { field: "regNick", headerName: "카카오 아이디", width: 120 },
    { field: "regDt", headerName: "등록일자", width: 200 },
    { field: "regSe", headerName: "등록환경", width: 100, hide: true },
    { field: "modId", headerName: "수정자", width: 100, hide: true },
    { field: "modDt", headerName: "수정일자", width: 100, hide: true },
  ];

  //사용자 모달
  const evntAddModal = () => {
    setOpenCreateEvntModal(true);
  };
  const evntAddCloseModal = () => {
    setOpenCreateEvntModal(false);
  };
  const evntInquiryModal = (selectedRows) => {
    setSelectedRows(selectedRows);
    setOpenInquiryEvntModal(true);
  };
  const evntInquiryCloseModal = () => {
    setOpenInquiryEvntModal(false);
  };
  const handleEditModalOpen = (selectedRows) => {
    selectedRows(selectedRows);
    setOpenInquiryEvntModal(false);
    setEditModalOpen(true);
  };
  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };
  // 깃발 삭제
  const deleteEvnt = () => {
    if (selectedRows.length === 0) {
      alert("삭제할 깃발을 선택해주세요.");
      return;
    }
    if (!window.confirm("선택한 깃발을 삭제하겠습니까?")) {
      return;
    }
    selectedRows.map((item) => {
      client
        .delete("delEvnt/", {
          params: {
            id: item["evntCd"],
          },
        })
        .then((response) => {
          alert("삭제되었습니다.");
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
      <div id="buttonArea">
        <Button
          variant="contained"
          sx={{ width: "100px", marginLeft: "1%" }}
          onClick={evntAddModal}
        >
          등록
        </Button>
        <Button
          variant="contained"
          sx={{ width: "100px", marginLeft: "1%" }}
          onClick={deleteEvnt}
        >
          삭제
        </Button>
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
              sortModel: [{ field: "evntRegDt", sort: "desc" }],
            },
          }}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = rows
              .map((row) => {
                return {
                  ...row,
                  regId: row.regId,
                  regDt: row.regDt,
                };
              })
              .filter((row) => selectedIDs.has(row.id));
            setSelectedRows(selectedRows.length === 0 ? [] : selectedRows);
          }}
        />
      </Box>
      <Divider sx={{ padding: 1, border: "none" }} />

      {/* <EvntRegModal modalObj={openCreateEvntModal} onClose={evntAddCloseModal} />
      <EvntInquiryModal
        modalObj={openInquiryEvntModal}
        onClose={evntInquiryCloseModal}
        selectedEvnt={selectedRows}
        onEdit={handleEditModalOpen}
      /> */}
    </div>
  );
}
export default GetEvnt;
