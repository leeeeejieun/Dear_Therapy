import React from 'react';
import styled from 'styled-components';

const Instructions = () => {
    return (
        <InstructionContainer>
            <InstructionList>
                <InstructionItem>· 중복되지 않는 이메일 주소를 입력해주세요.</InstructionItem>
                <InstructionItem>· 이메일은 추후 수정할 수 없습니다.</InstructionItem>
            </InstructionList>
        </InstructionContainer>
    );
};

const InstructionContainer = styled.div`
  display: flex;
  justify-content: center; 
  align-items: flex-start; 
  margin-top: -50px;
`;

const InstructionList = styled.ul`
  list-style: disc;
  margin: 20px 0;
  padding: 0;
`;

const InstructionItem = styled.li`
  margin-bottom: 10px;
  font-size: 14px;
`;

export default Instructions;
