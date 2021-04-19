import { Icon } from "@/oldcomponents/icon/Icon"
import { date } from "@/lib/formatting/date"
import * as React from "react"
import styled from "styled-components"

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  font-weight: normal;
  width: 100%;
`

type LeftButtonTypes = {
  disabled?: boolean
}

export const LeftIcon = styled(Icon).attrs({ name: "left-calendar-icon" })<LeftButtonTypes>`
  width: 5px;
  height: 9px;
  fill: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  pointer-events: ${props => (props.disabled ? "none" : "auto")};
`

export const RightIcon = styled(Icon).attrs({ name: "right-calendar-icon" })<LeftButtonTypes>`
  width: 5px;
  height: 9px;
  fill: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  pointer-events: ${props => (props.disabled ? "none" : "auto")};
`

export const MonthContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`

export const Year = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #5b6670;
`

export const MonthName = styled.div`
  margin: 0 10px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #5b6670;
  text-transform: capitalize;
  width: 65px;
  text-align: center;
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
      <MonthName>{date(props.currentDate).format("MMMM")}</MonthName>
      <RightIcon onClick={props.nextMonth} />
    </MonthContainer>
    <Year>{date(props.currentDate).format("YYYY")}</Year>
  </Header>
)
