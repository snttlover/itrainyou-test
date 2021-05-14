import { Icon } from "@/oldcomponents/icon/Icon"
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

export const LeftIcon = styled(Icon).attrs({ name: "left-calendar-icon" })<LeftButtonTypes>`
  width: 32px;
  height: 32px;
  fill: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  pointer-events: ${props => (props.disabled ? "none" : "auto")};
  margin-right: 2px;
  
  ${MediaRange.lessThan("mobile")`
    margin-right: 30px;
  `}
`

export const RightIcon = styled(Icon).attrs({ name: "right-calendar-icon" })<LeftButtonTypes>`
  width: 40px;
  height: 40px;
  fill: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  pointer-events: ${props => (props.disabled ? "none" : "auto")};
  margin-left: 2px;

  ${MediaRange.lessThan("mobile")`
    margin-left: 30px;
  `}
`

export const MonthContainer = styled.div`
  display: flex;
  align-items: center;
`

export const Year = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #5b6670;
`

export const MonthName = styled.div<{mobile?: boolean; showed?: boolean}>`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
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
      <MonthName showed>{date(props.currentDate).format("MMMM")},{"  "}</MonthName>
      <Year>{date(props.currentDate).format("YYYY")}</Year>
      <RightIcon onClick={props.nextMonth} />
    </MonthContainer>
  </Header>
)
