import React from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"

export const SessionPageContainer = styled.div`
  display: flex;
  padding: 36px 20px 20px;
  width: 100%;
  max-width: 892px;
  margin: 0 auto;
  ${MediaRange.lessThan(`tablet`)`
    max-width: 600px;
  `}

  ${MediaRange.lessThan(`mobile`)`
      padding: 24px 16px;
  `}
`
