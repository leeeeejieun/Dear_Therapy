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
            color: ${(props) => props.theme.text};
        `,
    },
};

const AuthLink = ({link, linkType, text}) => {
    const {linkStyle, textStyle} = type[linkType];

    return (
        <StyledLink to={link} $linkStyle={linkStyle}>
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
    z-index: 1; 
     ${(props) => props.$textStyle};
`;

const LinkImage = styled.img`
    position: absolute;
    top: 0;
`;