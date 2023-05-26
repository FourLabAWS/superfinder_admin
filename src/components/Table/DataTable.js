import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { client } from "../../routes/routes";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { darken, lighten } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles.css";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { ImageModal } from "../Popup";
import { Modal } from "@mui/material";
import { ImageTablePopup } from "../Popup/ModalContents";
// import JSZipUtils from "jszip-utils";

const headingTextStyle = {
  fontWeight: 550,
};

export default function DataTable(props) {
  const rows = props.data;
  console.log(rows);
  const [selectedRows, setSelectedRows] = React.useState([]);
  //
  let navigate = useNavigate();

  // 모달 start
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const modalStyle = {
    position: "absolute",

    //
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    minWidth: "60vw",
    maxWidth: "80vw",
    maxHeight: "70vh",

    overflow: "overlay",

    bgcolor: "background.paper",
    //   border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const [id, setId] = React.useState(0);
  const [deviceId, setDeviceId] = React.useState("");
  const [regDate, setRegDate] = React.useState();
  const [size, setSize] = React.useState();
  const [img, setImg] = React.useState();

  function GridSelected(data) {
    console.log("test", data);

    setId(data["id"]);
    setDeviceId(data["device_id"]);
    setRegDate(data["date"]);
    setSize(data["flag_size"]);
    setOpen(true);
  }

  // 모달 end

  //
  // function routeChange(data) {
  //   let path = `/management/` + data;
  //   console.log("testing", data);
  //   navigate(path);
  //   setOpen(true);
  // }

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
      field: "img",
      headerName: "이미지",
      width: 140,
      renderCell: (params) => (
        <img
          src={`https://superfind.s3.ap-northeast-2.amazonaws.com/${params.row.origin_path}`}
          alt="Row Image"
          width="50"
          height="50"
        />
      ),
    },
    {
      field: "id",
      headerName: "번호",
      width: 90,
      hide: true,
    },
    {
      field: "fileName",
      headerName: "파일명",
      width: 400,

      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();

          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
          return GridSelected(thisRow);
        };
        return (
          <ImageModal btnTxt={params.row["fileName"]} onClick={onClick}></ImageModal>
        );
        // <Butzton onClick={onClick}>{params.row["fileName"]}</Butzton>;
      },
    },
    {
      field: "status",
      headerName: "상태",
      width: 120,
    },
    {
      field: "device_id",
      headerName: "디바이스 ID",
      width: 200,
    },
    {
      field: "flag_size",
      headerName: "깃발 크기",
      width: 200,
    },
    {
      field: "date",
      headerName: "등록일자",
      width: 140,
    },
  ];

  const downloadImage = () => {
    const zip = new JSZip();
    const FileSaver = require("file-saver");
    selectedRows.map((item) => {
      let dataId = item["id"];
      let path = "getimage/" + dataId;
      client.get(path, { responseType: "blob" }).then((response) => {
        //FileSaver.saveAs(response.data, item['fileName']);
        console.log("img data", typeof response.data);
        zip.file(item["fileName"], response.data);
      });
    });
    //console.log(zip.files, zip)
    zip.generateAsync({ type: "blob" }).then((content) => {
      console.log(content);
      saveAs(content, "flags.zip");
    });
  };

  const getBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h7" noWrap component="div" sx={headingTextStyle}>
          이미지리스트 (총 건수 : {rows.length} 건)
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "start",

            width: "auto",

            gap: "10px",
          }}
        >
          <Button
            variant="contained"
            className="downloadButton"
            startIcon={<DownloadIcon />}
            onClick={downloadImage}
            style={{
              wordBreak: "keep-all",
            }}
          >
            다운로드
          </Button>
          <Button
            variant="contained"
            className="selectBtn"
            sx={{ marginLeft: "2%" }}
            startIcon={<DeleteIcon />}
            onClick={deleteItem}
            style={{
              wordBreak: "keep-all",
            }}
          >
            삭제
          </Button>
        </div>
      </div>

      <Divider sx={{ padding: 2, border: "none" }} />
      <Box
        sx={{
          height: 600,
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
          //ssr로 변경 필요..
          // paginationMode="server"
          keepNonExistentRowsSelected
          pageSize={15}
          //
          rowHeight={50}
          rowsPerPageOptions={[5]}
          rowSelectionModel={15}
          //
          getRowClassName={(params) => `super-app-theme--${params.row.status}`}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          initialState={{
            sorting: {
              sortModel: [{ field: "date", sort: "desc" }],
            },
          }}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = rows.filter((row) => selectedIDs.has(row.id));

            setSelectedRows(selectedRows);
          }}
        />
        {/* 팝업 페이지 */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <ImageTablePopup id={id} deviceId={deviceId} />
          </Box>
        </Modal>
      </Box>
      <Divider sx={{ padding: 1, border: "none" }} />
    </div>
  );
}
