import { AuthLayout } from "@app/components/layouts/auth/AuthLayout"
import { MediaRange } from "@app/lib/responsive/media"
import { NextButton } from "@app/pages/auth/pages/signup/components/NextButton"
import { Steps } from "@app/pages/auth/pages/signup/components/Steps"
import { UserTypeCard } from "@app/pages/auth/pages/signup/content/step-2/UserTypeCard"
import { $registerUserType, changeUserType, nextStep } from "@app/pages/auth/pages/signup/signup.model"
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

  color: #424242;
  
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
  const type = useStore($registerUserType)
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
        </Cards>
        <NextButton onClick={() => nextStep()} />
      </Container>
    </AuthLayout>
  )
}
