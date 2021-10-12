import styled from "styled-components";

const InstructionSelectContainer = styled.div`
  height: 300px;
  width: 100%;
  box-sizing: border-box;
  counter-reset: instruction-list;
  user-select: none;
`;

const Select = styled.ol`
  height: 284px;
  overflow-y: auto;
  padding: 0;
`;

const Option = styled.div`
  width: 100%;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: row;

  &:before {
    counter-increment: instruction-list; /* Increment the value of section counter by 1 */
    content: counter(instruction-list) ". ";
    width: 32px;
    text-align: right;
    align-items: center;
    justify-content: center;
    display: flex;
  }

  &:hover {
    &:after {
      content: "remove";
      height: 100%;
      flex: 1;
      text-align: right;
      color: red;
    }
  }
`;

export { InstructionSelectContainer, Select, Option };
