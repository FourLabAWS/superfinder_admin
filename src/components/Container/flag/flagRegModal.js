import * as React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";
import { v4 as uuidv4 } from "uuid";
import "../../Table/styles.css";
import "./flag.css";

function FlagRegModal(obj) {
  const modalObj = obj.modalObj;
  const userInfo = obj.data;
  const [title, setTitle] = useState("깃발 등록");
  const [openCreateFlagModal, setOpenCreateFlagModal] = useState(false);
  const [formData, setFormData] = useState({
    flagCd: uuidv4(),
    plcId: "",
    hzLnth: "",
    vrLnth: "",
  });
  const [placeData, setPlaceData] = useState(null);
  const autocomplete = useRef(null);
  const apiKey = "AIzaSyBFRWvAechU0Ztnm5KDWl1FwAUt6as_3fQ";
  const onLoad = (autocomplete) => {
    console.log("autocomplete:", autocomplete);
  };

  const libraries = ["places"];
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      console.log(autocomplete.getPlace());
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  useEffect(() => {
    if (formData.plcId) {
      axios
        .get(
          `/maps/api/place/findplacefromtext/json?input=${formData.plcId}&inputtype=textquery&fields=name,formatted_address,geometry&key=${apiKey}`
        )

        .then((response) => {
          if (response.data.status === "OK") {
            setPlaceData(response.data.candidates[0]);
          } else {
            setPlaceData(null);
          }
        })
        .catch((error) => {
          console.error(error);
          setPlaceData(null);
        });
    } else {
      setPlaceData(null);
    }
  }, [formData.plcId]);

  const [unit, setUnit] = useState("cm");

  const toggleUnit = () => {
    if (unit === "cm") {
      setFormData({
        ...formData,
        hzLnth: (formData.hzLnth * 0.3937007874).toFixed(2),
        vrLnth: (formData.vrLnth * 0.3937007874).toFixed(2),
      });
      setUnit("in");
    } else {
      setFormData({
        ...formData,
        hzLnth: (formData.hzLnth / 0.3937007874).toFixed(2),
        vrLnth: (formData.vrLnth / 0.3937007874).toFixed(2),
      });
      setUnit("cm");
    }
  };

  const handleOpenCreateFlagModal = () => {
    setOpenCreateFlagModal(true);
  };

  const handleCloseCreateFlagModal = () => {
    setOpenCreateFlagModal(false);
  };

  const handleFormChange = (event) => {
    if (/^\d*$/.test(event.target.value)) {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const [error, setError] = useState({
    hzLnth: false,
    vrLnth: false,
  });

  const handleNumberInputChange = (event) => {
    const { name, value, min, max } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (
      /^\d*$/.test(value) &&
      parseInt(value) >= min &&
      parseInt(value) <= max
    ) {
      setError({ ...error, [name]: false });
    } else {
      setError({ ...error, [name]: true });
    }
  };

  const doSave = (event) => {
    event.preventDefault();

    const updatedFormData = {
      ...formData,
    };

    if (!updatedFormData.flagCd) {
      updatedFormData.flagCd = uuidv4();
    }

    createFlag(updatedFormData)
      .then(() => {
        handleCloseCreateFlagModal();
        obj.onClose();
        window.location.reload(false);
        console.log(updatedFormData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createFlag = async (updatedFormData) => {
    let rtnData = null;
    const postUrl =
      "https://ji40ssrbe6.execute-api.ap-northeast-2.amazonaws.com/v1/flagReg";
    try {
      const response = await axios.post(postUrl, updatedFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      rtnData = response.data;
    } catch (error) {
      console.error(error);
    }
    return rtnData;
  };
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
          {title}
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <input
                type="hidden"
                id="flagCd"
                name="flagCd"
                value={formData.flagCd}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
                <Autocomplete
                  ref={autocomplete}
                  onLoad={onLoad}
                  onPlaceChanged={onPlaceChanged}
                >
                  <TextField
                    type="text"
                    id="plcId"
                    name="plcId"
                    label="장소 아이디"
                    fullWidth
                    value={formData.plcId}
                    onChange={handleFormChange}
                    required
                    sx={{
                      height: "50px",
                      my: 2,
                    }}
                  />
                </Autocomplete>
              </LoadScript>
              {placeData && (
                <Typography variant="body2" gutterBottom>
                  {placeData.name}, {placeData.formatted_address}
                </Typography>
              )}
            </Grid>
            <Grid
              item
              container
              xs={12}
              spacing={2}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid item xs={6}>
                <TextField
                  id="hzLnth"
                  name="hzLnth"
                  label={`가로 (${unit})`}
                  type="number"
                  fullWidth
                  value={formData.hzLnth}
                  onChange={handleNumberInputChange}
                  required
                  error={error.hzLnth}
                  helperText={error.hzLnth ? "올바른 값을 입력해주세요" : ""}
                  inputProps={{ min: 38, max: 60, step: 1 }}
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
                  onChange={handleNumberInputChange}
                  required
                  error={error.vrLnth}
                  helperText={error.vrLnth ? "올바른 값을 입력해주세요" : ""}
                  inputProps={{ min: 27, max: 45, step: 1 }}
                  sx={{
                    height: "50px",
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button variant="outlined" onClick={toggleUnit}>
                Toggle to {unit === "cm" ? "inches" : "centimeters"}
              </Button>
            </Grid>
          </Grid>
          <div className="btn-area">
            <Button
              onClick={doSave}
              variant="contained"
              sx={{ mt: 2, mr: 1 }}
              disabled={error.hzLnth || error.vrLnth || !formData.plcId}
            >
              저장
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 2, mr: 1 }}
              onClick={obj.onClose}
            >
              취소
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

export default FlagRegModal;
