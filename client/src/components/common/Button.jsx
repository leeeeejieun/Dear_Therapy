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

    save: {
        buttonStyle: css`
            position: absolute;
            bottom: 58px;
            left: 50%;
            transform: translateX(-50%);
            width: 140px;
            height: 60px;  
        `,
        textStyle: css`
            font-size: 16px;
        `,
        iconStyle: css`
            color: black;
        `
    },

    change: {
        buttonStyle: css`
            position: absolute;
            bottom: 58px;
            right: 25px;
            width: 140px;
            height: 60px;  
        `,
        textStyle: css`
            font-size: 16px;
        `,
        iconStyle: css`
            color: black;
        `
    }
};


const Button = ({onClick, buttonType, icon, text}) => {
    const {buttonStyle, textStyle, iconStyle} = type[buttonType];
    
    return(
        <StyledButton $buttonStyle={buttonStyle} onClick={onClick} >
            <ButtonContent>
                { icon && <ButtonIcon $iconStyle={iconStyle}>{icon}</ButtonIcon> } 
                { text && <ButtonText $textStyle={textStyle}>{text}</ButtonText> }
            </ButtonContent>
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

const ButtonContent = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;   // 아이콘과 텍스트 사이의 간격 조정
`

const ButtonText = styled.span`
    z-index: 1; 
    font-weight: 600;
    color: ${(props) => props.theme.text};
    ${(props) => props.$textStyle};
`;

const ButtonIcon = styled.span`
    z-index: 1; 
    ${(props) => props.$iconStyle};
`

const ButtonImage = styled.img`
    position: absolute;
    top: 0;
    ;
`;