import * as React from "react"
import styled from "styled-components"
import { AuthLayout } from "@/application/components/layouts/auth/AuthLayout"
import { ResetPasswordForm } from "@/application/pages/auth/pages/reset-password/content/ResetPasswordForm"
import { WhiteContainer } from "@/application/pages/auth/components/WhiteContainer"
import { CenterFormContainer } from "@/application/pages/auth/components/CenterFormContainer"

const Header = styled.h3`
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
