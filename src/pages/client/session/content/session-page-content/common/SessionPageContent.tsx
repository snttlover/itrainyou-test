import React from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"

export const SessionPageContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 24px;
  flex: 1;
  ${MediaRange.lessThan(`tablet`)`
    margin-right: 0;
  `}
`
