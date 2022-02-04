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
      map.fitBounds(latLngs);
    };

    ReactDOM.render(
      <>
        <Button
          className="leaflet-control-layers"
          style={{ width: "34px", height: "34px" }}
          title={"Fit bounds to data"}
          icon={<BorderInnerOutlined />}
          onClick={doFitToBounds}
        />
        <Button
          className="leaflet-control-layers"
          style={{ width: "34px", height: "34px" }}
          title={"Fit bounds to world"}
          icon={<BorderOuterOutlined />}
          onClick={() => map.fitWorld()}
        />
      </>,
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
