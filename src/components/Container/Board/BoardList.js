import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import DownloadIcon from "@mui/icons-material/Download";
import Typography from "@mui/material/Typography";

import { client } from "../../../routes/routes";
import { DataGrid } from "@mui/x-data-grid";
import { darken, lighten } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import "../../Table/styles.css";

const headingTextStyle = {
  fontWeight: 550,
};

export default function DataTable(props) {
  const rows = props.data;
  const [selectedRows, setSelectedRows] = React.useState([]);
  let navigate = useNavigate();

  function routeChange(data) {
    let path = `/board/detail/` + data;
    navigate(path);
  }

  const deleteItem = () => {
    selectedRows.map((item) => {
      client.delete("delete/" + item["id"]).then((response) => {
        window.location.reload(false);
        return response;
      });
    });
  };

  const columns = [
    {
      field: "NOTI_ID",
      headerName: "번호",
      width: 80,
    },
    {
      field: "NOTI_TL",
      headerName: "제목",
      width: 500,
      flexGrow: "1",

      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();

          const api = params.api;
          const thisRow = {};

          api.getAllColumns().filter((c) => c.field !== "__check__" && !!c).forEach(

            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))

          );

          return routeChange(thisRow["id"]);
        };

        return <Button onClick={onClick}>{params.row["NOTI_TL"]} </Button>;
      },
    },
    {
      field: "USE_YN",
      headerName: "사용여부",
      width: 100,
      flexGrow: "1",
    },
    {
      field: "REG_DT",
      headerName: "등록일자",
      width: 140,
      flexGrow: "1",
    },
  ];

  const getBackgroundColor = (color, mode) => mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

  return (
    <div>
      <Typography variant="h7" noWrap component="div" sx={headingTextStyle}>
        목록 (총 건수 : {rows.length} 건)
      </Typography>
      <Divider sx={{ padding: 2, border: "none" }} />
      <Box
        sx={{
          height: 860,
          width: "100%", 
          "& .super-app-theme--unsuccess": {
            bgcolor: (theme) =>
              getBackgroundColor(
                theme.palette.warning.main,
                theme.palette.mode
              ),
          },
        }}
      >
        <DataGrid rows={rows} columns={columns} pageSize={15} rowHeight={50} rowsPerPageOptions={[15]}
          getRowClassName={(params) => `super-app-theme--${params.row.status}`}
          checkboxSelection disableSelectionOnClick experimentalFeatures={{ newEditingApi: true }}
          initialState={{
            sorting: {
              sortModel: [{ field: "REG_DT", sort: "desc" }],
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
      <Button variant="contained" className="selectBtn" startIcon={<DeleteIcon />} onClick={deleteItem}>
        삭제
      </Button>
    </div>
  );
}
