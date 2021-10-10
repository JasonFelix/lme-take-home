import React from 'react';
import renderer from 'react-test-renderer';
import Area from '../../models/Area';
import CreateRobot from './';

it('CreateRobot renders correctly', () => {
  const area: Area = new Area(0, 0, 50, 50);
  const tree = renderer.create(<CreateRobot area={area} onActivate={() => {}}/>).toJSON();
  expect(tree).toMatchSnapshot();
});