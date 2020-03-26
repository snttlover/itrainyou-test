import * as React from "react"
import styled from "styled-components"
import { AuthLayout } from "@/application/components/layouts/auth/AuthLayout"
import { LoginForm } from "@/application/pages/auth/pages/login/content/LoginForm"
import { WhiteContainer } from "@/application/pages/auth/components/WhiteContainer"
import { CenterFormContainer } from "@/application/pages/auth/components/CenterFormContainer"
import { Link } from "@reach/router"

const Header = styled.h3`
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  margin-bottom: 22px;
  width: 100%;
  text-align: center;

  @media screen and (max-width: 480px) {
    font-size: 28px;
    line-height: 44px;
    padding-top: 20px;
  }
`

const ResetPasswordLink = styled(Link)`
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  margin: 36px auto 0;
  color: #544274;
  cursor: pointer;
  text-align: center;
  width: 200px;

  @media screen and (max-width: 480px) {
    font-size: 14px;
    line-height: 18px;
  }
`

export const LoginPage = () => (
  <AuthLayout>
    <CenterFormContainer>
      <WhiteContainer>
        <Header>Вход</Header>
        <LoginForm />
      </WhiteContainer>
      <ResetPasswordLink to='/recovery'>Забыли пароль?</ResetPasswordLink>
    </CenterFormContainer>
  </AuthLayout>
)
