import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"

export const LeftPageContainer = styled.div`
  width: 100%;
  max-width: 736px;
  margin-top: 36px;
  padding: 0 24px 20px 0;
  position: relative;
  ${MediaRange.lessThan("tablet")`
    margin: 40px auto 0;
  `}
`
