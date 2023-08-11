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
import FlagRegModal from "./flagRegModal";
import FlagInquiryModal from "./flagInquiryModal";
import "../../Table/styles.css";
import "./flag.css";

const today = new Date();

function GetFlag(props) {
  const rows = props.data;
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [openCreateFlagModal, setOpenCreateFlagModal] = useState(false);
  const [openInquiryFlagModal, setOpenInquiryFlagModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

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

  const openMapBtn = (params) => {
    const mapCategory = params.row.mapCt;
    const plcId = params.row.plcId; // plcId
    console.log("params", params);

    let url;

    // 숫자로 이루어진 plcId는 카카오 맵, 그렇지 않은 경우는 구글 맵
    if (mapCategory === "kakao") {
      // 카카오 맵 URL
      url = `https://map.kakao.com/?itemId=${plcId}`;
      window.open(url, "_blank");
    } else if (mapCategory === "google") {
      // 구글 맵 URL
      url = `https://www.google.com/maps/place/?q=place_id:${plcId}`;
      window.open(url, "_blank");
    } else {
      url = `https://www.google.com/maps/place/?q=place_id:${plcId}`;
      window.open(url, "_blank");
    }

    // 새 창에서 URL 열기
  };

  //const [openModal, setOpenModal] = useState(false);    // 모달 창 열림 여부 상태
  const getBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);
  // 보여줄 칼럼 정의
  const columns = [
    {
      field: "flagCd",
      headerName: "깃발 코드",
      width: 300,
      hide: true,
    },
    { field: "plcId", headerName: "장소 코드", width: 100, hide: true },
    {
      field: "plcNm",
      headerName: "골프장",
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
          flagInquiryModal(thisRow);
        };
        return <Button onClick={onClick}>{params.row["plcNm"]}</Button>;
      },
    },
    {
      field: "plcLat",
      headerName: "경도",
      width: 150,
      hide: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "plcLng",
      headerName: "위도",
      width: 150,
      hide: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "hzLnth",
      headerName: "가로 길이",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "vrLnth",
      headerName: "세로 길이",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "unitNm",
      headerName: "단위",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    { field: "regId", headerName: "등록자", width: 120, headerAlign: "center" },
    {
      field: "regDt",
      headerName: "등록일자",
      width: 200,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => {
        // UTC를 기준으로 Date 객체를 생성합니다.
        const date = new Date(params.value + "Z");

        // Date 객체를 한국 시간으로 변환합니다.
        const koreanDate = date.toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",
        });

        return koreanDate;
      },
    },
    { field: "regSe", headerName: "등록환경", width: 100, hide: true },
    {
      field: "authYn",
      headerName: "인증 여부",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "map",
      headerName: "지도",
      width: 80,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            className="selectBtn"
            onClick={() => openMapBtn(params)}
            style={{
              wordBreak: "keep-all",
            }}
          >
            지도
          </Button>
        );
      },
    },
    {
      field: "mapCt",
      headerName: "지도 구분",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "foreign",
      headerName: "국내/외",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
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

  // 깃발 인증
  const flagAuthBtn = async () => {
    if (selectedRows.length === 0) {
      alert("인증할 깃발을 선택해주세요.");
      return;
    }

    if (!window.confirm("선택한 깃발을 인증하겠습니까?")) {
      return;
    }

    const editUrl = `https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/authFlag/`;
    const requests = selectedRows.map((row) => {
      const data = {
        flagCd: row.flagCd,
        authYn: "Y",
      };
      return axios.put(editUrl, data);
    });

    try {
      await Promise.all(requests);
      alert("인증되었습니다.");
      window.location.reload(false);
    } catch (error) {
      console.error(error);
    }
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

    Promise.all(
      selectedRows.map((item) => {
        return client
          .delete("delFlag/" + item["flagCd"])
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
          onClick={flagAuthBtn}
        >
          인증
        </Button>
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

      <FlagRegModal modalObj={openCreateFlagModal} onClose={flagAddCloseModal} />
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
