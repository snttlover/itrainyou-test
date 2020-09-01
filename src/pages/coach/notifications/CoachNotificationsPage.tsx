import React from "react"
import { createNotificationsPageModel } from "@/feature/notifications-page/model/create-notifications-page.model"
import { getClientNotifications } from "@/lib/api/client/get-notifications"
import { createNotificationsPage } from "@/feature/notifications-page/view/CreateNotificationsPage"
import { CoachDashboardLayout } from "@/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"

const coachNotifications = createNotificationsPageModel({
  fetchNotifications: getClientNotifications,
})

const NotificationsPage = createNotificationsPage(coachNotifications)

export const CoachNotificationsPage = () => (
  <CoachDashboardLayout>
    <NotificationsPage />
  </CoachDashboardLayout>
)
