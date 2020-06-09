import { CoachDashboardLayout } from "@/application/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { SettingsPage } from "@/application/pages/common/settings/SettingsPage"
import React from "react"

const Settings = () => (
  <CoachDashboardLayout>
    <SettingsPage />
  </CoachDashboardLayout>
)

export default Settings
