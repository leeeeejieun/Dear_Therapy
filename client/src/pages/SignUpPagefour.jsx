import React from 'react';
import ProgressIndicator from 'components/signup/ProgressIndicator';
import NameInput from 'components/signup/stepFour/NameInput';
import InstructionsFour from 'components/signup/stepFour/InstructionsFour';
import NextButton from 'components/signup/NextButton';
import SignUpPageContainer from 'components/signup/SignUpPageContainer';

const SignUpPagefour = () => {
    return(
        <SignUpPageContainer>
            <ProgressIndicator />
            <NextButton />
            <NameInput />
            <InstructionsFour />
        </SignUpPageContainer>
    );
};

export default SignUpPagefour;
