import * as React from "react"
import styled from "styled-components"
import { Logo } from "./Logo"

const StyledLayout = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: auto;
  background: linear-gradient(211.55deg, #a3cff3 14.5%, rgba(255, 255, 255, 0) 85.5%), #9f8dc1;
  @media screen and (max-width: 480px) {
    background: #fff; 
  }
`

const AuthContainer = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  position: relative;
  height: 100%;
`

type AuthLayoutProps = {
  children: React.ReactNode
}

export const AuthLayout = (props: AuthLayoutProps) => (
  <StyledLayout>
    <AuthContainer>
      <Logo />
      {props.children}
    </AuthContainer>
  </StyledLayout>
)
