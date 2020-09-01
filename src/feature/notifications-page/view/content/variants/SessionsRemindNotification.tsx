import React from "react"
import { SessionsRemindNotificationType } from "@/lib/api/client/get-notifications"

import { Card, NotificationAvatar,SessionTime, Title, Bold, Time, Row } from "../common/NotificationsCommon"
import { useStore } from "effector-react/ssr"
import { $dashboard } from "@/feature/dashboard/dashboard"
import { Avatar } from "@/components/avatar/Avatar"
import styled from "styled-components"
import { Icon } from "@/components/icon/Icon"
import { formatSessionTime } from "@/feature/chat/view/content/messages/content/system/SystemMessageSwitcher"

export type SessionsRemindNotificationProps = {
  notification: SessionsRemindNotificationType
  time: string
}

export const SessionsRemindNotification = (props: SessionsRemindNotificationProps) => {
  const { sessions } = props.notification
  const dashboardType = useStore($dashboard)

  if (sessions.length === 1) {
    const session = sessions[0]
    const user = dashboardType === "coach" ? session.clients[0] : session.coach
    return (
      <Card>
        <Row>
          <NotificationAvatar src={user.avatar} />
          <Title>
            У вас завтра сессия с{" "}
            <Bold>
              {user.firstName} {user.lastName}
            </Bold>{" "}
            в <SessionTime>{formatSessionTime(session.startDatetime, session.endDatetime)}</SessionTime>
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

        return (
          <Row>
            <SmallAvatarWrapper>
              <SmallAvatar src={user.avatar} />
            </SmallAvatarWrapper>
            <SmallTitle>
              C{" "}
              <Bold>
                {user.firstName} {user.lastName}{" "}
              </Bold>{" "}
              в <SessionTime>{formatSessionTime(session.startDatetime, session.endDatetime)}</SessionTime>
            </SmallTitle>
            <Time>{props.time}</Time>
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

const SessionIcon = styled(Icon).attrs({ name: `video` })`
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
