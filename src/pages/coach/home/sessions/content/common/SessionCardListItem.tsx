import styled from "styled-components"
import { SessionCard } from "@/pages/client/home/SessionCard"
import { MediaRange } from "@/lib/responsive/media"

export const SessionCardListItem = styled(SessionCard)`
  margin-bottom: 24px;
  &:last-child {
    margin-bottom: 0;
  }
  ${MediaRange.lessThan("mobile")`
    margin-bottom: 16px;
  `}
`
