import { Marker, Tooltip, useMap } from "react-leaflet";

import { defaultIcon } from "../icons/defaultIcon";

export const MarkerLayerTooltip = ({ data }) => {
  return data.features.map((feature) => {
    const { coordinates } = feature.geometry;

    const { name, continent, elevation } = feature.properties;

    return (
      <Marker
        key={String(coordinates)}
        position={[coordinates[1], coordinates[0]]}
        icon={defaultIcon}
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
