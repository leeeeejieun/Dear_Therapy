import React from "react";
import styled from "styled-components";

const Input = ({setState, setError, ...props}) => {

    const handleChange = (e) => {
       setState((prev) => ({
        ...prev,
        [e.target.id]: e.target.value
       }));
       setError && setError('');
    };

    return(
        <StyledInput {...props} onChange={handleChange} required />
    );
};

export default Input;

const StyledInput = styled.input`
    width: 100%;
    font-size: 16px;
    font-family: inherit;;
    border-radius: 25px;
    border: none;
    outline: none;
    padding: 10px;
`;