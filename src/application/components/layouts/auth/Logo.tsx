import * as React from "react"
import styled from "styled-components"
import { Logo as LogoImage } from "@/application/pages/landing/content/top-bar/logo/Logo"

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 71px;
  text-align: center;
  position: absolute;
  left: 22px;
  top: 25px;
  @media screen and (max-width: 480px) {
    left: 16px;
    top: 16px;
  }
`

const Text = styled.div`
  text-transform: uppercase;
  width: 100%;
  font-weight: bold;
  margin-top: 12px;
  color: #544274;
  font-size: 20px;
  line-height: 26px;
  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`

const StyledLogo = styled(LogoImage)`
  width: 35px;
  height: 35px;
  @media screen and (max-width: 480px) {
    width: 26px;
    height: 26px;
  }
`

export const Logo = () => (
  <LogoContainer>
    <StyledLogo />
    <Text>i train you</Text>
  </LogoContainer>
)
