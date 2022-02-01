import { GeoJSON, LayersControl } from "react-leaflet";

export const ContinentsPolygonLayer = ({
  data,
  setGeoFilter,
  getGeoFilter,
}) => {
  const geoFilter = getGeoFilter();
  console.log(geoFilter);

  const layer = <GeoJSON
      key={String("geo-json-layer")}
      data={data}
      eventHandlers={{
        click: (e) =>
          setGeoFilter((prevState) => {
            const sameFeature = prevState === e.propagatedFrom.feature;
            return sameFeature ? null : e.propagatedFrom.feature;
          }),
      }}
      style={(feature) => {
        return {
          color: geoFilter === feature ? "red" : "blue",
          weight: 0.5,
          fillOpacity: 0.4,
        };
      }}
    ></GeoJSON>;

  return (
    <LayersControl.Overlay checked name={"World continents"}>
      {layer}
    </LayersControl.Overlay>
  );
};
