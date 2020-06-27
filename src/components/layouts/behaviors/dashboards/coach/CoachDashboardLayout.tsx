import { changeDashboardType } from "@/feature/dashboard/dashboard"
import { withFullRegister } from "@/feature/user/with-full-register"
import { routeNames } from "@/pages/route-names"
import React, { useEffect } from "react"
import styled from "styled-components"
import { withProtect } from "@/feature/user/with-protect"
import { ToastsContainer } from "@/components/layouts/behaviors/dashboards/common/toasts/ToastsContainer"
import { CoachTheme } from "@/components/layouts/themes"
import { DashboardContainer } from "@/components/layouts/behaviors/dashboards/common/DashboardContainer"
import { DashboardContent } from "@/components/layouts/behaviors/dashboards/common/DashboardPageContent"
import { CoachMenu } from "@/components/layouts/behaviors/dashboards/coach/menu/CoachMenu"
import { CoachTopBar } from "@/components/layouts/behaviors/dashboards/coach/top-bar/CoachTopBar"

type DashboardTypes = {
  children: React.ReactChild
}

const Dashboard = styled(({ children, ...props }: DashboardTypes) => {
  useEffect(() => {
    changeDashboardType("coach")
  }, [])
  return (
    <CoachTheme>
      <DashboardContainer {...props}>
        <CoachMenu />
        <ToastsContainer />
        <DashboardContent>
          <CoachTopBar />
          {children}
        </DashboardContent>
      </DashboardContainer>
    </CoachTheme>
  )
})``

export const CoachDashboardLayout = withProtect({ to: routeNames.login() })(withFullRegister(Dashboard))
