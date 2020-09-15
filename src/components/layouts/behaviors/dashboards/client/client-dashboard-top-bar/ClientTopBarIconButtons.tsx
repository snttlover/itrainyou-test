import { routeNames } from "@/pages/route-names"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"
import { Icon } from "@/components/icon/Icon"
import { Burger } from "@/components/layouts/behaviors/dashboards/common/menu/content/Burger"
import { Avatar } from "@/components/avatar/Avatar"
import { MediaRange } from "@/lib/responsive/media"
import { CoachTooltip } from "@/components/layouts/behaviors/dashboards/coach/top-bar/coach-tooltip/CoachTooltip"
import { useStore } from "effector-react/ssr"
import { $userData } from "@/feature/user/user.model"
import { MobileMenu, MobileSearchButton } from "@/pages/landing/content/top-bar/mobile-menu/MobileMenu"
import * as React from "react"
import { NotificationIcon } from "@/components/layouts/behaviors/dashboards/common/top-bar/NotificationIcon"
import { clientChatsSocket } from "@/feature/socket/chats-socket"

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

const AvatarLink = styled(Link)`
  margin-left: 36px;
  ${MediaRange.lessThan(`tablet`)`  
    display: none;
  `}
`

const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  cursor: pointer;

  ${MediaRange.lessThan(`tablet`)`
    display: none;
  `}
`

const StyledMobileMenu = styled(MobileMenu)`
  ${MobileSearchButton} {
    fill: #fff;
  }
`

const DropdownButton = styled(Icon).attrs({ name: `arrow` })`
  fill: ${props => props.theme.colors.primary};
  margin-left: 37px;
  cursor: pointer;
  height: auto;
  width: 25px;
  ${MediaRange.lessThan(`tablet`)`
    display: none;
  `}
`

const NotificationWrapper = styled.div`
  margin-left: 30px;
`

export const ClientTopBarIconButtons = () => {
  const notificationCount = useStore(clientChatsSocket.data.$notificationsCounter)
  const user = useStore($userData)
  return (
    <Wrapper>
      <NotificationWrapper>
        <NotificationIcon count={notificationCount} link={routeNames.clientNotifications()} />
      </NotificationWrapper>
      <AvatarLink to={routeNames.clientProfile()}>
        <StyledAvatar src={user.client?.avatar || null} />
      </AvatarLink>
      <StyledMobileMenu />
      <Burger />
      <CoachTooltip>
        <DropdownButton />
      </CoachTooltip>
    </Wrapper>
  )
}
