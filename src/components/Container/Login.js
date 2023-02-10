import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './styles.css'

const btnStyle = {
    fontSize: 10,
    marginLeft: '20%',
    height: '100%',
    borderRadius: 0,
    borderColor: '#9e9e9e',
    background: '#9e9e9e',
    color: 'white',
    "&:hover": {
        backgroundColor: "#9e9e9e",
        borderColor: '#9e9e9e',
    }

}

const adminCreds = { Id: 'sadmin', pass: 'superfinder123' }

export default function Container() {
    let navigate = useNavigate();

    const [ID, setID] = React.useState("");
    const [passwd, setPass] = React.useState("");

    const handleLogin = (Id, pass) => {
        if (Id === adminCreds.Id && pass === adminCreds.pass) {
            localStorage.setItem('authenticated', true);
            navigate('/');
            window.location.reload(false);


        }
    }

    return (
        <div className='login'>
            <Paper sx={{ padding: 10, margin: 10, width: '70%' }} elevation={2}>
                <Typography variant='h6' sx={{ textAlign: 'center' }}>
                    슈퍼샷/슈퍼파인더 관리자 로그인
                </Typography>
                <Toolbar />
                <Grid container spacing={0}>
                    <Grid item xs={10}>
                        <Grid container spacing={0}>
                            <Grid item xs={3}>
                                ID
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    //size='medium'
                                    value={ID}
                                    onChange={(e) => { setID(e.target.value) }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={0} sx={{ marginTop: '2%' }}>
                            <Grid item xs={3}>
                                PW
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    //size='small'
                                    type='password'
                                    value={passwd}
                                    onChange={(e) => { setPass(e.target.value) }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="outlined" size="large" sx={btnStyle} onClick={(event) => handleLogin(ID, passwd)}>LOGIN</Button>
                    </Grid>
                </Grid>
                <br />

                <ul>
                    <li>
                        본 시스템은 허가된 사용자만 접근할 수 있습니다.
                    </li>
                    <li>
                        계정은 관리자에게 문의해 주세요.
                    </li>
                </ul>

            </Paper>
        </div>

    )
}