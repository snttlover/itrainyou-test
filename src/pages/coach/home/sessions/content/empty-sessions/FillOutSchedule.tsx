import React from "react"
import styled from "styled-components"
import { Text } from "@/oldcomponents/typography/Text"
import { ContentContainer } from "@/oldcomponents/layouts/ContentContainer"
import { useEvent } from "effector-react"
import { navigatePush } from "@/feature/navigation"
import { MediaRange } from "@/lib/responsive/media"
import waveImg from "./images/wave.svg"
import pushImg from "./images/push.svg"
import fillOutImg from "./images/fill.svg"
import waveMobileImg from "./images/waveMobile.svg"

export function FillOutSchedule(){
  const navigate = useEvent(navigatePush)
  const goToFillScheduleHandler = () => navigate({url: "/coach/schedule"})
  const goToClientsHandler = () => navigate({url: "/coach/clients"})
  return (
    <>
      <ContentContainer>
        <FirstStep>
          <RowContainer>
            <FirstStepTextPart>
              <Title>Заполните расписание!</Title>
              <FirstStepDescription>
                Составьте свое расписание сессий, чтобы
                ваш профиль стал виден клиентам
                и они смогли записываться на ваши сессии
              </FirstStepDescription>
              <GoToFillButton onClick={goToFillScheduleHandler}>Заполнить</GoToFillButton>
            </FirstStepTextPart>
            <PushImg src={pushImg}/>
          </RowContainer>
        </FirstStep>
      </ContentContainer>

      <BackgroundContainer>
        <ContentContainer>
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
                  <CheckButton onClick={goToClientsHandler}>Проверить запросы</CheckButton>
                </div>
              </SecondStepTextPart>
            </SecondStepContentContainer>
          </SecondStep>
        </ContentContainer>
      </BackgroundContainer>
    </>
  )
}

const BackgroundContainer = styled.div`
  background-size: contain;
  background-position: center;
  background-repeat: repeat-x;
  background-image: url(${waveImg});
`

const SecondStepTextPart = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 0 80px;
  ${MediaRange.lessThan("mobile")`
    padding: 0;
  `}
`

const SecondStepDescriptionText = styled(Text)`
  line-height: 24px;
  margin-bottom: 36px;
  ${MediaRange.lessThan("mobile")`
    font-size: 14px;
  `}
`

const Title = styled.div`
  font-size: 24px;
  font-family: "Roboto Slab";
  margin-bottom: 16px;
  ${MediaRange.lessThan("mobile")`
    font-size: 20px;
  `}
`

const FirstStepDescription = styled.div`
  font-family: "Roboto";
  font-size: 16px;
  margin-bottom: 36px;
  ${MediaRange.lessThan("mobile")`
    font-size: 14px;
  `}
`

const FirstStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 32px;
  justify-content: flex-start;
  ${MediaRange.lessThan("mobile")`
    flex-direction: column;
    margin-bottom: -20px;
  `}
`

const RowContainer = styled.div`
  display: flex;
  ${MediaRange.lessThan("mobile")`
    flex-direction: column;
  `}
`

const Button = styled.button`
  padding: 6px 70px;
  background-color: #783D9D;
  border: none;
  border-radius: 24px;
  color: #fff;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  ${MediaRange.lessThan("mobile")`
    font-size: 14px;
  `}
`

const GoToFillButton = styled(Button)`
  padding: 6px 70px;
  ${MediaRange.lessThan("mobile")`
    padding: 5px 25px;
    margin-bottom: 7px;
  `}
`

const CheckButton = styled(Button)`
  padding: 6px 34px;
`

const FirstStepTextPart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  padding: 0 60px 0 0;
  line-height: 24px;
  ${MediaRange.lessThan("mobile")`
    width: 100%;
    padding: 0;
  `}
`

const PushImg = styled.img`
  width: 50%;
  ${MediaRange.lessThan("mobile")`
    width: 100%;
  `}
`

const FillOutImg = styled.img`
  margin-top: 32px;
`

const SecondStep = styled.div`
  padding: 150px 0 50px 0;
  margin-bottom: 73px;
  ${MediaRange.lessThan("mobile")`
    background-size: cover;
    padding: 80px 0;
    background-image: url(${waveMobileImg});
    margin-bottom: 0px;
  `}
`

const SecondStepContentContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  ${MediaRange.lessThan("mobile")`
    flex-direction: column-reverse
  `}
`