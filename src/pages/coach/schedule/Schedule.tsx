import { Spinner } from "@/oldcomponents/spinner/Spinner"
import { MediaRange } from "@/lib/responsive/media"
import { WeekDaySchedule } from "@/pages/coach/schedule/components/WeekDaySchedule"
import { saveWeekdaySlotsFx } from "@/pages/coach/schedule/models/weekday-schedule.model"
import { useEvent, useGate, useStore } from "effector-react"
import React from "react"
import styled from "styled-components"
import { Description, Title } from "@/pages/coach/schedule/CoachSchedulePage"
import { Informer } from "@/newcomponents/informer/Informer"
import { InputDurationPriceModal } from "./components/InputDurationPriceModal"
import { Icon } from "@/oldcomponents/icon/Icon"
import { showSecondOnBoarding } from "@/pages/coach/schedule/models/onboarding.model"

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


const PromoBlock = styled.div`
  margin-top: 16px;
  display: flex;
  padding: 16px;
  background: #F8F8FD;
  border-radius: 8px;
  align-items: center;
  flex-direction: row;
`

const PercentsIcon = styled(Icon).attrs({ name: "percents" })`
  width: 24px;
  height: 24px;
  margin-right: 20px;
`

const PromoText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #5B6670;

  & a {
    color: ${props => props.theme.colors.primary};
    font-weight: 500;
    text-decoration: underline;
    cursor: pointer;
  }
`

export const Schedule = () => {

  const isWeekdaySchedulePending = useStore(saveWeekdaySlotsFx.pending)

  const _showOnBoarding = useEvent(showSecondOnBoarding)

  const OnLinkClick = () => {
    _showOnBoarding(true)
  }

  return (
    <>
      <ScheduleSettingsContainer>
        <WeeklyScheduleContainer>
          <Title>Составьте свое расписание</Title>
          <Description>
              Выберите дни и временные промежутки, в которые вы можете работать. Клиенты смогут бронировать занятия в это время.
          </Description>
          <PromoBlock>
            <PercentsIcon />
            <PromoText>Выбирайте промо сессии (30 минут) для продвижения. <a onClick={OnLinkClick}>Зачем?</a></PromoText>
          </PromoBlock>
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
