import React from "react"
import { DashboardMenuMobileHeader } from "@/application/components/layouts/behaviors/dashboards/common/menu/content/DashboardMenuMobileHeader"
import { ProfileHeader } from "@/application/components/layouts/behaviors/dashboards/client/menu/content/ProfileHeader"
import { ClientMenuItems } from "./content/ClientMenuItems"
import { CoachLink } from "@/application/components/layouts/behaviors/dashboards/client/menu/content/CoachLink"
import { DesktopDashboardMenuLogo } from "@/application/components/layouts/behaviors/dashboards/common/menu/content/DesktopDashboardMenuLogo"
import { blueLayoutMobileMenuVisibility } from "./blue-layout.mobile-menu"
import { useStore } from "effector-react"
import { DashboardMenuContainer } from "@/application/components/layouts/behaviors/dashboards/common/menu/MenuContainer"

export const ClientMenu = () => {
  const mobileMenuVisibility = useStore(blueLayoutMobileMenuVisibility)

  return (
    <DashboardMenuContainer showOnMobile={mobileMenuVisibility}>
      <DesktopDashboardMenuLogo />
      <DashboardMenuMobileHeader />
      <ProfileHeader />
      <ClientMenuItems />
      <CoachLink>Стать коучем</CoachLink>
    </DashboardMenuContainer>
  )
}
