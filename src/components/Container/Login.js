import * as React from "react";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LockIcon from "@mui/icons-material/Lock";

import { client } from '../../routes/routes';
import "./styles.css";


const btnStyle = {
  width: "100%",
};

//const adminCreds = { Id: "sadmin", pass: "superfinder123" };

export default function Container() {
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [ID, setID] = React.useState("");
  const [passwd, setPass] = React.useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = (Id, pass) => {
    client.get('getadmin/' + ID)
      .then(response => {
        if (response.data.Item != null){
          if (Id === response.data.Item.ADMNR_ID.S && pass === response.data.Item.ADMNR_PW.S) {
            alert('로그인에 성공했습니다.');
            localStorage.setItem("authenticated", true);
            localStorage.setItem("user", Id);
            navigate("/");
            window.location.reload(false);
          } else {
            alert('아이디/패스워드를 확인해주세요.');
          }
        } else {
          alert('일치하는 아이디가 없습니다.');
        }
      })
      .catch(error => {
        console.log(error);
      })
  };
  const onCheckEnter = (e) => {
    if (e.key === 'Enter') {
      handleLogin(ID, passwd);
    }
  };

  return (
    <div
      className="login"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper sx={{ padding: "0", width: "100vw" }} elevation={0}>
        <Grid
          container
          //   spacing={"30px"}
          gap={"48px"}
          justifyContent={"center"}
          m={"0"}
          pt={"60px"}
        >
          <Grid
            container
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box width={"222px"} height={"60px"}>
              <img className="logo" src="Ci_4-lab_com.gif" />
            </Box>

            <Typography
              variant="h7"
              sx={{
                textAlign: "center",
                wordBreak: "keep-all",

                mt: "10px",
              }}
              color="black"
            >
              슈퍼샷/슈퍼파인더 관리자 로그인
            </Typography>
          </Grid>

          {/* <br /> */}

          <Grid
            container
            direction={"column"}
            justifyContent={"center"}
            spacing={0}
            width={"40vw"}
            minWidth={"280px"}
            maxWidth={"400px"}
            sx={{}}
          >
            {/* id input */}
            <Grid container spacing={0}>
              <OutlinedInput
                fullWidth
                id="outlined-adornment-amount"
                value={ID}
                variant="filled"
                onChange={(e) => {
                  setID(e.target.value);
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <PermIdentityIcon />
                  </InputAdornment>
                }
                placeholder="사용자 ID를 입력하십시오"
              />
            </Grid>

            {/* pw input */}
            <Grid container spacing={0} sx={{ marginTop: "2%" }}>
              <OutlinedInput
                fullWidth
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={passwd}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="비밀번호를 입력하세요"
                onKeyPress={onCheckEnter}
              />
            </Grid>

            {/* login btn */}
            <Grid container spacing={0} sx={{ marginTop: "2%" }}>
              <Button
                variant="contained"
                size="large"
                sx={btnStyle}
                onClick={(event) => handleLogin(ID, passwd)}
              >
                로그인
              </Button>
            </Grid>
          </Grid>

          {/*  */}
          <Grid container spacing={0} sx={{}} justifyContent={"center"}>
            <ul className="" style={{}}>
              <li>본 시스템은 허가된 사용자만 접근할 수 있습니다.</li>
              <li>계정은 관리자에게 문의해 주세요.</li>
            </ul>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
