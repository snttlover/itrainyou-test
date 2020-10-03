import * as React from "react"
import styled from "styled-components"
import { AuthLayoutLogo } from "./AuthLayoutLogo"
import desktopBackgroundImage from './images/desktop-background.svg'
import tabletBackgroundImage from './images/tablet-background.svg'
import mobileBackgroundImage from './images/mobile-background.svg'
import { ClientTheme } from "#/components/layouts/themes"

const StyledLayout = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: auto;
  background: url("${desktopBackgroundImage}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  @media screen and (max-width: 768px) {
    background: url("${tabletBackgroundImage}");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom;
  }
  @media screen and (max-width: 480px) {
    background: url("${mobileBackgroundImage}"); 
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom;
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
  className?: string
}

export const AuthLayout = (props: AuthLayoutProps) => (
  <StyledLayout className={props.className}>
    <AuthContainer>
      <AuthLayoutLogo />
      {props.children}
    </AuthContainer>
  </StyledLayout>
)
