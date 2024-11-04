import React from 'react';
import ProgressIndicator from 'components/signup/ProgressIndicator';
import EmailInput from 'components/signup/stepOne/EmailInput';
import Instructions from 'components/signup/stepOne/Instructions';
import NextButton from 'components/signup/NextButton';
import SignUpPageContainer from 'components/signup/SignUpPageContainer';

const SignUpPage = () => {
    return(
        <SignUpPageContainer>
            <ProgressIndicator />
            <EmailInput />
            <Instructions />
            <NextButton />
        </SignUpPageContainer>
    );
};

export default SignUpPage;
