import React from "react"
import styled from "styled-components"
import { MediaRange } from "#/lib/responsive/media"

export const SessionPageInfoWrapper = styled.div`
  width: 268px;
  ${MediaRange.lessThan(`tablet`)`
    display: none;
  `}
`
