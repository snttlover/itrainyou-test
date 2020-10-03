import * as React from "react"
import { ClientSupportChat } from "@/feature/support"
import { ClientDashboardLayout } from "@/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"

export const ClientSupportPage = () => {
  return (
    <ClientDashboardLayout>
      <ClientSupportChat />
    </ClientDashboardLayout>
  )
}

export default ClientSupportPage
