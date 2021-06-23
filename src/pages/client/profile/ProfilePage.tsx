import { ContentContainer } from "@/oldcomponents/layouts/ContentContainer"
import React, { useEffect } from "react"
import { ClientDashboardLayout } from "@/oldcomponents/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import styled from "styled-components"
import { ProfileHeader } from "./content/profile-header/ProfileHeader"
import { ProfileInterests } from "@/pages/client/profile/content/interests/Interests"
import { ProfileCreditCards } from "@/pages/client/profile/content/credit-cards/CreditCards"
import { DeleteModalDialog } from "@/pages/client/profile/content/profile-delete-modal/DeleteModalDialog"
import { IndividualSessions } from "@/pages/client/profile/content/sessions-list/IndividualSessions"
import { $profilePageLoading, $profilePageSessionsCount, ClientProfileGate } from "./profile-page.model"
import { MediaRange } from "@/lib/responsive/media"
import { useEvent, useGate, useStore } from "effector-react"
import { Loader } from "@/oldcomponents/spinner/Spinner"
import { BecomeCoachWarningDialog } from "@/pages/client/profile/content/become-coach-dialog/BecomeCoachWarningDialog"
import {
  $becomeCoachWarningDialogVisibility,
  $userHasCoach, changeCoachWarningDialogVisibility
} from "@/pages/client/profile/content/become-coach-dialog/models/units"

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

const CoachButton = styled.div`
  margin-top: 32px;
  font-size: 16px;
  line-height: 22px;
  color: #9aa0a6;
  cursor: pointer;
`

const ProfilePage = () => {
  const sessionsCount = useStore($profilePageSessionsCount)
  const pageLoading = useStore($profilePageLoading)
  const userIsCoach = useStore($userHasCoach)
  const changeDialogVisibility = useEvent(changeCoachWarningDialogVisibility)

  useGate(ClientProfileGate)

  return (
    <ClientDashboardLayout>
      {!pageLoading ? (
        <Container>
          <ProfileHeader />
          <ProfileInterests />
          <ProfileCreditCards userType={"client"} />
          {sessionsCount && <IndividualSessions />}
          {
            !userIsCoach &&
            <CoachButton onClick={() => changeDialogVisibility(true)}>Стать коучем</CoachButton>
          }
          <BecomeCoachWarningDialog />
          <DeleteModalDialog />
        </Container>
      ) : (
        <Loader />
      )}
    </ClientDashboardLayout>
  )
}

export default ProfilePage
