import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { createControlComponent } from "@react-leaflet/core";
import { Control, DomUtil } from "leaflet";
import { Button } from "antd";
import { BorderOuterOutlined } from "@ant-design/icons";

const node = DomUtil.create("div");

Control.FitMapBoundsToDataControl = Control.extend({
  options: {
    position: "topleft",
  },
  onAdd: function (map) {
    ReactDOM.render(
      <Button
        title={"Fit bounds to world"}
        icon={<BorderOuterOutlined />}
        onClick={() => map.fitWorld()}
      />,
      node
    );

    return node;
  },

  onRemove: function (map) {
    unmountComponentAtNode(node);
  }
});

export const FitMapBoundsToDataControl = createControlComponent(
  (props) => new Control.FitMapBoundsToDataControl(props)
);
