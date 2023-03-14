import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import NoticeList from './NoticeList';
import { client } from '../../../routes/routes';

import '../../Table/styles.css'

const btnSearch = {
  width: "50%",
  fontSize: 12, 
  marginLeft: '50%', 
  height: '100%'
}

export default function Notice() {
    const [text, setText] = React.useState("");
    const [rows, setPosts] = React.useState([]);
    
    const handleFilter = () => {

        client.get('getNotiList').then((response) => {
            let data = []
            response.data["Items"].map((item) => {
                data.push({
                    notiTl: item['NOTI_TL']['S'],
                })
            })
            setPosts(data);
        });
    };

    const handleInput = e => {
        setText(e.target.value);
    }
/*
    React.useEffect(() => {
        client.get('getNotiList').then((response) => {
            let data = []
            response.data["Items"].map((item) => {
                
            })
            setPosts(data);
        });
    }, []);
*/
    return (
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 2 }}>
        <br />
        <Toolbar />
        <Typography variant="h7" noWrap component="div" sx={{fontWeight: 550}}>
            공지사항
        </Typography>
        <br />
        <div>
          <FormGroup sx={{ width: "100%" }}>
              <Grid container spacing={0} component={Paper} padding={2} variant='outlined'>
                  <Grid container spacing={1}>
                      <Grid item xs={10}>
                          <Grid container spacing={1}>
                              <Grid item xs={2} backgroundColor='#1976d2' color='#fff' marginTop={1} width="10%">
                                  <Box component="div" align="center">
                                      제목
                                  </Box>
                              </Grid>
                              <Grid item xs={5}>
                                <TextField
                                  sx={{ height: '70%' }}
                                  value={text}
                                  onChange={handleInput}
                                  id="outlined-basic" variant="outlined"
                                  size='small'
                                  fullWidth
                                  placeholder='제목을 입력하세요'
                                />
                              </Grid>
                          </Grid>
                      </Grid>

                      <Grid item xs={2}>
                          <Button 
                            variant="contained" 
                            size="large" 
                            sx={btnSearch} 
                            startIcon={<SearchIcon />} 
                            onClick={
                              handleFilter
                            }>
                              검색
                          </Button>
                      </Grid>
                  </Grid>
              </Grid>
          </FormGroup>
          <Divider sx={{ padding: 2, border: "none" }} />
          <NoticeList data={rows} />
        </div>
      </Box>
    );
}