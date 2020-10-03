import React from "react"
import styled from "styled-components"
import { MediaRange } from "#/lib/responsive/media"

export const ChatHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 8px 12px;
  border-bottom: 1px solid #e5e5e5;
  align-items: center;
  ${MediaRange.lessThan(`mobile`)`
    padding: 14px 8px;
  `}
`
