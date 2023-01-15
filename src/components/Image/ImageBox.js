import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { client } from '../../routes/routes';
import './styles.css'

const btnStyle = {
    fontSize: 10,
    borderRadius: 1,
    marginLeft: '10%',
    borderColor: '#7986cb',
    background: '#7986cb',
    color: 'white',
    "&:hover": {
        backgroundColor: "#9fa8da",
        borderColor: '#9fa8da',
    }

}

export default function ImgBox(props) {
    const data = props.data

    const handleImage = (e, pathName) => {
        const FileSaver = require('file-saver');
        let path = 'getimage/1'
        if (pathName !== undefined) {
            client.get(path, {
                responseType: 'blob',
                params: {
                    path: pathName['S']
                }
            }).then((response) => {
                console.log('resp', response)
                FileSaver.saveAs(response.data, 'file.jpg');
            })
        }

    }


    return (
        <React.Fragment>
            <Grid container spacing={0}>

                <Grid item xs={6} sx={{ borderRight: 1, borderTop: 1, borderColor: '#D3D3D3' }}>
                    <Grid item xs={12} sx={{ borderBottom: 1, borderColor: '#D3D3D3', backgroundColor: '#e3f2fd' }}>
                        <div className='title'>원본 이미지</div>
                    </Grid>
                    <Grid container spacing={0} sx={{ padding: 2 }}>
                        <Grid item xs={5}>
                            <img className='imageBox' src={`data:image/jpg;base64,${data['original_img']}`} alt='default' />
                        </Grid>
                        <Grid item xs={7}>
                            <Paper elevation={0} square className='imgdesc'>
                                <ul>
                                    <li>크기: {data['originW'] !== undefined && data['originW']['S']} x {data['originH'] !== undefined && data['originH']['S']}</li>
                                    <li>용량: {data['origin_file_size'] !== undefined && data['origin_file_size']['S']}</li>
                                    <li>형식: {data['original_path'] !== undefined && data['original_path']['S']}</li>
                                </ul>
                                <Button variant="outlined" size="large" sx={btnStyle}
                                    onClick={(e) => {
                                        handleImage(e, data['original_path']);
                                    }}>이미지 다운로드</Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6} sx={{ borderRight: 1, borderTop: 1, borderColor: '#D3D3D3' }}>
                    <Grid item xs={12} sx={{ borderBottom: 1, borderColor: '#D3D3D3', backgroundColor: '#e3f2fd' }}>
                        <div className='title'>변환 이미지</div>
                    </Grid>
                    <Grid container spacing={0} sx={{ padding: 2 }}>
                        <Grid item xs={5}>
                            <img className='imageBox' src={`data:image/jpg;base64,${data['converted_img']}`} alt='converted' />
                        </Grid>
                        <Grid item xs={7}>
                            <Paper elevation={0} square className='imgdesc'>
                                <ul>
                                    <li>크기: {data['convW'] !== undefined && data['convW']['S']} x {data['convH'] !== undefined && data['convH']['S']}</li>
                                    <li>용량: {data['conv_file_size'] !== undefined && data['conv_file_size']['S']}</li>
                                    <li>형식: {data['converted_path'] !== undefined && data['converted_path']['S']}</li>
                                </ul>
                                <Button variant="outlined" size="large" sx={btnStyle} onClick={(e) => {
                                    handleImage(e, data['converted_path']);
                                }}>이미지 다운로드</Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>




        </React.Fragment>
    );
}