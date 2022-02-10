import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { createControlComponent } from "@react-leaflet/core";
import { Control, DomUtil } from "leaflet";
import { List } from "antd";

const node = DomUtil.create("div");

const renderActiveFilters = ({ geoFilter, radiusFilter } = {}) => {
  const getDisplayFilters = () => {
    const filtersToDisplay = [];

    const round = (num) => Math.round(num * 100) / 100;

    if (geoFilter) {
      filtersToDisplay.push(geoFilter.properties.CONTINENT);
    }

    if (radiusFilter) {
      const { coordinates } = radiusFilter.feature.geometry;
      const { radius } = radiusFilter;
      const radiusFilterToDisplay = `
      Center: (Lat: ${round(coordinates[1])}, Lon: ${round(coordinates[0])}) 
      Radius: ${radius} km`;
      filtersToDisplay.push(radiusFilterToDisplay);
    }

    return filtersToDisplay.length > 0
      ? filtersToDisplay
      : ["No Filter Active"];
  };

  ReactDOM.render(
    <div className={"leaflet-control-layers"}>
      <List
        size="small"
        header={
          <div>
            <b>Active Filters</b>
          </div>
        }
        bordered
        dataSource={getDisplayFilters()}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>,
    node
  );
};

Control.ShowActiveFiltersControl = Control.extend({
  options: {
    position: "bottomleft",
  },
  onAdd: function (map) {
    renderActiveFilters();

    map.on("filter-update", renderActiveFilters);

    return node;
  },

  onRemove: function () {
    unmountComponentAtNode(node);
  },
});

export const ShowActiveFiltersControl = createControlComponent(
  (props) => new Control.ShowActiveFiltersControl(props)
);
