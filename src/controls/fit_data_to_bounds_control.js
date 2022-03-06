import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { createControlComponent } from "@react-leaflet/core";
import { Control, DomUtil } from "leaflet";
import { Button } from "antd";
import { BorderInnerOutlined, BorderOuterOutlined } from "@ant-design/icons";

const node = DomUtil.create("div");

Control.FitMapBoundsToDataControl = Control.extend({
  options: {
    position: "topleft",
  },
  onAdd: function (map) {
    const doFitToBounds = () => {
      const latLngs = [];
      map.eachLayer((layer) => {
        const latLng = layer.options.fitToBounds && layer.getLatLng();
        if (latLng) {
          latLngs.push(latLng);
        }
      });
      if (latLngs.length > 0) {
        map.fitBounds(latLngs);
      }
    };

    const commonProps = {
      className: "leaflet-control-layers",
      style: { width: "34px", height: "34px" },
    };

    ReactDOM.render(
      <div className="fit-bounds-control-container">
        <Button
          {...commonProps}
          title={"Fit bounds to data"}
          icon={<BorderInnerOutlined />}
          onClick={doFitToBounds}
        />
        <Button
          {...commonProps}
          title={"Fit bounds to world"}
          icon={<BorderOuterOutlined />}
          onClick={() => map.fitWorld()}
        />
      </div>,
      node
    );

    return node;
  },

  onRemove: function (map) {
    unmountComponentAtNode(node);
  },
});

export const FitMapBoundsToDataControl = createControlComponent(
  (props) => new Control.FitMapBoundsToDataControl(props)
);
