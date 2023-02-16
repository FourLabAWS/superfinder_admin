import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { client } from '../../routes/routes';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import './styles.css'


export default function ImgBox(props) {
    const data = props.data

    const handleImage = (e, pathName, fileName) => {
        const FileSaver = require('file-saver');
        let path = 'getimage/1'
        if (pathName !== undefined && fileName !== undefined) {
            client.get(path, {
                responseType: 'blob',
                params: {
                    path: pathName['S']
                }
            }).then((response) => {
                console.log('param', pathName)
                FileSaver.saveAs(response.data, fileName['S']);
            })
        }

    }

    return (
        <React.Fragment>
            <Grid container spacing={0}>

                <Grid item xs={6} sx={{ borderRight: 1, borderTop: 1, borderColor: '#D3D3D3' }}>
                    <Grid item xs={12} sx={{ borderBottom: 1, backgroundColor: '#1976d2', color: '#fff' }}>
                        <div className='title'>원본 이미지</div>
                    </Grid>
                    <Grid container spacing={0} sx={{ padding: 2 }}>
                        <Grid item xs={5}>
                            <img className='imageBox' src={`data:image/jpg;base64,${data['original_img']}`} alt='default' />
                        </Grid>
                        <Grid item xs={7}>
                            <Paper elevation={0} square className='imgdesc'>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary="크기:"
                                        />
                                        {data['originW'] !== undefined && data['originW']['S']} x {data['originH'] !== undefined && data['originH']['S']}
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="용량:"
                                        />
                                        {data['origin_file_size'] !== undefined && data['origin_file_size']['N']} KB
                                    </ListItem>

                                </List>
                                <Button variant="contained" size='small'
                                    onClick={(e) => {
                                        handleImage(e, data['original_path'], data['original_file']);
                                    }}>이미지 다운로드</Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6} sx={{ borderRight: 1, borderTop: 1, borderColor: '#D3D3D3' }}>
                    <Grid item xs={12} sx={{ borderBottom: 1, backgroundColor: '#1976d2', color: '#fff' }}>
                        <div className='title'>변환 이미지</div>
                    </Grid>
                    <Grid container spacing={0} sx={{ padding: 2 }}>
                        <Grid item xs={5}>
                            <img className='imageBox' src={`data:image/jpg;base64,${data['converted_img']}`} alt='converted' />
                        </Grid>
                        <Grid item xs={7}>
                            <Paper elevation={0} square className='imgdesc'>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary="크기:"
                                        />
                                        {data['convW'] !== undefined && data['convW']['S']} x {data['convH'] !== undefined && data['convH']['S']}
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="용량:"
                                        />
                                        {data['conv_file_size'] !== undefined && data['conv_file_size']['N']} KB
                                    </ListItem>

                                </List>
                                <Button variant="contained" size='small' onClick={(e) => {
                                    handleImage(e, data['converted_path'], data['converted_file']);
                                }}>이미지 다운로드</Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>




        </React.Fragment>
    );
}