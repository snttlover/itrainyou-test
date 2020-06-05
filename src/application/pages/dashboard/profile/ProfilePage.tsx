import React, { useEffect } from "react"
import {DashboardLayout} from "@/application/components/layouts/behaviors/dashboard/DashboardLayout"
import styled from "styled-components"
import {ProfileHeader} from "./content/profile-header/ProfileHeader"
import {ProfileInterests} from "@/application/pages/dashboard/profile/content/interests/Interests"
import {IndividualSessions} from "@/application/pages/dashboard/profile/content/sessions-list/IndividualSessions"
import { mounted } from "./profile-page.model"
import {toasts, Toast} from "@/application/components/layouts/behaviors/dashboard/toasts/toasts"

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

    toasts.add({
      text: `Some text`,
      type: `error`
    })
  }, [])

  return (
    <DashboardLayout>
      <Container>
        <ProfileHeader />
        <ProfileInterests />
        <IndividualSessions />
      </Container>
    </DashboardLayout>
  )
}

export default ProfilePage
