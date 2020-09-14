import {
  CalendarHeader,
  Header,
  LeftIcon,
  MonthContainer,
  MonthName,
  RightIcon,
  Year,
} from "@/components/calendar/CalendarHeader"
import { date } from "@/lib/formatting/date"
import * as React from "react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import styled, { css } from "styled-components"

export type CalendarDateType = Date | Date[] | undefined | null

type CalendarTypes = {
  value: CalendarDateType
  pinnedDates?: string[] // iso date strings
  enabledDates?: string[] // iso date strings
  onChange: (value: any) => void | Dispatch<SetStateAction<CalendarDateType>>
  selectRange?: boolean
  isBig?: boolean
  className?: string
  disabledFrom?: Date
  startFrom?: Date
  pinTo?: Date | null
  onPrevMonth?: (prevMonth: Date) => void
  onNextMonth?: (nextMonth: Date) => void
}

const ReactCalendar: CalendarTypes | any = require("react-calendar").Calendar

type CalendarWrapperTypes = {
  isBig?: boolean
}

const BigCalendarStyles = css`
  ${Header} {
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    border-bottom: 1px solid #dbdee0;
    padding-bottom: 12px;

    ${MonthName} {
      font-size: inherit;
      line-height: inherit;
      font-weight: inherit;
    }
    ${Year} {
      font-size: inherit;
      font-weight: inherit;
    }
  }

  .react-calendar__tile {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;

    margin-top: 10px;
    margin-bottom: 10px;
    height: 24px;
  }
`

const CalendarWrapper = styled.div<CalendarWrapperTypes>`
  position: relative;
  cursor: default;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  .react-calendar__navigation__next2-button,
  .react-calendar__navigation__prev2-button {
    display: none;
  }
  .react-calendar__month-view__weekdays__weekday {
    text-align: center;
    text-transform: lowercase;
    text-decoration: none;
    font-weight: normal;
    color: #5b6670;
    abbr {
      text-decoration: none;
    }
  }
  .react-calendar__month-view__weekdays__weekday:nth-child(n + 6),
  .react-calendar__month-view__days__day.day--weekend {
    color: #ff6b00;
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
    color: #424242;
  }
  .disabled {
    pointer-events: none;
    color: #dbdee0 !important;
  }
  .enabled {
    position: relative;
    overflow: auto;
    opacity: 1;
  }
  .pinned:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    width: 4px;
    height: 4px;
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
  }
  .react-calendar__tile {
    margin-top: 10px;
    margin-bottom: 10px;
    height: 17px;
  }
  .rangeStart,
  .rangeEnd,
  .react-calendar__tile--active {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff !important;
  }
  .react-calendar__tile--rangeStart:not(.rangeEnd),
  .rangeStart,
  .react-calendar__tile--active.day-of-week-1 {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  .react-calendar__tile--rangeEnd:not(.rangeStart),
  .rangeEnd,
  .react-calendar__tile--active.day-of-week-0 {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
  .not-current-month {
    visibility: hidden;
    height: 0px;
  }
  ${props => props.isBig && BigCalendarStyles}
`

function firsDayOfMonth(month: number, year: number) {
  return new Date(date(`${year}-${month}-01`).valueOf())
}

const isEqualDates = (first: Date, second: Date, format: string = `DDMMYYYY`) =>
  date(first).format(format) === date(second).format(format)

export const Calendar = (props: CalendarTypes) => {
  const [startDate, changeActiveStartDate] = useState(new Date())

  useEffect(() => {
    if (props.startFrom && +props.startFrom !== +startDate) {
      changeActiveStartDate(props.startFrom)
    }
  }, [props.startFrom])

  const pinnedDefined = !!props.pinnedDates
  const enabledDefined = !!props.enabledDates

  const equalFormat = `DDMMYYYY`
  const pinnedDates = (props.pinnedDates || []).map(pinnedDate => date(pinnedDate).format(equalFormat))
  const enabledDates = (props.enabledDates || []).map(enabledDate => date(enabledDate).format(equalFormat))

  type CustomClassNamesTypes = {
    date: Date
  }

  const customClassNames = ({ date: dat }: CustomClassNamesTypes) => {
    const classes = []

    classes.push(`day-of-week-${date(dat).day()}`)

    if (props.pinTo && props.value) {
      const range = [props.pinTo]
      const value = props.value as Date
      if (props.pinTo > value) {
        range.unshift(value)
      } else {
        range.push(value)
      }

      if (date(dat).isBetween(range[0], range[1])) {
        classes.push(`react-calendar__tile--active`)
      }
      if (isEqualDates(range[0], dat)) {
        classes.push(`rangeStart`)
      }
      if (isEqualDates(range[1], dat)) {
        classes.push(`rangeEnd`)
      }
    }

    if (pinnedDefined) {
      if (pinnedDates.includes(date(dat).format(equalFormat))) {
        classes.push(`pinned`)
      }
    }

    if (props.disabledFrom) {
      if (date(props.disabledFrom).isBefore(date(dat))) {
        classes.push(`disabled`)
      }
    }

    if (enabledDefined) {
      if (enabledDates.includes(date(dat).format(equalFormat))) {
        classes.push(`enabled`)
      } else {
        classes.push(`disabled`)
      }
    }

    const day = dat.getDay()
    const isWeekend = day === 6 || day === 0
    if (isWeekend) {
      classes.push(`day--weekend`)
    }

    if (!isEqualDates(dat, startDate, `MMYYYY`)) {
      classes.push(`not-current-month`)
    }

    if (dat.valueOf() < date().subtract(1, `day`).valueOf()) {
      classes.push(`is-past`)
    }

    return classes
  }

  const prevMonth = () => {
    const prevMonthDate = new Date(date(startDate).subtract(1, "month").valueOf())
    changeActiveStartDate(prevMonthDate)
    props.onPrevMonth?.(prevMonthDate)
  }

  const nextMonth = () => {
    const nextMonthDate = new Date(date(startDate).add(1, "month").valueOf())
    changeActiveStartDate(nextMonthDate)
    props.onNextMonth?.(nextMonthDate)
  }

  const formatter = `YYYYMM`
  const lessThanTheCurrentMonth = +date(startDate).format(formatter) <= +date(new Date()).format(formatter)

  return (
    <CalendarWrapper className={props.className} isBig={props.isBig}>
      <CalendarHeader
        lessThanTheCurrentMonth={lessThanTheCurrentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        currentDate={startDate}
      />
      <ReactCalendar
        tileClassName={customClassNames}
        locale='ru-RU'
        value={props.value}
        onChange={props.onChange}
        activeStartDate={firsDayOfMonth(startDate.getMonth() + 1, startDate.getFullYear())}
        selectRange={props.selectRange || false}
        showNavigation={false}
      />
    </CalendarWrapper>
  )
}
