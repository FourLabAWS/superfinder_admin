import React from "react";

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

const drawerWidth = "240px";
const SideBarItems = [
    { id: 1, name: '대시보드', link: '/', icon: <GridViewIcon sx={{ color: '#1976d2' }} /> },
    { id: 2, name: '이미지 관리', link: '/analysis', icon: <ImageSearchIcon sx={{ color: '#1976d2' }} /> },
    { id: 3, name: '공지사항', link: '/notice', icon: <ImageSearchIcon sx={{ color: '#1976d2' }} /> },
    { id: 4, name: '관리자 계정 조회', icon: <ImageSearchIcon sx={{ color: '#1976d2' }} /> },
    { id: 5, name: '관리자 계정 생성', icon: <ImageSearchIcon sx={{ color: '#1976d2' }} /> },
    { id: 99, name: '게시판', link: '/board', icon: <ImageSearchIcon sx={{ color: '#1976d2' }} /> },
]

const Sidebar = () => {
<<<<<<< HEAD
  const [openModal, setOpenSignUpModal] = useState(false); // 모달 창 열림 여부 상태
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    name: '',
    email: '',
  }); // 입력한 데이터 상태

  const handleOpenSignUpModal = () => {
    setOpenSignUpModal(true);
  };

  const handleCloseSignUpModal = () => {
    setOpenSignUpModal(false);
  };

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createAdminAccount(formData)
      .then(() => {
        insertAdminAccount({
          id: formData.id,
          password: formData.password,
          name: formData.name,
          email: formData.email
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const apiUrl = 'https://ouwwxbyxsf.execute-api.ap-northeast-2.amazonaws.com/signUp/signup';

  const createAdminAccount = async (formData) => {
    try {
      const response = await axios.post(apiUrl, formData, {
        //withCredentials: true,
        //withCredentials: false,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*' 
        }
      });
      console.log(response.data);
      handleCloseSignUpModal();
    } catch (error) {
      console.error(error);
    }
  };
  
  const insertAdminAccount = async (formData) => {
    try {
      const response = await axios.post(apiUrl, formData, {
        //withCredentials: true,
        //withCredentials: false,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
=======
>>>>>>> af0ebb3f2db7839a3622dcae8182214758583e4e
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
      <Toolbar sx={{width:"100%", background: "white" }}>
        <Typography variant="h6" fontWeight={600} component={Link} color="black" sx={{ textDecoration: "none" }} align="center" to="/">
          SuperFinder Admin
        </Typography>
      </Toolbar>
      <Divider />
      <br/>
      <List>
        {
          SideBarItems.map((menu) => (
            <ListItem key={menu.id} disablePadding component={Link} to={menu.link}>
<<<<<<< HEAD
              <ListItemButton onClick={menu.id === 5 ? handleOpenSignUpModal : null}>
=======
              <ListItemButton>
>>>>>>> af0ebb3f2db7839a3622dcae8182214758583e4e
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primaryTypographyProps={{fontSize: "13px", color: "black", fontWeight: 600}} primary={menu.name}/>
              </ListItemButton>
            </ListItem>
<<<<<<< HEAD
          ))}
        </List>
      </Drawer>
  
      {/* 모달 창 */}
      <Modal open={openModal} onClose={handleCloseSignUpModal}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            관리자 계정 생성
          </Typography>
          <Typography variant="body2" gutterBottom>
            아래 정보를 입력해주세요.
          </Typography>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="id"
                  name="id"
                  label="아이디"
                  value={formData.id}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  name="password"
                  label="비밀번호"
                  type="password"
                  value={formData.password}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  name="name"
                  label="이름"
                  value={formData.name}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="이메일"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              계정 생성
            </Button>
          </form>
        </Box>
      </Modal>
    </>
=======
          ))
        }
      </List>
    </Drawer>
>>>>>>> af0ebb3f2db7839a3622dcae8182214758583e4e
  );
};

export default Sidebar;
