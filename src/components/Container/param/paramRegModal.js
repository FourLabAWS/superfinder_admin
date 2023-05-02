import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import { useState } from "react";
import "../../Table/styles.css";
import "./param.css";

// 함수 시작
function ParamRegModal(obj) {
  const modalObj = obj.modalObj;
  const [formData, setFormData] = useState({
    PARAM_NM: "",
    PARAM_VAL: "",
    REG_ID: "sadmin",
    PIXEL: "",
    DPI: "",
    FLAG_DOWN_RATE: "",
    CUSTOM_MAX_RATE: "",
    CUSTOM_MIN_RATE: "",
  });

  // 파라미터 등록
  const doSave = async (event) => {
    event.preventDefault();
    if (!window.confirm("파라미터를 등록하겠습니까?")) {
      return;
    }
    const postUrl = "https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/paramReg";
    try {
      await axios.post(postUrl, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      obj.onClose();
      window.location.reload(false);
    } catch (error) {
      console.error(error);
    }
  };

  // 모달
  return (
    <Modal open={modalObj}>
      <Box
        className="modalBoxWrap"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          파라미터 등록
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="PARAM_NM"
                name="PARAM_NM"
                label={"파라미터 이름"}
                type="text"
                fullWidth
                value={formData.PARAM_NM}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    PARAM_NM: e.target.value,
                  })
                }
                required
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="PARAM_VAL"
                name="PARAM_VAL"
                label={"파라미터 값"}
                type="text"
                fullWidth
                value={formData.PARAM_VAL}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    PARAM_VAL: e.target.value,
                  })
                }
                required
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="PIXEL"
                name="PIXEL"
                label={"픽셀"}
                type="text"
                fullWidth
                value={formData.PIXEL}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    PIXEL: e.target.value,
                  })
                }
                required
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="DPI"
                name="DPI"
                label={"도트 퍼 인치"}
                type="text"
                fullWidth
                value={formData.DPI}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    DPI: e.target.value,
                  })
                }
                required
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="FLAG_DOWN_RATE"
                name="FLAG_DOWN_RATE"
                label={"깃발 비율"}
                type="text"
                fullWidth
                value={formData.FLAG_DOWN_RATE}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    FLAG_DOWN_RATE: e.target.value,
                  })
                }
                required
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="CUSTOM_MAX_RATE"
                name="CUSTOM_MAX_RATE"
                label={"커스텀 최대 비율"}
                type="text"
                fullWidth
                value={formData.CUSTOM_MAX_RATE}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    CUSTOM_MAX_RATE: e.target.value,
                  })
                }
                required
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="CUSTOM_MIN_RATE"
                name="CUSTOM_MIN_RATE"
                label={"커스텀 최소 비율"}
                type="text"
                fullWidth
                value={formData.CUSTOM_MIN_RATE}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    CUSTOM_MIN_RATE: e.target.value,
                  })
                }
                required
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
          </Grid>
          <div className="btn-area">
            <Button onClick={doSave} variant="contained" sx={{ mt: 2, mr: 1 }}>
              저장
            </Button>
            <Button variant="contained" sx={{ mt: 2, mr: 1 }} onClick={obj.onClose}>
              닫기
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
export default ParamRegModal;
