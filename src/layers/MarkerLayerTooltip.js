import { Marker, Tooltip, useMap } from "react-leaflet";

import { mountainIcon } from "../icons/mountainIcon";

export const MarkerLayerTooltip = ({ data }) => {
  const leafletMap = useMap();

  return data.features.map((feature) => {
    const { coordinates } = feature.geometry;

    const { name, continent, elevation } = feature.properties;

    return (
      <Marker
        key={String(coordinates)}
        position={[coordinates[1], coordinates[0]]}
        icon={mountainIcon}
        eventHandlers={{
          click: (e) => leafletMap.panTo(e.latlng),
        }}
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
