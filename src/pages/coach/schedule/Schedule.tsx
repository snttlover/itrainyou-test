import { Spinner } from "@/oldcomponents/spinner/Spinner"
import { MediaRange } from "@/lib/responsive/media"
import { WeekDaySchedule } from "@/pages/coach/schedule/components/WeekDaySchedule"
import { saveWeekdaySlotsFx } from "@/pages/coach/schedule/models/weekday-schedule.model"
import { useGate, useStore } from "effector-react"
import React from "react"
import styled from "styled-components"
import { Description, Title } from "@/pages/coach/schedule/CoachSchedulePage"
import { Informer } from "@/newcomponents/informer/Informer"
import { InputDurationPriceModal } from "./components/InputDurationPriceModal"

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
  max-width: 100%;
`

const ScheduleSettingsContainerMobileStyles = `
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    & ${PriceContainer} {
      margin-top: 32px;
    }
`

const ScheduleSettingsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: space-between;
  
  @media (max-width: 640px) {
    ${ScheduleSettingsContainerMobileStyles}  // Продублировал, чтобы сгладить промжуточные адаптивы
  }
  
  ${MediaRange.lessThan("mobile")`
    ${ScheduleSettingsContainerMobileStyles}
  `}

  ${MediaRange.greaterThan("tablet")`
    flex-wrap: wrap;
  `}
`

const PriceListContainer = styled.div`
  margin-top: 16px;
  position: relative;
  max-width: 312px;  

  ${WeekDaySchedule}:not(:first-child) {
    margin-top: 8px;
    ${MediaRange.greaterThan("mobile")`
      margin-top: 16px;
    `}
  }
`
const StyledInformer = styled.div`
  margin-top: 16px;
`

export const Schedule = () => {

  const isWeekdaySchedulePending = useStore(saveWeekdaySlotsFx.pending)

  return (
    <>
      <ScheduleSettingsContainer>
        <WeeklyScheduleContainer>
          <Title>Составьте свое расписание</Title>
          <Description>
              Выберите дни и временные промежутки, в которые вы можете работать. Клиенты смогут бронировать занятия в это время.
          </Description>
          <StyledInformer>
            <Informer closable>Вы можете выбрать несколько сессий в течение одного дня</Informer>
          </StyledInformer>
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
      </ScheduleSettingsContainer>
      <InputDurationPriceModal />
    </>
  )
}
