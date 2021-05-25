import { ClientDashboardLayout } from "@/oldcomponents/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import React from "react"
import { FreeSessionsHomePage } from "./FreeSessionsHomePage"
import { StandardHomePage } from "./StandardHomePage"
import { $hasFreeSessions } from "@/pages/client/home/home.model"
import { useStore } from "effector-react"


export const HomePage = () => {
  const hasFreeSessions = useStore($hasFreeSessions)

  return (
    <ClientDashboardLayout>
      {hasFreeSessions ? <FreeSessionsHomePage /> : <StandardHomePage/>}
    </ClientDashboardLayout>
  )
}

export default HomePage
