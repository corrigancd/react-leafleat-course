import { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { defaultIcon } from "../icons/defaultIcon";
import { Button, Card, InputNumber, Space } from "antd";
import { FilterOutlined } from "@ant-design/icons";

const DEFAULT_RADIUS = 3000;

const PopupStatistics = ({ feature, setRadiusFilter }) => {
  const [radius, setRadius] = useState(DEFAULT_RADIUS);
  const { name, adm0name, pop_max } = feature.properties;

  return (
    <>
      <Card type="inner" title="Name" style={{ marginTop: 16 }}>
        <b>{`${name}, ${adm0name}`}</b>
      </Card>
      <Card type="inner" title="Population" style={{ marginTop: 16 }}>
        <b>{`${pop_max}`}</b>
      </Card>
      <Card type="inner" title="Radius Filter" style={{ marginTop: 16 }}>
        <Space>
          <InputNumber
            defaultValue={DEFAULT_RADIUS}
            min={0}
            onChange={(e) => setRadius(e)}
          ></InputNumber>
          <Button
            type="primary"
            shape="round"
            icon={<FilterOutlined />}
            onClick={() => setRadiusFilter({ feature, radius })}
          >
            Filter by km
          </Button>
        </Space>
      </Card>
    </>
  );
};

export const MarkerLayer = ({ data, setRadiusFilter, getRadiusFilter }) => {
  const radiusFilter = getRadiusFilter();
  console.log(radiusFilter);
  
  return data.features.map((feature) => {
    const { coordinates } = feature.geometry;
    return (
      <Marker
        key={String(coordinates)}
        position={[coordinates[1], coordinates[0]]}
        icon={defaultIcon}
      >
        <Popup>
          <PopupStatistics feature={feature} setRadiusFilter={setRadiusFilter}/>
        </Popup>
      </Marker>
    );
  });
};
