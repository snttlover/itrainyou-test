import { Spinner } from "@/components/spinner/Spinner"
import { MediaRange } from "@/lib/responsive/media"
import { $isLoading, clientPageGate } from "@/pages/coach/client/client-page.model"
import { CoachesList } from "@/pages/coach/client/components/CoachesList"
import { ProfileHeader } from "@/pages/coach/client/components/ProfileHeader"
import { useGate, useStore } from "effector-react/ssr"
import React from "react"
import { CoachDashboardLayout } from "@/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { ContentContainer } from "@/components/layouts/ContentContainer"
import { useParams } from "react-router-dom"
import styled from "styled-components"

const StyledContentContainer = styled(ContentContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${ProfileHeader} {
    margin-top: 20px;

    ${MediaRange.greaterThan("mobile")`
      margin-top: 40px;
    `}
  }

  ${MediaRange.greaterThan("laptop")`
    align-items: flex-start;
  `}
`

export const ClientPage = () => {
  const { id } = useParams<{ id: string }>()
  useGate(clientPageGate, parseInt(id, 10))

  const isLoading = useStore($isLoading)

  return (
    <CoachDashboardLayout>
      <StyledContentContainer>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <ProfileHeader />
            <CoachesList />
          </>
        )}
      </StyledContentContainer>
    </CoachDashboardLayout>
  )
}
