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
import FlagRegModal from "./flagRegModal";
import FlagInquiryModal from "./flagInquiryModal";
import "../../Table/styles.css";
import "./flag.css";

function GetFlag(props) {
  const rows = props.data;
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [openCreateFlagModal, setOpenCreateFlagModal] = useState(false);
  const [openInquiryFlagModal, setOpenInquiryFlagModal] = useState(false);
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
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          flagInquiryModal(thisRow);
        };
        return <Button onClick={onClick}>{params.row["plcNm"]}</Button>;
      },
    },
    { field: "flagCd", headerName: "깃발 코드", width: 100, hide: true },
    { field: "hzLnth", headerName: "가로 길이", width: 100 },
    { field: "vrLnth", headerName: "세로 길이", width: 100 },
    { field: "unitNm", headerName: "단위", width: 100 },
    { field: "regId", headerName: "등록자", width: 100 },
    { field: "regDt", headerName: "등록일자", width: 100 },
    { field: "regSe", headerName: "등록환경", width: 100 },
    { field: "modId", headerName: "수정자", width: 100, hide: true },
    { field: "modDt", headerName: "수정일자", width: 100, hide: true },
  ];

  //사용자 모달
  const flagAddModal = () => {
    setOpenCreateFlagModal(true);
  };
  const flagAddCloseModal = () => {
    setOpenCreateFlagModal(false);
  };
  const flagInquiryModal = (selectedRows) => {
    setSelectedRows(selectedRows);
    setOpenInquiryFlagModal(true);
  };
  const flagInquiryCloseModal = () => {
    setOpenInquiryFlagModal(false);
  };
  const handleEditModalOpen = (selectedRows) => {
    selectedRows(selectedRows);
    setOpenInquiryFlagModal(false);
    setEditModalOpen(true);
  };
  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };
  // 깃발 삭제
  const deleteFlag = () => {
    if (selectedRows.length === 0) {
      alert("삭제할 깃발을 선택해주세요.");
      return;
    }
    if (!window.confirm("선택한 깃발을 삭제하겠습니까?")) {
      return;
    }
    selectedRows.map((item) => {
      client
        .delete("delFlag/", {
          params: {
            id: item["flagCd"],
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
              sortModel: [{ field: "flagRegDt", sort: "desc" }],
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
      <div id="buttonArea">
        <Button
          variant="contained"
          sx={{ width: "100px", marginLeft: "1%" }}
          onClick={flagAddModal}
        >
          등록
        </Button>
        <Button
          variant="contained"
          sx={{ width: "100px", marginLeft: "1%" }}
          onClick={deleteFlag}
        >
          삭제
        </Button>
      </div>
      <FlagRegModal
        modalObj={openCreateFlagModal}
        onClose={flagAddCloseModal}
      />
      <FlagInquiryModal
        modalObj={openInquiryFlagModal}
        onClose={flagInquiryCloseModal}
        selectedFlag={selectedRows}
        onEdit={handleEditModalOpen}
      />
    </div>
  );
}
export default GetFlag;
