import { Header, LeftIcon, MonthContainer, MonthName, RightIcon, Year } from "@/oldcomponents/calendar/CalendarHeader"
import { Icon } from "@/oldcomponents/icon/Icon"
import { date } from "@/lib/formatting/date"
import { MediaRange } from "@/lib/responsive/media"
import { $currentMonth, $monthEndDate, $monthStartDate } from "@/pages/coach/schedule/models/calendar.model"
import {
  $allSessions,
  $deleteButtonIsDisabled, $pickedDeleteRange, changePickedDeleteRange,
  removeSessionsRange
} from "@/pages/coach/schedule/models/sessions.model"
import { Dayjs } from "dayjs"
import { useEvent, useStore } from "effector-react"
import React from "react"
import styled from "styled-components"
import { startRemovingSession } from "@/pages/coach/schedule/models/remove-session.model"
import { DashedButton } from "@/oldcomponents/button/dashed/DashedButton"
import { GrayTooltip } from "@/oldcomponents/gray-tooltip/GrayTooltip"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 704px;
`

const IconToolTip = styled.span`
  width: 136px;
  height: auto;
  position: absolute;
  z-index: 1;
  padding: 12px;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 1px 3px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  font-size: 14px;
  line-height: 22px;
  color: #424242;
  bottom: 80%;
  left: 50%;
  margin-left: -68px;
  display: none;

  &:after {
    content: " ";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }
`

const StyledHeader = styled(Header)`
  max-width: 700px;
  padding-right: 4px;
`

const AddVacationButton = styled(DashedButton)`
  width: 188px;
`

const StyledMonthContainer = styled(MonthContainer)`
  padding: 0;
`

const StyledLeftIcon = styled(LeftIcon)`
  width: 40px;
  height: 40px;
`
const StyledRightIcon = styled(RightIcon)`
  width: 40px;
  height: 40px;
  margin-left: 8px;
`
const StyledMonthName = styled(MonthName)`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  width: 150px;
  font-size: 16px;
  line-height: 24px;
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
  border-spacing: 0px;
  border-collapse: collapse;
`

const WeekRow = styled.tr`
  height: 48px;    
`

const CalendarHeaderCell = styled.th`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #5b6670;
  border: 1px solid #F4F5F7;
`

const CalendarCell = styled.td<{presentDay: boolean}>`
  width: 96px;
  min-width: 96px;
  height: 96px;
  border: 1px solid #F4F5F7;
  background-color: ${({presentDay})=> presentDay ? "#FFFFFF" : "#F9FAFC"};
  cursor: ${({presentDay})=> presentDay ? "pointer" : "default"};
`

const Session = styled.div<{areAvailable: boolean}>`
  background: ${({areAvailable})=> !areAvailable ? "#FFFFFF" : "#F4EFF7"};
  border-radius: 9px;
  border: ${({areAvailable})=> !areAvailable ? "1px dashed #DFD0E7" : ""};
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #424242;
  padding: 0 4px;
  display: flex;
  justify-content: space-between;


  &:hover ${IconToolTip} {
    display: block;
  }
`

const SessionContainer = styled.div`
  overflow-y: auto;
  height: 100%;
`

const DayContainer = styled.div<{presentDay: boolean}>`
  width: 96px;
  height: 96px;
  background-color: ${({presentDay})=> presentDay ? "#FFFFFF" : "#F9FAFC"};
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
  showVacationModal: (value: boolean) => void
}

export const ScheduleCalendar: React.FC<ScheduleCalendarTypes> = ({ prevMonth, nextMonth, onAddClick, showVacationModal }) => {
  const now = date()
  const currentMonth = date(useStore($currentMonth))
  const monthDayStart = date(useStore($monthStartDate))
  const sessions = useStore($allSessions)
  const monthDayEnd = date(useStore($monthEndDate))
  const _removeSession = useEvent(startRemovingSession)

  const _removeSessionsRange = useEvent(removeSessionsRange)
  const disabledDelete = useStore($deleteButtonIsDisabled)
  const range = useStore($pickedDeleteRange)
  const setRange = useEvent(changePickedDeleteRange)

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
          <StyledRightIcon onClick={() => nextMonth(currentMonth)} />
          <StyledMonthName>{currentMonth.format("MMMM")}, {currentMonth.format("YYYY")}</StyledMonthName>
        </StyledMonthContainer>
        {/*<AddVacationButton disabled={disabledDelete} onClick={() => _removeSessionsRange(range)}>
          Добавить отпуск
        </AddVacationButton>*/}
        <AddVacationButton onClick={() => showVacationModal(true)}>
          Добавить отпуск
        </AddVacationButton>
      </StyledHeader>
      <HorizontalOverflowScrollContainer>
        <CalendarTable>
          <thead>
            <WeekRow>
              <CalendarHeaderCell>Пн</CalendarHeaderCell>
              <CalendarHeaderCell>Вт</CalendarHeaderCell>
              <CalendarHeaderCell>Ср</CalendarHeaderCell>
              <CalendarHeaderCell>Чт</CalendarHeaderCell>
              <CalendarHeaderCell>Пт</CalendarHeaderCell>
              <CalendarHeaderCell>Сб</CalendarHeaderCell>
              <CalendarHeaderCell>Вс</CalendarHeaderCell>
            </WeekRow>
          </thead>
          <tbody>
            {weeks.map((week, i) => (
              <WeekRow key={i}>
                {week.map(day => (
                  <CalendarCell presentDay={now.isBefore(day, "d") || now.isSame(day, "d")} key={day.weekday()}>
                    <DayContainer presentDay={now.isBefore(day, "d") || now.isSame(day, "d")}>
                      <Day weekend={day.weekday() >= 5}>{day.date()}</Day>
                      {(now.isBefore(day, "d") || now.isSame(day, "d")) && <AddIcon onClick={() => onAddClick(day)} />}
                      <SessionContainer>
                        {sessions.sessions
                          .filter(session => session.startTime.isSame(day, "d"))
                          .map(session => (
                            <Session key={session.id} areAvailable={session.areAvailable}>
                              {session.startTime.format("HH:mm")}-{session.endTime.format("HH:mm")}
                              <CrossIcon onClick={() => _removeSession(session)} />
                              <IconToolTip key={session.id}>тест</IconToolTip>
                              {/*<GrayTooltip key={session.id} text={"тест"}></GrayTooltip>*/}
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
