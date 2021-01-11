import React from "react"
import styled from "styled-components"
import { Notifications } from "@/lib/api/client/get-notifications"
import {
  NewCoachNotification,
  NewCoachNotificationProps,
} from "@/feature/notifications-page/view/content/variants/NewCoachNotification"
import {
  SessionsRemindNotification,
  SessionsRemindNotificationProps,
} from "@/feature/notifications-page/view/content/variants/SessionsRemindNotification"

import {
  ReviewNotification,
  ReviewNotificationProps,
} from "@/feature/notifications-page/view/content/variants/ReviewNotification"

type TransformedNotification = {
  time: string
  notification: Notifications
}

export const NotificationSwitcher = (props: TransformedNotification) => {
  switch (props.notification.type) {
  case "NEW_COACH":
    return <NewCoachNotification {...(props as NewCoachNotificationProps)} />
  case "SESSION_REMINDER":
    return <SessionsRemindNotification {...(props as SessionsRemindNotificationProps)} />
  case "NEW_REVIEW":
    return <ReviewNotification {...(props as ReviewNotificationProps)} />
  default:
    return null
  }
}

const Container = styled.div``
