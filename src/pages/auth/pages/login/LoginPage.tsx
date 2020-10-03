import * as React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { AuthLayout } from "#/components/layouts/sections/auth/AuthLayout"
import { LoginForm } from "#/pages/auth/pages/login/content/LoginForm"
import { WhiteContainer } from "#/pages/auth/components/WhiteContainer"
import { CenterFormContainer } from "#/pages/auth/components/CenterFormContainer"
import { useEvent } from "effector-react/ssr"
import { resetLoginForm } from "#/pages/auth/pages/login/login.model"
import { useEffect } from "react"

const Header = styled.h3`
  font-family: "Roboto Slab";
  font-weight: 600;
  font-size: 32px;
  line-height: 26px;
  margin-bottom: 30px;
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
  color: #fff;
  cursor: pointer;
  text-align: center;
  width: 200px;

  @media screen and (max-width: 480px) {
    font-size: 14px;
    line-height: 18px;
  }
`

export const LoginPage = () => {
  const destroyed = useEvent(resetLoginForm)

  useEffect(() => {
    return () => destroyed()
  }, [])

  return (
    <AuthLayout>
      <CenterFormContainer>
        <WhiteContainer>
          <Header>Вход</Header>
          <LoginForm />
        </WhiteContainer>
        <ResetPasswordLink to='/auth/recovery'>Забыли пароль?</ResetPasswordLink>
      </CenterFormContainer>
    </AuthLayout>
  )
}
