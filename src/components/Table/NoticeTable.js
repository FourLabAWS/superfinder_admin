import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { client } from "../../routes/routes";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { darken, lighten } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles.css";
import { saveAs } from "file-saver";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';


const headingTextStyle = {
  fontWeight: 550,
};

function GetNotiList() {
    const apiUrl = 'https://o0a46p97p0.execute-api.ap-northeast-2.amazonaws.com/v1/getNotiList';
    const [title, setTitle] = useState([]);

    useEffect(()=>{
        axios.get(`${apiUrl}`)
        .then(response => {
            console.log(response.data.Items[0].NOTI_TL);
            setTitle(response.data.Items[0].NOTI_TL);
        })
        .catch(error => {
            console.error(error);
            
        });
        
    }, []);  
    
    
  return (
    <div>
        title
    </div>
  );
}

export default GetNotiList;

