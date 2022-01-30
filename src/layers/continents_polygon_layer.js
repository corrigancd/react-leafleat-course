import { GeoJSON } from "react-leaflet";

export const ContinentsPolygonLayer = ({ data }) => {
  return (
    <GeoJSON
      key={String('geo-json-layer')}
      data={data}
    >
    </GeoJSON>
  );
};
