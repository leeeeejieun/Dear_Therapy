import React from 'react';
import styled from 'styled-components';

const ProgressIndicator = ({step}) => {
    return (
        <Progress>
            <Step className={step === 1 ? 'active' : ''}>1</Step>
            <Line />
            <Step className={step === 2 ? 'active' : ''}>2</Step>
            <Line />
            <Step className={step === 3 ? 'active' : ''}>3</Step>
            <Line />
            <Step className={step === 4 ? 'active' : ''}>4</Step>
        </Progress>
    );
};

const Progress = styled.div`
    display: flex;
    justify-content: space-around;
    width: 70%;
    margin: 20px 0;
`;

const Step = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: ${(props) => props.theme.background};
    text-align: center;
    line-height: 25px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    &.active {
        background: ${(props) => props.theme.bt_green};
    }
`;

const Line = styled.div`
    height: 2px;
    flex-grow: 1;
    margin: 0 10px;
    background-image: linear-gradient(to right, ${(props) => props.theme.text} 50%, rgba(255, 255, 255, 0) 50%);
    background-size: 10px 2px;
    background-repeat: repeat-x;
    margin-top: 10px;
`;

export default ProgressIndicator;
