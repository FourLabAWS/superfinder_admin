import * as React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import "../../Table/styles.css";
import "./flag.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

// 함수 시작
function FlagRegModal(obj) {
  const modalObj = obj.modalObj;
  const [formData, setFormData] = useState({
    PLC_ID: "",
    PLC_NM: "",
    PLC_LAT: "",
    PLC_LNG: "",
    UNIT_NM: "cm",
    HZ_LNTH: "38",
    VR_LNTH: "27",
    REG_ID: "sadmin",
    REG_SE: "A",
    AUTH_YN: "N",
  });

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
        HZ_LNTH: minSize.cm.hz,
        VR_LNTH: minSize.cm.vr,
      });
    } else {
      setFormData({
        ...formData,
        UNIT_NM: "inch",
        HZ_LNTH: minSize.inch.hz,
        VR_LNTH: minSize.inch.vr,
      });
    }
  };

  useEffect(() => {
    const checkSize =
      formData.HZ_LNTH >= minSize[unit].hz &&
      formData.HZ_LNTH <= maxSize[unit].hz &&
      formData.VR_LNTH >= minSize[unit].vr &&
      formData.VR_LNTH <= maxSize[unit].vr;

    setDisabled(!checkSize);
  }, [formData, unit]);

  // 구글 장소 자동 완성 기능
  const apiKey = "AIzaSyBFRWvAechU0Ztnm5KDWl1FwAUt6as_3fQ";
  const autoCompleteRef = useRef(null);

  const handlePlaceSelect = (plcObj) => {
    //console.log(plcObj);
    let plcNm = plcObj.description;
    if (plcObj.structured_formatting) {
      plcNm = plcObj.structured_formatting.main_text;
    }
    // 위도와 경도 값 가져오기
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      {
        placeId: plcObj.place_id,
      },
      (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          const location = results[0].geometry.location;
          setFormData({
            ...formData,
            PLC_ID: plcObj.place_id,
            PLC_NM: plcNm,
            PLC_LAT: location.lat(),
            PLC_LNG: location.lng(),
          });
        } else {
          console.log(status);
        }
      }
    );
  };

  // 깃발 등록
  const doSave = async (event) => {
    event.preventDefault();
    // console.log(formData);
    if (!window.confirm("깃발을 등록하겠습니까?")) {
      return;
    }
    const postUrl =
      "https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/flagReg";
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
          깃발 등록
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <GooglePlacesAutocomplete
                apiKey={apiKey}
                autocompletionRequest={{
                  types: ["establishment"],
                  keyword: "golf course",
                  componentRestrictions: { country: "kr" },
                }}
                inputClassName="MuiInputBase-input MuiInput-input"
                inputStyle={{
                  height: "50px",
                  borderRadius: "4px",
                  boxShadow: "none",
                  fontSize: "1rem",
                  padding: "10px 12px",
                  border: "1px solid #ccc",
                  marginBottom: "8px", // 검색창과 가로 길이 입력창 사이의 간격 조정
                }}
                renderOption={(option) => (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1">
                      {option.structured_formatting.main_text}
                    </Typography>
                  </Box>
                )}
                renderSuggestions={(active, suggestions, onSelectSuggestion) => (
                  <div
                    style={{
                      position: "absolute",
                      zIndex: 100,
                      top: "110px", // 검색창 하단으로 이동
                      left: 0,
                      width: "100%",
                      backgroundColor: "#fff",
                      maxHeight: "200px",
                      overflowY: "auto",
                    }}
                  >
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion.place_id}
                        onClick={(event) => onSelectSuggestion(suggestion, event)}
                        style={{
                          padding: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <Typography variant="body1">
                          {suggestion.structured_formatting.main_text}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {suggestion.structured_formatting.secondary_text}
                        </Typography>
                      </div>
                    ))}
                  </div>
                )}
                ref={autoCompleteRef}
                onSelect={handlePlaceSelect}
                placeholder="골프장을 입력하세요"
              />
            </Grid>
            <Grid item container xs={6} alignItems="flex-end">
              <TextField
                id="HZ_LNTH"
                name="HZ_LNTH"
                label={`가로 (${unit})`}
                type="number"
                fullWidth
                value={formData.HZ_LNTH}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    HZ_LNTH: e.target.value,
                  })
                }
                error={
                  formData.HZ_LNTH < minSize[unit].hz ||
                  formData.HZ_LNTH > maxSize[unit].hz
                }
                helperText={
                  formData.HZ_LNTH < minSize[unit].hz ||
                  formData.HZ_LNTH > maxSize[unit].hz
                    ? `가로 ${minSize[unit].hz} - ${maxSize[unit].hz}`
                    : ""
                }
                sx={{
                  height: "50px",
                }}
              />
            </Grid>
            <Grid item xs={6} alignItems="flex-end">
              <TextField
                id="VR_LNTH"
                name="VR_LNTH"
                label={`세로 (${unit})`}
                type="number"
                fullWidth
                value={formData.VR_LNTH}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    VR_LNTH: e.target.value,
                  })
                }
                error={
                  formData.VR_LNTH < minSize[unit].vr ||
                  formData.VR_LNTH > maxSize[unit].vr
                }
                helperText={
                  formData.VR_LNTH < minSize[unit].vr ||
                  formData.VR_LNTH > maxSize[unit].vr
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
          </Grid>
          <div className="btn-area">
            <Button
              onClick={doSave}
              variant="contained"
              sx={{ mt: 2, mr: 1 }}
              disabled={disabled}
            >
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
export default FlagRegModal;
