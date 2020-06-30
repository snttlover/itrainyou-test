import { DashedButton } from "@/components/button/dashed/DashedButton"
import { Calendar } from "@/components/calendar/Calendar"
import { Icon } from "@/components/icon/Icon"
import { date } from "@/lib/formatting/date"
import { AddSessionModal } from "@/pages/coach/schedule/components/AddSessionModal"
import { DateRangePicker } from "@/pages/coach/schedule/components/DateRangePicker"
import { Description, Title } from "@/pages/coach/schedule/Schedule"
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
`

const StyledDateRangePicker = styled(DateRangePicker)`
  margin-top: 16px;
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
  const [modal, setModal] = useState(false)
  return (
    <>
      <Title>Календарь</Title>
      <Description>Удалить промежуток в календаре</Description>
      <StyledDateRangePicker />
      <RemoveButton>Удалить</RemoveButton>
      <CalendarContainer>
        <Calendar value={date().toDate()} onChange={() => {}} />
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
          <AddIcon onClick={() => setModal(true)} />
        </Times>
      </CalendarContainer>
      {modal && <AddSessionModal onCrossClick={() => setModal(false)} />}
    </>
  )
}
