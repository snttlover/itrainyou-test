import { Icon } from "@/old-components/icon/Icon"
import { date } from "@/lib/formatting/date"
import * as React from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  font-weight: normal;
  width: 100%;

  ${MediaRange.lessThan("mobile")`
    justify-content: center;
  `}
`

type LeftButtonTypes = {
  disabled?: boolean
}

export const LeftIcon = styled(Icon).attrs({ name: "arrow" })<LeftButtonTypes>`
  width: 14px;
  height: 14px;
  fill: #424242;
  cursor: pointer;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  pointer-events: ${props => (props.disabled ? "none" : "auto")};
  margin: 0 12px 0 0;
  transform: rotate(90deg);
  ${MediaRange.lessThan("mobile")`
    margin-right: auto;
  `}
`

export const RightIcon = styled(Icon).attrs({ name: "arrow" })<LeftButtonTypes>`
  width: 14px;
  height: 14px;
  cursor: pointer;
  fill: #424242;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  pointer-events: ${props => (props.disabled ? "none" : "auto")};
  margin: 0 0 0 12px;
  transform: rotate(-90deg);
  ${MediaRange.lessThan("mobile")`
    margin-left: auto;
  `}
`

export const MonthContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  ${MediaRange.lessThan("mobile")`
    justify-content: center;
    width: 100%;
  `}
`

export const Year = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  color: #5b6670;
  margin-left: auto;
  margin-top: 1px;
`

export const MonthName = styled.div<{mobile?: boolean; showed?: boolean}>`
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  color: #5b6670;
  text-transform: capitalize;
  text-align: center;
  display: ${({ mobile, showed }) => !!showed ? "unset" : (!!mobile ? "none" : "unset")};

  ${MediaRange.lessThan("mobile")`
    display: ${
  // @ts-ignore
  ({ mobile, showed }) => !!showed ? "unset" : (!!mobile ? "unset" : "none")};
  `}
`

type CalendarHeaderTypes = {
  lessThanTheCurrentMonth?: boolean
  prevMonth?: () => void
  currentDate?: Date
  nextMonth?: () => void
}

export const CalendarHeader: React.FC<CalendarHeaderTypes> = (props: CalendarHeaderTypes) => (
  <Header>
    <MonthContainer>
      <LeftIcon disabled={props.lessThanTheCurrentMonth} onClick={props.prevMonth} />
      <MonthName showed>{date(props.currentDate).format("MMMM")}</MonthName>
      <RightIcon onClick={props.nextMonth} />
      <Year>{date(props.currentDate).format("YYYY")}</Year>
    </MonthContainer>
  </Header>
)
