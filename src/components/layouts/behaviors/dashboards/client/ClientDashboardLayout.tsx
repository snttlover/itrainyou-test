import { changeDashboardType } from "@/feature/dashboard/dashboard"
import { withFullRegister } from "@/feature/user/with-full-register"
import { routeNames } from "@/pages/route-names"
import { useEvent } from "effector-react/ssr"
import React, { useEffect } from "react"
import styled from "styled-components"
import { ClientMenu } from "@/components/layouts/behaviors/dashboards/client/menu/ClientMenu"
import { ClientTopBar } from "@/components/layouts/behaviors/dashboards/client/client-dashboard-top-bar/ClientTopBar"
import { withProtect } from "@/feature/user/with-protect"
import { ToastsContainer } from "@/components/layouts/behaviors/dashboards/common/toasts/ToastsContainer"
import { DashboardContainer } from "@/components/layouts/behaviors/dashboards/common/DashboardContainer"
import { DashboardContent } from "@/components/layouts/behaviors/dashboards/common/DashboardPageContent"
import { DashboardPageWrapper } from "@/application/components/layouts/behaviors/dashboards/common/DashboardPageWrapper"
import { clientChatsSocket, createChatsSocket } from "@/feature/socket/chats-socket"

type DashboardTypes = {
  children: React.ReactChild
}



const Dashboard = styled(({ children, ...props }: DashboardTypes) => {
  const changeDashboard = useEvent(changeDashboardType)
  useEffect(() => {
    changeDashboard("client")

    setTimeout(() => {
      clientChatsSocket.methods.send({
        text: `Some text`,
        chat: 98
      })
    }, 3000)
  }, [])

  return (
    <DashboardContainer {...props}>
      <ClientMenu />
      <ToastsContainer />
      <DashboardContent>
        <ClientTopBar />
        <DashboardPageWrapper>{children}</DashboardPageWrapper>
      </DashboardContent>
    </DashboardContainer>
  )
})``

export const ClientDashboardLayout = withProtect({ to: routeNames.login() })(withFullRegister(Dashboard))
