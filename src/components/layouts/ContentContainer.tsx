import { MediaRange } from "@/lib/responsive/media"
import styled from "styled-components"

export const ContentContainer = styled.div`
  max-width: 1060px;
  min-width: 320px;
  margin: 0 auto;
  padding: 0 16px 16px;

  ${MediaRange.greaterThan("tablet")`
    padding: 0 36px 16px;
  `}

  ${MediaRange.greaterThan("laptop")`
    padding: 0 60px 16px;
  `}
`
