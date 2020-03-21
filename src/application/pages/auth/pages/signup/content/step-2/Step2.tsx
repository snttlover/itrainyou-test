import { AuthLayout } from "@app/components/layouts/auth/AuthLayout"
import { NextButton } from "@app/pages/auth/pages/signup/components/NextButton"
import { Steps } from "@app/pages/auth/pages/signup/components/Steps"
import { UserTypeCard } from "@app/pages/auth/pages/signup/content/step-2/UserTypeCard"
import { $registerUserType, changeUserType } from "@app/pages/auth/pages/signup/signup.model"
import { useStore } from "effector-react"
import * as React from "react"
import styled from "styled-components"

const Container = styled.div`
  min-width: 320px;
  margin: 71px auto 0;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  height: 440px;
  justify-content: space-between;

  ${UserTypeCard} {
    margin-top: 16px;

    &:first-of-type {
      margin-top: 0;
    }
  }

  ${NextButton} {
    margin-top: 16px;
  }
`

const Title = styled.h1`
  font-weight: 600;
  font-size: 28px;
  line-height: 44px;
  margin-bottom: 20px;

  text-align: center;

  color: #424242;
`

const clientDescriptions = [
  "Большая база данных тренингов",
  "Безопасная оплата тренингов на сайте",
  "Возможность просмотра трансляций прямо на сайте",
  "Возможность просмотра отзывов тренингов от людей, которые уже прошли эти тренинги"
]

const couchDescriptions = [
  "Легкая регистрация",
  "Удобное проведение тренингов",
  "Возможность проведения трансляции прямо на сайте без специальных программных средств",
  "При желании вы можете записаться на тренинги и самим быть учеником"
]

export const Step2 = () => {
  const type = useStore($registerUserType)
  return (
    <AuthLayout>
      <Steps activeId='2'>
        <Steps.Step id='1'>1</Steps.Step>
        <Steps.Step id='2'>2</Steps.Step>
        <Steps.Step id='3'>3</Steps.Step>
        <Steps.Step id='4'>4</Steps.Step>
      </Steps>
      <Container>
        <Title>Вы хотите стать:</Title>
        <UserTypeCard
          title='Клиентом'
          descriptions={clientDescriptions}
          selected={type === "client"}
          onClick={() => changeUserType("client")}
        />
        <UserTypeCard
          title='Коучем'
          descriptions={couchDescriptions}
          selected={type === "couch"}
          onClick={() => changeUserType("couch")}
        />
        <NextButton />
      </Container>
    </AuthLayout>
  )
}
