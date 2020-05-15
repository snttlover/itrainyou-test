import Link from "next/link"
import * as React from "react"
import { MediaRange } from "@/application/lib/responsive/media"
import styled from "styled-components"
import desktopLogo from "./images/desktop-logo.svg"
import mobileLogo from "./images/mobile-logo.svg"

export const AuthLogoLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  left: 16px;
  top: 16px;
  background-size: cover;
  background-position: center;
  background: url("${mobileLogo}");
  width: 36px;
  height: 36px;
  cursor: pointer;

  ${MediaRange.greaterThan("mobile")`  
    background: url("${desktopLogo}");
    background-size: cover;
    background-position: center;
    width: 80px;
    height: 103px;
  `}

  ${MediaRange.greaterThan("tablet")`  
    left: 24px;
    top: 36px;
  `}
`

export const AuthLayoutLogo = () => (
  <Link href='/' as='/' passHref>
    <AuthLogoLink />
  </Link>
)
