import React from 'react';
import styled from 'styled-components';

const stepInstructions = {
    1: ["중복되지 않는 이메일 주소를 입력해주세요.", "이메일은 추후 수정할 수 없습니다."],
    2: ["아이디에는 영문과 숫자만 포함되어야 하며, 3-10자 사이여야 합니다.", "중복되지 않는 아이디를 입력해주세요.", "아이디는 추후 수정할 수 없습니다."],
    3: ["8자 이상의 영문, 숫자를 혼용한 비밀번호를 설정해주세요.", "비밀번호 확인 창에 같은 비밀번호를 한번 더 입력해주세요."],
    4: ["디어 테라피에서 사용할 8자 이하의 닉네임을 정해주세요."]
};

const Instructions = ({ step }) => {
    return (
        <InstructionContainer>
            <InstructionList>
                {stepInstructions[step]?.map((message, index) => (
                    <InstructionItem key={index}>· {message}</InstructionItem>
                ))}
            </InstructionList>
        </InstructionContainer>
    );
};

const InstructionContainer = styled.div`
  display: flex;
  justify-content: column; 
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
