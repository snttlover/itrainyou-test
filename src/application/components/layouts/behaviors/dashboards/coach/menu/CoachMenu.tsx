import styled from "styled-components"
import { DesktopDashboardMenuLogo } from "@/application/components/layouts/behaviors/dashboards/common/menu/content/DesktopDashboardMenuLogo"
import { DashboardMenuMobileHeader } from "@/application/components/layouts/behaviors/dashboards/common/menu/content/DashboardMenuMobileHeader"
import { DashboardMenuContainer } from "@/application/components/layouts/behaviors/dashboards/common/menu/MenuContainer"
import React from "react"
import { ProfileHeader } from "@/application/components/layouts/behaviors/dashboards/client/menu/content/ProfileHeader"
import { useStore } from "effector-react"
import { blueLayoutMobileMenuVisibility } from "@/application/components/layouts/behaviors/dashboards/client/menu/blue-layout.mobile-menu"
import { CoachLink } from "@/application/components/layouts/behaviors/dashboards/client/menu/content/CoachLink"
import { CoachMenuItems } from "@/application/components/layouts/behaviors/dashboards/coach/menu/content/CoachMenuItems"
import { MediaRange } from "@/application/lib/responsive/media"
import { $userData } from "@/application/feature/user/user.model"

const StyledProfileHeader = styled(ProfileHeader)`
  border-bottom: 1px solid #b186cb;

  ${MediaRange.lessThan("tablet")`
    min-width: calc(100% - 64px);
    margin-left: 64px;
  `}

  ${MediaRange.lessThan(`mobile`)`
    max-width: 260px;
  `}
`

export const CoachMenu = () => {
  const mobileMenuVisibility = useStore(blueLayoutMobileMenuVisibility)
  const user = useStore($userData)

  return (
    <DashboardMenuContainer showOnMobile={mobileMenuVisibility}>
      <DesktopDashboardMenuLogo />
      <DashboardMenuMobileHeader />
      <StyledProfileHeader
        firstName={user.coach?.firstName}
        lastName={user.coach?.lastName}
        showCoachDropdown={true}
        avatar={user.coach?.avatar}
      />
      <CoachMenuItems />
      <CoachLink>Думатете вы топ-коуч?</CoachLink>
    </DashboardMenuContainer>
  )
}
