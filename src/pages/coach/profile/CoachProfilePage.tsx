import { CoachDashboardLayout } from "@/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { ContentContainer } from "@/components/layouts/ContentContainer"
import { MediaRange } from "@/lib/responsive/media"
import { SessionsDatePicker } from "@/pages/coach/profile/components/common/SessionsDatePicker"
import { $profileData, $sessionsPickerStore, ProfileGate } from "@/pages/coach/profile/profile.model"
import { AboutCoach } from "./components/AboutCoach"
import { BaseCoachInfo } from "./components/BaseCoachInfo"
import { Reviews } from "./components/Reviews"
import * as React from "react"
import styled, { css } from "styled-components"
import { useGate, useStore } from "effector-react/ssr"

const InfoWithSidebar = styled.div`
  margin: 14px 0;
  display: flex;
  justify-content: space-between;
  max-width: 900px;
`

const BuySidebar = styled.div`
  display: none;
  min-width: 268px;
  width: 268px;
  margin-left: 24px;
  position: relative;
  align-self: flex-start;
  flex-direction: column;
  align-items: center;
  height: auto;

  ${MediaRange.greaterThan("laptop")`
    display: flex;
  `}
`

const BuyBlock = styled.div`
  position: relative;
  display: flex;
  width: 100%;

  ${MediaRange.greaterThan("laptop")`
    display: none;
  `}
`

const CoachInfoContainer = styled.div`
  width: 100%;
  max-width: 608px;
  margin: 0 auto;

  ${Reviews} {
    margin-top: 24px;

    ${MediaRange.greaterThan("mobile")`
      margin-top: 32px;
    `}
  }
`

const MainCoachBlock = styled.div`
  width: 100%;
  max-width: 608px;
  margin: 0 auto;

  ${MediaRange.greaterThan("laptop")`
    background: #FFFFFF;
    border-radius: 2px;
    padding: 20px 8px;
  `}

  ${BuyBlock} {
    margin-top: 16px;

    ${MediaRange.greaterThan("mobile")`
      margin-top: 12px;
    `}
  }

  ${AboutCoach} {
    margin-top: 16px;

    ${MediaRange.greaterThan("laptop")`
      margin-top: 0;
    `}
  }
`

const TabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 608px;
  margin: 14px auto 0;

  ${MediaRange.greaterThan("mobile")`
    margin-top: 28px;
  `}
  ${MediaRange.greaterThan("tablet")`
    margin-top: 36px;
  `}
  ${MediaRange.greaterThan("laptop")`    
    max-width: 900px;
    margin-left: 0;
  `}
`

const InfoText = styled.p`
  display: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  text-align: right;

  color: #9aa0a6;

  ${MediaRange.greaterThan("laptop")`
    display: block;
  `}
`

const Tabs = styled.div`
  display: flex;
`

const Tab = styled.div<{ selected?: boolean }>`
  position: relative;
  cursor: pointer;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #424242;

  &:not(:first-child) {
    margin-left: 24px;
  }

  ${({ selected }) =>
    selected &&
    css`
      &:after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        height: 2px;
        width: 100%;
        background-color: ${({ theme }) => theme.colors.primary};
      }
    `}
`

const ThinkYouAreTopCoach = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #9aa0a6;
  margin-top: -8px;
`

const Datepicker = () => {
  const coach = useStore($profileData)

  if (coach) {
    return <SessionsDatePicker coach={coach as any} sessionsData={$sessionsPickerStore} />
  }
  return null
}

export const CoachProfilePage = () => {
  useGate(ProfileGate)

  return (
    <CoachDashboardLayout>
      <ContentContainer>
        <TabsContainer>
          <Tabs>
            <Tab selected>Профиль</Tab>
            <Tab>История сессий</Tab>
          </Tabs>
          <InfoText>Так вашу страницу видит клиент</InfoText>
        </TabsContainer>
        <InfoWithSidebar>
          <CoachInfoContainer>
            <MainCoachBlock>
              <BaseCoachInfo />
              <BuyBlock>
                <Datepicker />
              </BuyBlock>
              <AboutCoach />
            </MainCoachBlock>
            <Reviews />
          </CoachInfoContainer>
          <BuySidebar>
            <Datepicker />
            <ThinkYouAreTopCoach>Думаете вы топ-коуч?</ThinkYouAreTopCoach>
          </BuySidebar>
        </InfoWithSidebar>
      </ContentContainer>
    </CoachDashboardLayout>
  )
}
