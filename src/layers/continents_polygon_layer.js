import { GeoJSON } from "react-leaflet";

export const ContinetsPolygonLayer = ({ data }) => {
  return (
    <GeoJSON
      key="geo-json-layer"
      data={data}
    ></GeoJSON>
  );
};
