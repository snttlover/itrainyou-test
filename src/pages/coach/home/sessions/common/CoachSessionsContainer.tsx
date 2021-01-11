import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"

export const CoachSessionsContainer = styled.div`
  margin-bottom: 64px;
  ${MediaRange.lessThan("mobile")`
    margin-bottom: 24px;
  `}
`
