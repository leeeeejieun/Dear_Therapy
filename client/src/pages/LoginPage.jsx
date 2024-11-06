import React from 'react';
import Title from 'components/common/Title';
import LoginForm from 'components/login/LoginForm';
import AuthLink from 'components/common/AuthLink';
import { Container as LoginPageContainer} from 'components/common/PageContainer';

const LoginPage = () => {
    return(
        <LoginPageContainer>
            <Title />
            <LoginForm />
            <AuthLink link="/signUp" linkType="signUp" text="회원가입하기"/>
        </LoginPageContainer>
    );
};

export default LoginPage;
