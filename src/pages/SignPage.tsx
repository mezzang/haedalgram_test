// src/pages/SignPage.tsx
import styled from "styled-components";
import iphone from "../assets/iphone.png";
import logo from "../assets/logo.svg"; // 이미지 파일을 불러와 변수에 담는다.
import { useState } from "react";
import SignInForm from "../components/sign/SignInForm";
import SignUpForm from "../components/sign/SignUpForm";

const Main = styled.main`
  width: 100vw; // 100 %를 의미
  height: 100vh; //100% 를 의미

  display: flex;
  flex-direction: row;
  justify-content: center;
  //   가로축 가운데 정렬(주축 기준 정렬)
  align-items: center;
  //   세로축 가운데 정렬(교차축 기준 정렬)
`;

const IphoneImg = styled.img`
  height: 500px;
`;

const SignSection = styled.section`
  width: 300px;
  margin-left: 30px;

  display: flex;
  //   flexbox컨테이너로 만든다.
  flex-direction: column;
  // 요소가 위에서 아래로 쌓인다.
  align-items: center;
  //   x축 기준으로 가운데 정렬

  border: 1px solid var(--color-grey-2);
  //   실선 테두리
`;

const LogoImg = styled.img`
  width: 70%;
  height: 20%;
  padding: 30px 0;
`;

const DividorDiv = styled.div`
  width: 80%;
  margin: 10px 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 12px;
`;

const Dividor = styled.div`
  width: 100px;

  border-top: 1px solid var(--color-grey-2);
`;

const SwitchDiv = styled.div`
  width: 80%;
  margin-bottom: 30px;

  font-size: 12px;
  text-align: center;
`;

const SwitchSpan = styled.span`
  margin-left: 4px;

  color: var(--color-blue-1);

  cursor: pointer;
`;

const SignPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  // 로그인인지 회원가입인지 구분.

  const onClickSwitchSign = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <Main>
      <IphoneImg src={iphone} />
      <SignSection>
        <LogoImg src={logo} />
        {isSignIn ? <SignInForm /> : <SignUpForm />}
        <DividorDiv>
          <Dividor />
          <p>OR</p>
          <Dividor />
        </DividorDiv>
        <SwitchDiv>
          <span>{isSignIn ? "계정이 없으신가요?" : "계정이 있으신가요?"}</span>
          <SwitchSpan onClick={onClickSwitchSign}>
            {isSignIn ? "회원가입" : "로그인"}
          </SwitchSpan>
        </SwitchDiv>
      </SignSection>
    </Main>
  );
};

export default SignPage;
