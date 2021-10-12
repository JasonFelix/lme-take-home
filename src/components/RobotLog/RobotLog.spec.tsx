import renderer from 'react-test-renderer';
import Robot from '../../models/Robot';
import RobotLog from '.';

it('RobotLog renders correctly', () => {
  const robot = new Robot({ x: 0, y: 0 }, 'N', []);
  const tree = renderer.create(<RobotLog robots={[robot]} />).toJSON();
  expect(tree).toMatchSnapshot();
});
