import { DashedButton } from "@/components/button/dashed/DashedButton"
import { Calendar } from "@/components/calendar/Calendar"
import { Icon } from "@/components/icon/Icon"
import { date } from "@/lib/formatting/date"
import { MediaRange } from "@/lib/responsive/media"
import { $isAddSessionModalShowed, setAddSessionDate, setModalShow } from "@/pages/coach/schedule/add-session.model"
import { AddSessionModal } from "@/pages/coach/schedule/components/AddSessionModal"
import { DateRangePicker } from "@/pages/coach/schedule/components/DateRangePicker"
import { ScheduleCalendar } from "@/pages/coach/schedule/components/ScheduleCalendar"
import { Description, Title } from "@/pages/coach/schedule/Schedule"
import { Dayjs } from "dayjs"
import { useEvent, useStore } from "effector-react/ssr"
import React, { useState } from "react"
import styled from "styled-components"

const RemoveButton = styled(DashedButton)`
  width: 100%;
  margin-top: 12px;
`
const CalendarContainer = styled.div`
  background-color: #fff;
  border-radius: 2px;
  margin-top: 27px;
  padding: 16px;

  ${MediaRange.greaterThan("mobile")`
    background-color: transparent;
    padding: 0;
  `}
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

const StyledDateRangePicker = styled(DateRangePicker)`
  width: 100%;
`

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

export const CalendarPart = () => {
  const isAddSessionModalShowed = useStore($isAddSessionModalShowed)
  const _setModalShow = useEvent(setModalShow)
  const _setDate = useEvent(setAddSessionDate)
  const [currentMonth, setMonth] = useState(date())

  const openModalCallback = (date: Dayjs) => {
    _setDate(date)
    _setModalShow(true)
  }

  return (
    <>
      <Title>Календарь</Title>
      <Description>Удалить промежуток в календаре</Description>
      <RemoveDateRangeContainer>
        <StyledDateRangePicker />
        <RemoveButton data-slim>Удалить</RemoveButton>
      </RemoveDateRangeContainer>
      <CalendarContainer>
        <MobileCalendar>
          <Calendar value={currentMonth.toDate()} onChange={() => {}} />
          <Divider />
          <Times>
            <Time>16:30-17:45</Time>
            <RemoveIcon />
          </Times>
          <Times>
            <Time>16:30-17:45</Time>
            <RemoveIcon />
          </Times>
          <Times>
            <Time>16:30-17:45</Time>
            <RemoveIcon />
          </Times>
          <Times>
            <Time />
            <AddIcon onClick={() => _setModalShow(true)} />
          </Times>
        </MobileCalendar>
        <DesktopCalendar>
          <ScheduleCalendar
            startDate={currentMonth.toDate()}
            nextMonth={() => setMonth(currentMonth.add(1, "month"))}
            onAddClick={openModalCallback}
            prevMonth={() => setMonth(currentMonth.subtract(1, "month"))}
          />
        </DesktopCalendar>
      </CalendarContainer>
      {isAddSessionModalShowed && <AddSessionModal onCrossClick={() => _setModalShow(false)} />}
    </>
  )
}
