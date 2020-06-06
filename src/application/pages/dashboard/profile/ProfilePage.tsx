import React, { useEffect } from "react"
import {ClientDashboardLayout} from "@/application/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import styled from "styled-components"
import {ProfileHeader} from "./content/profile-header/ProfileHeader"
import {ProfileInterests} from "@/application/pages/dashboard/profile/content/interests/Interests"
import {IndividualSessions} from "@/application/pages/dashboard/profile/content/sessions-list/IndividualSessions"
import { mounted } from "./profile-page.model"

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

const ProfilePage = () => {
  useEffect(() => {
    mounted()
  }, [])

  return (
    <ClientDashboardLayout>
      <Container>
        <ProfileHeader />
        <ProfileInterests />
        <IndividualSessions />
      </Container>
    </ClientDashboardLayout>
  )
}

export default ProfilePage
