import * as React from "react"
import styled from "styled-components"
import { AuthLayout } from "@/application/components/layouts/auth/AuthLayout"
import { LoginForm } from "@/application/pages/login/content/LoginForm"

const FormContainer = styled.div`
  width: 100%;
  max-width: 800px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.12), 0px 4px 12px rgba(0, 0, 0, 0.25);
  background: #fff;
  padding: 36px 100px 60px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    padding-left: 48px;
    padding-right: 48px;
  }
  @media screen and (max-width: 480px) {
    box-shadow: none;
    padding-right: 20px;
    padding-left: 20px;
  }
`

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

const ResetPasswordLink = styled.div`
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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: auto;
  height: auto;
  min-width: 100%;
  min-height: 100%;

  @media screen and (max-width: 872px) {
    padding-right: 36px;
    padding-left: 36px;
  }
  @media screen and (max-width: 480px) {
    padding-right: 0;
    padding-left: 0;
  }
`

export const LoginPage = () => (
  <AuthLayout>
    <Container>
      <FormContainer>
        <Header>Вход</Header>
        <LoginForm />
      </FormContainer>
      <ResetPasswordLink>Забыли пароль?</ResetPasswordLink>
    </Container>
  </AuthLayout>
)
