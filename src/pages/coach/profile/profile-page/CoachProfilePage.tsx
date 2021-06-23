import { CoachDashboardLayout } from "@/oldcomponents/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { ContentContainer } from "@/oldcomponents/layouts/ContentContainer"
import { MediaRange } from "@/lib/responsive/media"
import { TabsContainer } from "@/pages/coach/profile/common/TabsContainer"
import { useGate, useStore } from "effector-react"
import * as React from "react"
import styled from "styled-components"
import { ProfileTabs } from "../common/ProfileTabs"
import { AboutCoach } from "./components/AboutCoach"
import { BaseCoachInfo } from "./components/BaseCoachInfo"
import { SessionsDatePicker } from "./components/common/SessionsDatePicker"
import { Reviews } from "./components/Reviews"
import { $profileData, $sessionsPickerStore, ProfileGate } from "./profile.model"

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
          <ProfileTabs />
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
          </BuySidebar>
        </InfoWithSidebar>
      </ContentContainer>
    </CoachDashboardLayout>
  )
}
