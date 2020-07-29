import { Spinner } from "@/components/spinner/Spinner"
import { MediaRange } from "@/lib/responsive/media"
import { CalendarPart } from "@/pages/coach/schedule/components/CalendarPart"
import { PriceInputGroup } from "@/pages/coach/schedule/components/PriceInputGroup"
import { WeekDaySchedule } from "@/pages/coach/schedule/components/WeekDaySchedule"
import { saveWeekdaySlotsFx } from "@/pages/coach/schedule/models/weekday-schedule.model"
import { useGate, useStore } from "effector-react/ssr"
import React from "react"
import styled from "styled-components"
import { ScheduleGate } from "./models/schedule.model"

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

const ScheduleSettingsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
  ${MediaRange.greaterThan("mobile")`
    flex-direction: row;
  `}

  ${MediaRange.greaterThan("tablet")`
    flex-wrap: wrap;
  `}
`
const PriceContainer = styled.div`
  max-width: 320px;
  ${MediaRange.greaterThan("mobile")`
    flex-direction: row;
  `}

  ${MediaRange.greaterThan("desktop")`
    margin-right: 100px;
  `}
`
const WeeklyScheduleContainer = styled.div`
  max-width: 320px;
`

const PriceListContainer = styled.div`
  margin-top: 16px;
  position: relative;

  ${WeekDaySchedule}:not(:first-child) {
    margin-top: 8px;
    ${MediaRange.greaterThan("mobile")`
      margin-top: 16px;
    `}
  }
`

export const Schedule = () => {
  useGate(ScheduleGate)

  const isWeekdaySchedulePending = useStore(saveWeekdaySlotsFx.pending)

  return (
    <>
      <ScheduleSettingsContainer>
        <WeeklyScheduleContainer>
          <Title>Недельное расписание</Title>
          <Description>
            Укажите, когда вам удобно работать. Когда клиенты будут искать коуча на это время, они увидят вашу анкету.
          </Description>
          <PriceListContainer>
            <WeekDaySchedule title='Понедельник' weekday='MONDAY' />
            <WeekDaySchedule title='Вторник' weekday='TUESDAY' />
            <WeekDaySchedule title='Среда' weekday='WEDNESDAY' />
            <WeekDaySchedule title='Четверг' weekday='THURSDAY' />
            <WeekDaySchedule title='Пятница' weekday='FRIDAY' />
            <WeekDaySchedule title='Суббота' weekday='SATURDAY' />
            <WeekDaySchedule title='Воскресенье' weekday='SUNDAY' />
            {isWeekdaySchedulePending && <Spinner />}
          </PriceListContainer>
        </WeeklyScheduleContainer>
        <PriceContainer>
          <Title>Цена</Title>
          <Description>
            Укажите, когда вам удобно работать. Когда клиенты будут искать коуча на это время, они увидят вашу анкету.
          </Description>
          <PriceListContainer>
            {/*<PriceInputGroup
              title='Промо сессия (15 минут)'
              name='promo'
            />*/}
            <PriceInputGroup title='30 минут' name='d30Price' />
            <PriceInputGroup title='45 минут' name='d45Price' />
            <PriceInputGroup title='60 минут' name='d60Price' />
            <PriceInputGroup title='90 минут' name='d90Price' />
          </PriceListContainer>
        </PriceContainer>
      </ScheduleSettingsContainer>
      <CalendarPart />
    </>
  )
}
