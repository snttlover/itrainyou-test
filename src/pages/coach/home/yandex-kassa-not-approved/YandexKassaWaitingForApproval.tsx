import styled from "styled-components"
import * as React from "react"
import peoples from "@/pages/coach/home/approval-failing/images/peoples.svg"


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
`

const Peoples = styled.img.attrs({ src: peoples })`
  width: 109.08px;
  height: 144.37px;
  margin-bottom: 40px;
`

const SubTitle = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #5B6670;
`


export const YandexKassaWaitingForApproval = () => {
  return (
    <Container>
      <Title>Ваша заявка ждет одобрения!</Title>
      <SubTitle>Мы получим уведомление от ЮKassa о Вашей регистрации и авторизуем Вас на платформе в течение 24 часов</SubTitle>
      <Peoples />
    </Container>
  )
}