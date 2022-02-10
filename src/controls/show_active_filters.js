import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { createControlComponent } from "@react-leaflet/core";
import { Control, DomUtil } from "leaflet";

const node = DomUtil.create("div");

const renderActiveFilters = () => {
  ReactDOM.render(
    <div>Hello</div>,
    node
  );
};

Control.ShowActiveFiltersControl = Control.extend({
  options: {
    position: "bottomleft",
  },
  onAdd: function (map) {
    renderActiveFilters();

    return node;
  },

  onRemove: function () {
    unmountComponentAtNode(node);
  },
});

export const ShowActiveFiltersControl = createControlComponent(
  (props) => new Control.ShowActiveFiltersControl(props)
);
