import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import { MarkerLayer } from "../layers/MarkerLayer";
import { MarkerLayerTooltip } from "../layers/MarkerLayerTooltip";
import { RadiusFilter } from "../layers/radiusFilter";
import { ContinentsPolygonLayer } from "../layers/continents_polygon_layer";

import { cities } from "../data/cities";
import { mountains } from "../data/highest_mountains";
import { continents } from "../data/continents";

export const Map = () => {
  const [radiusFilter, setRadiusFilter] = useState(null);
  const getRadiusFilter = () => radiusFilter;

  const [geoFilter, setGeoFilter] = useState(null);
  const getGeoFilter = () => geoFilter;

  const position = [0, 0];

  return (
    <MapContainer center={position} zoom={2} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerLayer
        data={cities}
        getRadiusFilter={getRadiusFilter}
        setRadiusFilter={setRadiusFilter}
      />
      <MarkerLayerTooltip data={mountains} />
      <RadiusFilter
        radiusFilter={radiusFilter}
        setRadiusFilter={setRadiusFilter}
      />
      <ContinentsPolygonLayer
        data={continents}
        setGeoFilter={setGeoFilter}
        getGeoFilter={getGeoFilter}
      />
    </MapContainer>
  );
};
