import { Circle, LayersControl } from "react-leaflet";

export const RadiusFilter = ({ radiusFilter, setRadiusFilter }) => {
  if (radiusFilter) {
    const { coordinates } = radiusFilter.feature.geometry;
    return (
      <LayersControl.Overlay checked name={"Radius filter"}>
        <Circle
          center={[coordinates[1], coordinates[0]]}
          radius={radiusFilter.radius * 1000}
          eventHandlers={{
            dblclick: (e) => {
              e.originalEvent.view.L.DomEvent.stopPropagation(e);
              setRadiusFilter(null);
            },
          }}
          color={"gray"}
          weight={1}
          fillOpacity={0.4}
        ></Circle>
      </LayersControl.Overlay>
    );
  } else {
    return null;
  }
};
