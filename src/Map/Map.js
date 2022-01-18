import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import { MarkerLayer } from "../layers/MarkerLayer";

import { cities } from "../data/cities";

export const Map = () => {
  const position = [0, 0];

  return (
    <MapContainer center={position} zoom={2} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerLayer data={cities} />
    </MapContainer>
  );
};
