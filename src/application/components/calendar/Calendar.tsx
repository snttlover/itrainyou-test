import * as React from "react"
import styled from "styled-components"
import dayjs from "dayjs"
import { Dispatch, SetStateAction, useState } from "react"
import leftImage from "./images/left.svg"
import rightImage from "./images/right.svg"

export type CalendarDateType = Date | Date[]

type CalendarTypes = {
  value: CalendarDateType
  pinnedDates?: string[] // iso date strings
  onChange: (value: any) => void | Dispatch<SetStateAction<CalendarDateType>>
  selectRange?: boolean
}

const ReactCalendar: CalendarTypes | any = require("react-calendar").Calendar

const CalendarWrapper = styled.div`
  position: relative;
  cursor: default;
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
    text-decoration: none;
    abbr {
      text-decoration: none;
    }
  }
  .react-calendar__month-view__weekdays__weekday:nth-child(n + 6),
  .day--weekend {
    color: #d5584d;
  }
  .is-past {
    opacity: 0.5;
    pointer-events: none;
    cursor: default;
  }
  .react-calendar__month-view__days__day {
    flex-basis: 14.2%;
    height: 28px;
    border: none;
    background: transparent;
    cursor: pointer;
    outline: none;
    font-size: 12px;
    position: relative;
  }
  .pinned {
    position: relative;
    overflow: auto;
  }
  .pinned:after {
    position: absolute;
    right: 4px;
    top: 4px;
    content: "";
    background: #544274;
    width: 4px;
    height: 4px;
    border-radius: 4px;
    z-index: 2;
  }
  .react-calendar__tile--active {
    border-radius: 50%;
    background: #daebf7;
  }
  .not-current-month {
    visibility: hidden;
    height: 0px;
  }
`

type LeftButtonTypes = {
  disabled: boolean
}

const LeftButton = styled.img.attrs({ src: leftImage })<LeftButtonTypes>`
  width: 4.9px;
  height: 8.4px;
  cursor: pointer;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  pointer-events: ${props => (props.disabled ? `none` : `auto`)};
`

const RightButton = styled.img.attrs({ src: rightImage })`
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

  const equalFormat = `DDMMYYYY`
  const pinnedDates = (props.pinnedDates || []).map(date => dayjs(date).format(equalFormat))

  type CustomClassNamesTypes = {
    date: Date
  }

  const customClassNames = ({ date }: CustomClassNamesTypes) => {
    const classes = []

    if (pinnedDates.includes(dayjs(date).format(equalFormat))) {
      classes.push(`pinned`)
    }

    const day = date.getDay()
    const isWeekend = day === 6 || day === 0
    if (isWeekend) {
      classes.push(`day--weekend`)
    }

    if (dayjs(startDate).format(`MMYYYY`) !== dayjs(date).format(`MMYYYY`)) {
      classes.push(`not-current-month`)
    }

    if (
      date.valueOf() <
      dayjs()
        .subtract(1, `day`)
        .valueOf()
    ) {
      classes.push(`is-past`)
    }

    return classes
  }

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

  const formatter = `YYYYMM`
  const lessThanTheCurrentMonth = +dayjs(startDate).format(formatter) <= +dayjs(new Date()).format(formatter)

  return (
    <CalendarWrapper>
      <Header>
        <MonthContainer>
          <LeftButton disabled={lessThanTheCurrentMonth} onClick={prevMonth} />
          <MonthName>{dayjs(startDate).format(`MMMM`)}</MonthName>
          <RightButton onClick={nextMonth} />
        </MonthContainer>
        <Year>{dayjs(startDate).format(`YYYY`)}</Year>
      </Header>
      <ReactCalendar
        tileClassName={customClassNames}
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
