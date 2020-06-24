import { AuthLayout } from "@/components/layouts/sections/auth/AuthLayout"
import { history } from "@/feature/navigation"
import { MediaRange } from "@/lib/responsive/media"
import { WhiteNextButton } from "@/pages/auth/pages/signup/components/NextButton"
import { Steps } from "@/pages/auth/pages/signup/components/Steps"
import { UserTypeCard } from "@/pages/auth/pages/signup/content/step-2/UserTypeCard"
import { userTypeChanged, $userData } from "@/pages/auth/pages/signup/signup.model"
import { useEvent, useStore } from "effector-react/ssr"
import * as React from "react"
import styled from "styled-components"

const Container = styled.div`
  min-width: 320px;
  margin: 71px auto 0;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  height: 440px;

  ${WhiteNextButton} {
    margin-left: auto;
    margin-top: 16px;
    margin-bottom: 20px;
  }

  ${MediaRange.greaterThan("mobile")`
    margin: 182px auto 0;
    ${WhiteNextButton} {
      margin: 64px auto;
    }
  `}

  ${MediaRange.greaterThan("tablet")`
    margin: 94px auto 0;
    ${WhiteNextButton} {
      margin: 36px auto;
    }
  `}
`

const Cards = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;

  ${UserTypeCard} {
    margin: 12px auto 0;
    height: 124px;
    width: 288px;

    &:first-of-type {
      margin-top: 0;
    }
  }

  ${MediaRange.greaterThan("mobile")`
    ${UserTypeCard} {
      margin: 24px auto 0;
      width: 400px;
      height: 160px;
    }
  `}

  ${MediaRange.greaterThan("tablet")`
    justify-content: center;
    flex-direction: row;
    ${UserTypeCard} {
      margin: 0 auto;
      width: 400px;
      height: 160px;
    }
  `}
`

const Title = styled.h1`
  font-weight: 600;
  font-size: 24px;
  line-height: 26px;
  margin-bottom: 32px;
  font-family: Roboto Slab;

  text-align: center;
  color: #ffffff;

  ${MediaRange.greaterThan("mobile")`
    font-size: 32px;
    margin-bottom: 52px;
  `}

  ${MediaRange.greaterThan("mobile")`
    margin-bottom: 64px;
  `}
`

export const Step2 = () => {
  const type = useStore($userData).type
  const changeType = useEvent(userTypeChanged)
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
        <Cards>
          <UserTypeCard
            title='клиентом'
            color='#4858CC'
            hoverColor='#EFF2FC'
            selected={type === "client"}
            onClick={() => changeType("client")}
          />
          <UserTypeCard
            title='коучем'
            color='#7D36A8'
            hoverColor='#F5EFF8'
            selected={type === "coach"}
            onClick={() => changeType("coach")}
          />
        </Cards>
        <WhiteNextButton onClick={() => history!.push("/auth/signup/3")} />
      </Container>
    </AuthLayout>
  )
}
