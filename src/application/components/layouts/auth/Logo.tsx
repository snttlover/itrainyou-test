import Link from "next/link"
import * as React from "react"
import { MediaRange } from "@/application/lib/responsive/media"
import styled from "styled-components"
import logo from "./images/logo.svg"

const LogoLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  left: 16px;
  top: 16px;
  width: 60px;
  height: 60.19px;

  ${MediaRange.greaterThan("mobile")`  
    width: 80px;
    height: 80.26px;
  `}

  ${MediaRange.greaterThan("tablet")`  
    left: 24px;
    top: 36px;
  `}
`

const StyledLogo = styled.img.attrs({ src: logo })`
  width: 100%;
  height: 100%;
`

export const Logo = () => (
  <Link href='/'>
    <LogoLink href='/'>
      <StyledLogo />
    </LogoLink>
  </Link>
)
