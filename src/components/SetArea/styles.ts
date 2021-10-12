import styled from "styled-components";

const Title = styled.div`
  color: var(--primary-text);
  font-size: var(--header-text);
  margin-bottom: var(--margin-m);
`;

const Description = styled.div`
  color: var(--primary-text);
  font-size: 12px;
  margin-bottom: var(--margin-m);
`;

const DimensionsInput = styled.div`
  display: flex;
  flex-direction: row;
`;

export { Title, Description, DimensionsInput };
