import React, { useEffect, useRef } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { client } from "../../routes/routes";

const { google } = window;
const WorldMap = () => {
  const mapRef = useRef(null);
  const [locations, setLocations] = React.useState([]);

  const initMap = (latlng) => {
    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 37.51175556, lng: 127.1079306 },
      zoom: 6,
      scrollwheel: false,
      streetViewControl: false,
    });
    const infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });
    // Create an array of alphabetical characters used to label the markers.
    const labels = "";
    // Add some markers to the map.
    const markers = latlng.map((position, i) => {
      const label = labels[i % labels.length];
      const marker = new google.maps.Marker({
        position,
        label,
      });
      // markers can only be keyboard focusable when they have click listeners
      // open info window when marker is clicked
      marker.addListener("click", () => {
        infoWindow.setContent(label);
        infoWindow.open(map, marker);
      });
      return marker;
    });

    // Add a marker clusterer to manage the markers.
    new MarkerClusterer({
      markers,
      map,
      gridSize: 100,
    });
  };

  useEffect(() => {
    let test;
    let latLng;
    const fetchLatLng = async () => {
      try {
        await client.get("getLatlng").then((res) => {
          console.log(res);
          latLng = res.data.map((el) => ({
            lat: parseFloat(el.lat),
            lng: parseFloat(el.lng),
          }));
          //   test = [
          //     { lat: -36.817685, lng: 175.699196 },
          //     { lat: 31.817685, lng: 120.699196 },
          //     { lat: 37.51175556, lng: 121.1079306 },
          //     { lat: 37.11175556, lng: 121.1079306 },
          //     { lat: -36.817685, lng: 171.699196 },
          //     { lat: 31.817685, lng: 123.699196 },
          //     { lat: 37.51175556, lng: 121.1079306 },
          //     { lat: 37.11175556, lng: 127.1079306 },
          //     { lat: -36.817685, lng: 171.699196 },
          //     { lat: 31.817685, lng: 124.699196 },
          //     { lat: 37.51175556, lng: 127.1079306 },
          //     { lat: 37.11175556, lng: 123.1079306 },
          //     { lat: -36.817685, lng: 177.699196 },
          //     { lat: 31.817685, lng: 120.399196 },
          //     { lat: 37.51175556, lng: 122.1079306 },
          //     { lat: 37.11175556, lng: 120.1079306 },
          //     { lat: -31.817685, lng: 177.699196 },
          //     { lat: 36.817685, lng: 120.399196 },
          //     { lat: 33.51175556, lng: 122.1079306 },
          //     { lat: 32.11175556, lng: 120.1079306 },
          //     { lat: -38.817685, lng: 177.699196 },
          //     { lat: 39.817685, lng: 120.399196 },
          //     { lat: 38.51175556, lng: 122.1079306 },
          //     { lat: 5.11175556, lng: 120.1079306 },
          //     { lat: 3.11175556, lng: 120.1079306 },
          //     { lat: 1.11175556, lng: 120.1079306 },
          //     { lat: -1.11175556, lng: 120.1079306 },
          //   ];
          setLocations(latLng);
        });
        initMap(latLng);
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
