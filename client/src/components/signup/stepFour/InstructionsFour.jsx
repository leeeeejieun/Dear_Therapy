import React from 'react';
import styled from 'styled-components';

const InstructionsFour = () => {
    return (
        <InstructionContainer>
            <InstructionList>
                <InstructionItem>디어 테라피에서 사용할 8자 이하의 닉네임을 정해주세요.</InstructionItem>
            </InstructionList>
        </InstructionContainer>
    );
};

const InstructionContainer = styled.div`
  display: flex;
  justify-content: center; 
  flex-direction: column;
  align-items: flex-start;
  margin-top: -70px;
`;

const InstructionList = styled.ul`
  list-style: disc;
  margin: 20px 0;
  padding: 0;
  text-align: left;
`;

const InstructionItem = styled.li`
  margin-bottom: 10px;
  font-size: 14px;
`;

export default InstructionsFour;
