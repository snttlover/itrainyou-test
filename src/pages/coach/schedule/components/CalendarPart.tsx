import { DashedButton } from "@/components/button/dashed/DashedButton"
import { Spinner } from "@/components/spinner/Spinner"
import { date } from "@/lib/formatting/date"
import { MediaRange } from "@/lib/responsive/media"
import { MobileCalendarManager } from "@/pages/coach/schedule/components/MobileCalendarManager"
import {
  $isAddSessionModalShowed,
  setAddSessionDate,
  setModalShow,
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
  loadSessionsFx,
  removeSessionsRange,
} from "@/pages/coach/schedule/models/sessions.model"
import { Description, Title } from "@/pages/coach/schedule/Schedule"
import { Dayjs } from "dayjs"
import { useEvent, useGate, useStore } from "effector-react/ssr"
import React, { useState } from "react"
import styled from "styled-components"

const RemoveButton = styled(DashedButton)`
  width: 100%;
  margin-top: 12px;

  ${MediaRange.greaterThan("mobile")`
    padding: 0px 24px;
  `}

  ${MediaRange.greaterThan("laptop")`
    width: 160px;
    min-width: 160px;
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
    
    ${RemoveButton} {
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

const MobileCalendar = styled.div`
  ${MediaRange.greaterThan("mobile")`
    display: none;
  `}
`

const DesktopCalendar = styled.div`
  display: none;

  ${MediaRange.greaterThan("mobile")`
    display: flex;
    margin-top: 10px;
  `}
`

export const CalendarPart = () => {
  const isAddSessionModalShowed = useStore($isAddSessionModalShowed)
  const isSessionsLoading = useStore(loadSessionsFx.pending)
  const _setModalShow = useEvent(setModalShow)
  const _setDate = useEvent(setAddSessionDate)
  const _removeSessionsRange = useEvent(removeSessionsRange)
  const _setCurrentMonth = useEvent(setCurrentMonth)

  const range = useStore($pickedDeleteRange)
  const setRange = useEvent(changePickedDeleteRange)
  const disabledDelete = useStore($deleteButtonIsDisabled)

  useGate(CalendarGate)

  const openModalCallback = (date: Dayjs) => {
    _setDate(date)
    _setModalShow(true)
  }

  return (
    <>
      <Title>Календарь</Title>
      <Description>Планируете отпуск? Отмените сессии на промежутке дат</Description>
      <RemoveDateRangeContainer>
        <StyledDateRangePicker range={range} rangeChanged={setRange} />
        <RemoveButton disabled={disabledDelete} onClick={() => _removeSessionsRange(range)}>
          Удалить
        </RemoveButton>
      </RemoveDateRangeContainer>
      <CalendarContainer>
        <MobileCalendar>
          <MobileCalendarManager onAddClick={openModalCallback} />
        </MobileCalendar>
        <DesktopCalendar>
          <ScheduleCalendar
            nextMonth={currentDate => _setCurrentMonth(currentDate.add(1, "month"))}
            onAddClick={openModalCallback}
            prevMonth={currentDate => _setCurrentMonth(currentDate.subtract(1, "month"))}
          />
        </DesktopCalendar>
        {isSessionsLoading && <Spinner />}
      </CalendarContainer>
      {isAddSessionModalShowed && <AddSessionModal onCrossClick={() => _setModalShow(false)} />}
    </>
  )
}
