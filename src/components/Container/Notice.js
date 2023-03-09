import * as React from "react";
import {useState, useEffect,useRef } from 'react';
import Box from "@mui/material/Box";
import { DynamoDB, DocumentClient } from "aws-sdk";
import { Table, TableBody, TableHead } from "@mui/material";

export default function Container() {
  // 변수 저장
  let [title, setTitle] = useState(['제목1','제목2','제목3']);
  let [context, setContext] = useState();

  // 입력값 저장
  let [inptTl, setInptTl] = useState('');
  let [inptCt, setInptCt] = useState('');
  
  
  // 공지사항 추가
  function AddNoti(){

    return (
      <div>
        
      </div>
    )
  }
  return (
    <Box component={'main'} sx={{ flexGrow: 1, mt:'64px', bgcolor: 'background.default', p: 2 }}>
      <div>
        <button onClick={()=>{
           let copy = [...title];
           copy.unshift(inptTl);
           setTitle(copy);
        }}>추가</button>

        <input placeholder="제목을 입력하세요" onChange={(e)=>{
          setInptTl(e.target.value);
          console.log({inptTl});
        }}></input>
        <input placeholder="내용을 입력하세요"></input>
      </div>
      <Table border="1px solid #000">
        <TableHead>
          <tr>
            <td>제목</td>
            <td>내용</td>
          </tr>
        </TableHead>
        <TableBody>
          <tr>
            <td>{title}</td>
            <td>aaaaaa</td>
          </tr>
        </TableBody>
      </Table>
      {
        title.map(function(a, i){
          return (
            <div>
              {title[i]}
            </div>
          )
        })
      }
    </Box>
  );
}
