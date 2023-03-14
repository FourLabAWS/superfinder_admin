import { useState } from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import GridViewIcon from '@mui/icons-material/GridView';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import axios from 'axios';

const drawerWidth = 240;
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

const SideBarItems = [
  { id: 1, name: '대시보드', link: '/', icon: <GridViewIcon sx={{ color: '#1976d2' }} /> },
  { id: 2, name: '이미지 관리', link: '/analysis', icon: <ImageSearchIcon sx={{ color: '#1976d2' }} /> },
  { id: 3, name: '공지사항', link: '/analysis', icon: <ImageSearchIcon sx={{ color: '#1976d2' }} /> },
  { id: 4, name: '관리자 계정 조회', icon: <ImageSearchIcon sx={{ color: '#1976d2' }} /> },
  { id: 5, name: '관리자 계정 생성', icon: <ImageSearchIcon sx={{ color: '#1976d2' }} /> },
];

const Sidebar = () => {
  const [openModal, setOpenModal] = useState(false); // 모달 창 열림 여부 상태
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    name: '',
    email: '',
  }); // 입력한 데이터 상태

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };
  
  const insertAdminAccount = async (formData) => {
    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  return (
    <>
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
            <ListItem key={menu.id} disablePadding component={Link} to={menu.link}>
              <ListItemButton onClick={menu.id === 5 ? handleOpenModal : null}>
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
  
      {/* 모달 창 */}
      <Modal open={openModal} onClose={handleCloseModal}>
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
  );
};


export default Sidebar;
