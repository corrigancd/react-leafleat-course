import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { createControlComponent } from "@react-leaflet/core";
import { Control, DomUtil } from "leaflet";
import { List } from "antd";

const node = DomUtil.create("div");

const renderActiveFilters = () => {
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
        dataSource={[]}
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

    return node;
  },

  onRemove: function () {
    unmountComponentAtNode(node);
  },
});

export const ShowActiveFiltersControl = createControlComponent(
  (props) => new Control.ShowActiveFiltersControl(props)
);
