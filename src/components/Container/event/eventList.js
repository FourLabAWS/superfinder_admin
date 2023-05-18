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
  const rows = props.data;
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
    { field: "plcId", headerName: "장소 아이디", width: 100, hide: true },
    { field: "hzLnth", headerName: "가로 길이", width: 100 },
    { field: "vrLnth", headerName: "세로 길이", width: 100 },
    { field: "phoneNum", headerName: "전화번호", width: 200 },
    { field: "regDt", headerName: "등록일시", width: 200 },
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

  const [formData, setFormData] = useState({
    PLC_ID: "",
    PLC_NM: "",
    UNIT_NM: "cm",
    HZ_LNTH: "",
    VR_LNTH: "",
    REG_ID: "sadmin",
    REG_SE: "A",
  });

  // 깃발 등록
  const doSave = async (event) => {
    if (selectedRows.length === 0) {
      alert("등록할 깃발을 선택해주세요.");
      return;
    }
    if (!window.confirm("깃발을 등록하겠습니까?")) {
      return;
    }

    const updatedFormData = {
      ...formData,
      PLC_ID: selectedRows[0].PLC_ID,
      PLC_NM: selectedRows[0].PLC_NM,
      UNIT_NM: selectedRows[0].UNIT_NM,
      HZ_LNTH: selectedRows[0].HZ_LNTH,
      VR_LNTH: selectedRows[0].VR_LNTH,
      REG_ID: selectedRows[0].REG_ID,
      REG_SE: selectedRows[0].REG_SE,
    };

    console.log(updatedFormData);

    const postUrl =
      "https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/flagEvntReg";
    try {
      await axios.post(postUrl, updatedFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      //window.location.reload(false);
    } catch (error) {
      console.error(error);
    }
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
