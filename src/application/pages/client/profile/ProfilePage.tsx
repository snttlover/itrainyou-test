import React, { useEffect } from "react"
import { ClientDashboardLayout } from "@/application/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import styled from "styled-components"
import { ProfileHeader } from "./content/profile-header/ProfileHeader"
import { ProfileInterests } from "@/application/pages/client/profile/content/interests/Interests"
import { IndividualSessions } from "@/application/pages/client/profile/content/sessions-list/IndividualSessions"
import { $profilePageSessionsCount, mounted } from "./profile-page.model"
import { MediaRange } from "@/application/lib/responsive/media"
import { useStore } from "effector-react"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
  padding: 0 24px;
  position: relative;
  ${MediaRange.lessThan(`mobile`)`
    padding: 0 8px;
  `}
`

const ProfilePage = () => {
  const sessionsCount = useStore($profilePageSessionsCount)

  useEffect(() => {
    mounted()
  }, [])

  return (
    <ClientDashboardLayout>
      <Container>
        <ProfileHeader />
        <ProfileInterests />
        {sessionsCount && <IndividualSessions />}
      </Container>
    </ClientDashboardLayout>
  )
}

export default ProfilePage
