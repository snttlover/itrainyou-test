import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"

type StyledMenuWrapperTypes = {
  showOnMobile: boolean
}

export const DashboardMenuContainer = styled.div<StyledMenuWrapperTypes>`
  height: 100%;
  min-height: 100vh;
  z-index: 200;
  background: ${(props) => props.theme.colors.primary};
  color: #fff;
  font-family: Roboto;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;

  position: relative;
  display: flex;
  width: 200px;
  padding: 0;

  ${MediaRange.lessThan<StyledMenuWrapperTypes>("tablet")`
     display: ${({ showOnMobile }) => (showOnMobile ? "flex" : "none")};
     width: 100vw;
     padding: 14px 16px;
  `}
`
