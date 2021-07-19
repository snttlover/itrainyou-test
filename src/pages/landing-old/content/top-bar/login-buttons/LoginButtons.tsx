import { routeNames } from "@/pages/route-names"
import * as React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Button } from "@/old-components/button/normal/Button"

const LoginLink = styled(Link)`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #783D9D;
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
    <LoginLink to={routeNames.login()}>Войти</LoginLink>
    <Link to={routeNames.signup("1")}>
      <RegistrationButton>Зарегистрироваться</RegistrationButton>
    </Link>
  </ButtonsContainer>
)
