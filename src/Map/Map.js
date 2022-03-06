import { useState, useEffect } from "react";
import { MapContainer, LayersControl, TileLayer } from "react-leaflet";


import { MarkerLayer } from "../layers/MarkerLayer";
import { MarkerLayerTooltip } from "../layers/MarkerLayerTooltip";
import { MarkerLayerTooltipReproject } from "../layers/MarkerLayerTooltipReproject";
import { MarkerClusteringLayer } from "../layers/MarkerClusteringLayer";
import { RadiusFilter } from "../layers/radiusFilter";
import { ContinentsPolygonLayer } from "../layers/continents_polygon_layer";

import { cities } from "../data/cities";
import { mountains } from "../data/highest_mountains";
import { continents } from "../data/continents";
import { irishCities2157 } from "../data/irish_cities_2157";

import { FitMapBoundsToDataControl } from "../controls/fit_data_to_bounds_control";

export const Map = () => {
  const [asyncCities, setAsyncCities] = useState(null);
  const [radiusFilter, setRadiusFilter] = useState(null);
  const getRadiusFilter = () => radiusFilter;

  const [geoFilter, setGeoFilter] = useState(null);
  const getGeoFilter = () => geoFilter;

  const position = [0, 0];

  useEffect(() => {
    fetch(
      "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_populated_places_simple.geojson"
    )
      .then((cities) => {
        cities.json()
        .then((citiesJson) => {
          setAsyncCities(citiesJson);
        }).catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <MapContainer center={position} zoom={2} scrollWheelZoom={true}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name={"OSM - Streets"}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name={"ESRI - World Imagery"}>
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>
        <MarkerLayer
          data={asyncCities}
          getRadiusFilter={getRadiusFilter}
          setRadiusFilter={setRadiusFilter}
          getGeoFilter={getGeoFilter}
        />
        <MarkerClusteringLayer data={cities} />
        <MarkerLayerTooltip data={mountains} />
        <MarkerLayerTooltipReproject data={irishCities2157} />
        <RadiusFilter
          radiusFilter={radiusFilter}
          setRadiusFilter={setRadiusFilter}
        />
        <ContinentsPolygonLayer
          data={continents}
          setGeoFilter={setGeoFilter}
          getGeoFilter={getGeoFilter}
        />
      </LayersControl>
      <FitMapBoundsToDataControl />
    </MapContainer>
  );
};
