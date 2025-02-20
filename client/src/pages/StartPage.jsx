import React from 'react';
import Title from 'components/common/Title';
import LoginLink from 'components/start/LoginLink';
import AuthLink from 'components/common/AuthLink';
import { Container as StartPageContainer} from 'components/common/PageContainer';

const StartPage = () => {
    return(
      <StartPageContainer>
        <Title />
        <LoginLink />
        <AuthLink link="/signUp" linkType="signUp" text="회원가입하기"/>
      </StartPageContainer>
    );
};
 
export default StartPage;
