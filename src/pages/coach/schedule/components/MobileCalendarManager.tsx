import { Calendar } from "@/components/calendar/Calendar"
import { Icon } from "@/components/icon/Icon"
import { date } from "@/lib/formatting/date"
import { $currentMonth, setCurrentMonth } from "@/pages/coach/schedule/models/calendar.model"
import { $allSessions, removeSession } from "@/pages/coach/schedule/models/sessions.model"
import { Dayjs } from "dayjs"
import { useEvent, useStore } from "effector-react/ssr"
import React from "react"
import styled from "styled-components"

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: #dbdee0;
  margin: 3px 0;
`

const Times = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`

const Time = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
`

const RemoveIcon = styled(Icon).attrs({ name: "cross" })`
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
  const currentDate = date(useStore($currentMonth))
  const sessions = useStore($allSessions)
  const _removeSession = useEvent(removeSession)

  const selectedDaySessions = sessions.sessions.filter(session => session.startTime.isSame(currentDate, "d"))

  return (
    <>
      <Calendar
        /*pinnedDates={sessions.sessions.map(session => session.startTime.toISOString())}*/
        value={date(currentDate).toDate()}
        onChange={dat => {
          _setCurrentMonth(date(dat))
        }}
      />
      <Divider />
      {selectedDaySessions.map(session => (
        <Times key={session.id}>
          <Time>
            {session.startTime.format("hh:mm")}-{session.endTime.format("hh:mm")}
          </Time>
          <RemoveIcon onClick={() => _removeSession(session.id)} />
        </Times>
      ))}
      <Times>
        <Time />
        <AddIcon onClick={() => onAddClick(currentDate)} />
      </Times>
    </>
  )
}
