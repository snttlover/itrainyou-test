import { Spinner } from "@/old-components/spinner/Spinner"
import { MediaRange } from "@/lib/responsive/media"
import { ScheduleCalendar } from "@/pages/coach/schedule/components/ScheduleCalendar"
import {
  loadCalendarEventsFx, removeSessionFx
} from "@/pages/coach/schedule/models/sessions.model"
import { useStore } from "effector-react"
import React from "react"
import styled from "styled-components"
import { RemoveSessionModal } from "@/pages/coach/schedule/components/RemoveSessionModal"
import { $showRemoveSessionModal } from "@/pages/coach/schedule/models/remove-session.model"
import { Informer } from "@/new-components/informer/Informer"

const CalendarContainer = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 2px;
  padding: 16px;
  max-width: 830px;
  ${MediaRange.greaterThan("mobile")`
    background-color: transparent;
    padding: 0;
  `};
`

export const CalendarPart = () => {
  const isSessionsLoading = useStore(loadCalendarEventsFx.pending)
  const isDeletingSession = useStore(removeSessionFx.pending)
  const showRemoveSessionModal = useStore($showRemoveSessionModal)
  
  return (
    <>
      <CalendarContainer>
        <Informer closable>Кликните на дату и выберите время, в которые вам удобно работать.</Informer>
        <ScheduleCalendar />
        {(isSessionsLoading || isDeletingSession) && <Spinner />}
      </CalendarContainer>
      {showRemoveSessionModal && <RemoveSessionModal/>}
    </>
  )
}
