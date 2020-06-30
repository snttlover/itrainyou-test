import { DashedButton } from "@/components/button/dashed/DashedButton"
import { Calendar } from "@/components/calendar/Calendar"
import { date } from "@/lib/formatting/date"
import { DateRangePicker } from "@/pages/coach/schedule/components/DateRangePicker"
import { PriceInputGroup } from "@/pages/coach/schedule/components/PriceInputGroup"
import React from "react"
import styled from "styled-components"

export const Title = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
`

export const Description = styled.p`
  margin-top: 4px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #5b6670;
`

const StyledDateRangePicker = styled(DateRangePicker)`
  margin-top: 16px;
`

const PriceListContainer = styled.div`
  margin-top: 16px;
`

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

export const Schedule = () => (
  <>
    <Title>Цена</Title>
    <Description>
      Укажите, когда вам удобно работать. Когда клиенты будут искать коуча на это время, они увидят вашу анкету.
    </Description>
    <PriceListContainer>
      <PriceInputGroup title='Промо сессия (15 минут)' />
      <PriceInputGroup title='30 минут' />
      <PriceInputGroup title='45 минут' />
      <PriceInputGroup title='60 минут' />
      <PriceInputGroup title='90 минут' />
    </PriceListContainer>
    <Title>Календарь</Title>
    <Description>Удалить промежуток в календаре</Description>
    <StyledDateRangePicker />
    <RemoveButton>Удалить</RemoveButton>
    <CalendarContainer>
      <Calendar value={date().toDate()} onChange={() => {}} />
    </CalendarContainer>
  </>
)
