import Link from "next/link"
import * as React from "react"
import styled from "styled-components"
import { Button } from "@/application/components/button/normal/Button"

const LoginLink = styled.a`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #544274;
  cursor: pointer;
`

const RegistrationButton = styled(Button)`
  padding: 7px 18px;
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
