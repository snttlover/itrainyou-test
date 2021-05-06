import { Calendar } from "@/oldcomponents/calendar/Calendar"
import { Icon } from "@/oldcomponents/icon/Icon"
import { date } from "@/lib/formatting/date"
import { $currentMonth, changeDate, setCurrentMonth } from "@/pages/coach/schedule/models/calendar.model"
import { $allSessions } from "@/pages/coach/schedule/models/sessions.model"
import { Dayjs } from "dayjs"
import { useEvent, useStore } from "effector-react"
import React from "react"
import styled from "styled-components"
import { startRemovingSession } from "@/pages/coach/schedule/models/remove-session.model"

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: #dbdee0;
  margin: 3px 0;
`

export const Times = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  border-radius: 12px;
  padding: 0 6px;
`

export const Time = styled.p<{ primary?: boolean; googleEvent: boolean }>`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  border-radius: 9px;
  padding: 4px;
  text-decoration: ${({googleEvent})=> googleEvent ? "line-through" : "none"};
  background-color: ${({primary})=> primary !== undefined ? (primary ? "#F4EFF7" : "#FFFFFF") : "unset"};
  border: ${({primary})=> primary !== undefined ? (primary ? "" : "1px dashed #DFD0E7") : "unset"};
`

export const RemoveIcon = styled(Icon).attrs({ name: "cross" })`
  fill: #5b6670;
`

const AddIcon = styled(Icon).attrs({ name: "cross" })`
  transform: rotate(45deg);
  fill: ${({ theme }) => theme.colors.primary};
`

type MobileCalendarManager = {
  onAddClick: (date: Dayjs) => void
}

export const MobileCalendarManager: React.FC<MobileCalendarManager> = ({ onAddClick }) => {
  const _setCurrentMonth = useEvent(setCurrentMonth)
  const _changeDate = useEvent(changeDate)
  const currentDate = date(useStore($currentMonth))
  const sessions = useStore($allSessions)
  const _removeSession = useEvent(startRemovingSession)

  const selectedDaySessions = sessions.sessions.filter(session => session.startTime.isSame(currentDate, "d"))

  return (
    <>
      <Calendar
        pinnedDates={sessions.sessions.map(session => session.startTime.toISOString())}
        value={date(currentDate).toDate()}
        isBig
        onChange={dat => {
          _changeDate(date(dat))
        }}
        onNextMonth={dat => {
          _setCurrentMonth(date(dat))
        }}
        onPrevMonth={dat => {
          _setCurrentMonth(date(dat))
        }}
      />
      <Divider />
      {selectedDaySessions.map(session => (
        <Times key={session.id} >
          <Time googleEvent={session.googleEvent} primary={session.areAvailable}>
            {session.startTime.format("HH:mm")}-{session.endTime.format("HH:mm")}
          </Time>
          <RemoveIcon onClick={() => _removeSession(session)} />
        </Times>
      ))}
      <Times>
        <Time googleEvent={false} />
        <AddIcon onClick={() => onAddClick(currentDate)} />
      </Times>
    </>
  )
}
