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
import "./bookmark.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

// 함수 시작
const BookMarkInquiryModal = ({ modalObj, onClose, selectedBookMark }) => {
  const [formData, setFormData] = useState({
    plcId: "",
    plcNm: "",
    plcLat: "",
    plcLng: "",
    unitNm: "cm",
    hzLnth: "38",
    vrLnth: "27",
    regId: "sadmin",
    regSe: "A",
  });

  useEffect(() => {
    setFormData({
      ...selectedBookMark,
    });
  }, [selectedBookMark]);

  // CM, INCH 담을 useState
  const [unit, setUnit] = useState("cm");
  const [disabled, setDisabled] = useState(false); // 저장 비활성화 버튼

  const minSize = {
    cm: { hz: "38", vr: "27" },
    inch: { hz: "14", vr: "10" },
  };

  const maxSize = {
    cm: { hz: 60, vr: 50 },
    inch: { hz: 23, vr: 19 },
  };

  // 단위 변환
  const handleUnitChange = (event) => {
    setUnit(event.target.value);
    setFormData({
      ...formData,
      UNIT_NM: event.target.value,
    });

    if (event.target.value === "cm") {
      setFormData({
        ...formData,
        UNIT_NM: "cm",
        hzLnth: selectedBookMark.hzLnth || minSize.cm.hz,
        vrLnth: selectedBookMark.vrLnth || minSize.cm.vr,
      });
    } else {
      setFormData({
        ...formData,
        UNIT_NM: "inch",
        hzLnth: selectedBookMark.hzLnth || minSize.inch.hz,
        vrLnth: selectedBookMark.vrLnth || minSize.inch.vr,
      });
    }
  };

  useEffect(() => {
    const checkSize =
      formData.hzLnth >= minSize[unit].hz &&
      formData.hzLnth <= maxSize[unit].hz &&
      formData.vrLnth >= minSize[unit].vr &&
      formData.vrLnth <= maxSize[unit].vr;

    setDisabled(!checkSize);
  }, [formData, unit]);

  const doSave = async (event) => {
    event.preventDefault();
    if (!window.confirm("선택한 골프장을 수정하겠습니까?")) {
      return;
    }
    try {
      await updateFlag(formData);
      alert("수정되었습니다.");
      onClose();
      window.location.reload(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateFlag = async (formData) => {
    const editUrl = `https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/bookMarkEdit`;
    try {
      await axios.post(
        editUrl,
        {
          PLC_ID: formData.plcId,
          PLC_NM: formData.plcNm,
          PLC_LAT: formData.plcLat,
          PLC_LNG: formData.plcLng,
          UNIT_NM: formData.unitNm,
          HZ_LNTH: formData.hzLnth.toString(),
          VR_LNTH: formData.vrLnth.toString(),
          REG_ID: "sadmin",
          REG_SE: "A",
          MOD_ID: "",
          MOD_SE: "",
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
      <DialogTitle>골프장 정보</DialogTitle>
      <DialogContent>
        <form onSubmit={doSave}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="text"
                id="plcNm"
                name="plcNm"
                label="골프장"
                fullWidth
                value={formData.plcNm}
                required
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="hzLnth"
                name="hzLnth"
                label={`가로 (${unit})`}
                type="number"
                fullWidth
                value={formData.hzLnth}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hzLnth: e.target.value,
                  })
                }
                error={
                  formData.hzLnth < minSize[unit].hz || formData.hzLnth > maxSize[unit].hz
                }
                helperText={
                  formData.hzLnth < minSize[unit].hz || formData.hzLnth > maxSize[unit].hz
                    ? `가로 ${minSize[unit].hz} - ${maxSize[unit].hz}`
                    : ""
                }
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="vrLnth"
                name="vrLnth"
                label={`세로 (${unit})`}
                type="number"
                fullWidth
                value={formData.vrLnth}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    vrLnth: e.target.value,
                  })
                }
                error={
                  formData.vrLnth < minSize[unit].vr || formData.vrLnth > maxSize[unit].vr
                }
                helperText={
                  formData.vrLnth < minSize[unit].vr || formData.vrLnth > maxSize[unit].vr
                    ? `세로 ${minSize[unit].vr} - ${maxSize[unit].vr}`
                    : ""
                }
                required
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
            <Grid item xs={12} container>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="unit"
                  name="row-radio-buttons-group"
                  value={unit}
                  onChange={handleUnitChange}
                >
                  <FormControlLabel value="cm" control={<Radio />} label="cm" />
                  <FormControlLabel value="inch" control={<Radio />} label="inch" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6} container>
              <TextField
                id="modId"
                label="등록자"
                value={formData.regId}
                readOnly
              ></TextField>
            </Grid>
            <Grid item xs={6} container>
              <TextField
                id="modId"
                label="등록일자"
                value={formData.regDt}
                readOnly
              ></TextField>
            </Grid>
            <Grid item xs={6} container>
              <TextField id="modId" label="수정자" value={formData.modId}></TextField>
            </Grid>
            <Grid item xs={6} container>
              <TextField id="modId" label="수정일자"></TextField>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={doSave}
          sx={{ width: "100px", marginRight: "1%" }}
          disabled={disabled}
        >
          수정
        </Button>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{ width: "100px", marginRight: "1%" }}
        >
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default BookMarkInquiryModal;
