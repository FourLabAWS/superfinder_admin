import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


const errorData = [
    { id: 1, name: '깃발 찾지 못함 0건' },
    { id: 2, name: '이미지 문제 0건' },
    { id: 3, name: '기타 0건' }
]

const solutionData = [
    { id: 1, name: '깃발 찾지 못함 0건' },
    { id: 2, name: '이미지 문제 0건' },
    { id: 3, name: '기타 0건' }
]

const headStyle = {
    backgroundColor: '#f5f5dc',
    height: '100%',
}


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 0,
}));


export default function FaultStatusTable() {
    console.log(errorData[0].id)
    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={6} sx={headStyle}>
                    <Item component={Paper} variant='outlined'><strong>미해결</strong></Item>
                </Grid>
                <Grid item xs={6} sx={{ height: '100%' }}>
                    <Item component={Paper} variant='outlined'><strong>해결</strong></Item>
                </Grid>
            </Grid>
            <Grid container spacing={0}>
                {errorData.map(data => {
                    return (
                        <Grid item xs={2} sx={headStyle}>
                            <Item component={Paper} variant='outlined' key={data.id}>{data.name}</Item>
                        </Grid>
                    );
                })}
                {solutionData.map(data => {
                    return (
                        <Grid item xs={2} sx={headStyle}>
                            <Item component={Paper} variant='outlined' key={data.id}>{data.name}</Item>
                        </Grid>
                    );
                })}


            </Grid>
        </div>
    )
}
