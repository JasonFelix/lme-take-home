import renderer from 'react-test-renderer';
import NumberInput from '.';

it('NumberInput renders correctly', () => {
  document.addEventListener('DOMContentLoaded', () => {
    const tree = renderer
      .create(
        <NumberInput
          label="Test"
          value={0}
          max={50}
          min={0}
          callback={() => ({})}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
