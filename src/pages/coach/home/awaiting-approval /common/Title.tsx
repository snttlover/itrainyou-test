import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"

export const Title = styled.div`
  font-family: Roboto Slab;
  font-size: 24px;
  line-height: 26px;
  text-align: center;
  color: #7d36a8;
  ${MediaRange.lessThan(`mobile`)`
    font-size: 20px;
    line-height: 26px;
  `}
`
