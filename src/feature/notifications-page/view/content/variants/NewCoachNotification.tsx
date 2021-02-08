import React from "react"
import { NewCoachNotificationType } from "@/lib/api/client/get-notifications"

import { Card, NotificationAvatar, Title, Bold, Time, Row } from "../common/NotificationsCommon"
import { Link } from "react-router-dom"
import { routeNames } from "@/pages/route-names"
import styled from "styled-components"

export type NewCoachNotificationProps = {
  notification: NewCoachNotificationType
  time: string
}

const StyledLink = styled(Link)`
  text-decoration: none;
`

export const NewCoachNotification = (props: NewCoachNotificationProps) => {
  const { newCoach } = props.notification
  return (
    <StyledLink to={routeNames.searchCoachPage(newCoach.id.toString())}>
      <Card>
        <Row>

          <NotificationAvatar src={newCoach.avatar} />

          <Title>
          Вас может заинтересовать новый коуч{" "}
            <Bold>
              {newCoach.firstName} {newCoach.lastName}
            </Bold>
          </Title>
          <Time>{props.time}</Time>
        </Row>
      </Card>
    </StyledLink>
  )
}
