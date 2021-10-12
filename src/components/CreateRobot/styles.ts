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

const Header = styled.div`
  font-size: 14px;
  color: var(--primary-text);
  position: relative;
`;

const HorizontalGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const Group = styled.div`
  flex: 1;
`;

const Text = styled.div`
  font-size: 12px;
  color: var(--primary-text);
  margin-top: var(--margin-m);
`;

export {
  Title,
  Description,
  DimensionsInput,
  Header,
  HorizontalGroup,
  Group,
  Text,
};
