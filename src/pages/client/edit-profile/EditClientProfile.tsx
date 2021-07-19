import React from "react"
import { ClientDashboardLayout } from "@/old-components/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import { UserProfile } from "@/pages/client/edit-profile/user-data/UserProfile"
import { ContentContainer } from "@/old-components/layouts/ContentContainer"
import styled from "styled-components"
import { FIllFieldsToBecomeCoachWarningDialog } from "@/pages/client/edit-profile/user-data/FIllFieldsToBecomeCoachWarningDialog"

export const EditClientProfilePage = () => (
  <ClientDashboardLayout>
    <ContentContainer>
      <Container>
        <FIllFieldsToBecomeCoachWarningDialog />
        <UserProfile />
      </Container>
    </ContentContainer>
  </ClientDashboardLayout>
)

const Container = styled.div`
  width: auto;
  max-width: 600px;
`
