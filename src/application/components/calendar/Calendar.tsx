import * as React from "react"
import styled, { css } from "styled-components"
import dayjs from "dayjs"
import 'dayjs/locale/ru'
import { Dispatch, SetStateAction, useState } from "react"
import leftImage from "./images/left.svg"
import rightImage from "./images/right.svg"
import { Icon } from "@/application/components/icon/Icon"

dayjs.locale('ru')

export type CalendarDateType = Date | Date[] | undefined

type CalendarTypes = {
  value: CalendarDateType
  pinnedDates?: string[] // iso date strings
  onChange: (value: any) => void | Dispatch<SetStateAction<CalendarDateType>>
  selectRange?: boolean
  isBig?: boolean
}

const ReactCalendar: CalendarTypes | any = require("react-calendar").Calendar

const Year = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #424242;
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
  fill: #4858CC;
  cursor: pointer;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  pointer-events: ${props => (props.disabled ? `none` : `auto`)};
`

const RightIcon = styled(LeftIcon).attrs({ name: `right-icon` })``

const BigCalendarStyles = css`
  ${Header} {
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    border-bottom: 1px solid #DBDEE0;
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
    abbr {
      text-decoration: none;
    }
  }
  .react-calendar__month-view__weekdays__weekday:nth-child(n + 6),
  .day--weekend {
    color: #FF6B00;
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
  .not-pinned {
    pointer-events: none;
    color: #DBDEE0;
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
  .react-calendar__tile--active {
    background: #3358D4;
    color: #fff;
  }
  .react-calendar__tile--rangeStart {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  .react-calendar__tile--rangeEnd {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
  .not-current-month {
    visibility: hidden;
    height: 0px;
  }
  ${(props) => props.isBig && BigCalendarStyles}
`

const MonthContainer = styled.div`
  display: flex;
  align-items: center;
`

function firsDayOfMonth(month: number, year: number) {
  return new Date(dayjs(`${year}-${month}-01`).valueOf())
}

export const Calendar = (props: CalendarTypes) => {
  const [startDate, changeActiveStartDate] = useState(new Date())

  const equalFormat = `DDMMYYYY`
  const pinnedDates = (props.pinnedDates || []).map(date => dayjs(date).format(equalFormat))

  type CustomClassNamesTypes = {
    date: Date
  }

  const customClassNames = ({ date }: CustomClassNamesTypes) => {
    const classes = []

    if (pinnedDates.length) {
      if (pinnedDates.includes(dayjs(date).format(equalFormat))) {
        classes.push(`pinned`)
      } else {
        classes.push(`not-pinned`)
      }
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
    <CalendarWrapper isBig={props.isBig}>
      <Header>
        <MonthContainer>
          <LeftIcon disabled={lessThanTheCurrentMonth} onClick={prevMonth} />
          <MonthName>{dayjs(startDate).format(`MMMM`)}</MonthName>
          <RightIcon onClick={nextMonth} />
        </MonthContainer>
        <Year>{dayjs(startDate).format(`YYYY`)}</Year>
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
