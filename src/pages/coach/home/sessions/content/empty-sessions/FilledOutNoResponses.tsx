import React from "react"
import styled from "styled-components"
import { ContentContainer } from "@/components/layouts/ContentContainer"
import { Text } from "@/components/typography/Text"
import swapLoveImg from "./images/swapLove.svg"
import fillOutImg from "./images/fill.svg"
import waveImg from "./images/wave.svg"
import { useEvent } from "effector-react"
import { navigatePush } from "@/feature/navigation"
import { MediaRange } from "@/lib/responsive/media"

export function FilledOutNoResponses(){
  const navigate = useEvent(navigatePush)
  const goToClientsHandler = () => navigate({url: "/coach/clients"})
  const goToClientPageHandler = () => navigate({url: "/client"})
  return (
    <>
      <ContentContainer>
        <FirstStep>
          <FillOutImg src={fillOutImg}/>
          <FirstStepTextPart>
            <Title>Как увидеть, что клиент забронировал сессию?</Title>
            <FirstStepDescriptionText>Когда клиент забронирует у вас сессию, вам придет запрос на бронирование
            сессии во вкладку "Мои клиенты", а также уведомление на ваш e-mail. <br/>
            Обязательно подтвердите или отклоните бронирование. Предоплата спишется
            с клиента автоматически только после вашего подтверждения бронирования
            за 24 часа до сессии (или менее, если
            вы подтвердите бронь позже). <br/>
            Вы получите оплату за сессию автоматически на карту/счет, который
            вы указали при регистрации в ЮКассе,
            в течение 2 рабочих дней после проведения сессии.</FirstStepDescriptionText>
            <CheckButton onClick={goToClientsHandler}>Проверить запросы</CheckButton>
          </FirstStepTextPart>
        </FirstStep>
      </ContentContainer>

      <BackgroundContainer>
        <ContentContainer>
          <SecondStep>
            <SecondStepContentContainer>
              <RowContainer>
                <SecondStepTextPart>
                  <Title>Проходите сессии, как клиент!</Title>
                  <SecondStepDescription>
                    Пока вы ожидаете запросов на бронирование, вы можете проходить сессии на платформе в качестве клиента <br/>
                  </SecondStepDescription>
                  <SecondStepDescriptionLight>
                    Переключаться с аккаунта коуча на аккаунт клиента вы можете, нажав на
                    стрелочку в правом верхнем углу (справа от фото вашего профиля)
                  </SecondStepDescriptionLight>
                  <GoToFillButton onClick={goToClientPageHandler}>Пройти</GoToFillButton>
                </SecondStepTextPart>
                <SwapLoveImg src={swapLoveImg}/>
              </RowContainer>
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

const FirstStepTextPart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 0 0 80px;
  ${MediaRange.lessThan("mobile")`
    padding: 0;
    margin-bottom: 32px;
  `}
`

const FirstStepDescriptionText = styled(Text)`
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

const SecondStepDescription = styled.div`
  font-size: 16px;
  font-family: "Roboto";
  ${MediaRange.lessThan("mobile")`
    font-size: 14px;
  `}
`

const SecondStepDescriptionLight = styled(SecondStepDescription)`
  color: #5B6670;
  margin-bottom: 36px;
`

const SecondStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 32px;
  justify-content: flex-start;
  background-size: contain;
  background-position: center;
  background-repeat: repeat-x;
  background-image: url(${waveImg});
  padding: 150px 0 100px 0;
  ${MediaRange.lessThan("mobile")`
    padding: 50px 0 60px 0;
    background-size: cover;
    background-position-x: 200px;
    margin-bottom: -30px;
  `}
`

const SecondStepTextPart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  padding: 0 60px 0 0;
  line-height: 24px;
  ${MediaRange.lessThan("mobile")`
    padding: 0;
    width: 100%;
  `}
`

const SecondStepContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0;
`

const RowContainer = styled.div`
  display: flex;
  ${MediaRange.lessThan("mobile")`
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
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
    margin-bottom: 32px;
  `}
`

const CheckButton = styled(Button)`
  padding: 6px 34px;
`

const SwapLoveImg = styled.img`
  width: calc(15%);
  ${MediaRange.lessThan("mobile")`
    width: 50%;
    margin-left: 48px;
  `}
`

const FillOutImg = styled.img`
  width: calc(100%*2/5);
  ${MediaRange.lessThan("mobile")`
    width: 90%;
    
  `}
`

const FirstStep = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  margin-bottom: 73px;
  margin-left: 0;
  ${MediaRange.lessThan("mobile")`
    flex-direction: column-reverse;
    margin-bottom: 0px;
  `}
`

