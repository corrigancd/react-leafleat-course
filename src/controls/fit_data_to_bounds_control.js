import { createControlComponent } from "@react-leaflet/core";
import { Control, DomUtil } from "leaflet";

const node = DomUtil.create("div");

Control.FitMapBoundsToDataControl = Control.extend({
  options: {
    position: "topleft",
  },
  onAdd: function (map) {
    console.log("on add: ", map);
    return node;
  },

  onRemove: function (map) {},
});

export const FitMapBoundsToDataControl = createControlComponent(
  (props) => new Control.FitMapBoundsToDataControl(props)
);
