import { routeNames } from "@/pages/route-names"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { DesktopDashboardMenuLogo } from "@/components/layouts/behaviors/dashboards/common/menu/content/DesktopDashboardMenuLogo"
import { DashboardMenuMobileHeader } from "@/components/layouts/behaviors/dashboards/common/menu/content/DashboardMenuMobileHeader"
import { DashboardMenuContainer } from "@/components/layouts/behaviors/dashboards/common/menu/MenuContainer"
import * as React from "react"
import { ProfileHeader } from "@/components/layouts/behaviors/dashboards/client/menu/content/ProfileHeader"
import { useStore } from "effector-react"
import { blueLayoutMobileMenuVisibility } from "@/components/layouts/behaviors/dashboards/client/menu/blue-layout.mobile-menu"
import { CoachMenuItems } from "@/components/layouts/behaviors/dashboards/coach/menu/content/CoachMenuItems"
import { MediaRange } from "@/lib/responsive/media"
import { $userData } from "@/feature/user/user.model"

const StyledProfileHeader = styled(ProfileHeader)`
  border-bottom: 1px solid #b186cb;

  ${MediaRange.lessThan("tablet")`
    min-width: calc(100% - 64px);
    margin-left: 64px;
  `}

  ${MediaRange.lessThan("mobile")`
    max-width: 260px;
  `}
`

const StyledLink = styled(Link)`
  margin: 0 auto;
`

export const CoachMenu = () => {
  const mobileMenuVisibility = useStore(blueLayoutMobileMenuVisibility)
  const user = useStore($userData)

  return (
    <DashboardMenuContainer showOnMobile={mobileMenuVisibility}>
      <StyledLink to={routeNames.coach()}>
        <DesktopDashboardMenuLogo />
      </StyledLink>
      <DashboardMenuMobileHeader />
      <StyledProfileHeader
        firstName={user.coach?.firstName}
        lastName={user.coach?.lastName}
        avatar={user.coach?.avatar}
        profileLink={routeNames.coachProfile()}
      />
      <CoachMenuItems />
    </DashboardMenuContainer>
  )
}
