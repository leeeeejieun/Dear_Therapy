import React from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button'; 

const NextButton = ({ text, onClick, disabled }) => {
    return (
        <ButtonWrapper>
            <Button 
                buttonType="next" 
                text={text} 
                onClick={onClick} 
                disabled={disabled}
            />
        </ButtonWrapper>
    );
};

const ButtonWrapper = styled.div`
    margin-top: 20px; 
    margin-left: 20px;
`;

export default NextButton;
