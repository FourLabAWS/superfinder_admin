import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { RegIdStats, StatsRegDateCount, BasicCard } from "../Table/Stats";

const headingTextStyle = {
  fontWeight: 550,
};
export default function Container() {
  const [dashBoard, setDashBoard] = React.useState({
    shotCnt: 0, // 총 촬영 수
    deviceCnt: 0, // 총 기기 수
    newUser: 0, // 새 유저 수
    dateShot: [], //날짜별 촬영 수
    dateUser: [], //날짜별 가입 수
    newDevice: [], // 새로 가입된 기기와 촬영 수
    deviceShot: [],
  });

  React.useEffect(() => {
    let shotCntDta = Number(window.localStorage.getItem("shotCnt")) ?? 0;
    let deviceCntDta = Number(window.localStorage.getItem("deviceCnt")) ?? 0;
    let newUserDta = Number(window.localStorage.getItem("newUser")) ?? 0;
    let dateShotDta = JSON.parse(window.localStorage.getItem("dateShot")).map(
      (el, idx) => {
        return {
          id: idx,
          fir: el.date,
          sec: el.count,
        };
      }
    );
    let dateUserArr = JSON.parse(window.localStorage.getItem("dateUser")) ?? [];
    let dateUserDta = dateUserArr.map((el, idx) => {
      return {
        id: idx,
        fir: el.date,
        sec: el.count,
      };
    });
    let newDeviceDta = JSON.parse(window.localStorage.getItem("newDevice")).map(
      (el, idx) => {
        return {
          id: idx,
          fir: el.deviceModel,
          sec: el.shotCount,
        };
      }
    );
    let deviceShotDta = JSON.parse(window.localStorage.getItem("deviceShotCnt")).map(
      (el, idx) => {
        return {
          id: idx,
          fir: el.deviceModel,
          sec: el.shotCount,
        };
      }
    );

    setDashBoard((prev) => ({
      ...prev,
      shotCnt: shotCntDta,
      deviceCnt: deviceCntDta,
      dateShot: dateShotDta,

      dateUser: dateUserDta,
      newDevice: newDeviceDta,
      newUser: newUserDta,
      deviceShot: deviceShotDta,
    }));
  }, []);

  console.log(dashBoard);
  return (
    <Box component="main" sx={{ flexGrow: 20, bgcolor: "background.default", p: 2 }}>
      <br />
      <Toolbar />

      <Typography variant="h6" noWrap component="div" sx={headingTextStyle}>
        통계 데이터
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "0 auto",
          maxWidth: "1200px",
        }}
      >
        <BasicCard
          mainTxt={"총 이미지 수"}
          subTxt={"Total Picture Count"}
          data={dashBoard.shotCnt}
          route={"이미지 관리 >>"}
        />
        <BasicCard
          mainTxt={"총 회원 수"}
          subTxt={"Total User Count"}
          data={dashBoard.deviceCnt}
          route={"유저 관리 >>"}
        />
        <BasicCard
          mainTxt={"오늘 가입한 회원 수"}
          subTxt={"Today User Count"}
          data={dashBoard.newUser}
          route={""}
        />
      </Box>
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          gap: "100px",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "0 auto",
          maxWidth: "2200px",
        }}
      >
        <RegIdStats mainTxt={"날짜별 촬영 수"} date={"Y"} data={dashBoard.dateShot} />
        <RegIdStats mainTxt={"기기별 촬영 수"} data={dashBoard.deviceShot} />
        <RegIdStats mainTxt={"날짜별 가입 수"} date={"Y"} data={dashBoard.dateUser} />
        <RegIdStats mainTxt={"금일 가입 기기"} data={dashBoard.newDevice} />
      </Box>

      {/* <Stats /> */}
    </Box>
  );
}
