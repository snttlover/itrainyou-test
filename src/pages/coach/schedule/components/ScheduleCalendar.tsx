import { Header, LeftIcon, MonthContainer, MonthName, RightIcon, Year } from "@/oldcomponents/calendar/CalendarHeader"
import { Icon } from "@/oldcomponents/icon/Icon"
import { date } from "@/lib/formatting/date"
import { MediaRange } from "@/lib/responsive/media"
import { $currentMonth, $monthEndDate, $monthStartDate } from "@/pages/coach/schedule/models/calendar.model"
import { $allSessions } from "@/pages/coach/schedule/models/sessions.model"
import { Dayjs } from "dayjs"
import { useEvent, useStore } from "effector-react"
import React from "react"
import styled from "styled-components"
import { startRemovingSession } from "@/pages/coach/schedule/models/remove-session.model"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 704px;
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

const HorizontalOverflowScrollContainer = styled.div`
  overflow-y: auto;
  ${MediaRange.greaterThan("tablet")`
    margin-left: -4px;
  `}
`

const CalendarTable = styled.table`
  width: 100%;
  border-spacing: 4px;
`

const WeekRow = styled.tr``

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

const Session = styled.div<{areAvailable: boolean}>`
  background: ${({areAvailable})=> areAvailable ? "#DFD0E7" : "#F4F5F7"};
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

const SessionContainer = styled.div`
  overflow-y: auto;
  height: 100%;
`

const DayContainer = styled.div`
  width: 96px;
  height: 96px;
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
  prevMonth: (currentMonth: Dayjs) => void
  nextMonth: (currentMonth: Dayjs) => void
  onAddClick: (day: Dayjs) => void
}

export const ScheduleCalendar: React.FC<ScheduleCalendarTypes> = ({ prevMonth, nextMonth, onAddClick }) => {
  const now = date()
  const currentMonth = date(useStore($currentMonth))
  const monthDayStart = date(useStore($monthStartDate))
  const sessions = useStore($allSessions)
  const monthDayEnd = date(useStore($monthEndDate))
  const _removeSession = useEvent(startRemovingSession)
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
      currentWeek.push(currentMonth.date(dayIndex - countPadStartDays + 1))
    }

    if (currentWeek.length === 7) {
      weeks.push([...currentWeek])
      currentWeek = []
    }
  }

  const formatter = "YYYYMM"
  const lessThanTheCurrentMonth = +currentMonth.format(formatter) <= +date().format(formatter)

  return (
    <Container>
      <StyledHeader>
        <StyledMonthContainer>
          <StyledLeftIcon disabled={lessThanTheCurrentMonth} onClick={() => prevMonth(currentMonth)} />
          <StyledMonthName>{currentMonth.format("MMMM")}</StyledMonthName>
          <StyledRightIcon onClick={() => nextMonth(currentMonth)} />
        </StyledMonthContainer>
        <StyledYear>{currentMonth.format("YYYY")}</StyledYear>
      </StyledHeader>
      <HorizontalOverflowScrollContainer>
        <CalendarTable>
          <thead>
            <WeekRow>
              <CalendarHeaderCell>Понедельник</CalendarHeaderCell>
              <CalendarHeaderCell>Вторник</CalendarHeaderCell>
              <CalendarHeaderCell>Среда</CalendarHeaderCell>
              <CalendarHeaderCell>Четверг</CalendarHeaderCell>
              <CalendarHeaderCell>Пятница</CalendarHeaderCell>
              <CalendarHeaderCell>Суббота</CalendarHeaderCell>
              <CalendarHeaderCell>Воскресенье</CalendarHeaderCell>
            </WeekRow>
          </thead>
          <tbody>
            {weeks.map((week, i) => (
              <WeekRow key={i}>
                {week.map(day => (
                  <CalendarCell key={day.weekday()}>
                    <DayContainer>
                      <Day weekend={day.weekday() >= 5}>{day.date()}</Day>
                      {(now.isBefore(day, "d") || now.isSame(day, "d")) && <AddIcon onClick={() => onAddClick(day)} />}
                      <SessionContainer>
                        {sessions.sessions
                          .filter(session => session.startTime.isSame(day, "d"))
                          .map(session => (
                            <Session key={session.id} areAvailable={session.areAvailable}>
                              {session.startTime.format("HH:mm")}-{session.endTime.format("HH:mm")}
                              <CrossIcon onClick={() => _removeSession(session)} />
                            </Session>
                          ))}
                      </SessionContainer>
                    </DayContainer>
                  </CalendarCell>
                ))}
              </WeekRow>
            ))}
          </tbody>
        </CalendarTable>
      </HorizontalOverflowScrollContainer>
    </Container>
  )
}
