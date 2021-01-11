import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"

export const SubTitle = styled.div`
  font-family: Roboto;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #5B6670;
  ${MediaRange.lessThan("mobile")`
    font-size: 14px;
    line-height: 18px;
  `}
`
