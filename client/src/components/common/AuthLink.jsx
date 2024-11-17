import React from 'react';
import { Link } from 'react-router-dom';
import styled, {css} from 'styled-components';

const type = {
    signUp: {
        linkStyle: css`
            position: absolute;
            right: 10px;
            bottom: 20px;
            width: 140px;
            height: 60px;
        `,
        textStyle: css`
            font-size: 14px;
        `,
    },
    today: {
        linkStyle: css`
            position: absolute;
            right: 10px;
            bottom: 5rem;
            width: 170px;
            height: 60px;
        `,
        textStyle: css`
            font-size: 15px;
            transform: translateY(35%);
        `,
    }
};

const AuthLink = ({link, linkType, text, state}) => {
    const {linkStyle, textStyle} = type[linkType];

    return (
        <StyledLink to={link} $linkStyle={linkStyle} state={state} >
            <LinkText $textStyle={textStyle}>{text}</LinkText>
            <LinkImage src="https://diary-project-images.s3.ap-northeast-2.amazonaws.com/frontend/ob2.png" alt="Sign up decoration" />
        </StyledLink>
    );
};

export default AuthLink;

const StyledLink  = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    ${(props) => props.$linkStyle};
`;

const LinkText = styled.span`
    position: absolute; 
    font-weight: 600;
    z-index: 1; 
    color: ${(props) => props.theme.text};
    ${(props) => props.$textStyle};
`;

const LinkImage = styled.img`
    position: absolute;
    top: 0;
`;