import { Header, LeftIcon, MonthContainer, MonthName, RightIcon, Year } from "@/components/calendar/CalendarHeader"
import { Icon } from "@/components/icon/Icon"
import { date } from "@/lib/formatting/date"
import { Dayjs } from "dayjs"
import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledHeader = styled(Header)`
  max-width: 700px;
  padding-right: 4px;
`

const StyledMonthContainer = styled(MonthContainer)`
  padding: 0;
`

const StyledLeftIcon = styled(LeftIcon)`
  width: 16px;
  height: 16px;
`
const StyledRightIcon = styled(RightIcon)`
  width: 16px;
  height: 16px;
`
const StyledMonthName = styled(MonthName)`
  font-family: Roboto;
  font-style: normal;
  width: 100px;
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #424242;
`

const StyledYear = styled(Year)`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #424242;
`

const CalendarTable = styled.table`
  width: 100%;
  border-spacing: 4px;
  margin-left: -4px;
  padding-right: 4px;
`

const CalendarHeaderCell = styled.th`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #5b6670;
`

const CalendarCell = styled.td`
  width: 96px;
  min-width: 96px;
  height: 96px;
`

const Session = styled.div`
  background: #eceff1;
  border-radius: 12px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #424242;
  padding: 0 4px;
  display: flex;
  justify-content: space-between;
`

const DayContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: relative;
  padding: 24px 4px 12px;
  ${Session}:not(:first-child) {
    margin-top: 4px;
  }
`

const Day = styled.span<{ weekend: boolean }>`
  position: absolute;
  left: 8px;
  top: 4px;

  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: ${({ weekend }) => (weekend ? "#FF6B00" : "#424242")};
`

const AddIcon = styled(Icon).attrs({ name: "cross" })`
  position: absolute;
  width: 16px;
  height: 16px;
  transform: rotate(45deg);
  fill: #9aa0a6;
  top: 4px;
  right: 4px;
  cursor: pointer;
`

const CrossIcon = styled(Icon).attrs({ name: "cross" })`
  width: 16px;
  height: 16px;
  cursor: pointer;
  fill: ${({ theme }) => theme.colors.primary};
`

export type ScheduleCalendarTypes = {
  startDate?: Date
  prevMonth?: () => void
  nextMonth?: () => void
  onAddClick?: () => void
}

export const ScheduleCalendar: React.FC<ScheduleCalendarTypes> = ({ startDate, prevMonth, nextMonth, onAddClick }) => {
  const monthDayStart = date(startDate).date(1)
  const monthDayEnd = date(monthDayStart).add(1, "month")
  const countPadStartDays = monthDayStart.weekday()
  const countPadEndDays = monthDayEnd.weekday() === 0 ? 0 : 6 - monthDayEnd.weekday()
  const daysCount = monthDayStart.daysInMonth() + countPadStartDays + countPadEndDays

  const weeks: Dayjs[][] = []
  let currentWeek = []
  for (let dayIndex = 0; dayIndex <= daysCount; dayIndex++) {
    if (dayIndex < countPadStartDays) {
      currentWeek.push(monthDayStart.subtract(countPadStartDays - dayIndex, "day"))
    } else if (dayIndex - countPadStartDays > monthDayStart.daysInMonth()) {
      currentWeek.push(monthDayEnd.add(countPadEndDays - (daysCount - dayIndex), "day"))
    } else {
      currentWeek.push(date(startDate).date(dayIndex - countPadStartDays + 1))
    }

    if (currentWeek.length === 7) {
      weeks.push([...currentWeek])
      currentWeek = []
    }
  }

  return (
    <Container>
      <StyledHeader>
        <StyledMonthContainer>
          <StyledLeftIcon onClick={prevMonth} />
          <StyledMonthName>{date(startDate).format(`MMMM`)}</StyledMonthName>
          <StyledRightIcon onClick={nextMonth} />
        </StyledMonthContainer>
        <StyledYear>{date(startDate).format(`YYYY`)}</StyledYear>
      </StyledHeader>
      <CalendarTable>
        <thead>
          <tr>
            <CalendarHeaderCell>Понедельник</CalendarHeaderCell>
            <CalendarHeaderCell>Вторник</CalendarHeaderCell>
            <CalendarHeaderCell>Среда</CalendarHeaderCell>
            <CalendarHeaderCell>Четверг</CalendarHeaderCell>
            <CalendarHeaderCell>Пятница</CalendarHeaderCell>
            <CalendarHeaderCell>Суббота</CalendarHeaderCell>
            <CalendarHeaderCell>Воскресенье</CalendarHeaderCell>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, i) => (
            <tr key={i}>
              {week.map(day => (
                <CalendarCell key={day.weekday()}>
                  <DayContainer>
                    <Day weekend={day.weekday() >= 5}>{day.date()}</Day>
                    <AddIcon onClick={onAddClick} />
                    <Session>
                      20:30-21:45 <CrossIcon />
                    </Session>
                    <Session>
                      20:30-21:45 <CrossIcon />
                    </Session>
                  </DayContainer>
                </CalendarCell>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarTable>
    </Container>
  )
}
