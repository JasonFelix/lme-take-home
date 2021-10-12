import React from 'react';
import renderer from 'react-test-renderer';
import Area from '../../models/Area';
import SetArea from './';

it('SetArea renders correctly', () => {
  const area = new Area({ width: 5, height: 5 }, { width: 50, height: 50 });
  const tree = renderer.create(<SetArea area={area} onCreate={() => { }} />).toJSON();
  expect(tree).toMatchSnapshot();
});