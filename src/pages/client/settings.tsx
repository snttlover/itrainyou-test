import { ClientDashboardLayout } from "@/application/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import { SettingsPage } from "@/application/pages/dashboard/settings/SettingsPage"
import React from "react"

const Settings = () => (
  <ClientDashboardLayout>
    <SettingsPage />
  </ClientDashboardLayout>
)

export default Settings
