import { CoachInformation } from "@/pages/coach/profile/edit-page/coach-data/CoachInformation"
import { UserProfile } from "@/pages/coach/profile/edit-page/user-data/UserProfile"
import React from "react"
import { CoachDashboardLayout } from "@/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { ContentContainer } from "@/components/layouts/ContentContainer"
import styled from "styled-components"

const Wrapper = styled.div`
  max-width: 600px;
`

export const CoachProfileEditPage = () => (
  <CoachDashboardLayout>
    <ContentContainer>
      <Wrapper>
        <UserProfile />
        <CoachInformation />
      </Wrapper>
    </ContentContainer>
  </CoachDashboardLayout>
)
