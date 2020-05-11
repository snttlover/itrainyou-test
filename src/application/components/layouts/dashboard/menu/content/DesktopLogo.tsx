import logo from '../images/desktop-logo.svg'
import styled from "styled-components"
import { MediaRange } from "@/application/lib/responsive/media"

export const DesktopLogo = styled.img.attrs({ src: logo })`
  margin-top: 28px;
  width: 80px;
  height: 103px;
  display: none;
  align-self: center;
  ${MediaRange.greaterThan('tablet')`
    display: block;
  `}
`
