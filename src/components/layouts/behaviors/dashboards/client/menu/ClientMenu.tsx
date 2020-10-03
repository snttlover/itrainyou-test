import { routeNames } from "#/pages/route-names"
import * as React from "react"
import { DashboardMenuMobileHeader } from "#/components/layouts/behaviors/dashboards/common/menu/content/DashboardMenuMobileHeader"
import { ProfileHeader } from "#/components/layouts/behaviors/dashboards/client/menu/content/ProfileHeader"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { ClientMenuItems } from "./content/ClientMenuItems"
import { CoachLink } from "#/components/layouts/behaviors/dashboards/client/menu/content/CoachLink"
import { DesktopDashboardMenuLogo } from "#/components/layouts/behaviors/dashboards/common/menu/content/DesktopDashboardMenuLogo"
import { blueLayoutMobileMenuVisibility } from "./blue-layout.mobile-menu"
import { useStore } from "effector-react/ssr"
import { DashboardMenuContainer } from "#/components/layouts/behaviors/dashboards/common/menu/MenuContainer"
import { $userData } from "#/feature/user/user.model"

const StyledLink = styled(Link)`
  margin: 0 auto;
`

export const ClientMenu = () => {
  const mobileMenuVisibility = useStore(blueLayoutMobileMenuVisibility)
  const user = useStore($userData)

  return (
    <DashboardMenuContainer showOnMobile={mobileMenuVisibility}>
      <StyledLink to={routeNames.client()}>
        <DesktopDashboardMenuLogo />
      </StyledLink>
      <DashboardMenuMobileHeader />
      <ProfileHeader
        firstName={user.client?.firstName}
        lastName={user.client?.lastName}
        avatar={user.client?.avatar}
        profileLink={routeNames.clientProfile()}
      />
      <ClientMenuItems />
      <CoachLink>Стать коучем</CoachLink>
    </DashboardMenuContainer>
  )
}
