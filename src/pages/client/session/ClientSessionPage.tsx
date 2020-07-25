import React from "react"
import { SessionPage } from "@/pages/client/session/content/SessionPage"
import { ClientDashboardLayout } from "@/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"

export const ClientSessionPage = () => (
  <ClientDashboardLayout>
    <SessionPage />
  </ClientDashboardLayout>
)
