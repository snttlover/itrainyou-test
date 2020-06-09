import { CoachDashboardLayout } from "@/application/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import dynamic from "next/dynamic"
import React from "react"

const SettingsPage = dynamic(() => import("@/application/pages/common/settings/SettingsPage"), {
  ssr: false,
})

const Settings = () => (
  <CoachDashboardLayout>
    <SettingsPage />
  </CoachDashboardLayout>
)

export default Settings
