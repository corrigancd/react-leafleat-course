import { GeoJSON } from "react-leaflet";

export const ContinentsPolygonLayer = ({
  data,
  setGeoFilter,
  getGeoFilter,
}) => {
  const geoFilter = getGeoFilter();
  console.log(geoFilter);

  return (
    <GeoJSON
      key={String("geo-json-layer")}
      data={data}
      eventHandlers={{
        click: (e) =>
          setGeoFilter((prevState) => {
            const sameFeature = prevState === e.propagatedFrom.feature;
            return sameFeature ? null : e.propagatedFrom.feature;
          })
      }}
    ></GeoJSON>
  );
};
