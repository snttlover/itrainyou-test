import Link from "next/link"
import * as React from "react"
import styled from "styled-components"
import { Button } from "@/application/components/button/normal/Button"

const LoginLink = styled.a`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #7D36A8;
`

const RegistrationButton = styled(Button).attrs({ slim: true })`
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
    <Link href='/login' as='/login' passHref>
      <LoginLink>Войти</LoginLink>
    </Link>
    <Link href='/signup/[step]' as='/signup/1'>
      <RegistrationButton>Зарегистрироваться</RegistrationButton>
    </Link>
  </ButtonsContainer>
)
