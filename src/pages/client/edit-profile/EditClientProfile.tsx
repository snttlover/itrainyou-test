import React from "react"
import { ClientDashboardLayout } from "@/oldcomponents/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import { UserProfile } from "@/pages/client/edit-profile/user-data/UserProfile"
import { ContentContainer } from "@/oldcomponents/layouts/ContentContainer"
import styled from "styled-components"
import { BecomeCoachWarningDialog } from "@/pages/client/edit-profile/user-data/BecomeCoachWarningDialog"

export const EditClientProfilePage = () => (
  <ClientDashboardLayout>
    <ContentContainer>
      <Container>
        <BecomeCoachWarningDialog />
        <UserProfile />
      </Container>
    </ContentContainer>
  </ClientDashboardLayout>
)

const Container = styled.div`
  width: auto;
  max-width: 600px;
`
