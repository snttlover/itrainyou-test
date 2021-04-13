import React from "react"
import styled from "styled-components"
import { createNotificationsPageModel } from "@/feature/notifications-page/model/create-notifications-page.model"
import { getClientNotifications } from "@/lib/api/client/get-notifications"
import { createNotificationsPage } from "@/feature/notifications-page/view/CreateNotificationsPage"
import { ClientDashboardLayout } from "@/oldcomponents/layouts/behaviors/dashboards/client/ClientDashboardLayout"

const clientNotifications = createNotificationsPageModel({
  fetchNotifications: getClientNotifications
})

const NotificationsPage = createNotificationsPage(clientNotifications)

export const ClientNotificationsPage = () => (
  <ClientDashboardLayout>
    <NotificationsPage />
  </ClientDashboardLayout>
)
