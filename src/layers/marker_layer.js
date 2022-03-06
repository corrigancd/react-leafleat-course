import { Marker, Popup } from "react-leaflet";

import { defaultIcon } from "../icons/defaultIcon";
import { Button, Card, InputNumber, Space } from "antd";

const PopupStatistics = ({ feature }) => {
  const { name, adm0name, pop_max } = feature.properties;

  return (
    <>
      <Card type="inner" title="Name">
        <b>{`${name}, ${adm0name}`}</b>
      </Card>
      <Card type="inner" title="Population">
        <b>{`${pop_max}`}</b>
      </Card>
      <Card type="inner" title="Radius Filter">
        <Space size="small">
          <InputNumber
            defaultValue={3000}
            min={0}
            onChange={(e) => console.log(e)}
          ></InputNumber>
          <Button type="primary" shape="round">
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
          <PopupStatistics feature={feature}/>
        </Popup>
      </Marker>
    );
  });
};
