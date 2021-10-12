import renderer from "react-test-renderer";
import InstructionSelect from ".";

it("InstructionSelect renders correctly", () => {
  const tree = renderer
    .create(<InstructionSelect instructions={["F"]} callback={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
