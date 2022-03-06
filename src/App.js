import React from "react";

import "leaflet/dist/leaflet.css";
import "./app.css";
import "antd/dist/antd.variable.min.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import { Map } from "./Map/Map"

export const App = () => {
  return <Map />;
}
