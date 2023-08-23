import React, { useEffect, useRef } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { client } from "../../routes/routes";
import { Logger } from "aws-amplify";

const { google } = window;
const WorldMap = () => {
  // 23-08-22 유재혁
  // s3 내 이미지 좌표를 이용해, 구글 맵에 좌표 설정.
  const mapRef = useRef(null);
  // 0. ref는 js 내 getElementId와 같은 역할을 합니다.
  const [locations, setLocations] = React.useState([]);

  const initMap = (loc) => {
    //1. 지도를 초기화 하기 위한 함수입니다.
    const map = new google.maps.Map(mapRef.current, {
      // ref에 map을 직접 담습니다.
      center: { lat: 37.51175556, lng: 127.1079306 },
      zoom: 6,
      scrollwheel: false,
      streetViewControl: false,
    });
    //2. 지도를 생성합니다. 위는 구글 맵에서 제공하는 로직입니다.
    const infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: false,
    });
    const labels = "";
    //3.  하나하나의 마커 위치와 모양을 세팅합니다.
    //위도 경도 API를 호출해서, 받아온 위도 경도 배열을 map하여, 지도에 모두 뿌려줍니다.
    const markers = loc.map((el, i) => {
      console.log(el);
      const position = el.latlng;
      const label = labels[i % labels.length];
      const marker = new google.maps.Marker({
        position,
        label,
      });
      //4. 마커에 이벤트 제공.
      // marker.addListener("click", () => {
      //   const content = `<img src="https://superfind.s3.ap-northeast-2.amazonaws.com/${el.img}" width="200" height="200 style="display: none;">`;
      //   console.log("5", content);
      //   infoWindow.setContent(content);
      //   infoWindow.open(map, marker);
      // });
      // 프리로딩
      marker.addListener("click", () => {
        const img = new Image();
        img.src = `https://superfind.s3.ap-northeast-2.amazonaws.com/${el.img}`;
        img.onload = () => {
          const content = `<img src="https://superfind.s3.ap-northeast-2.amazonaws.com/${el.img}" width="250" height="250 style="display: none;">`;
          console.log("5", content);
          infoWindow.setContent(content);
          infoWindow.open(map, marker);
        };
      });
      // 지연 로딩.
      // marker.addListener("click", () => {
      //   const imgElement = document.createElement("img");
      //   imgElement.src = `https://superfind.s3.ap-northeast-2.amazonaws.com/${el.img}`;
      //   imgElement.width = 200;
      //   imgElement.height = 200;

      //   const content = document.createElement("div");
      //   content.appendChild(imgElement);

      //   console.log("5", content.innerHTML);
      //   infoWindow.setContent(content);
      //   infoWindow.open(map, marker);
      // });

      return marker;
    });

    //5. 멀리서 봤을 때의 마커들을 개수로 변경해주는 UI 말합니다.
    new MarkerClusterer({
      markers,
      map,
      gridSize: 100,
    });
  };

  useEffect(() => {
    //6. API 요청을 통해, 위도 경도 배열을 받아와 지도에 렌더링합니다.
    //FilterTable.js 파일의 useEffect를 보면 이해되실겁니다.
    let locDta;

    const fetchLatLng = async () => {
      try {
        await client.get("getLatlng").then((res) => {
          console.log(res);
          locDta = res.data.map((el) => ({
            latlng: { lat: parseFloat(el.lat), lng: parseFloat(el.lng) },
            img: el.img,
          }));

          //   test = [
          //     { lat: -36.817685, lng: 175.699196 }
          //   ];
          setLocations(locDta);
        });
        console.log(locDta);
        initMap(locDta);
      } catch (error) {
        console.log("ERROR", error);
      }
    };
    fetchLatLng();
  }, []);

  return (
    <div>
      <div
        className="map"
        style={{
          width: "1650px",
          height: "1000px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        ref={mapRef}
      ></div>
    </div>
  );
};

export default WorldMap;
