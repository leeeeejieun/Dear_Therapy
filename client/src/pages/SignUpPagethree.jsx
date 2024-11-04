import React from 'react';
import ProgressIndicator from 'components/signup/ProgressIndicator';
import PwInput from 'components/signup/stepThree/PwInput';
import InstructionsThree from 'components/signup/stepThree/InstructionsThree';
import NextButton from 'components/signup/NextButton';
import SignUpPageContainer from 'components/signup/SignUpPageContainer';

const SignUpPagethree = () => {
    return(
        <SignUpPageContainer>
            <ProgressIndicator />
            <PwInput />
            <InstructionsThree />
            <NextButton />
        </SignUpPageContainer>
    );
};

export default SignUpPagethree;
