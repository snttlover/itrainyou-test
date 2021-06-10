import { useStore, useEvent } from "effector-react"
import * as React from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { useState } from "react"
import { $onBoardingvisibility, showOnBoarding } from "@/pages/coach/schedule/models/onboarding.model"
import { Icon } from "@/oldcomponents/icon/Icon"
import { Dialog } from "@/oldcomponents/dialog/Dialog"
import firstSlide from "./FirstSlide.svg"
import secondSlide from "./SecondSlide.svg"
import thirdSlide from "./ThirdSlide.svg"
import fourthSlide from "./FourthSlide.svg"
import fifthSlide from "./FifthSlide.svg"
import sixthSlide from "./SixthSlide.svg"
import seventhSlide from "./SeventhSlide.svg"
import eighthSlide from "./EighthSlide.svg"

const StyledSessionsFilterDialog = styled(Dialog)`
  max-width: 560px;
  width: 90%;
  min-height: unset;
`

const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #424242;
`

const Description = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #5B6670;
`

const Image = styled.img`
  width: 289px;
  ${MediaRange.lessThan("mobile")`
    width: 250px;
  `}
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
`

const MarkersContainer = styled.div`
  width: 120px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const firstComponentContent = [
  { image: firstSlide,
    title: "Заполняйте расписание двуми способами",
    description: <>
      <Description><MarkerIcon /> Ежедневно, если новые задачи появляются непредсказуемо</Description>
      <Description><MarkerIcon /> На неделю с возможностью повторения, если рабочие планы цикличны</Description>
    </>},

  { image: secondSlide,
    title: "Воспользуйтесь методом привлечения новых клиентов",
    description: <Description>Внесите в расписание несколько бесплатных сессий для формирования запроса, чтобы познакомиться с клиентом и наметить план работы</Description>},

  { image: thirdSlide,
    title: "Синхронизируйте работу и личные планы",
    description: <Description>Подключите расписание к вашему Google-календарю, чтобы избежать несостыковок во времени.</Description>},

  { image: fourthSlide,
    title: "Смотрите расписание сессий на платформе в личном календаре в вашем смартфоне",
    description: <Description>Получайте автоматические e-mail об изменениях в расписании или самостоятельно добавьте оповещения о предстоящих сессиях в календаре, чтобы не пропустить их</Description>},
]

const notFirstComponentContent = [
  { image: fifthSlide,
    description: <Description>Бесплатные сессии по формированию запроса — это один из главных этапов привлечения клиенто</Description>},

  { image: sixthSlide,
    description: <Description>Вам важно познакомиться
      с клиентом, определить цели и наметить план работы, понять, готов ли он к коучингу. Так что рекомендуем отвести несколько временных слотов на это! </Description>},

  { image: seventhSlide,
    description: <Description>Сделать сессию бесплатной можно, наведя курсор на уже существующий слот в вашем расписании и поставив галочку "Сделать сессию бесплатной".</Description>},

  { image: eighthSlide,
    description: <Description>Длительность бесплатной сессии для формирования запроса – 30 минут</Description>},
]


const FirstTime = () => {
  const [showedID, setShowed] = useState(0)
  const numbArray = [0,1,2,3]
  
  return (
    <Container>
      {firstComponentContent.map((element, index) => (
        index === showedID  && <>
          <Image src={element.image} />
          <Title>{element.title}</Title>
          {element.description}
        </>))}
      <MarkersContainer>{numbArray.map(el => (
        <SelectableMarkerIcon
          key={el}
          selected={el === showedID} 
          onClick={() => setShowed(el)} />))}
      </MarkersContainer>
    </Container>
  )
}

const NotFirstTime = () => {
  const [showedID, setShowed] = useState(0)
  const numbArray = [0,1,2,3]
  
  return (
    <Container>
      {notFirstComponentContent.map((element, index) => (
        index === showedID  && <>
          <Image src={element.image} />
          {element.description}
        </>))}
      <MarkersContainer>{numbArray.map(el => (
        <SelectableMarkerIcon
          key={el}
          selected={el === showedID}
          onClick={() => setShowed(el)} />))}
      </MarkersContainer>
    </Container>
  )
}

export const OnBoardingFreeSessions = () => {
  const firstTime = true
  const visibility = useStore($onBoardingvisibility)
  const toggle = useEvent(showOnBoarding)

  return (
    <StyledSessionsFilterDialog value={visibility} onChange={toggle}>
      {firstTime ? <FirstTime /> : <NotFirstTime />}
    </StyledSessionsFilterDialog>
  )
}