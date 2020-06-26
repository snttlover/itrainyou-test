import React from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"

const StyledTitle = styled.div`
  font-family: Roboto Slab;
  font-size: 24px;
  line-height: 26px;
  color: #424242;
  margin-bottom: 24px;
  ${MediaRange.lessThan(`mobile`)`
    font-size: 20px;
    line-height: 26px;
    margin-bottom: 12px;
  `}
`

type CoachSessionsBlockTitleTypes = {
  children: React.ReactChild
  className?: string
}

export const CoachSessionsBlockTitle = ({ children, className }: CoachSessionsBlockTitleTypes) => (
  <StyledTitle className={className}>{children}</StyledTitle>
)
