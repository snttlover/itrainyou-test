import React from "react"
import styled from "styled-components"
import { Notifications } from "@/lib/api/client/get-notifications"

type TransformedNotification = {
  time: string,
  notification: Notifications
}

export const NotificationSwitcher = (props: TransformedNotification) => {

  switch (props.notification.type) {
    
  }

}

const Container = styled.div``
