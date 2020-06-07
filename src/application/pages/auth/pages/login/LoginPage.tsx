import Link from "next/link"
import * as React from "react"
import styled from "styled-components"
import { AuthLayout } from "@/application/components/layouts/sections/auth/AuthLayout"
import { LoginForm } from "@/application/pages/auth/pages/login/content/LoginForm"
import { WhiteContainer } from "@/application/pages/auth/components/WhiteContainer"
import { CenterFormContainer } from "@/application/pages/auth/components/CenterFormContainer"

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

const ResetPasswordLink = styled.a`
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

export default () => (
  <AuthLayout>
    <CenterFormContainer>
      <WhiteContainer>
        <Header>Вход</Header>
        <LoginForm />
      </WhiteContainer>
      <Link href='/auth/recovery' as='/auth/recovery' passHref>
        <ResetPasswordLink>Забыли пароль?</ResetPasswordLink>
      </Link>
    </CenterFormContainer>
  </AuthLayout>
)
