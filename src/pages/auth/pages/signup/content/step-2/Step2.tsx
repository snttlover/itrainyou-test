import { AuthLayout } from "@/old-components/layouts/sections/auth/AuthLayout"
import { navigatePush } from "@/feature/navigation"
import { MediaRange } from "@/lib/responsive/media"
import { WhiteNextButton } from "@/pages/auth/pages/signup/components/NextButton"
import { Steps } from "@/pages/auth/pages/signup/components/Steps"
import { UserTypeCard } from "@/pages/auth/pages/signup/content/step-2/UserTypeCard"
import { routeNames } from "@/pages/route-names"
import { useEvent, useStore } from "effector-react"
import * as React from "react"
import styled from "styled-components"
import { $userData, userTypeChanged } from "@/pages/auth/pages/signup/models/units"
import { ymLog } from "@/lib/external-services/yandex-metrika/lib"

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
  display: flex;
  justify-content: center;
  flex-direction: row;
    
    ${UserTypeCard} {
        margin: 0 auto;
        width: 400px;
        height: 160px;
    }

    
  ${MediaRange.lessThan("tablet")`
  margin: 0 auto;
  flex-direction: column;
    ${UserTypeCard} {
      margin: 24px auto 0;
      width: 400px;
      height: 160px;
    }
  `}
    
  ${MediaRange.lessThan("mobile")`
    margin: 0 auto;
    flex-direction: column;
        ${UserTypeCard} {
        margin: 24px auto 0;
        height: 160px;
        width: 288px;
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
  const navigate = useEvent(navigatePush)

  const handleOnNextClick = () => {
    ymLog("reachGoal","chooseclientsignin")
    navigate({ url: routeNames.signup("3") })
  }

  return (
    <AuthLayout>
      <Steps activeId='0'>
        <Steps.Step id='1'>Роль</Steps.Step>
        <Steps.Step id='2'>Данные</Steps.Step>
        <Steps.Step id='3'>Анкета</Steps.Step>
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
            color='#783D9D'
            hoverColor='#F4EFF7'
            selected={type === "coach"}
            onClick={() => changeType("coach")}
          />
        </Cards>
        <WhiteNextButton onClick={handleOnNextClick} />
      </Container>
    </AuthLayout>
  )
}
