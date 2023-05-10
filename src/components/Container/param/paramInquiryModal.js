import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../Table/styles.css";
import "./param.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

// 함수 시작
const ParamInquiryModal = ({ modalObj, onClose, selectedParam }) => {
  const [formData, setFormData] = useState({
    paramNm: "",
    paramVal: "",
    pixel: "",
    dpi: "",
    flagDownRate: "",
    customMaxRate: "",
    customMinRate: "",
  });

  useEffect(() => {
    setFormData({
      ...selectedParam,
    });
  }, [selectedParam]);

  const doSave = async (event) => {
    event.preventDefault();
    if (!window.confirm("선택한 파라미터를 수정하겠습니까?")) {
      return;
    }
    try {
      await updateParam(formData);
      alert("수정되었습니다.");
      onClose();
      window.location.reload(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateParam = async (formData) => {
    const editUrl = `https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/editParam/`;
    try {
      await axios.put(
        editUrl,
        {
          paramNm: formData.paramNm,
          plcId: formData.plcId,
          plcNm: formData.plcNm,
          hzLnth: formData.hzLnth,
          vrLnth: formData.vrLnth,
          unitNm: formData.unitNm,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={modalObj} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>파라미터 정보</DialogTitle>
      <DialogContent>
        <form onSubmit={doSave}>
          <Grid container spacing={2}>
            <Grid item xs={12}></Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                id="paramNm"
                name="paramNm"
                label="파라미터"
                fullWidth
                value={formData.paramNm}
                required
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                id="pixel"
                name="pixel"
                label="픽셀"
                fullWidth
                value={formData.pixel}
                required
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                id="dpi"
                name="dpi"
                label="도트 퍼 인치"
                fullWidth
                value={formData.dpi}
                required
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                id="flagDownRate"
                name="flagDownRate"
                label="깃발 최소 비율"
                fullWidth
                value={formData.flagDownRate}
                required
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                id="customMaxRate"
                name="customMaxRate"
                label="깃발 보정 최대치"
                fullWidth
                value={formData.customMaxRate}
                required
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                id="customMinRate"
                name="customMinRate"
                label="깃발 보정 최소치"
                fullWidth
                value={formData.customMinRate}
                required
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={doSave} sx={{ width: "100px", marginRight: "1%" }}>
          수정
        </Button>
        <Button variant="contained" onClick={onClose} sx={{ width: "100px", marginRight: "1%" }}>
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ParamInquiryModal;
