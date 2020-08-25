import React from "react"
import { ClientDashboardLayout } from "@/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import { UserProfile } from "@/pages/client/edit-profile/user-data/UserProfile"
import { ContentContainer } from "@/components/layouts/ContentContainer"
import styled from "styled-components"

export const EditClientProfilePage = () => (
  <ClientDashboardLayout>
    <ContentContainer>
      <Container>
        <UserProfile />
      </Container>
    </ContentContainer>
  </ClientDashboardLayout>
)

const Container = styled.div`
  width: auto;
  max-width: 600px;
`
