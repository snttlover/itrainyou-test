import React from "react"
import {DashboardLayout} from "@/application/components/layouts/behaviors/dashboard/DashboardLayout"
import styled from "styled-components"
import {ProfileHeader} from "./content/profile-header/ProfileHeader"
import {ProfileInterests} from "@/application/pages/dashboard/profile/content/interests/Interests"
import {IndividualSessions} from "@/application/pages/dashboard/profile/content/sessions-list/IndividualSessions"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
  padding: 0 24px;
  position: relative;
`

export default () => (
  <DashboardLayout>
    <Container>
      <ProfileHeader />
      <ProfileInterests />
      <IndividualSessions />
    </Container>
  </DashboardLayout>
)
