import { Marker, Popup } from "react-leaflet";

import { defaultIcon } from "../icons/defaultIcon";

import { Button, Card, InputNumber, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const PopupStatistics = ({ properties }) => {
  const { name, adm0name, pop_max } = properties;

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
            defaultValue={3000}
            min={0}
            onChange={(e) => console.log(e)}
          />
          <Button type="primary" shape="round" icon={<SearchOutlined />}>
            Filter by km
          </Button>
        </Space>
      </Card>
    </>
  );
};

export const MarkerLayer = ({ data }) => {
  return data.features.map((feature) => {
    const { coordinates } = feature.geometry;

    return (
      <Marker
        key={String(coordinates)}
        position={[coordinates[1], coordinates[0]]}
        icon={defaultIcon}
      >
        <Popup>
          <PopupStatistics properties={feature.properties} />
        </Popup>
      </Marker>
    );
  });
};
