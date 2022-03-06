import React from "react";
import { Marker, Tooltip, useMap } from "react-leaflet";
import { mountainIcon } from "../icons/mountainIcon";

export const MarkerLayerWithTooltip = ({ data }) => {
  const leafletMap = useMap();
  return data.features.map((feature) => {
    const { coordinates } = feature.geometry;
    const { name, elevation, continent } = feature.properties;
    return (
      <Marker
        key={String(coordinates)}
        position={[coordinates[1], coordinates[0]]}
        icon={mountainIcon}
      >
        <Tooltip>
          <h3>Mt. {name}</h3>
          Continent: <b>{continent}</b> <br />
          Elevation: <b>{elevation} m</b>
        </Tooltip>
      </Marker>
    );
  });
};
