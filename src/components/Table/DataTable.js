import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";
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

const today = new Date();

const headingTextStyle = {
  fontWeight: 550,
};

export default function DataTable(props) {
  const rows = props.data;
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
    maxHeight: "85vh",

    // overflow: "overlay",

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
  const [deviceModel, setDeviceModel] = React.useState();

  function GridSelected(data) {
    //console.log("test", data);

    setId(data["id"]);
    setDeviceId(data["device_id"]);
    setRegDate(data["date"]);
    setSize(data["flag_size"]);
    setOpen(true);
    setDeviceModel(data["device_model"]);
  }

  // 모달 end

  //
  // function routeChange(data) {
  //   let path = `/management/` + data;
  //   console.log("testing", data);
  //   navigate(path);
  //   setOpen(true);
  // }

  const [posts, setPosts] = React.useState([]);

  const fetchNewData = async (newPage = 1) => {
    try {
      // Initiate data migration
      await client.get("migrate_data");

      // Call the API to fetch the data for the new page
      const response = await client.get("getdata", {
        params: { page: newPage },
      });

      let data = [];
      response.data["Items"].map((item) => {
        if (item["deleted"]["BOOL"] === false) {
          data.push({
            id: item["id"]["N"],
            fileName: item["original_file"]["S"],
            status: item["error_status"]["S"],
            date: item["registered_date"]["S"],
            device_id: item["device_id"]["S"],
            flag_size: item["flagH"]["S"] + " x " + item["flagW"]["S"],
            origin_path: item["origin_path"]["S"],
            plc_lat: item["plc_lat"]?.S,
            plc_lng: item["plc_lng"]?.S,
            device_model: item["device_model"]?.S,
          });
        }
      });
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNewData();
  }, []);

  const openMapBtn = (params) => {
    const lat = params.row.plc_lat; // 위도
    const lng = params.row.plc_lng; // 경도

    // 구글 맵의 좌표를 포맷에 맞게 설정
    const url = `https://www.google.com/maps/?q=${lat},${lng}`;

    // 새 창에서 URL 열기
    window.open(url, "_blank");
  };

  const deleteItem = () => {
    selectedRows.map((item) => {
      client.delete("deleteItem/" + item["id"]).then((response) => {
        window.location.reload(false);
        return response;
      });
    });
  };

  const columns = [
    {
      field: "img",
      headerName: "이미지",
      width: 100,
      renderCell: (params) => (
        <img
          src={`https://superfind.s3.ap-northeast-2.amazonaws.com/${params.row.origin_path}`}
          alt="Row Image"
          width="80"
          height="80"
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
      width: 500,

      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();

          const api = params.api;
          const thisRow = {};
          // console.log(params.row["fileName"]);
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
      field: "flag_size",
      headerName: "깃발 크기",
      width: 100,
    },
    {
      field: "plc_lat",
      headerName: "위도",
      width: 100,
    },
    {
      field: "plc_lng",
      headerName: "경도",
      width: 100,
    },
    {
      field: "status",
      headerName: "상태",
      width: 120,
    },
    {
      field: "device_id",
      headerName: "디바이스 ID",
      width: 350,
    },
    {
      field: "date",
      headerName: "등록일자",
      width: 100,
    },
    {
      field: "map",
      headerName: "지도",
      width: 80,
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
      field: "device_model",
      headerName: "휴대폰 기종",
      width: 100,
    },
    {
      field: "count",
      headerName: "촬영 횟수",
      width: 100,
    },
  ];

  const downloadImage = () => {
    const zip = new JSZip();
    const FileSaver = require("file-saver");

    let dataToDownload = selectedRows.length > 0 ? selectedRows : rows;

    if (selectedRows && selectedRows.length > 0) {
      dataToDownload = selectedRows;
    }

    Promise.all(
      dataToDownload.map((item) => {
        const dataId = item["id"];
        const path = "getimage/" + dataId;
        return client.get(path, { responseType: "blob" }).then((response) => {
          zip.file(item["fileName"], response.data);
        });
      })
    )
      .then(() => {
        zip.generateAsync({ type: "blob" }).then((content) => {
          const fileName = `${today.getFullYear()}_${(today.getMonth() + 1)
            .toString()
            .padStart(2, "0")}_${today.getDate().toString().padStart(2, "0")}.zip`;
          FileSaver.saveAs(content, fileName);
        });
      })
      .catch((error) => {
        console.error(error);
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
          paginationMode="server"
          keepNonExistentRowsSelected
          pageSize={50}
          rowHeight={100}
          rowsPerPageOptions={[5]}
          rowSelectionModel={50}
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
          onPageChange={(newPage) => {
            // Fetch new data based on `newPage` index
            fetchNewData(newPage);
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
