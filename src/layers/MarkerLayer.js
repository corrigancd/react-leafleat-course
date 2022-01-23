import { useState } from "react";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";

import { defaultIcon } from "../icons/defaultIcon";

import { Button, Card, InputNumber, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const DEFAULT_RADIUS = 3000;

const PopupStatistics = ({ feature, setFilter }) => {
  const [radius, setRadius] = useState(DEFAULT_RADIUS);

  const { name, adm0name, pop_max } = feature.properties;

  return (
    <>
      <Card type="inner" title="Name" style={{ marginTop: 16 }}>
        <b>{`${name}, ${adm0name}`}</b>
      </Card>
      <Card type="inner" title="Population" style={{ marginTop: 16 }}>
        <b>{pop_max}</b>
      </Card>
      <Card type="inner" title="Radius filter" style={{ marginTop: 16 }}>
        <Space size={"small"}>
          <InputNumber
            defaultValue={DEFAULT_RADIUS}
            min={0}
            onChange={setRadius}
          />
          <Button
            type="primary"
            shape="round"
            icon={<SearchOutlined />}
            onClick={() =>
              setFilter((prevState) => {
                let newFilter = null;
                if (prevState) {
                  const sameFeature = prevState.feature === feature;
                  const sameRadius = prevState.radius === radius;
                  if (!sameFeature || !sameRadius) {
                    newFilter = { feature, radius };
                  }
                } else if (radius !== 0) {
                  newFilter = { feature, radius };
                }
                return newFilter;
              })
            }
          >
            Filter by km
          </Button>
        </Space>
      </Card>
    </>
  );
};

export const MarkerLayer = ({ data, getRadiusFilter, setRadiusFilter }) => {
  const radiusFilter = getRadiusFilter();
  let centerPoint;
  if (radiusFilter) {
    const { coordinates } = radiusFilter.feature.geometry;
    centerPoint = L.latLng(coordinates[1], coordinates[0]);
  }

  return data.features
    .filter((currentFeature) => {
      if (centerPoint) {
        const { coordinates } = currentFeature.geometry;
        const currentPoint = L.latLng(coordinates[1], coordinates[0]);
        return (
          centerPoint.distanceTo(currentPoint) / 1000 < radiusFilter.radius
        );
      } else {
        return true;
      }
    })
    .map((feature) => {
      const { coordinates } = feature.geometry;

      return (
        <Marker
          key={String(coordinates)}
          position={[coordinates[1], coordinates[0]]}
          icon={defaultIcon}
        >
          <Popup>
            <PopupStatistics feature={feature} setFilter={setRadiusFilter} />
          </Popup>
        </Marker>
      );
    });
};
