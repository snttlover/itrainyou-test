import React from "react"
import styled from "styled-components"
import waveImg from "./images/wave.svg"
import pushImg from "./images/push.svg"
import fillOutImg from "./images/fill.svg"
import { Text } from "@/components/typography/Text"
import { ContentContainer } from "@/components/layouts/ContentContainer"
import { CoachDashboardLayout } from "@/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"

export function FillOutSchedule(){
  return (
    <>
      <FirstStep>
        <RowContainer>
          <FirstStepTextPart>
            <Title>Заполните расписание!</Title>
            <Description>
              Составьте свое расписание сессий, чтобы
              ваш профиль стал виден клиентам
              и они смогли записываться на ваши сессии
            </Description>
          </FirstStepTextPart>
          <PushImg src={pushImg}/>
        </RowContainer>
        <GoToFillButton>Заполнить</GoToFillButton>
      </FirstStep>

      <SecondStep>
        <SecondStepContentContainer>
          <FillOutImg src={fillOutImg}/>
          <SecondStepTextPart>
            <Title>Как увидеть, что клиент
            забронировал сессию?</Title>
            <SecondStepDescriptionText>Когда клиент забронирует у вас сессию, вам придет запрос на бронирование сессии во вкладку "Мои клиенты", а также уведомление на ваш e-mail.
            Обязательно подтвердите или отклоните бронирование. Предоплата спишется с клиента автоматически только после вашего подтверждения бронирования за 24 часа до сессии (или менее, если вы подтвердите бронь позже).
            Вы получите оплату за сессию автоматически на карту/счет, который вы указали при регистрации в ЮКассе, в течение 2 рабочих дней после проведения сессии.
            </SecondStepDescriptionText>
            <div>
              <CheckButton>Проверить запросы</CheckButton>
            </div>
          </SecondStepTextPart>
        </SecondStepContentContainer>
      </SecondStep>
    </>
  )
}

const SecondStepTextPart = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 0 80px;
`

const SecondStepDescriptionText = styled(Text)`
  line-height: 24px;
  margin-bottom: 36px;
`

const Title = styled.div`
  font-size: 24px;
  font-family: "Roboto Slab";
  margin-bottom: 16px;
`

const Description = styled.div`
  font-size: 16px;
  font-family: "Roboto";
`

const FirstStep = styled(ContentContainer)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 32px;
  justify-content: flex-start;
  padding: 0;
`

const RowContainer = styled.div`
  display: flex;
`

const Button = styled.button`
  background-color: #fff;
  padding: 6px 70px;
  background-color: #783D9D;
  border: none;
  border-radius: 24px;
  color: #fff;
  font-size: 16px;
  outline: none;
  cursor: pointer;
`

const GoToFillButton = styled(Button)`
  padding: 6px 70px;
`

const CheckButton = styled(Button)`
  padding: 6px 34px;
`

const FirstStepTextPart = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 0 60px 0 0;
  line-height: 24px;
`

const PushImg = styled.img`
  width: 50%;
`

const FillOutImg = styled.img`
  margin-top: 32px;
  width: 2/5;
`

const SecondStep = styled.div`
  background-size: contain;
  background-position: center;
  background-repeat: repeat-x;
  background-image: url(${waveImg});
  padding: 150px 0 50px 0;
  margin-bottom: 73px;
`

const SecondStepContentContainer = styled(ContentContainer)`
  display: flex;
  width: 100%;
  align-items: flex-start;
`