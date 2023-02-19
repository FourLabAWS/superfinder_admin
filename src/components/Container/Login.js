import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LockIcon from '@mui/icons-material/Lock';
import './styles.css'

const btnStyle = {
    width: '100%'

}

const adminCreds = { Id: 'sadmin', pass: 'superfinder123' }

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
        if (Id === adminCreds.Id && pass === adminCreds.pass) {
            localStorage.setItem('authenticated', true);
            localStorage.setItem('user', Id);
            navigate('/');
            window.location.reload(false);


        }
    }

    return (
        <div className='login'>
            <Paper sx={{ padding: '7%', marginLeft: '25%', width: '40%' }} elevation={0}>
                <Grid container spacing={0}>
                    <img className='logo' src='Ci_4-lab_com.gif' />
                </Grid>
                <Typography variant='h6' sx={{ padding: '3%', marginLeft: '15%' }} color='black'>
                    슈퍼샷/슈퍼파인더 관리자 로그인
                </Typography>
                <br />
                <Grid container spacing={0} sx={{ width: '70%', marginLeft: '9%' }}>
                    <Grid container spacing={0}>
                        <OutlinedInput
                            fullWidth
                            id="outlined-adornment-amount"
                            value={ID}
                            variant='filled'
                            onChange={(e) => { setID(e.target.value) }}
                            startAdornment={<InputAdornment position="start">
                                <PermIdentityIcon />
                            </InputAdornment>}
                            placeholder='사용자 ID를 입력하십시오'
                        />
                    </Grid>
                    <Grid container spacing={0} sx={{ marginTop: '2%' }}>
                        <OutlinedInput
                            fullWidth
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={passwd}
                            onChange={(e) => { setPass(e.target.value) }}
                            startAdornment={<InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>}
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
                        />
                    </Grid>
                    <Grid container spacing={0} sx={{ marginTop: '2%' }}>
                        <Button variant="contained" size="large" sx={btnStyle} onClick={(event) => handleLogin(ID, passwd)}>로그인</Button>
                    </Grid>
                    <Grid container spacing={0} sx={{ marginTop: '2%' }}>
                        <br />
                        <ul>
                            <li>본 시스템은 허가된 사용자만 접근할 수 있습니다.</li>
                            <li>계정은 관리자에게 문의해 주세요.</li>
                        </ul>
                    </Grid>
                </Grid>


            </Paper>
        </div>

    )
}