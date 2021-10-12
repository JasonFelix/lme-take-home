import { Button, Space, Popconfirm } from "antd";
import { useState } from "react";
import { observer } from "mobx-react";
import NumberInput from "../NumberInput";
import { ReactComponent as Planet } from "../../images/planet.svg";
import { Title, Description, DimensionsInput } from "./styles";
import Area from "../../models/Area";
import { Container, LeftContainer, RightContainer } from "../Panel/styles";

interface Props {
  onCreate: (width: number, height: number) => void;
  area: Area;
}

const SetArea = observer(({ area, onCreate }: Props) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const onSet = () => {
    onCreate(width, height);
  };

  const purge = () => {
    area.purge();
  };

  return (
    <Container>
      <LeftContainer>
        <Planet />
      </LeftContainer>
      <RightContainer>
        <Space direction="vertical">
          <Title>Set Search Area Dimensions</Title>
          <Description>Set the dimensions of the search area.</Description>
          <DimensionsInput>
            <NumberInput
              label="Width"
              value={width}
              min={0}
              max={50}
              callback={setWidth}
            />
            <NumberInput
              label="Height"
              value={height}
              min={0}
              max={50}
              callback={setHeight}
            />
          </DimensionsInput>
          <Button type="primary" onClick={onSet}>
            Set Dimensions
          </Button>
          <Popconfirm
            title="Are you sure you want to delete the size, all robot and scents?"
            placement="right"
            onConfirm={purge}
            okText="Delete All"
            cancelText="No"
          >
            <Button type="primary" danger>
              Reset All Search Data
            </Button>
          </Popconfirm>
        </Space>
      </RightContainer>
    </Container>
  );
});

export default SetArea;
