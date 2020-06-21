import { date } from "@/lib/formatting/date"
import * as React from "react"
import styled, { css } from "styled-components"
import { Dispatch, SetStateAction, useState } from "react"
import { Icon } from "@/components/icon/Icon"

export type CalendarDateType = Date | Date[] | undefined

type CalendarTypes = {
  value: CalendarDateType
  pinnedDates?: string[] // iso date strings
  onChange: (value: any) => void | Dispatch<SetStateAction<CalendarDateType>>
  selectRange?: boolean
  isBig?: boolean
  className?: string
  pinTo?: Date | null
}

const ReactCalendar: CalendarTypes | any = require("react-calendar").Calendar

const Year = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #5b6670;
`

const MonthName = styled.div`
  margin: 0 10px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #5b6670;
  text-transform: capitalize;
  width: 65px;
  text-align: center;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  font-weight: normal;
`

type CalendarWrapperTypes = {
  isBig?: boolean
}

type LeftButtonTypes = {
  disabled?: boolean
}

const LeftIcon = styled(Icon).attrs({ name: `left-icon` })<LeftButtonTypes>`
  width: 5px;
  height: 9px;
  fill: #4858cc;
  cursor: pointer;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  pointer-events: ${props => (props.disabled ? `none` : `auto`)};
`

const RightIcon = styled(Icon).attrs({ name: `right-icon` })<LeftButtonTypes>`
  width: 5px;
  height: 9px;
  fill: #4858cc;
  cursor: pointer;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  pointer-events: ${props => (props.disabled ? `none` : `auto`)};
`

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
    color: #5b6670;
  }
  .not-pinned {
    pointer-events: none;
    color: #dbdee0 !important;
  }
  .pinned {
    position: relative;
    overflow: auto;
    opacity: 1;
  }
  .react-calendar__tile {
    margin-top: 10px;
    margin-bottom: 10px;
    height: 17px;
  }
  .rangeStart,
  .rangeEnd,
  .react-calendar__tile--active {
    background: #4858cc;
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

const MonthContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`

function firsDayOfMonth(month: number, year: number) {
  return new Date(date(`${year}-${month}-01`).valueOf())
}

const isEqualDates = (first: Date, second: Date, format: string = `DDMMYYYY`) =>
  date(first).format(format) === date(second).format(format)

export const Calendar = (props: CalendarTypes) => {
  const [startDate, changeActiveStartDate] = useState(new Date())

  const pinnedDefined = !!props.pinnedDates

  const equalFormat = `DDMMYYYY`
  const pinnedDates = (props.pinnedDates || []).map(pinnedDate => date(pinnedDate).format(equalFormat))

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
      } else {
        classes.push(`not-pinned`)
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
    changeActiveStartDate(new Date(date(startDate).subtract(1, "month").valueOf()))
  }

  const nextMonth = () => {
    changeActiveStartDate(new Date(date(startDate).add(1, "month").valueOf()))
  }

  const formatter = `YYYYMM`
  const lessThanTheCurrentMonth = +date(startDate).format(formatter) <= +date(new Date()).format(formatter)

  return (
    <CalendarWrapper className={props.className} isBig={props.isBig}>
      <Header>
        <MonthContainer>
          <LeftIcon disabled={lessThanTheCurrentMonth} onClick={prevMonth} />
          <MonthName>{date(startDate).format(`MMMM`)}</MonthName>
          <RightIcon onClick={nextMonth} />
        </MonthContainer>
        <Year>{date(startDate).format(`YYYY`)}</Year>
      </Header>
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
