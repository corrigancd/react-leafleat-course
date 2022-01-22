import { Marker, Popup } from "react-leaflet";

import { defaultIcon } from "../icons/defaultIcon";

import { Row } from "antd";

const PopupStatistics = ({ properties }) => {
  const { name } = properties;
  return <Row>{name}</Row>;
};

export const MarkerLayer = ({ data }) => {
  return data.features.map((feature) => {
    const { coordinates } = feature.geometry;

    return (
      <Marker
        key={String(coordinates)}
        position={[coordinates[1], coordinates[0]]}
        icon={defaultIcon}
      >
        <Popup>
          <PopupStatistics properties={feature.properties} />
        </Popup>
      </Marker>
    );
  });
};
