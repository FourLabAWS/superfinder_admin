import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

let script;
let kakao;

const initKakaoMap = () => {
  return new Promise((resolve) => {
    if (window.kakao) {
      kakao = window.kakao;
      resolve(true);
    } else {
      script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=<your-kakao-map-api-key>&libraries=services&autoload=false`;
      document.head.appendChild(script);
      script.onload = () => {
        kakao = window.kakao;
        resolve(true);
      };
    }
  });
};
