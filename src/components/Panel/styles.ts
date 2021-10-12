import styled from 'styled-components';

const Container = styled.div`
  width: 650px;
  min-height: 275px;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  display: flex;

  width: 800px;
  height: 800px;
  align-items: center;
  justify-content: center;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 230px;
  background-color: #fafbfc;
  height: 100%;
`;

const RightContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  margin-left: 16px;
`;

export { Container, LeftContainer, RightContainer };
