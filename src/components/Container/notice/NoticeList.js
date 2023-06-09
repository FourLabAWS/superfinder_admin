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
import "../../Table/styles.css";

function GetNotiList(props) {
  const rows = props.data;
  const [selectedRows, setSelectedRows] = React.useState([]);
  const movePage = useNavigate();

  const getBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

  function routeChange(notiTl) {
    let path = `/noticeDtl/` + notiTl;
    movePage(path);
  }

  const columns = [
    { field: "notiId", headerName: "번호", width: 80, hide: true },
    { field: "notiTpSe", headerName: "구분", width: 100 },
    {
      field: "notiTl",
      headerName: "제목",
      width: 600,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          const api = params.api;
          const thisRow = {};
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

          return routeChange(thisRow["notiId"]);
        };

        return <Button onClick={onClick}>{params.row["notiTl"]}</Button>;
      },
    },
    { field: "useYn", headerName: "사용여부", width: 100 },
    { field: "regId", headerName: "등록자", width: 100 },
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
  ];

  const deleteItem = () => {
    if (selectedRows.length === 0) {
      alert("삭제할 공지사항을 선택해주세요.");
      return;
    } else {
      if (
        window.confirm("삭제하시면 복구할 수 없습니다. \n정말로 삭제하시겠습니까?") ==
        false
      ) {
        return false;
      }
    }

    Promise.all(
      selectedRows.map((item) => {
        return client
          .delete("DelNoti/" + item["notiId"])
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
          sx={{ width: "100px", marginRight: "1%" }}
          onClick={() => {
            movePage("/noticeReg");
          }}
        >
          추가
        </Button>
        <Button
          variant="contained"
          sx={{ width: "100px", marginRight: "1%" }}
          onClick={deleteItem}
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
          height: 560,
          width: "100%",
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
    </div>
  );
}

export default GetNotiList;
