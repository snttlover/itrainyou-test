import styled from "styled-components"
import * as React from "react"
import { LoginButtons } from "@app/pages/landing/content/top-bar/login-buttons/LoginButtons"

const Container = styled.div`
  width: 100%;
  padding: 44px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const MobileRegistrationBlock = () => (
  <Container>
    <LoginButtons />
  </Container>
)
