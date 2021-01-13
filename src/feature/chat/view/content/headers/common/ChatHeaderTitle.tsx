import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"

export const ChatHeaderTitle = styled.div`
  font-family: Roboto Slab;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  flex: 1;
  ${MediaRange.lessThan("mobile")`
    font-family: Roboto;
    font-size: 16px;
    line-height: 22px;
    white-space: nowrap;
    text-overflow: ellipsis;
  `}

  & > a {
    color: #424242;
  }
`
