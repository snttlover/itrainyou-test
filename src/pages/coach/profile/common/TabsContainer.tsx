import { MediaRange } from "#/lib/responsive/media"
import styled from "styled-components"

export const TabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 608px;
  margin: 14px auto 0;

  ${MediaRange.greaterThan("mobile")`
    margin-top: 28px;
  `}
  ${MediaRange.greaterThan("tablet")`
    margin-top: 36px;
  `}
  ${MediaRange.greaterThan("laptop")`    
    max-width: 900px;
    margin-left: 0;
  `}
`
