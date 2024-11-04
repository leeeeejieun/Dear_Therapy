import React from 'react';
import ProgressIndicator from 'components/signup/ProgressIndicator';
import IdInput from 'components/signup/stepTwo/IdInput';
import InstructionsTwo from 'components/signup/stepTwo/InstructionsTwo';
import NextButton from 'components/signup/NextButton';
import SignUpPageContainer from 'components/signup/SignUpPageContainer';

const SignUpPagetwo = () => {
    return(
        <SignUpPageContainer>
            <ProgressIndicator />
            <IdInput />
            <InstructionsTwo />
            <NextButton />
        </SignUpPageContainer>
    );
};

export default SignUpPagetwo;
