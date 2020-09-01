import React from "react"
import { NewCoachNotificationType } from "@/lib/api/client/get-notifications"

import { Card, NotificationAvatar, Title, Bold, Time, Row } from "../common/NotificationsCommon"

export type NewCoachNotificationProps = {
  notification: NewCoachNotificationType
  time: string
}

export const NewCoachNotification = (props: NewCoachNotificationProps) => {
  const { newCoach } = props.notification
  return (
    <Card>
      <Row>
        <NotificationAvatar src={newCoach.avatar} />
        <Title>
          Вас может заинтересовать новый коуч <Bold>{newCoach.firstName} {newCoach.lastName}</Bold>
        </Title>
        <Time>{props.time}</Time>
      </Row>
    </Card>
  )
}
