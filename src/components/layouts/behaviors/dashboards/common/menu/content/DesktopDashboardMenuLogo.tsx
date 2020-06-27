import logo from '../../../client/menu/images/desktop-logo.svg'
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"

export const DesktopDashboardMenuLogo = styled.img.attrs({ src: logo })`
  cursor: pointer;
  margin-top: 28px;
  width: 80px;
  height: 103px;
  display: block;
  align-self: center;
  ${MediaRange.lessThan('tablet')`
    display: none;
  `}
`
