import { ClientDashboardLayout } from "@/application/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import { SettingsPage } from "@/application/pages/common/settings/SettingsPage"
import React from "react"

const Settings = () => (
  <ClientDashboardLayout>
    <SettingsPage />
  </ClientDashboardLayout>
)

export default Settings
