import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useParams } from "react-router-dom";

import { client } from "../../routes/routes";

export const BasicModal = ({ ...props }) => {
  const { children, openBtn } = props;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",

    //
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    width: "50vw",
    maxHeight: "60vh",

    bgcolor: "background.paper",
    //   border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      {/* <div width={"inherit"} bgcolor={"#424242"} onClick={handleOpen}>
        {openBtn}
      </div> */}
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};

// 그리드 모달
export const ImageModal = ({ ...props }) => {
  const { children, openBtn, btnTxt, onClick } = props;

  const [open, setOpen] = React.useState(false);
  const [path, setPath] = React.useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",

    //
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    width: "50vw",
    maxHeight: "60vh",

    bgcolor: "background.paper",
    //   border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  // image dtl page
  const inch = 0.4;
  const params = useParams();
  const [inchW, setWidth] = React.useState(0);
  const [inchH, setHeight] = React.useState(0);
  const [rowData, setData] = React.useState({});
  const [memo, setMemo] = React.useState("");
  // let navigate = useNavigate();

  const goToPrev = () => {
    // navigate('/analysis');
  };

  const updateItem = () => {
    const obj = params["id"];
    const path = "getdata/update/" + obj;
    console.log(path, memo);

    client
      .patch(path, {
        body: JSON.stringify(memo),
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  React.useEffect(() => {
    client.get("getdata/" + params["id"]).then((response) => {
      setData(response["data"]["Item"]);
    });
  }, []);

  React.useEffect(() => {
    rowData["flagW"] !== undefined &&
      setWidth(rowData["flagW"]["S"].split(" ")[0] * inch);
  }, [rowData]);
  React.useEffect(() => {
    rowData["flagH"] !== undefined &&
      setHeight(rowData["flagH"]["S"].split(" ")[0] * inch);
  }, [rowData]);
  React.useEffect(() => {
    rowData["memo"] !== undefined && setMemo(rowData["memo"]["S"]);
  }, [rowData]);

  return (
    <div>
      {/* <div width={"inherit"} bgcolor={"#424242"} onClick={handleOpen}>
        {openBtn}
      </div> */}
      <Button onClick={onClick}>{btnTxt}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};
