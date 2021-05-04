import { DashedButton } from "@/oldcomponents/button/dashed/DashedButton"
import { Spinner } from "@/oldcomponents/spinner/Spinner"
import { date } from "@/lib/formatting/date"
import { GrayTooltip } from "@/oldcomponents/gray-tooltip/GrayTooltip"
import { Dialog } from "@/oldcomponents/dialog/Dialog"
import { MediaRange } from "@/lib/responsive/media"
import { MobileCalendarManager } from "@/pages/coach/schedule/components/MobileCalendarManager"
import {
  setAddSessionDate,
} from "@/pages/coach/schedule/models/add-session.model"
import { AddSessionModal } from "@/pages/coach/schedule/components/AddSessionModal"
import { RemoveSessionsDateRangePicker } from "@/pages/coach/schedule/components/RemoveSessionsDateRangePicker"
import { ScheduleCalendar } from "@/pages/coach/schedule/components/ScheduleCalendar"
import { setCurrentMonth } from "@/pages/coach/schedule/models/calendar.model"
import {
  $deleteButtonIsDisabled,
  $pickedDeleteRange,
  CalendarGate,
  changePickedDeleteRange,
  DateArray,
  removeSessionsRange,
  loadCalendarEventsFx, removeSessionFx
} from "@/pages/coach/schedule/models/sessions.model"
import { Dayjs } from "dayjs"
import { useEvent, useGate, useStore } from "effector-react"
import React, { useState } from "react"
import styled from "styled-components"
import { RemoveSessionModal } from "@/pages/coach/schedule/components/RemoveSessionModal"
import { $showRemoveSessionModal } from "@/pages/coach/schedule/models/remove-session.model"
import { Informer } from "@/newcomponents/informer/Informer"
import { AddVacationModal } from "@/pages/coach/schedule/components/AddVacationModal"

const AddVacationButton = styled(DashedButton)`
  width: 100%;
  margin-top: 12px;

  ${MediaRange.greaterThan("mobile")`
    padding: 0px 24px;
  `}

  ${MediaRange.greaterThan("laptop")`
    max-width: 200px;
  `}
`
const CalendarContainer = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 2px;
  margin-top: 27px;
  padding: 16px;
  max-width: 704px;
  ${MediaRange.greaterThan("mobile")`
    background-color: transparent;
    padding: 0;
  `};
`

const RemoveDateRangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  max-width: 700px;

  ${MediaRange.greaterThan("mobile")`
    flex-direction: row;
    align-items: center;
    
    ${AddVacationButton} {
      line-height: unset;
      margin-top: 0;
      margin-left: 28px;
      width: 160px;
      height: 26px;
    }
  `}
`

const StyledDateRangePicker = styled(RemoveSessionsDateRangePicker)`
  width: 100%;
`

const AddVacationDialog = styled(Dialog)`
  max-width: 560px;
  padding: 24px 24px;
`

const MobileCalendar = styled.div`
  ${MediaRange.greaterThan("mobile")`
    display: none;
  `}
`

const DesktopCalendar = styled.div`
  display: flex;

  ${MediaRange.greaterThan("mobile")`
    display: flex;
    margin-top: 10px;
  `}
`

export const CalendarPart = () => {
  const isSessionsLoading = useStore(loadCalendarEventsFx.pending)
  const isDeletingSession = useStore(removeSessionFx.pending)
  const _setDate = useEvent(setAddSessionDate)
  const _removeSessionsRange = useEvent(removeSessionsRange)
  const _setCurrentMonth = useEvent(setCurrentMonth)

  const range = useStore($pickedDeleteRange)
  const setRange = useEvent(changePickedDeleteRange)
  const disabledDelete = useStore($deleteButtonIsDisabled)
  const showRemoveSessionModal = useStore($showRemoveSessionModal)

  const [visibility,setVisibility] = useState(false)

  //useGate(CalendarGate)


  return (
    <>
      <Informer closable>Кликните на дату и выберите время, в которые вам удобно работать. В эти временные промежутки клиенты смогут записаться на занятие.</Informer>
      {/*<RemoveDateRangeContainer>
        <StyledDateRangePicker range={range} rangeChanged={setRange} />
      </RemoveDateRangeContainer>*/}
      <CalendarContainer>
        {/*<MobileCalendar>
          <MobileCalendarManager onAddClick={openModalCallback} />
        </MobileCalendar>*/}
        <DesktopCalendar>
          <ScheduleCalendar
            nextMonth={currentDate => _setCurrentMonth(currentDate.add(1, "month"))}
            prevMonth={currentDate => _setCurrentMonth(currentDate.subtract(1, "month"))}
            showVacationModal={setVisibility}
          />
        </DesktopCalendar>
        {(isSessionsLoading || isDeletingSession) && <Spinner />}
      </CalendarContainer>
      {showRemoveSessionModal && <RemoveSessionModal/>}
      <AddVacationModal visibility={visibility} setVisibility={setVisibility} />
    </>
  )
}
