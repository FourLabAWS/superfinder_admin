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
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

//import EvntRegModal from "./evntRegModal";
//import EvntInquiryModal from "./evntInquiryModal";
import "../../Table/styles.css";
import "./event.css";

const today = new Date();

function exportToExcel(rows, columns) {
  let newRows = rows.map((row) => {
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

function GetEvnt(props) {
  const { data: rows } = props;
  const [data, setData] = useState(rows);
  useEffect(() => {
    setData(rows);
  }, [rows]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [openSendEvntModal, setOpenSendEvntModal] = useState(false);
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
      width: 300,
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
    { field: "plcLat", headerName: "경도", width: 200 },
    { field: "plcLng", headerName: "위도", width: 200 },
    { field: "plcId", headerName: "장소 아이디", width: 100, hide: true },
    { field: "hzLnth", headerName: "가로 길이", width: 100 },
    { field: "vrLnth", headerName: "세로 길이", width: 100 },
    { field: "phoneNum", headerName: "전화번호", width: 200 },
    {
      field: "regDt",
      headerName: "등록일자",
      width: 200,
      valueGetter: (params) => {
        // 일단, params.value를 Date 객체로 변환합니다. 만약 params.value가 이미 Date 객체라면, 이 과정은 필요하지 않습니다.
        const date = new Date(params.value);

        // Date 객체를 한국 시간으로 변환합니다.
        const koreanDate = date.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

        return koreanDate;
      },
    },
    { field: "regSe", headerName: "등록환경", width: 100, hide: true },
    { field: "modId", headerName: "수정자", width: 100, hide: true },
    { field: "modDt", headerName: "수정일자", width: 100, hide: true },
  ];

  //사용자 모달
  const evntSendModal = () => {
    setOpenSendEvntModal(true);
  };
  const evntSendCloseModal = () => {
    setOpenSendEvntModal(false);
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

  // 깃발 등록
  const doSave = () => {
    if (selectedRows.length === 0) {
      alert("등록할 깃발을 선택해주세요.");
      return;
    }
    if (!window.confirm("깃발을 등록하겠습니까?")) {
      return;
    }
    const postUrl =
      "https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/flagEvntReg";

    const requests = selectedRows.map((item) => {
      return axios.post(postUrl, item, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

    Promise.all(requests)
      .then(() => {
        alert("등록되었습니다.");
        window.location.reload(false);
      })
      .catch((error) => {
        console.error(error);
      });
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
        .delete("delEvnt/" + item["flagCd"])
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
          sx={{ width: "125px", marginLeft: "1%" }}
          onClick={() => exportToExcel(rows, columns)}
        >
          엑셀 다운로드
        </Button>
        <Button
          variant="contained"
          sx={{ width: "100px", marginLeft: "1%" }}
          onClick={doSave}
        >
          깃발 등록
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
          rows={data}
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
