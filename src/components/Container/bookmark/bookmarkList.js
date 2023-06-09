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
import BookMarkRegModal from "./bookmarkRegModal";
import BookMarkInquiryModal from "./bookmarkInquiryModal";
import "../../Table/styles.css";
import "./bookmark.css";

function GetBookMark(props) {
  const rows = props.data;
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [openCreateBookMarkModal, setOpenCreateBookMarkModal] = useState(false);
  const [openInquiryBookMarkModal, setOpenInquiryBookMarkModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  //const [openModal, setOpenModal] = useState(false);    // 모달 창 열림 여부 상태
  const getBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);
  // 보여줄 칼럼 정의
  const columns = [
    { field: "flagCd", headerName: "깃발 코드", width: 100 },
    { field: "plcId", headerName: "장소 코드", width: 100, hide: true },
    {
      field: "plcNm",
      headerName: "골프장",
      width: 250,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          const api = params.api;
          const thisRow = {};
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
          bookMarkInquiryModal(thisRow);
        };
        return <Button onClick={onClick}>{params.row["plcNm"]}</Button>;
      },
    },
    { field: "plcLat", headerName: "경도", width: 200, hide: true },
    { field: "plcLng", headerName: "위도", width: 200, hide: true },
    { field: "hzLnth", headerName: "가로 길이", width: 100 },
    { field: "vrLnth", headerName: "세로 길이", width: 100 },
    { field: "unitNm", headerName: "단위", width: 100 },
    { field: "regId", headerName: "등록자", width: 200 },
    {
      field: "regDt",
      headerName: "등록일자",
      width: 200,
      valueGetter: (params) => {
        // UTC를 기준으로 Date 객체를 생성합니다.
        const date = new Date(params.value + "Z");

        // Date 객체를 한국 시간으로 변환합니다.
        const koreanDate = date.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

        return koreanDate;
      },
    },
    { field: "regSe", headerName: "등록환경", width: 100 },
    { field: "modId", headerName: "수정자", width: 100, hide: true },
    { field: "modDt", headerName: "수정일자", width: 100, hide: true },
  ];

  //사용자 모달
  const bookMarkAddModal = () => {
    setOpenCreateBookMarkModal(true);
  };
  const bookMarkAddCloseModal = () => {
    setOpenCreateBookMarkModal(false);
  };
  const bookMarkInquiryModal = (selectedRows) => {
    setSelectedRows(selectedRows);
    setOpenInquiryBookMarkModal(true);
  };
  const bookMarkInquiryCloseModal = () => {
    setOpenInquiryBookMarkModal(false);
  };
  const handleEditModalOpen = (selectedRows) => {
    selectedRows(selectedRows);
    setOpenInquiryBookMarkModal(false);
    setEditModalOpen(true);
  };
  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };
  // 깃발 삭제
  const deleteBookMark = async () => {
    if (selectedRows.length === 0) {
      alert("삭제할 즐겨찾기를 선택해주세요.");
      return;
    }
    if (!window.confirm("선택한 즐겨찾기를 삭제하겠습니까?")) {
      return;
    }

    const requests = selectedRows.map((item) =>
      client.delete("delBookMark/" + item["flagCd"])
    );

    try {
      await Promise.all(requests);
      alert("삭제되었습니다.");
      window.location.reload(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div id="buttonArea">
        {/* <Button
          variant="contained"
          sx={{ width: "100px", marginLeft: "1%" }}
          onClick={bookMarkAddModal}
        >
          등록
        </Button> */}
        <Button
          variant="contained"
          sx={{ width: "100px", marginLeft: "1%" }}
          onClick={deleteBookMark}
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
              sortModel: [{ field: "bookMarkRegDt", sort: "desc" }],
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
      <BookMarkRegModal
        modalObj={openCreateBookMarkModal}
        onClose={bookMarkAddCloseModal}
      />
      <BookMarkInquiryModal
        modalObj={openInquiryBookMarkModal}
        onClose={bookMarkInquiryCloseModal}
        selectedBookMark={selectedRows}
        onEdit={handleEditModalOpen}
      />
    </div>
  );
}
export default GetBookMark;
