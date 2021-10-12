import styled from 'styled-components';

const NumberInputContainer = styled.div<{ dragging: boolean }>`
  background-color: white;
  margin-right: var(--margin-m);
  margin-bottom: var(--margin-m);

  font-size: var(--p-text);
  display: flex;
  width: 90px;
  height: var(--margin-xl);

  border-radius: var(--border-radius);
  box-sizing: border-box;

  align-items: center;
  justify-content: center;
  border: 1px solid ${({ dragging }) => (dragging ? '#459FF5' : '#d9d9d9')};
  transition: border-color 0.2s linear;

  user-select: none;

  &:hover {
    border: 1px solid ${({ dragging }) => (dragging ? '#459FF5' : '#d9d9d9')};
    cursor: ew-resize;
  }
  &:focus-within {
    border: 1px solid #459ff5;
  }
`;

const LabelContainer = styled.span`
  margin-left: var(--margin-s);
  margin-right: var(--margin-s);
  height: var(--margin-xl);
  color: #b3b3b3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.input`
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  border: none;
  color: #333;
  outline: none;
`;

export { NumberInputContainer, LabelContainer, InputContainer };
