import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';
import Area from './models/Area';

it('App renders correctly', () => {
  document.addEventListener('DOMContentLoaded', () => {
  const area: Area = new Area({ width: 0, height: 0 }, { width: 50, height: 50 });
  const tree = renderer.create(<App area={area}/>).toJSON();
  expect(tree).toMatchSnapshot();
  });
});