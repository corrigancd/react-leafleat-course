import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import { cities } from "../data/cities";

import { MarkerLayer } from "../layers/marker_layer";

export const Map = () => {
  const position = [0, 0];

  return (
    <MapContainer center={position} zoom={1} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerLayer data={cities} />
    </MapContainer>
  );
};
