import { useStore, useEvent } from "effector-react"
import * as React from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { useState } from "react"
import {
  $onBoardingVisibility,
  showPromoSessionsOnboarding,
  visibleOnboardingType,
  showCoachOnboarding,
  ONBOARDING_TYPES
} from "@/pages/coach/schedule/models/onboarding.model"
import { Icon } from "@/oldcomponents/icon/Icon"
import { Dialog } from "@/oldcomponents/dialog/Dialog"
import Schedule from "./Schedule.svg"
import clientAttracting from "./ClientAttracting.svg"
import googleSynchronization from "./GoogleSynchronization.svg"
import mobileCalendar from "./MobileCalendar.svg"
import usePromoSessionToAttractClients from "./UsePromoSessionToAttractClients.svg"
import getToKnowClient from "./GetToKnowClient.svg"
import createPromoSession from "./CreatePromoSession.svg"
import promoSessionDuration from "./PromoSessionDuration.svg"
import vacation from "./Vacation.svg"
import { Button } from "@/oldcomponents/button/normal/Button"


const StyledSessionsFilterDialog = styled(Dialog)`
  max-width: 560px;
  width: 90%;
  height: 420px;
  padding: 24px;

  ${MediaRange.lessThan("mobile")`
    height: 510px;
  `}
`

const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #424242;
  text-align: center;
  margin-bottom: 8px;
  max-width: 432px;
`

const Description = styled.div<{noAlign? : boolean}>`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #5B6670;
  text-align: ${({ noAlign }) => noAlign ? "unset" : "center"};
  max-width: 432px;
`

const Image = styled.img`
  width: 289px;
  margin-bottom: 24px;
  height: 150px;
  
  ${MediaRange.lessThan("mobile")`
    width: 250px;
  `}
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`

const MarkerIcon = styled(Icon).attrs({ name: "ellipse-list-marker" })`
  fill: ${props => props.theme.colors.primary};
  width: 8px;
  height: 8px;
`

type SelectableTypes = {
  selected: boolean
}

const SelectableMarkerIcon = styled(Icon).attrs({ name: "ellipse-list-marker" })<SelectableTypes>`
  fill: ${props => props.theme.colors.primary};
  margin: 0 2px;
  width: ${({ selected }) => (selected ? "12px" : "8px")};
  height: ${({ selected }) => (selected ? "12px" : "8px")};
  opacity: ${({ selected }) => (selected ? "1" : "0.5")};
  cursor: pointer;
`

const StyledButton = styled(Button)`
  width: 144px;
  margin-left: auto;
  
  ${MediaRange.lessThan("mobile")`
    width: 100%;
    margin-top: 18px;
    margin-left: unset;
  `}
`

const MarkersContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 43%;

  ${MediaRange.lessThan("mobile")`
    margin-left: unset;
  `}
`

const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: auto;
  width: 100%;

  ${MediaRange.lessThan("mobile")`
    flex-direction: column;
    align-items: center;
    margin-top: 24px;
  `}
`

const List = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  text-align: left;
`

type OnboardingContentTypes = {
  image: string
  title?: string
  description: JSX.Element
}

const coachOnboardingContent: OnboardingContentTypes[] = [
  {
    image: Schedule,
    title: "Заполняйте расписание двуми способами",
    description: <List>
      <Description noAlign><MarkerIcon /> Ежедневно, если новые задачи появляются непредсказуемо</Description>
      <Description noAlign><MarkerIcon /> На неделю с возможностью повторения, если рабочие планы цикличны</Description>
    </List>
  },

  {
    image: vacation,
    title: "Отдыхайте, когда захочется",
    description: <Description>Вы можете указать даты отпуска, если нужен перерыв в работе. Формируйте удобный график!</Description>
  },

  {
    image: clientAttracting,
    title: "Воспользуйтесь методом привлечения новых клиентов",
    description: <Description>Внесите в расписание несколько бесплатных сессий для формирования запроса, чтобы познакомиться с клиентом и наметить план работы</Description>
  },

  {
    image: googleSynchronization,
    title: "Синхронизируйте работу и личные планы",
    description: <Description>Подключите расписание к вашему Google-календарю, чтобы избежать несостыковок во времени.</Description>
  },

  {
    image: mobileCalendar,
    title: "Смотрите расписание сессий на платформе в личном календаре в вашем смартфоне",
    description: <Description>Получайте автоматические e-mail об изменениях в расписании или самостоятельно добавьте оповещения о предстоящих сессиях в календаре, чтобы не пропустить их</Description>
  },
]

const promoSessionsOnboardingContent: OnboardingContentTypes[] = [
  {
    image: usePromoSessionToAttractClients,
    description: <Description>Бесплатные сессии по формированию запроса — это один из главных этапов привлечения клиентов</Description>
  },

  {
    image: getToKnowClient,
    description: <Description>Вам важно познакомиться
      с клиентом, определить цели и наметить план работы, понять, готов ли он к коучингу. Так что рекомендуем отвести несколько временных слотов на это! </Description>
  },

  {
    image: createPromoSession,
    description: <Description>Сделать сессию бесплатной можно, наведя курсор на уже существующий слот в вашем расписании и поставив галочку "Сделать сессию бесплатной".</Description>
  },

  {
    image: promoSessionDuration,
    description: <Description>Длительность бесплатной сессии для формирования запроса – 30 минут</Description>
  },
]

type SlidesType = {
  content: OnboardingContentTypes[]
}

const Slides = ({ content }: SlidesType) => {
  const [visibleNumber, setShowed] = useState(0)

  const type = useStore(visibleOnboardingType)
  const _showPromoSessionsOnboarding = useEvent(showPromoSessionsOnboarding)
  const _showCoachOnboarding = useEvent(showCoachOnboarding)

  const toggle = (value: boolean) => {
    type === ONBOARDING_TYPES.COACH ? _showCoachOnboarding(value) : _showPromoSessionsOnboarding(value)
  }

  const handleOnClick = () => {
    visibleNumber === content.length - 1 ? toggle(false) : setShowed(visibleNumber + 1)
  }
  
  return (
    <Container>
      {
        content.map((element: OnboardingContentTypes, index: number) => (
          index === visibleNumber  && <React.Fragment key={index}>
            <Image src={element.image} />
            {element.title && <Title>{element.title}</Title>}
            {element.description}
          </React.Fragment>))
      }
      <BottomContainer>
        <MarkersContainer>{content.map((_, number) => (
          <SelectableMarkerIcon
            key={number}
            selected={number === visibleNumber}
            onClick={() => setShowed(number)} />))}
        </MarkersContainer>
        <StyledButton onClick={handleOnClick}>
          {visibleNumber === content.length - 1 ? "Все понятно" : "Далее"}
        </StyledButton>
      </BottomContainer>
    </Container>
  )
}

export const OnBoardingFreeSessions = () => {
  const type = useStore(visibleOnboardingType)
  const visibility = useStore($onBoardingVisibility)
  const _showSecondOnBoarding = useEvent(showPromoSessionsOnboarding)
  const _showFirstOnBoarding = useEvent(showCoachOnboarding)

  const toggle = (value: boolean) => {
    type === ONBOARDING_TYPES.COACH ? _showFirstOnBoarding(value) : _showSecondOnBoarding(value)
  }

  return (
    <StyledSessionsFilterDialog value={visibility} onChange={toggle} notClosable>
      <Slides content={type === ONBOARDING_TYPES.COACH ? coachOnboardingContent : promoSessionsOnboardingContent} />
    </StyledSessionsFilterDialog>
  )
}