import { Empty, List } from 'antd';
import { ReactElement } from 'react';

import { Instruction } from '../../models/types';
import { InstructionSelectContainer, Option } from './styles';

const INSTRUCTION_MAP = {
  L: '\u2190 Turn Left',
  R: '\u2192 Turn Right',
  F: '\u2191 Walk Forward',
};

interface Props {
  instructions: Instruction[];
  callback: (index: number) => void;
}

const InstructionSelect = ({ instructions, callback }: Props): ReactElement => {
  const data = instructions.map((instruction, index) => (
    <List.Item key={instruction} onClick={() => callback(index)}>
      {INSTRUCTION_MAP[instruction]}
    </List.Item>
  ));
  return (
    <InstructionSelectContainer>
      {instructions.length ? (
        <List
          bordered
          dataSource={data}
          size="small"
          style={{ overflowY: 'scroll', height: '100%' }}
          renderItem={(item) => <Option>{item}</Option>}
        />
      ) : (
        <Empty description={<span>No instructions</span>} />
      )}
    </InstructionSelectContainer>
  );
};

export default InstructionSelect;
