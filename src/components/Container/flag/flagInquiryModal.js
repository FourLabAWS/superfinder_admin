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
import "./flag.css";

const FlagInquiryModal = ({ modalObj, onClose, selectedFlag, onEdit }) => {
  const [formData, setFormData] = useState({
    flagCd: "",
    plcId: "",
    hzLnth: "",
    vrLnth: "",
  });

  const [changeUnit, setChangeUnit] = useState("cm");

  useEffect(() => {
    setFormData(selectedFlag);
  }, [selectedFlag]);

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const [unit, setUnit] = useState("cm");

  const handleUnitChange = (event) => {
    const newUnit = event.target.value;
    const { hzLnth, vrLnth } = formData;

    let newHzLnth, newVrLnth;

    if (unit === "cm" && newUnit === "inch") {
      newHzLnth = Math.round((hzLnth / 2.54) * 10) / 10;
      newVrLnth = Math.round((vrLnth / 2.54) * 10) / 10;
    } else if (unit === "inch" && newUnit === "cm") {
      newHzLnth = Math.round(hzLnth * 2.54);
      newVrLnth = Math.round(vrLnth * 2.54);
    } else {
      newHzLnth = hzLnth;
      newVrLnth = vrLnth;
    }

    setFormData({
      ...formData,
      hzLnth: newHzLnth,
      vrLnth: newVrLnth,
    });

    setUnit(newUnit);
    setChangeUnit(newUnit);
  };

  const [error, setError] = useState({
    hzLnth: false,
    vrLnth: false,
  });

  const MAX_CM_HZ = "60";
  const MIN_CM_HZ = "38";
  const MAX_INCH_HZ = "24";
  const MIN_INCH_HZ = "15";
  const MAX_CM_VR = "45";
  const MIN_CM_VR = "27";
  const MAX_INCH_VR = "18";
  const MIN_INCH_VR = "10";
  const DEFAULT_HZ_LNTH = "38";
  const DEFAULT_VR_LNTH = "27";

  const handleNumberInputChange = (event) => {
    const { name, value } = event.target;

    const min =
      changeUnit === "cm"
        ? name === "hzLnth"
          ? MIN_CM_HZ
          : MIN_CM_VR
        : name === "hzLnth"
        ? MIN_INCH_HZ
        : MIN_INCH_VR;
    const max =
      changeUnit === "cm"
        ? name === "hzLnth"
          ? MAX_CM_HZ
          : MAX_CM_VR
        : name === "hzLnth"
        ? MAX_INCH_HZ
        : MAX_INCH_VR;

    let newValue = value;
    if (value === "") {
      newValue = name === "hzLnth" ? DEFAULT_HZ_LNTH : DEFAULT_VR_LNTH;
    } else if (value.length > 3) {
      newValue = value.substring(0, 3);
    }

    if (name === "hzLnth") {
      setFormData({ ...formData, hzLnth: newValue });
    } else {
      setFormData({ ...formData, vrLnth: newValue });
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    if (
      /^\d*$/.test(value) &&
      parseFloat(value) >= parseFloat(min) &&
      parseFloat(value) <= parseFloat(max)
    ) {
      setError({ ...error, [name]: false });
    } else {
      setError({ ...error, [name]: true });
    }
  };

  const doSave = async (event) => {
    event.preventDefault();

    if (!window.confirm("선택한 깃발을 수정하겠습니까?")) {
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
    const editUrl = `https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/editFlag/`;
    try {
      await axios.put(
        editUrl,
        {
          flagCd: formData.flagCd,
          plcId: formData.plcId,
          hzLnth: formData.hzLnth,
          vrLnth: formData.vrLnth,
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
      <DialogTitle>깃발 정보</DialogTitle>
      <DialogContent>
        <form onSubmit={doSave}>
          <Grid container spacing={2}>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                id="plcId"
                name="plcId"
                label="장소 아이디"
                fullWidth
                value={formData.plcId}
                required
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                id="hzLnth"
                name="hzLnth"
                label={`가로 (${unit})`}
                fullWidth
                value={formData.hzLnth}
                onChange={handleFormChange}
                required
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                id="vrLnth"
                name="vrLnth"
                label={`세로 (${unit})`}
                fullWidth
                value={formData.vrLnth}
                onChange={handleFormChange}
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
        <Button
          variant="contained"
          onClick={doSave}
          sx={{ width: "100px", marginRight: "1%" }}
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

export default FlagInquiryModal;
