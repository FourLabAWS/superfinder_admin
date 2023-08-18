import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GridViewIcon from "@mui/icons-material/GridView";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "./sidebar.css";

const drawerWidth = 240;
const SideBarItems = [
  {
    id: 1,
    name: "대시보드",
    link: "/",
    icon: <GridViewIcon sx={{ color: "#1976d2" }} />,
  },
  {
    id: 2,
    name: "지역별 현황",
    link: "/map",
    icon: <GridViewIcon sx={{ color: "#1976d2" }} />,
  },
  {
    id: 3,
    name: "이미지 관리",
    link: "/analysis",
    icon: <ImageSearchIcon sx={{ color: "#1976d2" }} />,
    onClick: () => {
      window.location.reload();
    },
  },
  {
    id: 4,
    name: "공지사항",
    link: "/notice",
    icon: <ImageSearchIcon sx={{ color: "#1976d2" }} />,
  },
  {
    id: 5,
    name: "사용자 관리",
    link: "/userAdmin",
    icon: <ImageSearchIcon sx={{ color: "#1976d2" }} />,
  },
  {
    id: 14,
    name: "유저 관리",
    link: "/user",
    icon: <ImageSearchIcon sx={{ color: "#1976d2" }} />,
  },
  {
    id: 10,
    name: "깃발 관리",
    link: "/flag",
    icon: <ImageSearchIcon sx={{ color: "#1976d2" }} />,
  },
  {
    id: 11,
    name: "파라미터 관리",
    link: "/param",
    icon: <ImageSearchIcon sx={{ color: "#1976d2" }} />,
  },
  {
    id: 12,
    name: "이벤트 관리",
    link: "/event",
    icon: <ImageSearchIcon sx={{ color: "#1976d2" }} />,
  },
  // {
  //   id: 13,
  //   name: "즐겨찾기 관리",
  //   link: "/bookmark",
  //   icon: <ImageSearchIcon sx={{ color: "#1976d2" }} />,
  // },
  //{ id: 99, name: '게시판', link: '/board', icon: <ImageSearchIcon sx={{ color: '#1976d2' }} /> },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar sx={{ background: "white" }}>
        <Typography
          variant="h6"
          fontWeight={600}
          marginLeft="26%"
          component={Link}
          to="/"
          color="black"
          sx={{ textDecoration: "none" }}
        >
          ADMIN
        </Typography>
      </Toolbar>

      <Divider />
      <br />
      <List>
        {SideBarItems.map((menu) => (
          <ListItem
            key={menu.id}
            disablePadding
            component={Link}
            to={menu.link}
          >
            <ListItemButton
              onClick={() =>
                location.pathname === menu.link && window.location.reload()
              }
            >
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "13px",
                  color: "black",
                  fontWeight: 600,
                }}
                primary={menu.name}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
