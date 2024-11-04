import React from 'react';
import Completemsg from 'components/signup/stepComplete/Completemsg';
import NextButton from 'components/signup/NextButton';
import SignUpPageContainer from 'components/signup/SignUpPageContainer';

const SignUpPagecomplete = () => {
    return(
        <SignUpPageContainer>
            <Completemsg />
            <NextButton />
        </SignUpPageContainer>
    );
};

export default SignUpPagecomplete;