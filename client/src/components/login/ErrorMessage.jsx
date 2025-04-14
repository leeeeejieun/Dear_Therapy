import React from "react";
import styled from "styled-components";

const ErrorMessage = ({message, position}) => {
    return(
        <Error $position={position}>{message}</Error>
    );
};

export default ErrorMessage;

const Error = styled.span`
    color: ${(props) => props.theme.text_warn};
    transform: ${(props) => props.$position};
`;