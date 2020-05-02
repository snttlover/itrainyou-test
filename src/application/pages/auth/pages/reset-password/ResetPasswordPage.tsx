import * as React from "react"
import styled from "styled-components"
import { ResetPasswordForm } from "@/application/pages/auth/pages/reset-password/content/ResetPasswordForm"
import { CenterFormContainer } from "@/application/pages/auth/components/CenterFormContainer"
import {WhiteMobileAuthContainer, WhiteMobileAuthLayout} from "@/application/pages/auth/pages/reset-password/common/StyledWhiteMobileAuthLayout"

const Header = styled.h3`
  font-weight: 600;
  margin-bottom: 22px;
  width: 100%;
  text-align: center;
  font-family: Roboto Slab;
  font-size: 32px;
  line-height: 26px;

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
  <WhiteMobileAuthLayout>
    <CenterFormContainer>
      <WhiteMobileAuthContainer>
        <Header>Изменение пароля</Header>
        <ResetPasswordForm token={props.token} />
      </WhiteMobileAuthContainer>
    </CenterFormContainer>
  </WhiteMobileAuthLayout>
)
