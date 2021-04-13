import styled from "styled-components"
import * as React from "react"
import { Icon } from "@/oldcomponents/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"


const Container = styled.div`
  margin: 0 auto;
  max-width: 600px;
  padding-top: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.div`
    font-family: Roboto Slab;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    color: #75309E;
    margin-bottom: 16px;

    ${MediaRange.lessThan("mobile")`
    font-size: 20px;
    line-height: 28px;
  `}
`

const LikeWithLaptopIcon = styled(Icon).attrs({ name: "ykassa-approved" })`
    width: 120px;
    height: 120px;
    margin-top: 72px;
    
    ${MediaRange.lessThan("mobile")`
    margin-top: 16px;
  `}
`

const SubTitle = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #5B6670;

    ${MediaRange.lessThan("mobile")`
    font-size: 14px;
    line-height: 22px;
  `}
`


export const YandexKassaWaitingForApproval = () => {
  return (
    <Container>
      <Title>Ваша заявка ждет одобрения!</Title>
      <SubTitle>Мы получим уведомление от ЮKassa о Вашей регистрации и авторизуем Вас на платформе в течение 24 часов</SubTitle>
      <LikeWithLaptopIcon />
    </Container>
  )
}