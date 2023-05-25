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
import ParamRegModal from "./paramRegModal";
import ParamInquiryModal from "./paramInquiryModal";
import "../../Table/styles.css";
import "./param.css";

function GetParam(props, onClose, selectedParam) {
  const rows = props.data;
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [openCreateParamModal, setOpenCreateParamModal] = useState(false);
  const [openInquiryParamModal, setOpenInquiryParamModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false); // 모달 창 열림 여부 상태
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
    { field: "paramVal", headerName: "파라미터 값", width: 100 },
    { field: "modId", headerName: "수정자", width: 100, hide: true },
    { field: "modDt", headerName: "수정일자", width: 100, hide: true },
    { field: "pixel", headerName: "픽셀", width: 50 },
    { field: "dpi", headerName: "도트 퍼 인치", width: 100 },
    { field: "flagDownRate", headerName: "깃발 최소 비율", width: 150 },
    { field: "customMaxRate", headerName: "깃발 보정 최대치", width: 150 },
    { field: "customMinRate", headerName: "깃발 보정 최소치", width: 150 },
    { field: "flagHz", headerName: "깃발 가로", width: 100 },
    { field: "flagVr", headerName: "깃발 세로", width: 100 },
    { field: "regDt", headerName: "등록일시", width: 200 },
    { field: "regId", headerName: "등록자", width: 100 },
    { field: "useYn", headerName: "사용여부", width: 100 },
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

  const doSave = async (event) => {
    event.preventDefault();
    if (!window.confirm("선택한 파라미터를 사용하겠습니까?")) {
      return;
    }
    if (rows.some((row) => row.useYn === "Y")) {
      alert("미사용 처리 후 사용해주세요.");
      return;
    }
    if (selectedRows.length === 0) {
      alert("사용할 파라미터를 선택해주세요.");
      return;
    }
    if (selectedRows.length > 1) {
      alert("하나의 파라미터만 선택해주세요.");
      return;
    }
    try {
      await updateUseYn(formData);
      alert("선택한 파라미터를 사용합니다.");
      window.location.reload(false);
    } catch (error) {
      console.error(error);
    }
  };

  const doUnuse = async (event) => {
    event.preventDefault();
    if (!window.confirm("선택한 파라미터를 미사용하겠습니까?")) {
      return;
    }
    try {
      await updateUseYnToN(formData);
      alert("선택한 파라미터를 미사용합니다.");
      window.location.reload(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUseYnToN = async () => {
    const editUrl = `https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/UseYnParam/`;
    try {
      const data = {
        paramNm: selectedRows[0].paramNm,
        useYn: "N",
      };
      await axios.put(editUrl, data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUseYn = async (event) => {
    const editUrl = `https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/UseYnParam/`;
    try {
      const data = {
        paramNm: selectedRows[0].paramNm,
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

    selectedRows.map((item) => {
      client
        .delete("delParam/" + item["paramNm"])
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
          onClick={doSave}
        >
          사용
        </Button>
        <Button
          variant="contained"
          sx={{ width: "100px", marginLeft: "1%" }}
          onClick={doUnuse}
        >
          미사용
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
