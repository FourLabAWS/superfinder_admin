import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const UserAdminInquiryModal = ({
  modalObj,
  onClose,
  selectedUser /*onEdit*/,
}) => {
  return (
    <Dialog open={modalObj} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>사용자 정보</DialogTitle>
      <DialogContent>
        <Typography>아이디: {selectedUser?.admnrId}</Typography>
        <Typography>이름: {selectedUser?.admnrNm}</Typography>
        <Typography>이메일: {selectedUser?.admnrEmail}</Typography>
      </DialogContent>
      <DialogActions>
        <Button /*onClick={onEdit}*/>수정</Button>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserAdminInquiryModal;
