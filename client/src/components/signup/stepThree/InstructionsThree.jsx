import React from 'react';
import styled from 'styled-components';

const InstructionsThree = () => {
    return (
        <InstructionContainer>
            <InstructionList>
                <InstructionItem>· 8자 이상의 영문, 숫자를 혼용한 비밀번호를 설정해주세요.</InstructionItem>
                <InstructionItem>· 비밀번호 확인 창에 같은 비밀번호를 한번 더 입력해주세요.</InstructionItem>
            </InstructionList>
        </InstructionContainer>
    );
};

const InstructionContainer = styled.div`
  display: flex;
  justify-content: center; 
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

export default InstructionsThree;
