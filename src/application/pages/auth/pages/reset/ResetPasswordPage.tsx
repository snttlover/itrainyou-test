import * as React from "react"
import styled from "styled-components"
import { AuthLayout } from "@/application/components/layouts/auth/AuthLayout"
import { ResetPasswordForm } from "@/application/pages/auth/pages/reset/content/ResetPasswordForm"
import { WhiteContainer } from "@/application/pages/auth/components/WhiteContainer"
import { CenterFormContainer } from "@/application/pages/auth/components/CenterFormContainer"
import { AsyncDataOptions } from "@/application/routes"
import { allSettled } from "effector/fork"
import { loadCoaches } from "@/application/pages/landing/content/our-coaches/model"
import * as serveStatic from "serve-static"

const Header = styled.h3`
  color: #424242;
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  margin-bottom: 22px;
  width: 100%;
  text-align: center;

  @media screen and (max-width: 480px) {
    font-size: 20px;
    line-height: 26px;
    margin-bottom: 40px;
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

type ResetPasswordPageTypes = {
  token: string
}

export const ResetPasswordPage = (props: ResetPasswordPageTypes) => (
  <AuthLayout>
    <CenterFormContainer>
      <WhiteContainer>
        <Header>Изменение пароля</Header>
        <ResetPasswordForm token={props.token} />
      </WhiteContainer>
    </CenterFormContainer>
  </AuthLayout>
)
