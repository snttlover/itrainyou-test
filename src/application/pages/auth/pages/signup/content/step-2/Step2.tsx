import { AuthLayout } from "@/application/components/layouts/auth/AuthLayout"
import { MediaRange } from "@/application/lib/responsive/media"
import { NextButton } from "@/application/pages/auth/pages/signup/components/NextButton"
import { Steps } from "@/application/pages/auth/pages/signup/components/Steps"
import { UserTypeCard } from "@/application/pages/auth/pages/signup/content/step-2/UserTypeCard"
import { userTypeChanged, $userData } from "@/application/pages/auth/pages/signup/signup.model"
import { useStore } from "effector-react"
import Router from "next/router"
import * as React from "react"
import styled from "styled-components"

const Container = styled.div`
  min-width: 320px;
  margin: 71px auto 0;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  height: 440px;

  ${UserTypeCard} {
    margin-top: 16px;

    &:first-of-type {
      margin-top: 0;
    }
  }

  ${NextButton} {
    margin-top: 16px;
    margin-bottom: 20px;
  }
  
  ${MediaRange.greaterThan("mobile")`
    margin: 71px auto 0;
    ${UserTypeCard} {
      margin-top: 0;
      margin-left: 12px;
      
      &:first-of-type {
        margin-left: 0;
      }
    }
  `}
  
  ${MediaRange.greaterThan("tablet")`
    ${UserTypeCard} {
      width: 360px  
    }
  `}
  
  ${MediaRange.greaterThan("laptop")`
    ${UserTypeCard} {
      width: 400px;  
      margin-left: 32px;
    }
    
    ${NextButton} {
      margin-right: 140px
    }
  `}
`

const Cards = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  
  ${MediaRange.greaterThan("mobile")`
    flex-direction: row;
  `}
`

const Title = styled.h1`
  font-weight: 600;
  font-size: 28px;
  line-height: 44px;
  margin-bottom: 20px;

  text-align: center;
  
  ${MediaRange.greaterThan("mobile")`
    font-size: 36px;
    margin-bottom: 40px;
  `}
`

const StyledSteps = styled(Steps)`
  ${MediaRange.greaterThan('tablet')`
    margin-right: -10px;
  `}
  ${MediaRange.greaterThan('laptop')`
    margin-right: 134px;
  `}
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
  const type = useStore($userData).type
  return (
    <AuthLayout>
      <StyledSteps activeId='2'>
        <Steps.Step id='1'>1</Steps.Step>
        <Steps.Step id='2'>2</Steps.Step>
        <Steps.Step id='3'>3</Steps.Step>
        <Steps.Step id='4'>4</Steps.Step>
      </StyledSteps>
      <Container>
        <Title>Вы хотите стать:</Title>
        <Cards>
          <UserTypeCard
            title='Клиентом'
            selectedColor="#449BD9"
            hoverColor="#DAEBF7"
            textColor="#449BD9"
            descriptions={clientDescriptions}
            selected={type === "client"}
            onClick={() => userTypeChanged("client")}
          />
          <UserTypeCard
            title='Коучем'
            selectedColor="#544274"
            hoverColor="#DDD9E3"
            textColor="#544274"
            descriptions={couchDescriptions}
            selected={type === "couch"}
            onClick={() => userTypeChanged("couch")}
          />
        </Cards>
        <NextButton onClick={() => Router.push('/signup/[step]', '/signup/3')} />
      </Container>
    </AuthLayout>
  )
}
