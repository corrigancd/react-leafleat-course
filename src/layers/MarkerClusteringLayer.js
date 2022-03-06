import { LayersControl, LayerGroup, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import { defaultIcon } from "../icons/defaultIcon";

export const MarkerClusteringLayer = ({ data }) => {
  const layer = data.features.map((feature) => {
    const { coordinates } = feature.geometry;

    return (
      <Marker
        key={String(coordinates)}
        position={[coordinates[1], coordinates[0]]}
        icon={defaultIcon}
      ></Marker>
    );
  });

  return (
    <LayersControl.Overlay checked name={"World cities clustered"}>
      <MarkerClusterGroup zoomToBoundsOnClick={false}>
        {layer}
      </MarkerClusterGroup>
    </LayersControl.Overlay>
  );
};
