import styled from "styled-components"
import { MediaRange } from "@/application/lib/responsive/media"

export const Title = styled.div`
  font-family: Roboto Slab;
  font-size: 24px;
  line-height: 26px;
  text-align: center;
  color: #75309e;
  ${MediaRange.lessThan(`mobile`)`
    font-size: 20px;
    line-height: 26px;
  `}
`
