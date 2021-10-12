import renderer from 'react-test-renderer';
import { Container } from './styles';

it('Panel renders correctly', () => {
  const tree = renderer.create(<Container />).toJSON();
  expect(tree).toMatchSnapshot();
});
