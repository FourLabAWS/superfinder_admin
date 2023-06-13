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
import ParamRegModal from "./paramRegModal";
import ParamInquiryModal from "./paramInquiryModal";
import "../../Table/styles.css";
import "./param.css";

const today = new Date();

function GetParam(props, onClose, selectedParam) {
  const rows = props.data;
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [openCreateParamModal, setOpenCreateParamModal] = useState(false);
  const [openInquiryParamModal, setOpenInquiryParamModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false); // 모달 창 열림 여부 상태

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

  const [formData, setFormData] = useState({
    paramNm: "",
    paramVal: "",
    pixel: "",
    dpi: "",
    flagDownRate: "",
    customMaxRate: "",
    customMinRate: "",
    useYn: "N",
  });

  useEffect(() => {
    setFormData({
      ...selectedParam,
    });
  }, [selectedParam]);

  // 보여줄 칼럼 정의
  const columns = [
    {
      field: "paramNm",
      headerName: "파라미터",
      width: 100,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          const api = params.api;
          const thisRow = {};
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
          paramInquiryModal(thisRow);
        };
        return <Button onClick={onClick}>{params.row["paramNm"]}</Button>;
      },
    },
    { field: "paramVal", headerName: "파라미터 값", width: 100, hide: true },
    { field: "modId", headerName: "수정자", width: 100, hide: true },
    { field: "modDt", headerName: "수정일자", width: 100, hide: true },
    { field: "pixel", headerName: "픽셀", width: 50 },
    { field: "dpi", headerName: "도트 퍼 인치", width: 100 },
    { field: "flagDownRate", headerName: "최소 비율", width: 80 },
    { field: "customMaxRate", headerName: "보정 최대치", width: 90 },
    { field: "customMinRate", headerName: "보정 최소치", width: 90 },
    { field: "flagHz", headerName: "깃발 가로", width: 90 },
    { field: "flagVr", headerName: "깃발 세로", width: 90 },
    {
      field: "regDt",
      headerName: "등록일자",
      width: 200,
      hide: true,
      valueGetter: (params) => {
        // UTC를 기준으로 Date 객체를 생성합니다.
        const date = new Date(params.value + "Z");

        // Date 객체를 한국 시간으로 변환합니다.
        const koreanDate = date.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

        return koreanDate;
      },
    },
    { field: "regId", headerName: "등록자", width: 100, hide: true },
    { field: "useYn", headerName: "사용여부", width: 80 },
    {
      field: "사용",
      width: 80,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{ width: "100px", marginLeft: "1%" }}
          onClick={() => doSave(params)}
        >
          사용
        </Button>
      ),
    },
    {
      field: "미사용",
      width: 80,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{ width: "100px", marginLeft: "1%" }}
          onClick={() => doUnuse(params)}
        >
          미사용
        </Button>
      ),
    },
  ];

  //파라미터 모달
  const paramAddModal = () => {
    setOpenCreateParamModal(true);
  };
  const paramAddCloseModal = () => {
    setOpenCreateParamModal(false);
  };
  const paramInquiryModal = (selectedRows) => {
    setSelectedRows(selectedRows);
    setOpenInquiryParamModal(true);
  };
  const paramInquiryCloseModal = () => {
    setOpenInquiryParamModal(false);
  };
  const handleEditModalOpen = (selectedRows) => {
    selectedRows(selectedRows);
    setOpenInquiryParamModal(false);
    setEditModalOpen(true);
  };
  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  //const selectedParam = selectedRows[0].paramNm;

  const doSave = async (params) => {
    if (params.row.useYn === "Y") {
      alert("이미 사용 중인 파라미터입니다.");
      return;
    }

    const inUse = rows.some((row) => row.useYn === "Y");

    if (inUse) {
      alert("미사용 처리 후 다시 시도해주세요.");
      return;
    }

    if (!window.confirm("선택한 파라미터를 사용하겠습니까?")) {
      return;
    }

    try {
      await updateUseYn(params.row);
      alert("선택한 파라미터를 사용합니다.");
      window.location.reload(false);
    } catch (error) {
      console.error(error);
    }
  };

  const doUnuse = async (params) => {
    if (params.row.useYn === "N") {
      alert("이미 미사용 중인 파라미터입니다.");
      return;
    }

    if (!window.confirm("선택한 파라미터를 미사용하겠습니까?")) {
      return;
    }

    try {
      await updateUseYnToN(params.row);
      alert("선택한 파라미터를 미사용합니다.");
      window.location.reload(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUseYnToN = async (row) => {
    const editUrl = `https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/UseYnParam/`;
    try {
      const data = {
        paramNm: row.paramNm,
        useYn: "N",
      };
      await axios.put(editUrl, data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUseYn = async (row) => {
    const editUrl = `https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/UseYnParam/`;
    try {
      const data = {
        paramNm: row.paramNm,
        useYn: "Y",
      };
      await axios.put(editUrl, data);
    } catch (error) {
      console.error(error);
    }
  };

  // 깃발 삭제
  const deleteParam = () => {
    if (selectedRows.length === 0) {
      alert("삭제할 깃발을 선택해주세요.");
      return;
    }

    if (!window.confirm("선택한 깃발을 삭제하겠습니까?")) {
      return;
    }

    Promise.all(
      selectedRows.map((item) => {
        return client
          .delete("delParam/" + item["paramNm"])
          .then((response) => {
            return response;
          })
          .catch((error) => {
            console.error(error);
          });
      })
    ).then((results) => {
      alert("삭제되었습니다.");
      window.location.reload(false);
    });
  };

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
        <Button
          variant="contained"
          sx={{ width: "100px", marginLeft: "1%" }}
          onClick={paramAddModal}
        >
          등록
        </Button>
        <Button
          variant="contained"
          sx={{ width: "100px", marginLeft: "1%" }}
          onClick={deleteParam}
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
              sortModel: [{ field: "paramRegDt", sort: "desc" }],
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

      <ParamRegModal modalObj={openCreateParamModal} onClose={paramAddCloseModal} />
      <ParamInquiryModal
        modalObj={openInquiryParamModal}
        onClose={paramInquiryCloseModal}
        selectedParam={selectedRows}
        onEdit={handleEditModalOpen}
      />
    </div>
  );
}
export default GetParam;
