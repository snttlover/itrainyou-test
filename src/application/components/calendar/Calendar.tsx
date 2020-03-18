import * as React from "react"
import styled from "styled-components"
import * as dayjs from "dayjs"
import { useState } from "react"
import leftImage from "./images/left.svg"
import rightImage from "./images/right.svg"

export type CalendarDateType = Date | Date[]

type CalendarTypes = {
  value: CalendarDateType
  onChange: (value: CalendarDateType) => void
  selectRange?: boolean
}

const ReactCalendar: CalendarTypes | any = require("react-calendar").Calendar

const CalendarWrapper = styled.div`
  width: 196px;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  .react-calendar__navigation__next2-button,
  .react-calendar__navigation__prev2-button {
    display: none;
  }
  .react-calendar__month-view__weekdays__weekday {
    text-align: center;
    text-transform: uppercase;
  }
  .react-calendar__month-view__weekdays__weekday:nth-child(n + 6),
  .day--weekend {
    color: red;
  }
  .react-calendar__month-view__days__day {
    flex-basis: 28px;
    height: 28px;
    border: none;
    background: transparent;
    cursor: pointer;
    outline: none;
    font-size: 12px;
    position: relative;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #b3b3b3;
  }
  .react-calendar__tile--active {
    border-radius: 50%;
    background: #daebf7;
  }
`

const LeftButton = styled.img.attrs({ src: leftImage })`
  width: 4.9px;
  height: 8.4px;
  cursor: pointer;
`

const RightButton = styled(LeftButton).attrs({ src: rightImage })`
  width: 4.9px;
  height: 8.4px;
  cursor: pointer;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  font-weight: normal;
`

const MonthContainer = styled.div`
  display: flex;
  align-items: center;
`

const MonthName = styled.div`
  margin: 0 10px;
  font-size: 12px;
  line-height: 16px;
  color: #424242;
  text-transform: capitalize;
  width: 65px;
  text-align: center;
`

const Year = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #424242;
`

export const Calendar = (props: CalendarTypes) => {
  const [startDate, changeActiveStartDate] = useState(new Date())

  const prevMonth = () => {
    changeActiveStartDate(
      new Date(
        dayjs(startDate)
          .subtract(1, "month")
          .valueOf()
      )
    )
  }

  const nextMonth = () => {
    changeActiveStartDate(
      new Date(
        dayjs(startDate)
          .add(1, "month")
          .valueOf()
      )
    )
  }

  return (
    <CalendarWrapper>
      <Header>
        <MonthContainer>
          <LeftButton onClick={prevMonth} />
          <MonthName>{dayjs(startDate).format(`MMMM`)}</MonthName>
          <RightButton onClick={nextMonth} />
        </MonthContainer>
        <Year>{dayjs(startDate).format(`YYYY`)}</Year>
      </Header>
      <ReactCalendar
        locale='ru-RU'
        value={props.value}
        onChange={props.onChange}
        activeStartDate={startDate}
        selectRange={props.selectRange || false}
        showNavigation={false}
      />
    </CalendarWrapper>
  )
}
