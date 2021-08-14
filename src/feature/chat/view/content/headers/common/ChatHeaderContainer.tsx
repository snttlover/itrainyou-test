import React from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"

export const ChatHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 16px 20px;
  border-bottom: 1px solid #e1e6ea;
  align-items: center;
  ${MediaRange.lessThan("mobile")`
    padding: 14px 8px;
  `}
`
