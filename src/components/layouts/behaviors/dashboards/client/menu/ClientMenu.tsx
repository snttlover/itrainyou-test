import React from "react"
import { DashboardMenuMobileHeader } from "@/components/layouts/behaviors/dashboards/common/menu/content/DashboardMenuMobileHeader"
import { ProfileHeader } from "@/components/layouts/behaviors/dashboards/client/menu/content/ProfileHeader"
import { Link } from "react-router-dom"
import { ClientMenuItems } from "./content/ClientMenuItems"
import { CoachLink } from "@/components/layouts/behaviors/dashboards/client/menu/content/CoachLink"
import { DesktopDashboardMenuLogo } from "@/components/layouts/behaviors/dashboards/common/menu/content/DesktopDashboardMenuLogo"
import { blueLayoutMobileMenuVisibility } from "./blue-layout.mobile-menu"
import { useStore } from "effector-react/ssr"
import { DashboardMenuContainer } from "@/components/layouts/behaviors/dashboards/common/menu/MenuContainer"
import { $userData } from "@/feature/user/user.model"

export const ClientMenu = () => {
  const mobileMenuVisibility = useStore(blueLayoutMobileMenuVisibility)
  const user = useStore($userData)

  return (
    <DashboardMenuContainer showOnMobile={mobileMenuVisibility}>
      <Link to='/client'>
        <DesktopDashboardMenuLogo />
      </Link>
      <DashboardMenuMobileHeader />
      <ProfileHeader
        firstName={user.client?.firstName}
        lastName={user.client?.lastName}
        showCoachDropdown={!!user.coach}
        avatar={user.client?.avatar}
      />
      <ClientMenuItems />
      <CoachLink>Стать коучем</CoachLink>
    </DashboardMenuContainer>
  )
}
