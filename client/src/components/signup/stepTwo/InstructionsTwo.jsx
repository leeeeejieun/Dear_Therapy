import React from 'react';
import styled from 'styled-components';

const InstructionsTwo = () => {
    return (
        <InstructionContainer>
            <InstructionList>
                <InstructionItem>· 아이디에는 영문과 숫자만 포함되어야 하며, 3-10자 사이여야 합니다.</InstructionItem>
                <InstructionItem>· 중복되지 않는 아이디를 입력해주세요.</InstructionItem>
                <InstructionItem>· 아이디는 추후 수정할 수 없습니다.</InstructionItem>
            </InstructionList>
        </InstructionContainer>
    );
};

const InstructionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: -50px;
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

export default InstructionsTwo;
