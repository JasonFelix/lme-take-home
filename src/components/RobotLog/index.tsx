import { Table } from "antd";
import { observer } from "mobx-react";
import styled from "styled-components";
import Robot from "../../models/Robot";
import { ReactComponent as List } from '../../images/list.svg';
import { LeftContainer, RightContainer } from "../Panel/styles";

interface Props {
  robots: Robot[];
}

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Last Known Location',
    dataIndex: 'coordinates',
    key: 'coordinates',
  },
  {
    title: 'Orientation',
    dataIndex: 'orientation',
    key: 'orientation',
  },
  {
    title: 'Is Lost?',
    dataIndex: 'lost',
    key: 'lost',
  },
  {
    title: 'Output',
    dataIndex: 'output',
    key: 'output',
  },
];

const Container = styled.div`
flex: 1;
width: 800px;
height: 800px;
border-radius: var(--border-radius);
border: 1px solid var(--border-color);
display: flex;
align-items: center;
justify-content: center;
`;

const RobotLog = observer(({ robots }: Props) => {
  const ORIENTATION_MAP = {
    'N': 'North',
    'S': 'South',
    'E': 'East',
    'W': 'West',
  }

  const data = robots.map((robot, index) => ({
    key: `${index + 1}${`${robot.getLastKnownCoordinates.x},${robot.getLastKnownCoordinates.y}`}${ORIENTATION_MAP[robot.getOrientation]}${robot.isLost() ? 1 : 0}`,
    id: index + 1,
    coordinates: `x: ${robot.getLastKnownCoordinates.x}, y:${robot.getLastKnownCoordinates.y}`,
    orientation: ORIENTATION_MAP[robot.getOrientation],
    lost: robot.isLost() ? 'LOST' : 'Location Known',
    output: `${robot.getLastKnownCoordinates.x} ${robot.getLastKnownCoordinates.y} ${robot.getOrientation}${robot.isLost() ? ' LOST' : ''}`,
  }))
  return <Container>
    <LeftContainer>
      <List />
    </LeftContainer>
    <RightContainer><Table style={{height: '100%', width: '100%'}}columns={columns} dataSource={data} /></RightContainer>

  </Container>
});

export default RobotLog;