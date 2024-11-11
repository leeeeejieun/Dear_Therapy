import React from 'react';
import styled, {css} from 'styled-components';

const type = {
    login: {
        buttonStyle: css`
            position: absolute;
            bottom: 10px;
            right: -1.5rem;
            width: 140px;
            height: 60px;
            transform: rotate(-5deg);
        `,
        textStyle: css`
            font-size: 15px;
        `,
    },
    next: { 
        buttonStyle: css`
            position: absolute;
            bottom: 30%;
            right: 1rem;
            width: 140px;
            height: 60px;
        `,
        textStyle: css`
            font-size: 15px;
        `,
    },
};


const Button = ({onClick, buttonType, text}) => {
    const {buttonStyle, textStyle} = type[buttonType];

    return(
        <StyledButton $buttonStyle={buttonStyle} onClick={onClick} >
            <ButtonText $textStyle={textStyle}>{text}</ButtonText>
            <ButtonImage src="https://diary-project-images.s3.ap-northeast-2.amazonaws.com/frontend/ob2.png" alt="error" />
        </StyledButton>
    );
};

export default Button;

const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;  // 기본 배경 제거
    font-family: inherit;
    ${(props) => props.$buttonStyle};
`

const ButtonText = styled.span`
    position: absolute; 
    z-index: 1; 
    font-weight: 600;
    color: ${(props) => props.theme.text};
    ${(props) => props.$textStyle};
`;

const ButtonImage = styled.img`
    position: absolute;
    top: 0;
`;