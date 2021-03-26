import { ContentContainer } from "@/components/layouts/ContentContainer"
import React, { useEffect } from "react"
import { ClientDashboardLayout } from "@/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import styled from "styled-components"
import { ProfileHeader } from "./content/profile-header/ProfileHeader"
import { ProfileInterests } from "@/pages/client/profile/content/interests/Interests"
import { ProfileCreditCards } from "@/pages/client/profile/content/credit-cards/CreditCards"
import { DeleteModalDialog } from "@/pages/client/profile/content/profile-delete-modal/DeleteModalDialog"
import { IndividualSessions } from "@/pages/client/profile/content/sessions-list/IndividualSessions"
import { $profilePageLoading, $profilePageSessionsCount, ClientProfileGate } from "./profile-page.model"
import { MediaRange } from "@/lib/responsive/media"
import { useGate, useStore } from "effector-react"
import { Loader } from "@/components/spinner/Spinner"
import { ProfileCoachButton } from "@/pages/client/profile/content/coach-button/ProfileCoachButton"

const Container = styled(ContentContainer)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 24px;
  position: relative;
  ${MediaRange.lessThan("mobile")`
    padding: 0 8px;
  `}
`

const ProfilePage = () => {
  const sessionsCount = useStore($profilePageSessionsCount)
  const pageLoading = useStore($profilePageLoading)

  useGate(ClientProfileGate)

  return (
    <ClientDashboardLayout>
      {!pageLoading ? (
        <Container>
          <ProfileHeader />
          <ProfileInterests />
          <ProfileCreditCards userType={"client"} />
          {sessionsCount && <IndividualSessions />}
          <ProfileCoachButton />
          <DeleteModalDialog />
        </Container>
      ) : (
        <Loader />
      )}
    </ClientDashboardLayout>
  )
}

export default ProfilePage
