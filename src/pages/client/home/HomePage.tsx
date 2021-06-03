import { ClientDashboardLayout } from "@/oldcomponents/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import React, { useEffect } from "react"
import { FreeSessionsHomePage } from "./content/FreeSessionsHomePage"
import { StandardHomePage } from "./content/StandardHomePage"
import { $hasFreeSessions } from "@/pages/client/home/home.model"
import { useStore, useEvent } from "effector-react"


export const HomePage = () => {
  const hasFreeSessions = useStore($hasFreeSessions)

  return (
    <ClientDashboardLayout>
      {hasFreeSessions ? <FreeSessionsHomePage /> : <StandardHomePage/>}
    </ClientDashboardLayout>
  )
}

export default HomePage
