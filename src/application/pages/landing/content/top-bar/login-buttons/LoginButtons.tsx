import Link from "next/link"
import * as React from "react"
import styled from "styled-components"
import { Button } from "@/application/components/button/normal/Button"

const LoginLink = styled.a`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #7d36a8;
`

const RegistrationButton = styled(Button)`
  margin-left: 24px;
`

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`

type LoginButtonsTypes = {
  className?: string
}

export const LoginButtons = (props: LoginButtonsTypes) => (
  <ButtonsContainer className={props.className}>
    <Link href='/auth/login' as='/auth/login' passHref>
      <LoginLink>Войти</LoginLink>
    </Link>
    <Link href='/auth/signup/[step]' as='/auth/signup/1'>
      <RegistrationButton>Зарегистрироваться</RegistrationButton>
    </Link>
  </ButtonsContainer>
)
