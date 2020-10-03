import React from "react"
import { createNotificationsPageModel } from "#/feature/notifications-page/model/create-notifications-page.model"
import { createNotificationsPage } from "#/feature/notifications-page/view/CreateNotificationsPage"
import { CoachDashboardLayout } from "#/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { getCoachNotifications } from "#/lib/api/coach/get-notifications"

const coachNotifications = createNotificationsPageModel({
  fetchNotifications: getCoachNotifications,
})

const NotificationsPage = createNotificationsPage(coachNotifications)

export const CoachNotificationsPage = () => (
  <CoachDashboardLayout>
    <NotificationsPage />
  </CoachDashboardLayout>
)
