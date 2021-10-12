import { Input, Select, Space } from 'antd';

import NumberInput from "../NumberInput";
import { ReactComponent as RobotSVG } from '../../images/robot.svg';
import { Button } from 'antd';
import { useState } from "react";
import InstructionSelect from "../InstructionSelect";
import { Coordinates, Instruction, Orientation } from "../../models/types";
import Area from "../../models/Area";
import { observer } from "mobx-react";
import Robot from "../../models/Robot";
import { Title, Text, HorizontalGroup, Group, Header, DimensionsInput } from "./styles";
import { Container, LeftContainer, RightContainer } from '../Panel/styles';


interface Props {
  area: Area;
  onActivate: () => void;
}

const CreateRobot = observer(({ area, onActivate }: Props) => {
  const [instructions, setInstructions] = useState<Array<Instruction>>([]);
  const [coordinates, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });
  const [orientation, setOrientation] = useState<Orientation>('N');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uppercase = e.target.value.toUpperCase();
    const filtered = uppercase.split('').filter(c => ['L', 'R', 'F'].includes(c));
    setInstructions(filtered.slice(0, 100) as Instruction[]);
  }

  const reset = () => {
    setInstructions([]);
    setCoordinates({ x: 0, y: 0 });
    setOrientation('N');
  }

  const activateRobot = () => {
    const robot = new Robot(coordinates, orientation, instructions);
    area.addRobot(robot);
    onActivate();
    reset();
  }

  const addInstruction = (instruction: Instruction) => {
    setInstructions([...instructions, instruction].slice(0, 100) as Instruction[]);
  }

  const removeInstruction = (index: number) => {
    setInstructions([...instructions.slice(0, index), ...instructions.slice(index + 1)]);
  }

  const instructionsString = instructions.join('');

  return <Container>
    <LeftContainer>
      <RobotSVG />
    </LeftContainer>
    <RightContainer>
      <Space direction="vertical" style={{width: '100%', paddingRight: '16px'}}>
        <Title>Create a Robot</Title>
        <HorizontalGroup>
          <Group>
            <Header>Starting Coordinates</Header>
            <DimensionsInput>
              <NumberInput label="X" value={coordinates.x} min={0} max={50} callback={x => { setCoordinates({ ...coordinates, x }) }} />
              <NumberInput label="Y" value={coordinates.y} min={0} max={50} callback={y => { setCoordinates({ ...coordinates, y }) }} />
            </DimensionsInput>
          </Group>
          <Group>
            <Header>Starting Orientation</Header>
            <DimensionsInput>
              <Select defaultValue="N" value={orientation} onChange={(orientation: Orientation) => setOrientation(orientation)}>
                <Select.Option value="N">North</Select.Option>
                <Select.Option value="S">South</Select.Option>
                <Select.Option value="E">East</Select.Option>
                <Select.Option value="W">West</Select.Option>
              </Select>
            </DimensionsInput>
          </Group>
        </HorizontalGroup>
        <Header>Search Instructions</Header>
        <Input type="text" value={instructionsString} onChange={onChange} />
        <HorizontalGroup>
          <Space direction="horizontal">
            <Button onClick={() => addInstruction('L')}>Turn Left</Button>
            <Button onClick={() => addInstruction('F')}>Walk Forward</Button>
            <Button onClick={() => addInstruction('R')}>Turn Right</Button>
          </Space>
        </HorizontalGroup>
        <InstructionSelect instructions={instructions} callback={removeInstruction} />
        <Text>Instructions {instructions.length} / 100</Text>
        <Button type="primary" onClick={activateRobot}>Activate Robot</Button>
      </Space>
    </RightContainer>
  </Container>
});

export default CreateRobot;