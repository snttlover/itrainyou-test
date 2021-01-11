import React from "react"
import { SessionsRemindNotificationType } from "@/lib/api/client/get-notifications"

import { Card, NotificationAvatar, SessionTime, Title, Bold, Time, Row } from "../common/NotificationsCommon"
import { useStore } from "effector-react"
import { $dashboard } from "@/feature/dashboard/dashboard"
import { Avatar } from "@/components/avatar/Avatar"
import styled from "styled-components"
import { Icon } from "@/components/icon/Icon"
import { formatSessionTime } from "@/feature/chat/view/content/messages/content/system/SystemMessageSwitcher"
import { Link } from "react-router-dom"
import { routeNames } from "@/pages/route-names"

export type SessionsRemindNotificationProps = {
  notification: SessionsRemindNotificationType
  time: string
}

const StyledLink = styled(Link)`
  text-decoration: none;
`

export const SessionsRemindNotification = (props: SessionsRemindNotificationProps) => {
  const { sessions } = props.notification
  const dashboardType = useStore($dashboard)

  if (sessions.length === 1) {
    const session = sessions[0]
    const user = dashboardType === "coach" ? session.clients[0] : session.coach
    const userLink =
      dashboardType === "coach"
        ? routeNames.coachClientProfile(user.id.toString())
        : routeNames.searchCoachPage(user.id.toString())

    const sessionLink =
      dashboardType === "coach"
        ? routeNames.coachSession(session.id.toString())
        : routeNames.clientSession(session.id.toString())
    return (
      <Card>
        <Row>
          <StyledLink to={userLink}>
            <NotificationAvatar src={user.avatar} />
          </StyledLink>
          <Title>
            У вас завтра сессия с{" "}
            <StyledLink to={userLink}>
              <Bold>
                {user.firstName} {user.lastName}
              </Bold>
            </StyledLink>{" "}
            в
            <StyledLink to={sessionLink}>
              {" "}
              <SessionTime>{formatSessionTime(session.startDatetime, session.endDatetime)}</SessionTime>
            </StyledLink>
          </Title>
          <Time>{props.time}</Time>
        </Row>
      </Card>
    )
  }

  return (
    <Card>
      <Row>
        <SessionIconWrapper>
          <SessionIcon />
        </SessionIconWrapper>
        <Title>Не забудьте, у вас завтра есть сессии!</Title>
        <Time>{props.time}</Time>
      </Row>
      {sessions.map(session => {
        const user = dashboardType === "coach" ? session.clients[0] : session.coach

        const userLink =
          dashboardType === "coach"
            ? routeNames.coachClientProfile(user.id.toString())
            : routeNames.searchCoachPage(user.id.toString())

        const sessionLink =
          dashboardType === "coach"
            ? routeNames.coachSession(session.id.toString())
            : routeNames.clientSession(session.id.toString())

        return (
          <Row>
            <StyledLink to={userLink}>
              <SmallAvatarWrapper>
                <SmallAvatar src={user.avatar} />
              </SmallAvatarWrapper>
            </StyledLink>
            <SmallTitle>
              C{" "}
              <StyledLink to={userLink}>
                <Bold>
                  {user.firstName} {user.lastName}{" "}
                </Bold>
              </StyledLink>{" "}
              в{" "}
              <StyledLink to={sessionLink}>
                <SessionTime>{formatSessionTime(session.startDatetime, session.endDatetime)}</SessionTime>
              </StyledLink>
            </SmallTitle>
          </Row>
        )
      })}
    </Card>
  )
}

const SessionIconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background: #eceff1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`

const SessionIcon = styled(Icon).attrs({ name: "video" })`
  fill: ${props => props.theme.colors.primary};
`

const SmallAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
`

const SmallAvatarWrapper = styled.div`
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SmallTitle = styled(Title)`
  margin-top: 10px;
`
