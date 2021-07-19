import { routeNames } from "@/pages/route-names"
import styled from "styled-components"
import { LandingPageContainer } from "@/pages/landing-old/common/LandingPageContainer"
import { Icon } from "@/old-components/icon/Icon"
import { Avatar } from "@/old-components/avatar/Avatar"
import { MediaRange } from "@/lib/responsive/media"
import { Burger } from "@/old-components/layouts/behaviors/dashboards/common/menu/content/Burger"
import { CoachTooltip } from "@/old-components/layouts/behaviors/dashboards/coach/top-bar/coach-tooltip/CoachTooltip"
import { useStore } from "effector-react"
import { $userData } from "@/feature/user/user.model"
import { Logo } from "@/pages/landing-old/content/top-bar/logo/Logo"
import * as React from "react"
import { Link } from "react-router-dom"
import { NotificationIcon } from "@/old-components/layouts/behaviors/dashboards/common/top-bar/NotificationIcon"
import { coachChatsSocket } from "@/feature/socket/chats-socket"

const Container = styled.div`
  width: 100%;
  background: #dbdee0;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 768px) {
    background: ${props => props.theme.colors.primary};
  }
`

const StyledContainer = styled(LandingPageContainer)`
  width: 100%;
  align-items: center;
  padding: 15px 40px;
  display: flex;
  justify-content: flex-end;
  ${MediaRange.lessThan("tablet")`
    padding: 15px 25px;
    margin: 0;
  `}
  ${MediaRange.lessThan("mobile")`
    padding: 8px;
  `}
`

const DropdownButton = styled(Icon).attrs({ name: "arrow" })`
  fill: ${props => props.theme.colors.primary};
  margin-left: 37px;
  cursor: pointer;
  height: auto;
  width: 25px;
  ${MediaRange.lessThan("tablet")`
    display: none;
  `}
`

const AvatarLink = styled(Link)`
  margin-left: 36px;
  ${MediaRange.lessThan("tablet")`
      display: none;
  `}
`

const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  cursor: pointer;

  ${MediaRange.lessThan("tablet")`
    display: none;
  `}
`

const StyledLogo = styled(Logo)`
  margin-right: 40px;
  cursor: pointer;
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
  }
  @media screen and (max-width: 480px) {
    width: 36px;
    height: 36px;
  }
`

const CoachLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`

export const CoachTopBar = () => {
  const user = useStore($userData)
  const notificationCount = useStore(coachChatsSocket.data.$notificationsCounter)

  return (
    <Container>
      <StyledContainer>
        <CoachLinkWrapper>
          <Link to={routeNames.coach()}>
            <StyledLogo />
          </Link>
        </CoachLinkWrapper>
        {user.coach?.isApproved && (
          <NotificationIcon count={notificationCount} link={routeNames.coachNotifications()} />
        )}
        <AvatarLink to={routeNames.coachProfile()}>
          <StyledAvatar src={user.coach?.avatar || null} />
        </AvatarLink>
        <CoachTooltip>
          <DropdownButton />
        </CoachTooltip>
        <Burger />
      </StyledContainer>
    </Container>
  )
}
