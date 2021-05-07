import * as React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { AuthLayout } from "@/oldcomponents/layouts/sections/auth/AuthLayout"
import { LoginForm } from "@/pages/auth/pages/login/content/LoginForm"
import { Socials } from "@/pages/auth/pages/socials/components/Socials"
import { WhiteContainer } from "@/pages/auth/components/WhiteContainer"
import { CenterFormContainer } from "@/pages/auth/components/CenterFormContainer"
import { useEvent } from "effector-react"
import { resetLoginForm } from "@/pages/auth/pages/login/login.model"
import { useEffect } from "react"
import { MediaRange } from "@/lib/responsive/media"

const Header = styled.h3`
  font-family: "Roboto Slab";
  font-weight: 600;
  font-size: 32px;
  line-height: 26px;
  margin-bottom: 30px;
  width: 100%;
  text-align: center;

  ${MediaRange.lessThan("mobile")`
    font-size: 28px;
    line-height: 44px;
    padding-top: 20px;
  `}
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

  ${MediaRange.lessThan("mobile")`
    font-size: 14px;
    line-height: 18px;
  `}
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
          <Socials />
          <LoginForm />
        </WhiteContainer>
        <ResetPasswordLink to='/auth/recovery'>Забыли пароль?</ResetPasswordLink>
      </CenterFormContainer>
    </AuthLayout>
  )
}
