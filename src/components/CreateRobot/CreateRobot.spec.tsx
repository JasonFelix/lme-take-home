import renderer from "react-test-renderer";
import Area from "../../models/Area";
import CreateRobot from ".";

it("CreateRobot renders correctly", () => {
  const area: Area = new Area(
    { width: 0, height: 0 },
    { width: 50, height: 50 }
  );
  const tree = renderer
    .create(<CreateRobot area={area} onActivate={() => ({})} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
